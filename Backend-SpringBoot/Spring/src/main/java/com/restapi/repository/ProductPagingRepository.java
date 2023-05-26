package com.restapi.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.restapi.entity.Product;

public interface ProductPagingRepository extends PagingAndSortingRepository<Product, Integer> {

}
