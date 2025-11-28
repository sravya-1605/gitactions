package com.petadoption.service;

import com.petadoption.entity.Role;
import com.petadoption.entity.User;
import com.petadoption.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor injection ensures these are never null
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        System.out.println("UserService constructor called");
        System.out.println("UserRepository: " + (userRepository != null ? "NOT NULL" : "NULL"));
        System.out.println("PasswordEncoder: " + (passwordEncoder != null ? "NOT NULL" : "NULL"));
        
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        System.out.println("UserService @PostConstruct - UserRepository: " + (userRepository != null ? "NOT NULL" : "NULL"));
        System.out.println("UserService @PostConstruct - PasswordEncoder: " + (passwordEncoder != null ? "NOT NULL" : "NULL"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Login attempt with username: " + username);
        System.out.println("UserRepository in loadUserByUsername: " + (userRepository != null ? "NOT NULL" : "NULL"));
        
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in loadUserByUsername!");
        }
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    System.out.println("User not found: " + username);
                    return new UsernameNotFoundException("User Not Found with username: " + username);
                });
        
        System.out.println("User found in loadUserByUsername: " + user.getUsername());
        System.out.println("User password (encoded): " + user.getPassword());
        System.out.println("User role: " + user.getRole());
        System.out.println("User enabled: " + user.isEnabled());
        
        return user;
    }

    public User createUser(User user) {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in createUser!");
        }
        
        // Ensure password is encoded
        if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        
        // Set timestamps
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        // Set default active status
        user.setIsActive(true);
        
        User savedUser = userRepository.save(user);
        System.out.println("User created successfully: " + savedUser.getUsername());
        return savedUser;
    }

    public Optional<User> findByUsername(String username) {
        System.out.println("findByUsername called for: " + username);
        System.out.println("UserRepository in findByUsername: " + (userRepository != null ? "NOT NULL" : "NULL"));
        
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in findByUsername!");
        }
        
        return userRepository.findByUsername(username);
    }

    public Boolean existsByUsername(String username) {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in existsByUsername!");
        }
        return userRepository.existsByUsername(username);
    }

    public Boolean existsByEmail(String email) {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in existsByEmail!");
        }
        return userRepository.existsByEmail(email);
    }

    public Optional<User> findByEmail(String email) {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in findByEmail!");
        }
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in getAllUsers!");
        }
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in findById!");
        }
        return userRepository.findById(id);
    }

    public User updateUser(User user) {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in updateUser!");
        }
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in deleteUser!");
        }
        userRepository.deleteById(id);
    }

    public List<User> getUsersByRole(String role) {
        if (userRepository == null) {
            throw new RuntimeException("UserRepository is null in getUsersByRole!");
        }
        return userRepository.findByRole(Role.valueOf(role.toUpperCase()));
    }
    
    // Method to verify password manually (useful for debugging)
    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        if (passwordEncoder == null) {
            throw new RuntimeException("PasswordEncoder is null in verifyPassword!");
        }
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}