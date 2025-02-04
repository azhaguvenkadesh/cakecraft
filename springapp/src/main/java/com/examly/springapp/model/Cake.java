package com.examly.springapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Cake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cakeId;

    private String name;
    private String category;
    private double price;
    private double quantity;
    @Lob
    @Column(name = "image", nullable = false , columnDefinition = "LONGBLOB")
    private String cakeImage;


    // Getters and Setters
    public int getCakeId() {
        return cakeId;
    }

    public void setCakeId(int cakeId) {
        this.cakeId = cakeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public String getCakeImage() { // Getter should return byte[]
        return cakeImage;
    }

    public void setCakeImage(String cakeImage) { // Setter should accept byte[]
        this.cakeImage = cakeImage;
    }

}