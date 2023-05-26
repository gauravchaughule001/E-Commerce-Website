package com.restapi.service;
import java.util.List;


import com.restapi.dto.CartResponse;
import com.restapi.entity.Cart;


public interface CartService {

	Cart addToCart(Cart cart);
	
	List<Cart> getCartItems();
	
	List<CartResponse> getAllCartItems();
	
	void deleteCartItem(int cartId);

	
}