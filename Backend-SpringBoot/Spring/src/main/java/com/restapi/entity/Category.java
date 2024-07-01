package com.restapi.entity;
import java.sql.Timestamp;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int CatId;
	
	private String name;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp updateDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp createdDate;
	
	private String photo;
	
	 @Transient
	    public String getPhotoImagePath() {
	    	
	    	if(photo == null || CatId == 0) {
	    		return null;
	    	}
	    	return "/downloadFile/"+ photo;
	    }
	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	private boolean status=true;

	public Category() {
		// TODO Auto-generated constructor stub
	}

	public Category(int catId, String name, Timestamp updateDate, Timestamp createdDate, boolean status) {
		super();
		CatId = catId;
		this.name = name;
		this.updateDate = updateDate;
		this.createdDate = createdDate;
		this.status = status;
	}

	public int getCatId() {
		return CatId;
	}

	public void setCatId(int catId) {
		CatId = catId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Timestamp getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
}
