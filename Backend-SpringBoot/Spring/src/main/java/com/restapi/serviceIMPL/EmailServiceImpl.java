package com.restapi.serviceIMPL;

import com.restapi.dto.EmailDetails;
import com.restapi.entity.Order;
import com.restapi.entity.OrderItem;
import com.restapi.service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Set;

//import javax.mail.MessagingException;
//import javax.mail.internet.MimeMessage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
//import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{
	@Autowired private JavaMailSender javaMailSender;
	 
    @Value("${spring.mail.username}") private String sender;
 
    // Method 1
    // To send a simple email
    public String sendSimpleMail(EmailDetails details)
    {
 
        // Try block to check for exceptions
        try {
 
            // Creating a simple mail message
//            SimpleMailMessage mailMessage
//                = new SimpleMailMessage();
            
//            // Setting up necessary details
//            mailMessage.setFrom(sender);
//            mailMessage.setTo(details.getRecipient());
//            mailMessage.setText(details.getMsgBody());
//            mailMessage.setSubject(details.getSubject());
//            // Sending the mail
//            javaMailSender.send(mailMessage);
//            return "Mail Sent Successfully...";
        	
        	
        	List<Order> b=details.getOrderList();
        	
        	String name="";
        	String date="";
        	
        	for (Order order : b) {
				name+=order.getCustomerName();
				date+=order.getDateCreated();
			}
        	
        	int sum=0;
            
        	Set<OrderItem> a = details.getOrderItems();
    		for(OrderItem element : a) {
    		      System.out.print(element.getName());
    		      System.out.print(element.getPrice());
    		      System.out.print(element.getTotalAmount());
    		      System.out.print(", ");
    		      sum=sum+element.getTotalAmount();
    		      
    		    }
    		
    		String total=new DecimalFormat("##,##,##0").format(sum);
    		
    		
    		String header="<!DOCTYPE html>\r\n"
    				+ "<html lang=\"en\">\r\n"
    				+ "<head>\r\n"
    				+ "</head>\r\n"
    				+ "<body>\r\n"
    				+ "    <div>\r\n"
    				+ "        <div style=\"width: 90%; margin: auto; border-radius: 10px;\">\r\n"
    				+ "            <div style=\"background-color: rgb(0, 119, 255);\">\r\n"
    				+ "            <h1\r\n"
    				+ "                style=\"padding:10px;color:#fff;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; width: fit-content; margin: auto;\">\r\n"
    				+ "                ShopEasy.com</h1>\r\n"
    				+ "            </div>\r\n"
    				+ "            <h3>Name : "+name+"</h3>\r\n"
    				+ "            <h3>Date : "+date+"</h3>\r\n"
    				+ "            <h3>Total Amount : "+total+"</h3>\r\n"
    				+ "           \r\n"
    				+ "\r\n"
    				+ "        </div>\r\n"
    				+ "\r\n"
    				+ "        <h2 style=\"width: fit-content; margin: auto; margin-bottom: 20px;\">Order Summary</h2>\r\n"
    				+ "\r\n"
    				+ "        <table style=\"width: 90%; margin: auto; font-family: arial, sans-serif;\r\n"
    				+ "  border-collapse: collapse;\">\r\n"
    				+ "            <tr style=\"background-color: #ddd;\">\r\n"
    				+ "                <th style=\"border: 1px solid #dddddd;\r\n"
    				+ "  text-align: left;\r\n"
    				+ "  padding: 8px;\">Item</th>\r\n"
    				+ "                <th style=\"border: 1px solid #dddddd;\r\n"
    				+ "  text-align: left;\r\n"
    				+ "  padding: 8px;\">Quantity</th>\r\n"
    				+ "                <th style=\"border: 1px solid #dddddd;\r\n"
    				+ "  text-align: left;\r\n"
    				+ "  padding: 8px;\">Price</th>\r\n"
    				+ "                <th style=\"border: 1px solid #dddddd;\r\n"
    				+ "  text-align: left;\r\n"
    				+ "  padding: 8px;\">Total</th>\r\n"
    				+ "            </tr>";
    		String content="";
    		    
    		for(OrderItem element : a) {
    			 content +="<tr>\r\n"
    			 		+ "                <td style=\"border: 1px solid #dddddd;\r\n"
    			 		+ "  text-align: left;\r\n"
    			 		+ "  padding: 8px;\">"+element.getName()+"</td>\r\n"
    			 		+ "                <td style=\"border: 1px solid #dddddd;\r\n"
    			 		+ "  text-align: left;\r\n"
    			 		+ "  padding: 8px;\">"+element.getQuantity()+"</td>\r\n"
    			 		+ "                <td style=\"border: 1px solid #dddddd;\r\n"
    			 		+ "  text-align: left;\r\n"
    			 		+ "  padding: 8px;\">"+element.getPrice()+"</td>\r\n"
    			 		+ "                <td style=\"border: 1px solid #dddddd;\r\n"
    			 		+ "  text-align: left;\r\n"
    			 		+ "  padding: 8px;\">"+element.getTotalAmount()+"</td>\r\n"
    			 		+ "            </tr>";
    		}
    		
    		
    		String footer="            <tr>\r\n"
    				+ "                <td colspan=\"4\" style=\"border: 1px solid #dddddd;\r\n"
    				+ "  text-align: left;\r\n"
    				+ "  padding: 8px;\">Total Amount : "+total+"</td>\r\n"
    				+ "            </tr>\r\n"
    				+ "        </table>\r\n"
    				+ "        <h4 style=\"width: fit-content; margin: auto; margin-top: 5vh;\">Thanks For Ordering, Keep Shopping with Us !</h4>\r\n"
    				+ "        <div style=\"display: flex; justify-content: center; align-items: center; margin: 4vh;\">\r\n"
    				+ "        <button style=\"padding: 5px 20px; background-color: rgb(0, 119, 255); border: none; color: white; cursor: pointer;\" href=\"https://www.google.com\">Shopify.com</button>\r\n"
    				+ "    </div>\r\n"
    				+ "    </div>\r\n"
    				+ "</body>\r\n"
    				+ "\r\n"
    				+ "</html>";

    		
    		
    		String mailBody=header.concat(content).concat(footer);
        	
        	
        	
        	
        	
        	
        	
         //To send HTML mail
            
            MimeMessage mailMessage1 = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper= new MimeMessageHelper(mailMessage1);
    
         // Setting up necessary details
            boolean html=true;
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody()+mailBody,html);
            mimeMessageHelper.setSubject(details.getSubject());
            // Sending the mail
            javaMailSender.send(mailMessage1);
            return "Mail Sent Successfully...";
            
            
 
        }
 
        // Catch block to handle the exceptions
        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }
 
    // Method 2
    // To send an email with attachment
    public String
    sendMailWithAttachment(EmailDetails details)
    {
        // Creating a mime message
        MimeMessage mimeMessage
            = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;
 
        try {
 
            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper
                = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(
                details.getSubject());
 
            // Adding the attachment
            FileSystemResource file
                = new FileSystemResource(
                    new File(details.getAttachment()));
 
            mimeMessageHelper.addAttachment(
                file.getFilename(), file);
 
            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }
 
        // Catch block to handle MessagingException
        catch (MessagingException e) {
 
            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }

}
