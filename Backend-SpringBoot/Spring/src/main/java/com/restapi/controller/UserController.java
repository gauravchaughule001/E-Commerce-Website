package com.restapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.RersponseHandler.ResponseHandler;
import com.restapi.dto.CartResponse;
import com.restapi.entity.Cart;
import com.restapi.entity.Category;
import com.restapi.entity.Order;
import com.restapi.entity.Product;
import com.restapi.exception.UserException;
import com.restapi.service.CartService;
import com.restapi.service.OrderService;
import com.restapi.serviceIMPL.CategoryServiceImpl;
import com.restapi.serviceIMPL.ProductServiceImple;

@RequestMapping("/api/v1/")
@CrossOrigin(originPatterns = "*")
@RestController
public class UserController {
	
	@Autowired
	private ProductServiceImple productService;
	

	@Autowired
	private CategoryServiceImpl categoryServiceImpl;
	
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private OrderService orderService;
	
	//**********         PRODUCT SERVICES      ********************//
	
	 @GetMapping("products/allproducts")
	    public ResponseEntity<Object> getAllProducts()
	    {
	        List<Product> product = productService.getAllProducts();
	        return ResponseHandler.generateResponse("All Products Here..!!", HttpStatus.CREATED, product);
	    }
	 @GetMapping("products/sortby")
	    public ResponseEntity<Object> sortProductByName(@RequestParam("query") String query)
	    {
	        List<Product> product = productService.sortByRequirement(query); 
	        return ResponseHandler.generateResponse("All Products Sorted By Name Here..!!", HttpStatus.CREATED, product);
	    }
	 
	 @GetMapping("products/findbyprice")
	    public ResponseEntity<Object> sortProductByName(@RequestParam("min") int min,@RequestParam("max") int max)
	    {
	        List<Product> product = productService.findByPrice(min, max);
	        return ResponseHandler.generateResponse("All Products In Entered Price Are..!!", HttpStatus.CREATED, product);
	    }
	 
	 @GetMapping("products/get")
	 public ResponseEntity<Object> getProductByUserAndProductId(@RequestParam("productid") int productId){
		 Object product = productService.getProductsByUserAndProdId(productId);
		 return ResponseHandler.generateResponse("All Products By ID Are Here..!!", HttpStatus.CREATED, product);
	 }
	 
	 
	 @GetMapping("products/getAllProducts")
	 public ResponseEntity<?> getAllProductWithPagination(@RequestParam("pageNo") int pageNo,@RequestParam("pageSize") int pageSize){
		 Object product = productService.getProductWithPagination(pageNo, pageSize);
		 return ResponseEntity.ok(product);
	 }
	 
	 @GetMapping("products/search")
		public ResponseEntity<Object> searchProducts(@RequestParam("query") String query){
		return ResponseEntity.ok(productService.searchProducts(query));
	 }

	 @GetMapping("products/getbycatid/{id}")
	 public ResponseEntity<Object> getProductByCatId(@PathVariable("id") int categoryid)
	 {
		 List<Product> product=productService.getProductsByCatId(categoryid);
		 return ResponseHandler.generateResponse("Products By Cat Id Are :", HttpStatus.OK, product);
	 }
	 
	   @GetMapping("products/allcategories")
	    public ResponseEntity<Object> getAllCategories()
	    {
	        List<Category> category = categoryServiceImpl.getAllCategories();
	        return ResponseHandler.generateResponse("All Categories Here..!!", HttpStatus.CREATED, category);
	    }

	   
	   
	   
	   
	   
	 //**********         CART SERVICES      ********************//
	   
	   @PostMapping("cart/addtocart")
	   public ResponseEntity<Object> addToCart(@RequestBody Cart cart) throws UserException
	   {
		   Cart newCart = cartService.addToCart(cart);        
		   return ResponseHandler.generateResponse("Product Added Into Cart successfully", HttpStatus.CREATED, newCart);
	   } 
	   
	   
	   @GetMapping("cart/getcartitems")
	    public ResponseEntity<Object> getCartItems()
	    {
	        List<Cart> category = cartService.getCartItems();
	        return ResponseHandler.generateResponse("All Categories Here..!!", HttpStatus.CREATED, category);
	    }
	   
	   
		 @DeleteMapping("cart/deletecartitem/{id}")
		    public ResponseEntity<Object> deleteCartItem(@PathVariable("id") int cartId)
		    {
		        cartService.deleteCartItem(cartId);return ResponseHandler.generateResponse("Cart Item Deleted successfully", HttpStatus.ACCEPTED, "DELETE");
		    }
		 
		 
		 @GetMapping("cart/getallcartitems")
			public ResponseEntity<Object> geCartById() {
				List<CartResponse> cartItems = cartService.getAllCartItems();
				return ResponseHandler.generateResponse(" Produtct saved in the Cart Are...", HttpStatus.OK,cartItems);

			}
		 
		 
		 
		//**********         ORDER SERVICES      ********************//
		 
			@PostMapping("order/placeorder")
			public ResponseEntity<Object> placeOrder(@RequestBody Order order) 
			{
				Order savedData = orderService.save(order);
				return ResponseHandler.generateResponse("Order placed successfully", HttpStatus.OK,savedData);
			}
			
			@GetMapping("order/getallorder/")
			public ResponseEntity<Object> getAllOrder() 
			{
				List<Order> orderList = orderService.orderListUser();
				return ResponseHandler.generateResponse("Order fetched successfully", HttpStatus.OK,orderList);

			}
			
}
