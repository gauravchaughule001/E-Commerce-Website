// Java Program to Illustrate EmailDetails Class

package com.restapi.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.restapi.entity.Order;
import com.restapi.entity.OrderItem;

// Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor

// Class
public class EmailDetails {

	// Class data members
	private String recipient;
	private String msgBody;
	private String subject;
	private String attachment;
	
	 private Set<OrderItem> orderItems = new HashSet<>();
	
//	 private List<Order> orderList=new ArrayList();
	 private List<Order> orderList=new ArrayList<Order>();
	

	public Set<OrderItem> getOrderItems() {
		return orderItems;
	}


	public void setOrderItems(Set<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}




	public List<Order> getOrderList() {
		return orderList;
	}


	public void setOrderList(List<Order> orderList) {
		this.orderList = orderList;
	}


	public EmailDetails(String recipient, String msgBody, String subject, String attachment, Set<OrderItem> orderItems,
			List<Order> orderList) {
		super();
		this.recipient = recipient;
		this.msgBody = msgBody;
		this.subject = subject;
		this.attachment = attachment;
		this.orderItems = orderItems;
		this.orderList = orderList;
	}


	public EmailDetails() {
		// TODO Auto-generated constructor stub
	}


	public EmailDetails(String customerEmail, String string, String string2) {
		// TODO Auto-generated constructor stub
	}

	
	
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public String getMsgBody() {
		return msgBody;
	}
	public void setMsgBody(String msgBody) {
		this.msgBody = msgBody;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getAttachment() {
		return attachment;
	}
	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
	
	
}

