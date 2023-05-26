package com.restapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.restapi.entity.Likes;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Integer> {
	
	
	@Query("SELECT l FROM Likes l WHERE l.uId=:uId AND l.productId=:productId")
	Optional<Likes> findByuIdAndproductId(int uId, int productId);
	
	
	@Query("SELECT COUNT(l) FROM Likes l WHERE l.productId=:productId")
	int getLikes(int productId);
	
	
	
}
