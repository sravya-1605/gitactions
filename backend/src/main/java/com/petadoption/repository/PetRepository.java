package com.petadoption.repository;

import com.petadoption.entity.Pet;
import com.petadoption.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByType(String type);
    List<Pet> findByOwner(User owner);
}
