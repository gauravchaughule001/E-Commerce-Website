package com.restapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.RersponseHandler.ResponseHandler;
import com.restapi.entity.Category;
import com.restapi.entity.Product;
import com.restapi.service.CategoryService;
import com.restapi.service.ProductService;

@RestController
//@CrossOrigin(originPatterns =  "*")
@RequestMapping("api/v1/home/")
public class PublicController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CategoryService categoryServiceImpl;

	@GetMapping("getAllProductshome")
	public ResponseEntity<Object> getAllProducts()
	{
		List<Product> product = productService.getAllProducts();
		return ResponseHandler.generateResponse("All Products Here..!!", HttpStatus.CREATED, product);
	}
	
	 @GetMapping("allcategories")
	 public ResponseEntity<Object> getAllCategories()
	 {
	    List<Category> category = categoryServiceImpl.getAllCategories();
	    return ResponseHandler.generateResponse("All Categories Here..!!", HttpStatus.CREATED, category);
	 }
	  
	
}
