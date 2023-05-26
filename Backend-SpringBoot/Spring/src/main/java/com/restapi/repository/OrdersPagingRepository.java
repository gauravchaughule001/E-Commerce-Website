package com.restapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.restapi.entity.Order;

public interface OrdersPagingRepository extends PagingAndSortingRepository<Order, Long> {

	
	@Query("SELECT o FROM Order o WHERE o.customerName LIKE CONCAT(:input,'%') OR"
			+ " o.customerEmail LIKE CONCAT(:input,'%') OR"
			+ " o.customerMobile LIKE CONCAT(:input,'%')")
	List<Order> getOrderByCustomerName(String input);

	
	
}
