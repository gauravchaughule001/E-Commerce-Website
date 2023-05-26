package com.restapi.utility;

import java.io.IOException;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.web.multipart.MultipartFile;

public class FileUpload {

	 public static String saveFile(String fileName, MultipartFile multipartFile)
	            throws IOException {
	        Path uploadPath = Paths.get("Files-Upload");
//	        Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
	        
	        LocalDateTime localDateTime = LocalDateTime.now();	        
	       String fileCode = DateTimeFormatter.ofPattern("yyyymmddHHmmss").format(localDateTime);
	          
	        if (!Files.exists(uploadPath)) {
	            Files.createDirectories(uploadPath);
	        }
	 
//	        String fileCode = RandomStringUtils.randomAlphanumeric(8);
	         
	        try (InputStream inputStream = multipartFile.getInputStream()) {
	            Path filePath = uploadPath.resolve(fileCode+"."+fileName);
	            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
	        } catch (IOException ioe) {       
	            throw new IOException("Could not save file: " + fileName, ioe);
	        }
	        
	        return fileCode;
	    }
}
