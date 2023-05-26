package com.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restapi.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
