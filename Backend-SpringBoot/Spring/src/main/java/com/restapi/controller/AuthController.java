package com.restapi.controller;

import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.restapi.dto.JwtAuthRequest;
import com.restapi.dto.JwtAuthResponse;
import com.restapi.entity.User;
import com.restapi.exception.ApiException;
import com.restapi.exception.UserException;
import com.restapi.security.JwtTokenHelper;
import com.restapi.service.UserService;
import com.restapi.utility.FileUpload;


@RestController
@CrossOrigin(originPatterns =  "*")
@RequestMapping("/api/v1/auth/")
public class AuthController {

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserService userService;
	
//	@Autowired
//	private UserRepo userRepo;
	@Autowired
	private ModelMapper mapper;

	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception {
//		System.out.println("loading username,,,");
//		
		this.authenticate(request.getUsername(), request.getPassword());
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
		String token = this.jwtTokenHelper.generateToken(userDetails);

		JwtAuthResponse response = new JwtAuthResponse();
		response.setToken(token);
		response.setUser(this.mapper.map((User) userDetails, User.class));
		return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
	
	}

	private void authenticate(String username, String password) throws ApiException, Exception {

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);
		
		try {
			
		authenticationManager.authenticate(authenticationToken);
		

		} catch (BadCredentialsException e) {
			System.err.println(e);
			System.out.println("Invalid Detials !!");
			throw new ApiException("Invalid username or password !!");
		}
	}

// register new user api
	
//	@PostMapping("/register")
//	public ResponseEntity<User> registerUser(@Valid @RequestBody User user) {
//		user.setUsername(user.getEmail());
//		
//		User registeredUser = userService.registerUser(user);
//		return new ResponseEntity<User>(registeredUser, HttpStatus.CREATED);
//	}
	
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@ModelAttribute User user , @RequestParam("file") MultipartFile multipartFile) throws UserException, IOException {
		
		user.setUsername(user.getEmail());
		
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		
        String fileCode = FileUpload.saveFile(fileName, multipartFile);
    	
    	user.setPhoto(fileCode);
		
		User registeredUser = userService.registerUser(user);
		return new ResponseEntity<User>(registeredUser, HttpStatus.CREATED);
	}
	
	@PostMapping("/checkusernameavailability")
	public ResponseEntity<?> checkUsernameAvailability(@RequestBody User user) {
		
		
		String username=user.getUsername();
		
		 
		 String a=userService.checkUsernameAvailability(username);
		 
		 if(a.equals("This Username Is Available")) {
			 return new ResponseEntity<>(a, HttpStatus.ACCEPTED);			 
		 }
		 else {
			 return new ResponseEntity<>(a, HttpStatus.NOT_ACCEPTABLE);
		 }
		 
	}

}
