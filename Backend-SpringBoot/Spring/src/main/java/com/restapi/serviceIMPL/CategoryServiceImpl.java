package com.restapi.serviceIMPL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restapi.entity.Category;
import com.restapi.exception.UserException;
import com.restapi.repository.CategoryRepository;
import com.restapi.service.CategoryService;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public Category addCategory(Category category) throws UserException {
		
		List<Category> a=categoryRepository.findByName(category.getName());
		if(a.isEmpty()) {
			return categoryRepository.save(category);			
		}
		else {
			throw new UserException("Category already Exists..! "+category.getName());
		}
		
	}

	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		return categoryRepository.findAll();
	}

}
