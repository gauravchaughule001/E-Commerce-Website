package com.restapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.restapi.entity.User;

//@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmailAndPassword(String email , String password);
	
	Optional<User> findByEmail(String username) throws UsernameNotFoundException;

	
	@Query("SELECT u FROM User u WHERE u.username=:username")
	public List<User> findByUsername(String username);
	
	
}
