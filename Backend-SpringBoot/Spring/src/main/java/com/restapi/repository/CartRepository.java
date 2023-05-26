package com.restapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.restapi.dto.CartResponse;
import com.restapi.entity.Cart;

import jakarta.transaction.Transactional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
	
	 @Query("SELECT new com.restapi.dto.CartResponse(p.productId, p.productName, c.userId, p.productPrice, c.quantity, p.productPhoto, cat.name, c.cartId) FROM Cart c  JOIN Product p ON c.productId = p.productId AND c.userId= :userId JOIN Category cat on cat.CatId=p.categoryId")
	 public List<CartResponse> getAllCartItems(long userId);
	 
	 @Modifying
	 @Transactional
	  @Query(value="DELETE FROM Cart c WHERE c.userId = :userId")
	 int deleteByUserId(int userId);
	 
}
