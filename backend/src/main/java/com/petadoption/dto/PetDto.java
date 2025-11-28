package com.petadoption.dto;

import com.petadoption.entity.PetStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public class PetDto {
    
    private Long id;

    @NotBlank(message = "Pet name is required")
    @Size(max = 100, message = "Pet name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Pet type is required")
    @Size(max = 50, message = "Pet type must not exceed 50 characters")
    private String type;

    @Size(max = 100, message = "Breed must not exceed 100 characters")
    private String breed;

    @NotNull(message = "Pet age is required")
    @Positive(message = "Pet age must be positive")
    private Integer age;

    @Size(max = 20, message = "Gender must not exceed 20 characters")
    private String gender;

    @Size(max = 20, message = "Size must not exceed 20 characters")
    private String size;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    private Boolean vaccinated = false;
    private Boolean trained = false;
    private Boolean spayedNeutered = false;
    private Boolean microchipped = false;

    private PetStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Long shelterId;
    private String shelterName;

    // Constructors
    public PetDto() {}

    public PetDto(String name, String type, String breed, Integer age, String gender,
                  String size, String description) {
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.size = size;
        this.description = description;
    }

    // Getters and Setters for all fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Boolean getVaccinated() { return vaccinated; }
    public void setVaccinated(Boolean vaccinated) { this.vaccinated = vaccinated; }

    public Boolean getTrained() { return trained; }
    public void setTrained(Boolean trained) { this.trained = trained; }

    public Boolean getSpayedNeutered() { return spayedNeutered; }
    public void setSpayedNeutered(Boolean spayedNeutered) { this.spayedNeutered = spayedNeutered; }

    public Boolean getMicrochipped() { return microchipped; }
    public void setMicrochipped(Boolean microchipped) { this.microchipped = microchipped; }

    public PetStatus getStatus() { return status; }
    public void setStatus(PetStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Long getShelterId() { return shelterId; }
    public void setShelterId(Long shelterId) { this.shelterId = shelterId; }

    public String getShelterName() { return shelterName; }
    public void setShelterName(String shelterName) { this.shelterName = shelterName; }
}
