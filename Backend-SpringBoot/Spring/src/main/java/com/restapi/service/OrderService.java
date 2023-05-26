package com.restapi.service;

import java.util.Date;
import java.util.List;

import com.restapi.dto.OrderOperations;
import com.restapi.entity.Order;
import com.restapi.exception.RecordNotFoundException;

public interface OrderService {
	
	Order save(Order save);
	
	List<Order> orderListUser () throws RecordNotFoundException;
	
	List<Order> ordersList() throws RecordNotFoundException;
	
	long changeOrderStatus(long id,int a);
	
	List<Order> searchByDate(Date from, Date to) throws Exception;
	
	List<Order> getOrderByNames(String key);
	
    Object getOrdersWithPagination(int pageNo, int pageSize);
    
    List<Order> getOrdersByStatus(String status);
    
    List<Order> getOrdersByFilter(int key, OrderOperations orderOperations);
}
