package com.restapi.serviceIMPL;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.HashMap;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.restapi.dto.ProductResponse;
import com.restapi.entity.Product;
import com.restapi.entity.User;
import com.restapi.repository.ProductPagingRepository;
import com.restapi.repository.ProductRepository;
import com.restapi.service.IAuthenticationFacade;
import com.restapi.service.ProductService;

@Service
public class ProductServiceImple implements ProductService
{

	@Autowired
	private ProductRepository productRepo;
	
	@Autowired
	private ProductPagingRepository pagination;
	
	@Autowired
	private IAuthenticationFacade authenticationFacade;

	@Override
	public Product addProduct(Product product) {

		return productRepo.save(product);
	}

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return productRepo.findAll();
	}

	@Override
	public void deleteProduct(int productId) {
		// TODO Auto-generated method stub
		productRepo.deleteById(productId);
	}

	@Override
	public Product updateProduct(Product product) {
		Product presetProduct  =  productRepo.findById(product.getProductId()).get();
		
		Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		
		presetProduct.setProductName(product.getProductName());
		presetProduct.setProductPrice(product.getProductPrice());
		presetProduct.setProductDesc(product.getProductDesc());
		presetProduct.setCategoryId(product.getCategoryId());
		presetProduct.setUpdatedDate(product.getUpdatedDate());
		
		
		if(product.getProductPhoto()==null) {
			presetProduct.setProductPhoto(presetProduct.getProductPhoto());
		}
		else {
			presetProduct.setProductPhoto(product.getProductPhoto());
		}
		
		
		
		
		
		presetProduct.setUpdatedDate(timeStamp);                   
		
		Product updateProduct = productRepo.save(presetProduct);
		
		return updateProduct;
	}

	@Override
	public List<Product> searchProducts(String query) {
		
		return productRepo.searchProducts(query);
	}
	
	
	@Override
	public List<Product> getProductsByCatId(int categoryId) {
		// TODO Auto-generated method stub
		List<Product> ProdList=productRepo.findBycategoryId(categoryId);
		return ProdList;
	}

	@Override
	public List<Product> getProductsBycid() {
		// TODO Auto-generated method stub
		List<Product> ProdList=productRepo.findAll();
		return ProdList;
	}

	@Override
	public List<Product> sortByRequirement(String query) {
		
		if(query.equals("ASC")) {
		List<Product> ProdList=productRepo.sortByPriceAsc();
		return ProdList;
		}
		else if(query.equals("DESC")){
			List<Product> ProdList=productRepo.sortByPriceDesc();
			return ProdList;
		}
		else if(query.equals("NAMEASC")) {
			List<Product> ProdList=productRepo.sortByNameAsc();
			return ProdList;
		}
		else if(query.equals("NAMEDESC")) {
				List<Product> ProdList=productRepo.sortByNameDesc();
			return ProdList;
		}
		else {
			return productRepo.findAll();
		}
	}

	@Override
	public List<Product> findByPrice(int min, int max) {
		
		return productRepo.findByPrice(min, max);
	}

	@Override
	public Object getProductsByUserAndProdId(int productId) {
		
		Authentication authentication = authenticationFacade.getAuthentication();
		User dbUser = (User) authentication.getPrincipal();
		
		long userId=dbUser.getId();
		
		ProductResponse product= productRepo.findProductWithCart(userId, productId);
		if(product==null) {
			Optional<Product> prod1=productRepo.findById(productId);
			return prod1.get();
		}
		else {
			return product;
		}
	}

	@Override
	public Object getProductWithPagination(int pageNo, int pageSize) {
		
		Pageable pageble = PageRequest.of(pageNo, pageSize);
		
		Page<Product> allProduct= pagination.findAll(pageble);
		
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("message", "Data fetch Successfully");
		map.put("status", 200);
		map.put("data", allProduct.getContent());
		map.put("currentPage", allProduct.getNumber());
		map.put("totalPages", allProduct.getTotalPages());
		
		return map;
	}
	
	


}
