package com.restapi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
//@JsonIgnoreProperties(ignoreUnknown = true)
//@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class CartResponse {
private int productId;
    private String name;
    private int userId ;
    private int productPrice;
    private int quantity;
    private String productPhoto;
    private String category;
    private int cartId;
    
    public CartResponse() {
		// TODO Auto-generated constructor stub
	}

	public CartResponse(int productId, String name, int userId, int productPrice, int quantity, String productPhoto,
			String category,int cartId) {
		super();
		this.productId = productId;
		this.name = name;
		this.userId = userId;
		this.productPrice = productPrice;
		this.quantity = quantity;
		this.productPhoto = productPhoto;
		this.category = category;
		this.cartId = cartId;
	}

	public int getProductId() {
		return productId;
	}

	public int getCartId() {
		return cartId;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getProductPhoto() {
		return productPhoto;
	}

	public void setProductPhoto(String productPhoto) {
		this.productPhoto = productPhoto;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
    
	

   
    
   
}