package com.intern.gallery.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * This class is our blueprint (Entity) for the `images` table in the database.
 * Each instance of this class will represent a single row in that table.
 */
@Data // A Lombok annotation that automatically creates getters, setters, toString(), etc. It keeps our code clean!
@Entity // This is the most important annotation. It tells Spring Data JPA: "This class represents a database table."
@Table(name = "images") // This explicitly tells JPA which table this class maps to. It's good practice to be specific.
@NoArgsConstructor // Lombok: creates a no-argument constructor.
@AllArgsConstructor // Lombok: creates a constructor with all arguments.
public class Image {

    // --- Fields that map directly to our database columns ---

    @Id // Marks this field as the primary key of the table.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tells JPA that MySQL is responsible for generating this value (using AUTO_INCREMENT).
    private Long id;

    @Column(name = "image_url", nullable = false, length = 2048) // Maps this field to the 'image_url' column. `nullable = false` means it's required.
    private String imageUrl;

    @Column(name = "phash", nullable = false) // Maps this field to the 'phash' column.
    private String pHash;

    @Column(name = "owner_id", nullable = false) // Maps this field to the 'owner_id' column.
    private String ownerId;

	public Image(Long id, String imageUrl, String pHash, String ownerId) {
		super();
		this.id = id;
		this.imageUrl = imageUrl;
		this.pHash = pHash;
		this.ownerId = ownerId;
	}

	public Image() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getpHash() {
		return pHash;
	}

	public void setpHash(String pHash) {
		this.pHash = pHash;
	}

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	@Override
	public String toString() {
		return "Image [id=" + id + ", imageUrl=" + imageUrl + ", pHash=" + pHash + ", ownerId=" + ownerId + "]";
	}
    
    
}