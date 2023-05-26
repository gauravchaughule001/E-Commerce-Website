package com.restapi.service;

import java.util.List;

import com.restapi.entity.Category;
import com.restapi.exception.UserException;

public interface CategoryService {

	
	Category addCategory(Category categery) throws UserException;
	
	List<Category> getAllCategories();
}
