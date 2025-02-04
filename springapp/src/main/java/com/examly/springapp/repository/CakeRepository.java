package com.examly.springapp.repository;

import com.examly.springapp.model.Cake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CakeRepository extends JpaRepository<Cake, Integer> {

    // Method to check if a book with the same name already exists
    boolean existsByName(String name);
}
