package com.restapi.serviceIMPL;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import com.restapi.dto.CartResponse;
import com.restapi.entity.Cart;
import com.restapi.entity.User;
import com.restapi.repository.CartRepository;
import com.restapi.service.CartService;
import com.restapi.service.IAuthenticationFacade;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
	
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private IAuthenticationFacade authenticationFacade;

	@Override
	public Cart addToCart(Cart cart) {
		
		return cartRepository.save(cart);
	}

	@Override
	public List<Cart> getCartItems() {
		// TODO Auto-generated method stub
		return cartRepository.findAll();
	}
	
	

	@Override
	public void deleteCartItem(int cartId) {
		
		cartRepository.deleteById(cartId);
		
	}

	@Override
	public List<CartResponse> getAllCartItems() {
		
		Authentication authentication = authenticationFacade.getAuthentication();
		User dbUser = (User) authentication.getPrincipal();
		
		long userId=dbUser.getId();
		
		List<CartResponse> cartList = cartRepository.getAllCartItems(userId);
		return cartList;
	}


	
}
