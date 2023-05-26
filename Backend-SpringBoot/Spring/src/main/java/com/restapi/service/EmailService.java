// Java Program to Illustrate Creation Of
// Service Interface

package com.restapi.service;

// Importing required classes
import com.restapi.dto.EmailDetails;

// Interface
public interface EmailService {
	
	
	
	
	
	// Method
	// To send a simple email
	String sendSimpleMail(EmailDetails details);

	// Method
	// To send an email with attachment
	
	
	String sendMailWithAttachment(EmailDetails details);

	
}
