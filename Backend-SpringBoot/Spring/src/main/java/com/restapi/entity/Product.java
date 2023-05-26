package com.restapi.entity;


import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
	

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int productId;
    
    private int categoryId;
    
    private String productName;
        
    private int productPrice;
    
    private String productDesc;

    private Timestamp updatedDate;
 
    private Timestamp createdDate;

    @Column(columnDefinition = "boolean default true")
    private boolean isActive = true;
    
    @Column(nullable = false)
    private String productPhoto;
    
    private int likes;
    
    
    

    
    
    public int getLikes() {
		return likes;
	}


	public void setLikes(int likes) {
		this.likes = likes;
	}


	public Product() {
		// TODO Auto-generated constructor stub
	}


	public int getProductId() {
		return productId;
	}


	public void setProductId(int productId) {
		this.productId = productId;
	}


	public int getCategoryId() {
		return categoryId;
	}


	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}


	public String getProductName() {
		return productName;
	}


	public void setProductName(String productName) {
		this.productName = productName;
	}


	public int getProductPrice() {
		return productPrice;
	}


	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}


	public String getProductDesc() {
		return productDesc;
	}


	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}


	public Timestamp getUpdatedDate() {
		return updatedDate;
	}


	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
	}


	public Timestamp getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}


	public boolean isActive() {
		return isActive;
	}


	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}


	public String getProductPhoto() {
		return productPhoto;
	}


	public void setProductPhoto(String productPhoto) {
		this.productPhoto = productPhoto;
	}


    
}
