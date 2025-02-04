package com.examly.springapp.service;

import com.examly.springapp.exception.CakeException;
import com.examly.springapp.model.Cake;
import com.examly.springapp.repository.CakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CakeService {

    @Autowired
    private CakeRepository cakeRepository;

    // Get all cakes
    public List<Cake> getAllCakes() {
        return cakeRepository.findAll();
    }

    // Get a cake by its ID
    public Cake getCakeById(int cakeId) throws CakeException {
        return cakeRepository.findById(cakeId)
                .orElseThrow(() -> new CakeException("Cake not found with ID: " + cakeId));
    }

   // Add a new cake
   public Cake addCake(Cake cake) throws CakeException {
    // Check if a cake with the same name exists
    if (cakeRepository.existsByName(cake.getName())) {
        throw new CakeException("Cake with name '" + cake.getName() + "' already exists");
    }
    return cakeRepository.save(cake);
}

    public Cake updateCake(int cakeId, Cake updatedCake) throws CakeException {
        Optional<Cake> existingCake = cakeRepository.findById(cakeId);
        if (existingCake.isPresent()) {
            Cake cake = existingCake.get();
            
            // Update all fields
            cake.setName(updatedCake.getName());
            cake.setCategory(updatedCake.getCategory());
            cake.setPrice(updatedCake.getPrice());
            cake.setQuantity(updatedCake.getQuantity());
            cake.setCakeImage(updatedCake.getCakeImage());
            
            return cakeRepository.save(cake);
        } else {
            throw new CakeException("Cannot update. Cake not found with ID: " + cakeId);
        }
    }
    // Delete a cake by its ID
    public void deleteCake(int cakeId) throws CakeException {
        if (cakeRepository.existsById(cakeId)) {
            cakeRepository.deleteById(cakeId);
        } else {
            throw new CakeException("Cannot delete. Cake not found with ID: " + cakeId);
        }
    }
}