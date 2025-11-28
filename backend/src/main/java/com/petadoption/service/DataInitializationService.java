package com.petadoption.service;

import com.petadoption.entity.Pet;
import com.petadoption.entity.Role;
import com.petadoption.entity.User;
import com.petadoption.repository.PetRepository;
import com.petadoption.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            initializeUsers();
        }

        if (petRepository.count() == 0) {
            initializePets();
        }
    }

    private void initializeUsers() {
        // Admin
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@petadoption.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFirstName("Admin");
        admin.setLastName("User");
        admin.setRole(Role.ADMIN);
        userRepository.save(admin);

        // Owner
        User owner = new User();
        owner.setUsername("owner1");
        owner.setEmail("owner@petadoption.com");
        owner.setPassword(passwordEncoder.encode("owner123"));
        owner.setFirstName("Happy");
        owner.setLastName("Paws");
        owner.setRole(Role.OWNER);
        owner.setPhone("555-0123");
        owner.setAddress("123 Pet Street");
        owner.setCity("New York");
        owner.setState("NY");
        owner.setZipCode("10001");
        userRepository.save(owner);

        // Regular User
        User user = new User();
        user.setUsername("john_doe");
        user.setEmail("john@example.com");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setRole(Role.USER);
        user.setPhone("555-0456");
        user.setAddress("456 Main Street");
        user.setCity("Los Angeles");
        user.setState("CA");
        user.setZipCode("90210");
        userRepository.save(user);
    }

    private void initializePets() {
        User owner = userRepository.findByUsername("owner1").orElse(null);
        if (owner == null) return;

        List<Pet> pets = Arrays.asList(
            createPet("Buddy", "Dog", "Golden Retriever", 3, "Male", "Large",
                "Friendly and energetic dog who loves playing fetch.",
                "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop",
                "New York, NY", owner),

            createPet("Luna", "Cat", "Siamese", 2, "Female", "Medium",
                "Calm and affectionate cat who loves sunbathing.",
                "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop",
                "Los Angeles, CA", owner)
        );

        petRepository.saveAll(pets);
    }

    private Pet createPet(String name, String type, String breed, int age, String gender, String size,
                          String description, String imageUrl, String location, User owner) {
        Pet pet = new Pet();
        pet.setName(name);
        pet.setType(type);
        pet.setBreed(breed);
        pet.setAge(age);
        pet.setGender(gender);
        pet.setSize(size);
        pet.setDescription(description);
        pet.setImageUrl(imageUrl);
        pet.setLocation(location);
        pet.setStatus("AVAILABLE"); // simple String now
        pet.setCreatedAt(LocalDateTime.now());
        pet.setUpdatedAt(LocalDateTime.now());
        pet.setOwner(owner);
        return pet;
    }
}
