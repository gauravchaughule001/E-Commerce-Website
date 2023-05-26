package com.restapi.service;

import java.util.List;
import com.restapi.entity.Product;

public interface ProductService {
	
	Product addProduct(Product product);

	List<Product> getAllProducts();
	
	void deleteProduct(int productId);
	
    Product updateProduct(Product product);
    
    List<Product> getProductsByCatId(int categoryId);
    
    List<Product> searchProducts(String query);
    
    List<Product> getProductsBycid();
    
    List<Product> sortByRequirement(String query);
    
    List<Product> findByPrice(int min,int max);
    
    Object getProductsByUserAndProdId(int productId);
    
    Object getProductWithPagination(int pageNo, int pageSize);
    
}
