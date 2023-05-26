package com.restapi.service;

import com.restapi.entity.Likes;
import com.restapi.exception.UserException;

public interface LikesService {
	
	
	Likes likeProduct(Likes likes) throws UserException;
	
	int getProductLikes(int productId);
	
	void deleteById(Likes likes);
	
}
