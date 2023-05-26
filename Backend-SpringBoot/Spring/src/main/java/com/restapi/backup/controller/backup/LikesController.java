package com.restapi.backup.controller.backup;

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
import org.springframework.web.bind.annotation.RestController;

import com.restapi.RersponseHandler.ResponseHandler;
import com.restapi.entity.Likes;
import com.restapi.exception.UserException;
import com.restapi.service.LikesService;

@RestController
//@RequestMapping("api/v1")
@RequestMapping("api/v1/kugnkuktjhttukhyjtg")
@CrossOrigin(originPatterns = "*")
public class LikesController {
	
	@Autowired
	private LikesService likesService;
	
	@PostMapping("/product/likeproduct")
	public ResponseEntity<Object> likeProduct(@RequestBody Likes likes) throws UserException {

//		OrderItem oitem=order.getOrderItems();
//		oitem.setOrderItem(order);	
		
		Likes savedData = likesService.likeProduct(likes);
		return ResponseHandler.generateResponse("Product Liked successfully", HttpStatus.OK,savedData);

	}
	
	@GetMapping("/product/getlikes/{id}")
	public ResponseEntity<Object> getProdLikes(@PathVariable("id") int productId){
		int likes = likesService.getProductLikes(productId);
		return ResponseHandler.generateResponse("Product Likes Here", HttpStatus.OK,likes);
	}
	
	@DeleteMapping("/product/removelike")
	public ResponseEntity<Object> DeleteLike(@RequestBody Likes likes){
		
		likesService.deleteById(likes);
		return ResponseHandler.generateResponse("Like Deleted successfully", HttpStatus.ACCEPTED, "DELETE");
	}
}
