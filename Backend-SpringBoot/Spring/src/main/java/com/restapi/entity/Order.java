package com.restapi.entity;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="user_id")
    private int userId;


    @Column(name="total_quantity")
    private int totalQuantity;

    @Column(name="total_price")
    private BigDecimal totalPrice;

    @Column(name="status")
    private String status="Pending";

    @Column(name="date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name="last_updated")
    @UpdateTimestamp
    private Date lastUpdated;
    
    @Column(name="customer_name")
    private String customerName;
    
    @Column(name="customer_email")
    private String customerEmail;
    
    @Column(name="customer_mobile")
    private String customerMobile;
    
    @Column(name="customer_address")
    private String customerAddress;
    
    @Transient
    private int changeStatus;
    	

    public int getChangeStatus() {
		return changeStatus;
	}

	public void setChangeStatus(int changeStatus) {
		this.changeStatus = changeStatus;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	@OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Set<OrderItem> orderItems = new HashSet<>();

    public Long getId() {
        return id;
    }

//    Hi there I am using WhatsApp
    
    public void setId(Long id) {
        this.id = id;
    }

  
    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

//    public BigDecimal getTotalPrice() {
//    	if(totalPrice !=null) {
//    	return	totalPrice;
//    	}else {
//    		return getTotalAmount();
//    	}
//    }

    public void setTotalPrice(BigDecimal totalPrice) {
    
    		this.totalPrice = totalPrice;
    	
        
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public void add(OrderItem item) {

        if (item != null) {
            if (orderItems == null) {
                orderItems = new HashSet<>();
            }

            orderItems.add(item);
           // item.setOrder(this);
        }
    }

//    public BigDecimal getTotalAmount()
//	{
//		BigDecimal amount = new BigDecimal("0.0");
//		for (OrderItem item : this.orderItems)
//		{
//			
//			amount = amount.add(item.getTotalAmount());
//		}
//		return amount;
//	}


    public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerEmail() {
		return customerEmail;
	}

	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}

	public String getCustomerMobile() {
		return customerMobile;
	}

	public void setCustomerMobile(String customerMobile) {
		this.customerMobile = customerMobile;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	
	


}