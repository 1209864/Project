package com.intern.gallery.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.intern.gallery.service.ImageService;
import com.intern.gallery.entity.*;
import java.util.List;
import java.util.Map;

/**
 * This is the API Layer. It exposes our application's logic to the outside world.
 * It handles incoming web requests and returns JSON responses.
 */
@RestController // Tells Spring this class will handle HTTP requests and return data (not web pages).
@RequestMapping("/api/images") // All endpoints in this class will start with "/api/images".
@CrossOrigin(origins = "http://localhost:5173")// IMPORTANT: Allows our React frontend (running on port 3000) to call this backend.
public class ImageController {

    // Spring injects the ImageService we built.
    @Autowired
    private ImageService imageService;

    /**
     * API Endpoint to get all images.
     * Handles HTTP GET requests to "/api/images".
     */
    @GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    /**
     * API Endpoint to add a new image.
     * Handles HTTP POST requests to "/api/images".
     * @param payload The incoming JSON body, e.g., {"imageUrl": "http://..."}
     * @param ownerId This will be injected by our security filter later. For now, it's a placeholder.
     */
 // NEW - WORKS WITHOUT SECURITY
    @PostMapping
    public ResponseEntity<?> addImage(@RequestBody Map<String, String> payload) {
        // Use a placeholder ownerId again
        String ownerId = "user_submission"; 
        
        try {
            String imageUrl = payload.get("imageUrl");
            if (imageUrl == null || imageUrl.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("imageUrl is required.");
            }
            Image savedImage = imageService.addImage(imageUrl, ownerId);
            return ResponseEntity.ok(savedImage);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to process image: " + e.getMessage());
        }
    }

    /**
     * API Endpoint to find similar images.
     * Handles HTTP GET requests to "/api/images/{id}/similar".
     * @param id The ID of the image, passed in the URL path.
     */
    @GetMapping("/{id}/similar")
    public ResponseEntity<List<Image>> getSimilarImages(@PathVariable Long id) {
        List<Image> similarImages = imageService.findSimilarImages(id);
        return ResponseEntity.ok(similarImages);
    }
}
