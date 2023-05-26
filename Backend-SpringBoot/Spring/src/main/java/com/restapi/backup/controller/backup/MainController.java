package com.restapi.backup.controller.backup;



import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.restapi.RersponseHandler.ResponseHandler;

import com.restapi.entity.User;
import com.restapi.exception.UserException;
import com.restapi.service.UserService;
import com.restapi.utility.FileDownload;
import com.restapi.utility.FileUpload;
import com.restapi.utility.FileUploadResponse;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/users/jhjhjhgjhjhjh")
@CrossOrigin(originPatterns = "*")
public class MainController 
{

	@Autowired
    private UserService userService;
	
	@PostMapping("/save")
    public ResponseEntity<Object> createUser(@ModelAttribute User user , @RequestParam("file") MultipartFile multipartFile) throws UserException, IOException
    {
//    	System.out.println("Inside createUser");
    	
    	String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
	
        String fileCode = FileUpload.saveFile(fileName, multipartFile);
    	
    	user.setPhoto(fileCode);
    	    	
        User savedUser = userService.signUp(user);
        
        
        return ResponseHandler.generateResponse("User Created successfully", HttpStatus.CREATED, savedUser);
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable("id") Long userId)
    {
        User user = userService.getUserById(userId);
        
//        return new ResponseEntity<>(user, HttpStatus.OK);
        return ResponseHandler.generateResponse("User By I'd", HttpStatus.OK, user);
    }

    @GetMapping
    public ResponseEntity<Object> getAllUsers()
    {
        List<User> users = userService.getAllUsers();
        
//        return new ResponseEntity<>(users, HttpStatus.OK);
        return ResponseHandler.generateResponse("All Users Here..!!", HttpStatus.CREATED, users);
    }

 
    @PutMapping("/updateprofile")
    public ResponseEntity<Object> updateUser(@ModelAttribute User user,@RequestParam(value="file",required=false) MultipartFile multipartFile) throws IOException
    {
        
        if(multipartFile!=null) {
        	
        	String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        	
        	String filecode = FileUpload.saveFile(filename, multipartFile);
        	
        	user.setPhoto(filecode);
        	
        }
        
        User updatedUser = userService.updateUser(user);
        
//        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        return ResponseHandler.generateResponse("User Updated successfully", HttpStatus.CREATED, updatedUser);
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable("id") Long userId)
    {
        userService.deleteUser(userId);
        
      //  return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
        
        //with response handler..
        return ResponseHandler.generateResponse("User Deleted successfully", HttpStatus.ACCEPTED, "DELETE");
    }
    
    @DeleteMapping("/deleteAll")
    public ResponseEntity<Object> deleteAllUser(){
    	
    	userService.deleteAllUser();
  
    	return ResponseHandler.generateResponse("All User Deleted successfully", HttpStatus.ACCEPTED, "DELETE");
    }
    
    
    @PostMapping("/uploadFile")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam("file") MultipartFile multipartFile)throws IOException {
         
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        long size = multipartFile.getSize();
         
        String filecode = FileUpload.saveFile(fileName, multipartFile);
         
        FileUploadResponse response = new FileUploadResponse();
        response.setFileName(fileName);
        response.setSize(size);
        response.setDownloadUri("/downloadFile/" + filecode);
         
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/downloadFile/{fileCode}")
    public ResponseEntity<?> downloadFile(@PathVariable("fileCode") String fileCode) {
        FileDownload downloadUtil = new FileDownload();
         
        Resource resource = null;
        try {
            resource = downloadUtil.getFileAsResource(fileCode);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
         
        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }
         
//        String contentType = "application/octet-stream";
//        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
      //for image downloading
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//               .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
//                .body(resource);
        
        String extension = "jpg";
        
        String fileName = resource.getFilename();
        int index = fileName.lastIndexOf(".");
        
        if(index>0)
        {
        	extension = fileName.substring(index+1);
        }
        
        //for image showing on browser
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(extension == "jpg" ? MediaType.IMAGE_JPEG_VALUE:MediaType.IMAGE_PNG_VALUE))
               .header(HttpHeaders.CONTENT_DISPOSITION)
                .body(resource);
   
    
    }
    

	
    @PostMapping("/login")
    public ResponseEntity<Object> loginMethod(@RequestBody User user) throws UserException
    {
    	System.out.println("we are inside user/login");
    	User newLogin = userService.logIn(user);
 		System.out.println("newLogin object => " + newLogin);
 		return ResponseHandler.generateResponse("Login successfully", HttpStatus.OK, newLogin);
    }
    
    
    
    
    
}
