package com.examly.springapp.controller;

import com.examly.springapp.exception.CakeException;
import com.examly.springapp.model.Cake;
import com.examly.springapp.service.CakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cakes")
public class CakeController {

    @Autowired
    private CakeService cakeService;

    // Get all cakes
    @GetMapping
    public ResponseEntity<List<Cake>> getAllCakes() {
        List<Cake> cakes = cakeService.getAllCakes();
        return ResponseEntity.ok(cakes);
    }

    // Get cake by ID
    @GetMapping("/{cakeId}")
    public ResponseEntity<Object> getCakeById(@PathVariable int cakeId) {
        try {
            Cake cake = cakeService.getCakeById(cakeId);
            return ResponseEntity.ok(cake);
        } catch (CakeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Cake not found");
        }
    }

    // Add a new cake
    @PostMapping
    public ResponseEntity<Object> addCake(@RequestBody Cake cake) {
        try {
            Cake savedCake = cakeService.addCake(cake);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCake);
        } catch (CakeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to add cake");
        }
    }

    // Update cake by ID
    @PutMapping("/{cakeId}")
    public ResponseEntity<Object> updateCake(@PathVariable int cakeId, @RequestBody Cake cake) {
        try {
            Cake updatedCake = cakeService.updateCake(cakeId, cake);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedCake);
        } catch (CakeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to update cake");
        }
    }

    // Delete cake by ID
    @DeleteMapping("/{cakeId}")
    public ResponseEntity<Object> deleteCake(@PathVariable int cakeId) {
        try {
            cakeService.deleteCake(cakeId);
            return ResponseEntity.ok("Cake deleted successfully");
        } catch (CakeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to delete cake");
        }
    }
}