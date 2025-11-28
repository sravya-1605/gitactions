package com.petadoption.controller;

import com.petadoption.entity.Pet;
import com.petadoption.entity.User;
import com.petadoption.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petService;

    // ✅ Owner can add a new pet
    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Pet> addPet(@RequestBody Pet pet, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        pet.setOwner(currentUser); // assign owner
        Pet savedPet = petService.savePet(pet);
        return ResponseEntity.ok(savedPet);
    }

    // ✅ Owner can update pet
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> updatePet(@PathVariable Long id, @RequestBody Pet updatedPet, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        Optional<Pet> existing = petService.findById(id);

        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        if (!existing.get().getOwner().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).body("You can only update your own pets");
        }

        updatedPet.setId(id);
        updatedPet.setOwner(currentUser);
        Pet saved = petService.savePet(updatedPet);
        return ResponseEntity.ok(saved);
    }

    // ✅ Owner can delete pet
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> deletePet(@PathVariable Long id, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        Optional<Pet> existing = petService.findById(id);

        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        if (!existing.get().getOwner().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).body("You can only delete your own pets");
        }

        petService.deletePet(id);
        return ResponseEntity.ok("Pet deleted successfully");
    }

    // ✅ Anyone (user/owner/admin) can view all pets
    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    // ✅ Owner can view only their pets
    @GetMapping("/my-pets")
    @PreAuthorize("hasRole('OWNER')")
    public List<Pet> getMyPets(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return petService.getPetsByOwner(currentUser);
    }
}
