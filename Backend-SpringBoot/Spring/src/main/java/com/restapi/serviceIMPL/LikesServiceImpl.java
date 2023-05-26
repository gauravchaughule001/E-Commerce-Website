package com.restapi.serviceIMPL;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restapi.entity.Likes;
import com.restapi.exception.UserException;
import com.restapi.repository.LikesRepository;
import com.restapi.service.LikesService;


@Service
public class LikesServiceImpl implements LikesService {
	
	@Autowired
	private LikesRepository likesRepo;

	@Override
	public Likes likeProduct(Likes likes) throws UserException {
		
		Optional<Likes> opt = likesRepo.findByuIdAndproductId(likes.getuId(), likes.getProductId());
		
		if(opt.isPresent())
		{
			throw new UserException("Already Liked..!!"+likes.getuId());
			
		}
		else {
			
			return likesRepo.save(likes);
		}
	}

	@Override
	public int getProductLikes(int productId) {
		
		return likesRepo.getLikes(productId);
	}

	@Override
	public void deleteById(Likes likes) {
		
		int id=likes.getId();
		
		likesRepo.deleteById(id);
		
	}


}
