package com.restapi.RersponseHandler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHandler
{
	
	public static ResponseEntity<Object> generateResponse(String msg , HttpStatus status, Object responseObj)
	{
		
		Map<String, Object> map = new HashMap<String , Object>();
		
		map.put("msg", msg);
		map.put("status", status);
		map.put("data", responseObj);
		
		return new ResponseEntity<Object>(map , status);
				
	}

	public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object object,boolean err)
	{
		

		Map<String, Object> map = new HashMap<String , Object>();
		
		map.put("msg", message);
		map.put("status", status);
		map.put("data", object);
		
		return new ResponseEntity<Object>(map , status);
				
	}
	


}
