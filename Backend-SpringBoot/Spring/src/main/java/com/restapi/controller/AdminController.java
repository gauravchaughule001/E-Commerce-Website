package com.restapi.controller;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
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
import com.restapi.dto.EmailDetails;
import com.restapi.dto.OrderOperations;
import com.restapi.entity.Category;
import com.restapi.entity.Order;
import com.restapi.entity.Product;
import com.restapi.entity.User;
import com.restapi.exception.UserException;
import com.restapi.service.EmailService;
import com.restapi.service.OrderService;
import com.restapi.service.UserService;
import com.restapi.serviceIMPL.CategoryServiceImpl;
import com.restapi.serviceIMPL.ProductServiceImple;
import com.restapi.utility.FileUpload;

@RequestMapping("/api/v1/admin/")
@RestController
@CrossOrigin(originPatterns = "*")
public class AdminController {
	@Autowired
	private ProductServiceImple productService;
	

	@Autowired
	private CategoryServiceImpl categoryServiceImpl;
	
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private UserService userService;
	
	
	
	
	
	//**********         PRODUCT SERVICES      ********************//
	
	@PostMapping("addproduct")
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
	
	@PutMapping("updateproduct/{id}")
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
	
	 
	 @DeleteMapping("deleteproduct/{id}")
	    public ResponseEntity<Object> deleteUser(@PathVariable("id") int productId)
	    {
	        productService.deleteProduct(productId);
	        return ResponseHandler.generateResponse("product Deleted successfully", HttpStatus.ACCEPTED, "DELETE");
	    }
	
	 
	 
	//**********         CATEGORY SERVICES      ********************//
	 
	 @PostMapping("addcategory")
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
	 
	   @GetMapping("allcategories")
	    public ResponseEntity<Object> getAllCategories()
	    {
	        List<Category> category = categoryServiceImpl.getAllCategories();
	        
//	        return new ResponseEntity<>(users, HttpStatus.OK);
	        return ResponseHandler.generateResponse("All Categories Here..!!", HttpStatus.CREATED, category);
	    }
	 
		
	   
	   
	   
	 //**********         ORDER SERVICES      ********************//
	   
		@GetMapping("getorderbydate")
		public ResponseEntity<Object> getOrdersByDate(@RequestParam("from") Date from, @RequestParam("to") Date to) throws Exception {
			List<Order> orderList = orderService.searchByDate(from, to);
			if(orderList.size()>0) {
				return ResponseHandler.generateResponse("Order fetched successfully from "+from+" To "+to, HttpStatus.OK,orderList);				
			}
			else {
				return ResponseHandler.generateResponse("No Orders Found From "+from+" To "+to, HttpStatus.OK,orderList);
			}
		}
		
		@GetMapping("getorderbycustomername")
		public ResponseEntity<Object> getOrdersByCName(@RequestParam("key") String key) throws Exception {
			List<Order> orderList = orderService.getOrderByNames(key);
			
			if(orderList.size()!=0) {
				return ResponseHandler.generateResponse("Order fetched successfully", HttpStatus.OK,orderList);				
			}
			else {
				return ResponseHandler.generateResponse("No Orders Found For "+key, HttpStatus.NOT_FOUND,orderList);
			}
		}
		
		@GetMapping("getallorder")
		public ResponseEntity<Object> getAllOrder() 
		{
			List<Order> orderList = orderService.ordersList();
			return ResponseHandler.generateResponse("All Order fetched successfully", HttpStatus.OK,orderList);
		}
		
		
		@PutMapping("changeorderstatus")
		public ResponseEntity<Object> changeStatus(@RequestBody Order order){
			
			long id=order.getId();
			int status=order.getChangeStatus();
			
			long a= orderService.changeOrderStatus(id, status);
			
			if(a==1) {
				return ResponseHandler.generateResponse("Order Status Changed successfully", HttpStatus.OK,a);
				
			}
			else {
				return ResponseHandler.generateResponse("Problem In Changinf Status", HttpStatus.OK,a);

			}
			
		}
		
		
		
		@GetMapping("getordersbystatus")
		public ResponseEntity<Object> getOrdersByStatus(@RequestParam("status") String status){
			List<Order> orderList = orderService.getOrdersByStatus(status);
			if(orderList.size()>0) {
				return ResponseHandler.generateResponse("All Orders By Status Fetched Successfully", HttpStatus.OK,orderList);				
			}
			else {
				return ResponseHandler.generateResponse("No Products Found for "+status, HttpStatus.OK,orderList);
			}
		}
		
		@PostMapping("getordersbyfilter")
		public ResponseEntity<Object> getOrdersByFilter(@RequestParam("key") int key, @RequestBody OrderOperations orderOperations){
			System.out.println(orderOperations);
			List<Order> orderList = orderService.getOrdersByFilter(key, orderOperations);
			return ResponseHandler.generateResponse("All Orders By Status Fetched Successfully", HttpStatus.OK,orderList);
		}
		
		
		
		
		
		//**********         EMAIL SERVICES      ********************//
		
		@PostMapping("sendMail")
		public Object
		sendMail(@RequestBody EmailDetails details)
		{
			String status = emailService.sendSimpleMail(details);
			 return ResponseHandler.generateResponse("Mail Sent successfully", HttpStatus.CREATED, status);
		}

		// Sending email with attachment
		@PostMapping("sendMailWithAttachment")
		public String sendMailWithAttachment(
			@RequestBody EmailDetails details)
		{
			String status = emailService.sendMailWithAttachment(details);

			return status;
		}
		
		
		
		//**********         USER SERVICES      ********************//
		
	    @GetMapping("getuserbyid/{id}")
	    public ResponseEntity<Object> getUserById(@PathVariable("id") Long userId)
	    {
	        User user = userService.getUserById(userId);
	        
//	        return new ResponseEntity<>(user, HttpStatus.OK);
	        return ResponseHandler.generateResponse("User By Id", HttpStatus.OK, user);
	    }
	    

	    @DeleteMapping("deleteuser/{id}")
	    public ResponseEntity<Object> deleteUser(@PathVariable("id") long userId)
	    {
	    	
	        userService.deleteUser(userId);
	        
	      //  return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
	        
	        //with response handler..
	        return ResponseHandler.generateResponse("User Deleted successfully", HttpStatus.ACCEPTED, "DELETE");
	    }
	    
	    
		@PostMapping("/register")
		public ResponseEntity<User> registerUser(@ModelAttribute User user , @RequestParam("file") MultipartFile multipartFile) throws UserException, IOException {
			
			user.setUsername(user.getEmail());
			
			String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
			
	        String fileCode = FileUpload.saveFile(fileName, multipartFile);
	    	
	    	user.setPhoto(fileCode);
			
			
			User registeredUser = userService.registerUserCustomRole(user);
			return new ResponseEntity<User>(registeredUser, HttpStatus.CREATED);
		}
	    
		
		
}
