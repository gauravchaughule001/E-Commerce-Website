package com.restapi.controller;

import java.io.IOException;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.restapi.RersponseHandler.ResponseHandler;
import com.restapi.entity.Product;
import com.restapi.exception.UserException;
import com.restapi.service.ProductServiceImple;
import com.restapi.utility.FileUpload;

@RestController
@RequestMapping("api/v2")
public class ProductController {

	@Autowired
	private ProductServiceImple productService;
	
	
	@PostMapping("/product/addproduct")
    public ResponseEntity<Object> addProduct(@ModelAttribute Product product , @RequestParam("file") MultipartFile multipartFile) throws UserException, IOException
    {
        	
    	String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
	
        String fileCode = FileUpload.saveFile(fileName, multipartFile);
    	
    	product.setProductPhoto(fileCode);
    	
    	Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
    	
    	product.setActive(true);
    	product.setCreatedDate(timeStamp);
    	product.setUpdatedDate(timeStamp);
    	    	
        Product newProduct = productService.addProduct(product);        
        return ResponseHandler.generateResponse("Product Add successfully", HttpStatus.CREATED, newProduct);
        
    }
	
}
