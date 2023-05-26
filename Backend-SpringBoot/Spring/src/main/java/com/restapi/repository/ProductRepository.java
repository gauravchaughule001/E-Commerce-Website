package com.restapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.restapi.dto.ProductResponse;
import com.restapi.entity.Product;

//@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>
{
	@Query("SELECT p FROM Product p WHERE "+
			"p.productName LIKE CONCAT('%', :query, '%')"+
			"Or p.productDesc LIKE CONCAT('%',:query,'%')")
			List<Product> searchProducts(String query);
	
	List<Product> findBycategoryId(int categoryId);
	
	
	
	@Query("SELECT p FROM Product p INNER JOIN Cart c ON "+
			"p.productId = c.productId")
			List<Product> getProductsBycid();
	
	List<Product> findProductBycategoryId(int categoryId);
	
	
	@Query("SELECT p FROM Product p ORDER BY p.productPrice ASC")
	List<Product> sortByPriceAsc();
	
	@Query("SELECT p FROM Product p ORDER BY p.productPrice DESC")
	List<Product> sortByPriceDesc();
	
	@Query("SELECT p FROM Product p ORDER BY p.productName ASC")
	List<Product> sortByNameAsc();
	
	@Query("SELECT p FROM Product p ORDER BY p.productName Desc")
	List<Product> sortByNameDesc();
	
	@Query("select p FROM Product p WHERE productPrice BETWEEN :min AND :max")
	List<Product> findByPrice(int min,int max);
	
	@Query("SELECT new com.restapi.dto.ProductResponse(p.productId, p.productName, p.productPrice, p.productDesc, p.categoryId,p.productPhoto, c.quantity, c.cartId)"
			+ "FROM Cart as c INNER JOIN Product p ON c.productId=p.productId INNER JOIN User as u ON c.userId=u.id WHERE p.productId=:productId AND u.id=:userId")
	ProductResponse findProductWithCart(long userId, int productId);


}
