package com.restapi.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.restapi.entity.Order;

import jakarta.transaction.Transactional;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	
	List<Order> findByUserId(Long userId);
	
	
	@Modifying
	@Transactional
	@Query("UPDATE Order o SET o.status=:s WHERE o.id=:id")
	int changeStatus(long id, String s);
	
	@Query("SELECT o FROM Order o ORDER BY o.id DESC")
	List<Order> getAllOrdersByDesc();
	
	
	@Query("SELECT o FROM Order o WHERE o.dateCreated BETWEEN :from AND :to")
	List<Order> SearchOrderByDate(Date from, Date to);
	
	@Query("SELECT o FROM Order o WHERE o.customerName LIKE CONCAT(:input,'%') OR"
			+ " o.customerEmail LIKE CONCAT(:input,'%') OR"
			+ " o.customerMobile LIKE CONCAT(:input,'%')")
	List<Order> getOrderByCustomerName(String input);

	@Query("SELECT o FROM Order o WHERE o.status=:status")
	List<Order> getOrderByStatus(String status);
}
