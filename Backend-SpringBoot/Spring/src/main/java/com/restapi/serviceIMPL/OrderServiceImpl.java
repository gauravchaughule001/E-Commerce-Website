package com.restapi.serviceIMPL;



import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import com.restapi.dto.EmailDetails;
import com.restapi.dto.OrderOperations;
import com.restapi.entity.Order;
import com.restapi.entity.OrderItem;
import com.restapi.entity.User;
import com.restapi.repository.CartRepository;
import com.restapi.repository.OrderRepository;
import com.restapi.repository.OrdersPagingRepository;
import com.restapi.service.EmailService;
import com.restapi.service.IAuthenticationFacade;
import com.restapi.service.OrderService;
import com.restapi.exception.RecordNotFoundException;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	private OrdersPagingRepository pagination;
	
	@Autowired
	private IAuthenticationFacade authenticationFacade;
	
	@Override
	public Order save(Order order) {

		Authentication authentication = authenticationFacade.getAuthentication();
		User dbUser = (User) authentication.getPrincipal();
		
		long id=dbUser.getId();
		
		int userId=(int)id;
		
		order.setUserId(userId);
		
		Order o= orderRepository.save(order);
		Set<OrderItem> orderItems=order.getOrderItems();
		List<Order> orderList=new ArrayList<>();
		orderList.add(o);
		
		
		EmailDetails emaildetails=new EmailDetails(order.getCustomerEmail(),"","success",null,orderItems,orderList);
		emailService.sendSimpleMail(emaildetails);
		
		
//		int userId=order.getUserId();
		int count=	cartRepository.deleteByUserId(userId);
		System.out.println(count);
		return o;
	}

	
	
	@Override
	public List<Order> orderListUser() {
		
		Authentication authentication = authenticationFacade.getAuthentication();
		User dbUser = (User) authentication.getPrincipal();
		
		long userId=dbUser.getId();
		
		return orderRepository.findByUserId(userId);
	}



	@Override
	public List<Order> ordersList() throws RecordNotFoundException {
		return orderRepository.getAllOrdersByDesc();
	}



	@Override
	public long changeOrderStatus(long id, int a) {
		if(a==1) {orderRepository.changeStatus(id, "Processing");
			return 1;}
		else if(a==2) {orderRepository.changeStatus(id, "Delivered");
			return 1;}
		else if(a==3){orderRepository.changeStatus(id, "Cancelled");
			return 1;}
		else {return 0;}
	}



	@Override
	public List<Order> searchByDate(Date from, Date to) throws Exception {

		System.out.println(from);
		
		List<Order> a=orderRepository.SearchOrderByDate(from, to);
		return a;
	}
	
	@Override
	public List<Order> getOrderByNames(String key) {

		System.out.println(key);
		
		List<Order> a=orderRepository.getOrderByCustomerName(key);
		
//		List<Order> a=pagination.getOrderByCustomerName(key);
		return a;
	}



	@Override
	public Object getOrdersWithPagination(int pageNo, int pageSize) {

		Pageable pageble = PageRequest.of(pageNo, pageSize);
		
		Page<Order> allProduct= pagination.findAll(pageble);
		
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("message", "Data fetch Successfully");
		map.put("status", 200);
		map.put("data", allProduct.getContent());
		map.put("currentPage", allProduct.getNumber());
		map.put("totalPages", allProduct.getTotalPages());
		
		
		return map;
	}



	@Override
	public List<Order> getOrdersByStatus(String status) {
		
		
		return orderRepository.getOrderByStatus(status);
	}



	@Override
	public List<Order> getOrdersByFilter(int key, OrderOperations orderOp) {
		switch (key) {
		  case 1:
			  return orderRepository.getOrderByCustomerName(orderOp.getSearch());
		  case 2:
			  return orderRepository.SearchOrderByDate(orderOp.getFrom(), orderOp.getTo());
		  case 3:
			  return orderRepository.getOrderByStatus(orderOp.getStatus());
		  default:
			  return null;
		}
	}
}
