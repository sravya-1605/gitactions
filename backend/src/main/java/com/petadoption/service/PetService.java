package com.petadoption.service;

import com.petadoption.entity.Pet;
import com.petadoption.entity.User;
import com.petadoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getPetsByOwner(User owner) {
        return petRepository.findByOwner(owner);
    }

    public Optional<Pet> findById(Long id) {
        return petRepository.findById(id);
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
