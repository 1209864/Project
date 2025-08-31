// FINAL CORRECTED VERSION

package com.intern.gallery.service;

import com.intern.gallery.entity.Image;
import com.intern.gallery.repo.ImageRepository;
import dev.brachtendorf.jimagehash.hash.Hash;
import dev.brachtendorf.jimagehash.hashAlgorithms.AverageHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    private final AverageHash pHasher = new AverageHash(64);

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Image addImage(String imageUrl, String ownerId) throws Exception {
        URL url = new URI(imageUrl).toURL();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("User-Agent", "Mozilla/5.0");

        BufferedImage bufferedImage = ImageIO.read(connection.getInputStream());
        if (bufferedImage == null) {
            throw new IOException("Could not read image from URL: " + imageUrl);
        }

        Hash hash = this.pHasher.hash(bufferedImage);
        
        // --- THIS IS THE CRITICAL FIX ---
        // We format the hash to a 16-character, zero-padded hex string.
        String hashString = String.format("%016x", hash.getHashValue());

        Image newImage = new Image();
        newImage.setImageUrl(imageUrl);
        newImage.setpHash(hashString);
        newImage.setOwnerId(ownerId);

        return imageRepository.save(newImage);
    }

    public List<Image> findSimilarImages(Long imageId) {
        Image originalImage = imageRepository.findById(imageId)
            .orElseThrow(() -> new RuntimeException("Image not found with id: " + imageId));

        Hash originalHash = new Hash(new BigInteger(originalImage.getpHash(), 16),
                                     pHasher.getKeyResolution(),
                                     pHasher.algorithmId());

        List<Image> allImages = imageRepository.findAll();
        
        // Use a lenient threshold that works for these images.
        final int similarityThreshold = 30;

        return allImages.stream()
                .filter(otherImage -> !otherImage.getId().equals(originalImage.getId()))
                .filter(otherImage -> {
                    Hash otherHash = new Hash(new BigInteger(otherImage.getpHash(), 16),
                                              pHasher.getKeyResolution(),
                                              pHasher.algorithmId());
                    
                    return originalHash.hammingDistance(otherHash) <= similarityThreshold;
                })
                .collect(Collectors.toList());
    }
}