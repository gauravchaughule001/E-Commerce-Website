package com.restapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.restapi.RersponseHandler.ResponseHandler;

@ControllerAdvice
public class GlobleExceptionHandler {
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<Object> userExceptionHandler(UserException ue){
		
		return ResponseHandler.generateResponse(ue.getMessage(), HttpStatus.BAD_REQUEST, null,true);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> otherExceptionHandler(Exception e)
	{
		return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null,true);
	}

}
