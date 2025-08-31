package com.intern.gallery.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intern.gallery.entity.*;

/**
 * This is our data access layer. It's an interface that handles all the
 * standard database operations (Create, Read, Update, Delete) for our Image entity.
 * Spring Data JPA will automatically provide the implementation for us at runtime.
 */
@Repository // This annotation tells Spring that this interface is a Repository. It's a good practice for clarity.
public interface ImageRepository extends JpaRepository<Image, Long> {

    // That's it! We don't need to write any more code in here for now.
    //
    // By extending JpaRepository, we instantly get a bunch of useful methods like:
    // - save(Image image): Saves or updates an image.
    // - findById(Long id): Finds an image by its ID.
    // - findAll(): Finds all images.
    // - deleteById(Long id): Deletes an image.
    // - and many more!
}