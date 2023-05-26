package com.restapi.backup.controller.backup;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.restapi.RersponseHandler.ResponseHandler;
import com.restapi.dto.CartResponse;
import com.restapi.entity.Cart;
import com.restapi.entity.Category;
import com.restapi.entity.Product;
import com.restapi.exception.UserException;
import com.restapi.serviceIMPL.CartServiceImpl;
import com.restapi.serviceIMPL.CategoryServiceImpl;
import com.restapi.serviceIMPL.ProductServiceImple;
import com.restapi.utility.FileUpload;



@RestController
@RequestMapping("api/v1/kjkjkj")
@CrossOrigin(originPatterns = "*")
public class ProductController {

	@Autowired
	private ProductServiceImple productService;
	

	@Autowired
	private CategoryServiceImpl categoryServiceImpl;
	
	
	@Autowired
	private CartServiceImpl cartServiceImpl;
	
	
	@PostMapping("/product/addproduct")
    public ResponseEntity<Object> addProduct(@ModelAttribute Product product ,@RequestParam("file") MultipartFile multipartFile) throws UserException, IOException
    {
        	
    	String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
	
        String fileCode = FileUpload.saveFile(fileName, multipartFile);
    	
    	product.setProductPhoto(fileCode);
    	
    	product.setLikes(1);
    	
    	Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
    	
    	product.setActive(true);
    	product.setCreatedDate(timeStamp);
    	product.setUpdatedDate(timeStamp);
    	    	
        Product newProduct = productService.addProduct(product);        
        return ResponseHandler.generateResponse("Product Add successfully", HttpStatus.CREATED, newProduct);
        
    }
	
	
	
	
	
	
	 @GetMapping("/product/allproducts")
	    public ResponseEntity<Object> getAllProducts()
	    {
	        List<Product> product = productService.getAllProducts();
	        
//	        return new ResponseEntity<>(users, HttpStatus.OK);
	        
	        return ResponseHandler.generateResponse("All Products Here..!!", HttpStatus.CREATED, product);
	    }
	 
	 @GetMapping("/product/sortby")
	    public ResponseEntity<Object> sortProductByName(@RequestParam("query") String query)
	    {
	        List<Product> product = productService.sortByRequirement(query);
	        
//	        return new ResponseEntity<>(users, HttpStatus.OK);
	        
	        return ResponseHandler.generateResponse("All Products Sorted By Name Here..!!", HttpStatus.CREATED, product);
	    }
	 
	 @GetMapping("/product/findbyprice")
	    public ResponseEntity<Object> sortProductByName(@RequestParam("min") int min,@RequestParam("max") int max)
	    {
	        List<Product> product = productService.findByPrice(min, max);
	        
	        return ResponseHandler.generateResponse("All Products In Entered Price Are..!!", HttpStatus.CREATED, product);
	    }
	 
	 @GetMapping("product/get")
	 public ResponseEntity<Object> getProductByUserAndProductId(@RequestParam("productid") int productId){
		 Object product = productService.getProductsByUserAndProdId(productId);
		 return ResponseHandler.generateResponse("All Products By ID Are Here..!!", HttpStatus.CREATED, product);
	 }
	 
	 
	 @GetMapping("product/getAllProducts")
	 public ResponseEntity<?> getAllProductWithPagination(@RequestParam("pageNo") int pageNo,@RequestParam("pageSize") int pageSize){
		 Object product = productService.getProductWithPagination(pageNo, pageSize);
		 
		 System.out.println(product);
		 return ResponseEntity.ok(product);
	 }
	 
	 
//	 ########################       SEARCH PRODUCTS      #####################
	 
	 @GetMapping("/product/search")
	 		public ResponseEntity<Object> searchProducts(@RequestParam("query") String query){
		 return ResponseEntity.ok(productService.searchProducts(query));
	 }
	 
	 @GetMapping("product/getbycatid/{id}")
	 public ResponseEntity<Object> getProductByCatId(@PathVariable("id") int categoryid)
	 {
		 List<Product> product=productService.getProductsByCatId(categoryid);
		 
		 return ResponseHandler.generateResponse("Products By Cat Id Are :", HttpStatus.OK, product);
	 }
	 
	 
	 @DeleteMapping("/product/deleteproduct/{id}")
	    public ResponseEntity<Object> deleteUser(@PathVariable("id") int productId)
	    {
	        productService.deleteProduct(productId);
	        
	      //  return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
	        
	        //with response handler..
	        return ResponseHandler.generateResponse("product Deleted successfully", HttpStatus.ACCEPTED, "DELETE");
	    }
	 
	 
	 
	 
	   @PutMapping("/product/updateproduct/{id}")
	    public ResponseEntity<Object> updateProduct(@PathVariable("id") int productId,@ModelAttribute Product product,@RequestParam(value="file",required=false) MultipartFile multipartFile) throws UserException, IOException
	    {
	        product.setProductId(productId);
	       
	        if(multipartFile!=null) {
	        	
	        	String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
	        	
	        	String filecode = FileUpload.saveFile(filename, multipartFile);
	        	
	        	product.setProductPhoto(filecode);
	        	
	        }
	        
	        Product updatedProduct = productService.updateProduct(product);
	        
	        return ResponseHandler.generateResponse("Product Updated successfully", HttpStatus.CREATED, updatedProduct);
	        
	    }
	   
		
	   
	   
	   
	   
	   
	   
	   
//	   #############################          CATEGORY      ######################################
	   
	   
	   
	   @PostMapping("/product/addcategory")
	   public ResponseEntity<Object> addCategory(@ModelAttribute Category category,@RequestParam("file") MultipartFile multipartFile) throws UserException, IOException
	   {
		   
		   String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
			
	        String fileCode = FileUpload.saveFile(fileName, multipartFile);
	    	
	    	category.setPhoto(fileCode);
		   
		   
		   Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		   
		   category.setStatus(true);
		   category.setCreatedDate(timeStamp);
		   category.setUpdateDate(timeStamp);
		   
		   Category newCategory = categoryServiceImpl.addCategory(category);        
		   return ResponseHandler.generateResponse("Product Add successfully", HttpStatus.CREATED, newCategory);
		   
	   } 
	   
	   @GetMapping("/product/allcategories")
	    public ResponseEntity<Object> getAllCategories()
	    {
	        List<Category> category = categoryServiceImpl.getAllCategories();
	        
//	        return new ResponseEntity<>(users, HttpStatus.OK);
	        return ResponseHandler.generateResponse("All Categories Here..!!", HttpStatus.CREATED, category);
	    }
	   
	   
	   
	   
	   
//	   ##################################      CART      ###########################################
	   
	   
	   @PostMapping("/cart/addtocart")
	   public ResponseEntity<Object> addToCart(@RequestBody Cart cart) throws UserException
	   {
		   
		   Cart newCart = cartServiceImpl.addToCart(cart);        
		   return ResponseHandler.generateResponse("Product Added Into Cart successfully", HttpStatus.CREATED, newCart);
		   
	   } 
	   
	   
	   @GetMapping("/cart/getcartitems")
	    public ResponseEntity<Object> getCartItems()
	    {
	        List<Cart> category = cartServiceImpl.getCartItems();
	        
//	        return new ResponseEntity<>(users, HttpStatus.OK);
	        return ResponseHandler.generateResponse("All Categories Here..!!", HttpStatus.CREATED, category);
	    }
	   
	   
		 @DeleteMapping("/cart/deletecartitem/{id}")
		    public ResponseEntity<Object> deleteCartItem(@PathVariable("id") int cartId)
		    {
		        cartServiceImpl.deleteCartItem(cartId);
		        
		      //  return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
		        
		        //with response handler..
		        return ResponseHandler.generateResponse("Cart Item Deleted successfully", HttpStatus.ACCEPTED, "DELETE");
		    }
		 
		 
		 @GetMapping("/cart/getallcartitems/")
			public ResponseEntity<Object> geCartById() {
				List<CartResponse> cartItems = cartServiceImpl.getAllCartItems();
				return ResponseHandler.generateResponse(" Produtct saved in the Cart Are...", HttpStatus.OK,cartItems);

			}
		 
		 
}
