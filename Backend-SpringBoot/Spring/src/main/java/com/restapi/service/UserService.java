package com.restapi.service;

import java.util.List;


import com.restapi.entity.User;
import com.restapi.exception.UserException;

public interface UserService {
	
	User signUp(User user) throws UserException;

    User getUserById(Long userId);

    List<User> getAllUsers();

    User updateUser(User user);

    void deleteUser(long userId);

    void deleteAllUser();
       
    User logIn(User login) throws UserException;
    
    User registerUser(User user);

	String checkUsernameAvailability(String username);
	
	User registerUserCustomRole(User user);
    
}
