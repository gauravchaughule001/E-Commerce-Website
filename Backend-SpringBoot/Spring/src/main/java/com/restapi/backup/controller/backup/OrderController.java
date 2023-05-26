
package com.restapi.backup.controller.backup;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.RersponseHandler.ResponseHandler;
import com.restapi.dto.OrderOperations;
import com.restapi.entity.Order;
import com.restapi.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/lkjhgfdsadegybmj")
public class OrderController {

		@Autowired
		private OrderService orderService;
		
		
		
		@PostMapping("/placeorder")
		public ResponseEntity<Object> placeOrder(@RequestBody Order order) {
	
//			OrderItem oitem=order.getOrderItems();
//			oitem.setOrderItem(order);	
			
			Order savedData = orderService.save(order);
			
			return ResponseHandler.generateResponse("Order placed successfully", HttpStatus.OK,savedData);

		}
		
		
		@GetMapping("/admin/getorderbydate")
		public ResponseEntity<Object> getOrdersByDate(@RequestParam("from") Date from, @RequestParam("to") Date to) throws Exception {
			List<Order> orderList = orderService.searchByDate(from, to);
			return ResponseHandler.generateResponse("Order fetched successfully", HttpStatus.OK,orderList);
		}
		
		@GetMapping("/admin/getorderbycustomername")
		public ResponseEntity<Object> getOrdersByCName(@RequestParam("key") String key) throws Exception {
			List<Order> orderList = orderService.getOrderByNames(key);
			
			if(orderList.size()!=0) {
				return ResponseHandler.generateResponse("Order fetched successfully", HttpStatus.OK,orderList);				
			}
			else {
				return ResponseHandler.generateResponse("No Orders Found For "+key, HttpStatus.NOT_FOUND,orderList);
			}
		}
		
		
		@GetMapping("/getallorder/")
		public ResponseEntity<Object> getAllOrdersUser() {
			
//			int userId=1;
			
			
			List<Order> orderList = orderService.orderListUser();
			return ResponseHandler.generateResponse("Order fetched successfully", HttpStatus.OK,orderList);

		}
		
		@GetMapping("/admin/getallorder")
		public ResponseEntity<Object> getAllOrder() {
			
//			int userId=1;

			List<Order> orderList = orderService.ordersList();
			return ResponseHandler.generateResponse("All Order fetched successfully", HttpStatus.OK,orderList);

		}
		
		
		@PutMapping("/admin/changeorderstatus")
		public ResponseEntity<Object> changeStatus(@RequestParam("id") long id, @RequestParam("status") int status){
			
			long a= orderService.changeOrderStatus(id, status);
			
			return ResponseHandler.generateResponse("Order Status Changed successfully", HttpStatus.OK,a);
		}
		
		@GetMapping("/admin/getordersbystatus")
		public ResponseEntity<Object> getOrdersByStatus(@RequestParam("status") String status){
			List<Order> orderList = orderService.getOrdersByStatus(status);
			return ResponseHandler.generateResponse("All Orders By Status Fetched Successfully", HttpStatus.OK,orderList);
		}
		
		@PostMapping("/admin/getordersbyfilter")
		public ResponseEntity<Object> getOrdersByFilter(@RequestParam("key") int key, @RequestBody OrderOperations orderOperations){
			System.out.println(orderOperations);
			List<Order> orderList = orderService.getOrdersByFilter(key, orderOperations);
			return ResponseHandler.generateResponse("All Orders By Status Fetched Successfully", HttpStatus.OK,orderList);
		}
		
		 @GetMapping("/getorderpages")
		 public ResponseEntity<?> getAllProductWithPagination(@RequestParam("pageNo") int pageNo,@RequestParam("pageSize") int pageSize){
			 Object product = orderService.getOrdersWithPagination(pageNo, pageSize);
			 
			 System.out.println(product);
			 return ResponseEntity.ok(product);
		 }
		 
		 
		 
}
