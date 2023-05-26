// Java Program to Create Rest Controller that
// Defines various API for Sending Mail

package com.restapi.backup.controller.backup;

import com.restapi.RersponseHandler.ResponseHandler;
// Importing required classes
import com.restapi.dto.EmailDetails;
import com.restapi.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Annotation
@RestController
//@RequestMapping("api/v1")
@RequestMapping("api/v1/pkoijihgjgjhkukuukuhkuhyhy")
@CrossOrigin(originPatterns = "*")
// Class
public class EmailController {

	@Autowired private EmailService emailService;

	// Sending a simple Email
	@PostMapping("/sendMail")
	public Object
	sendMail(@RequestBody EmailDetails details)
	{
		String status = emailService.sendSimpleMail(details);
		 return ResponseHandler.generateResponse("Mail Sent successfully", HttpStatus.CREATED, status);
	}

	// Sending email with attachment
	@PostMapping("/sendMailWithAttachment")
	public String sendMailWithAttachment(
		@RequestBody EmailDetails details)
	{
		String status = emailService.sendMailWithAttachment(details);

		return status;
	}
}
