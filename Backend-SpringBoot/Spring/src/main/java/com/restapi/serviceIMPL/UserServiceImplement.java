package com.restapi.serviceIMPL;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restapi.config.AppConstants;
import com.restapi.entity.Role;
import com.restapi.entity.User;
import com.restapi.exception.UserException;
import com.restapi.repository.RoleRepository;
import com.restapi.repository.UserRepository;
import com.restapi.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImplement implements UserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public User signUp(User user)throws UserException {
		
		Optional<User> opt = userRepo.findByEmailAndPassword(user.getEmail(), user.getPassword());
	
		if(opt.isPresent())
		{
			throw new UserException("Acc already Exists..!!"+user.getEmail());
		}
		
		return userRepo.save(user);
	}

	@Override
	public User getUserById(Long userId) {
		
				
		Optional<User> optionalUser =  userRepo.findById(userId);
		return optionalUser.get();
	}

	@Override
	public List<User> getAllUsers() {
		
		
		return userRepo.findAll();
	}

	@Override
	public User updateUser(User user) {
		
		User presetUser  =  userRepo.findById(user.getId()).get();
		presetUser.setFirstName(user.getFirstName());
		presetUser.setLastName(user.getLastName());
		presetUser.setEmail(user.getEmail());
		presetUser.setGender(user.getGender());

		
		if(user.getPhoto()==null) {
			presetUser.setPhoto(presetUser.getPhoto());
		}
		else {
			System.out.println(user.getPhoto());
			presetUser.setPhoto(user.getPhoto());
		}
		
		User updateUser = userRepo.save(presetUser);
		return updateUser;
	}

	@Override
	public void deleteUser(long userId) {

		userRepo.deleteById(userId);		
	}

	@Override
	public void deleteAllUser() {
		
		userRepo.deleteAll();
		
	}

	
	


	@Override
	public User logIn(User user) throws UserException {
	
		Optional<User> opt1 = userRepo.findByEmailAndPassword(user.getEmail(), user.getPassword());
		System.out.println("This Opt1 => " + opt1.get());
		
			if(opt1.isPresent())
			{
				return opt1.get();
			}
			else
			{
				throw new UserException("Acc does not exits with this mail "+user.getEmail());
			}
	}

	@Override
	public User registerUser(User userDto) {

		
		User user = modelMapper.map(userDto, User.class);

		// encoded the password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));

		// roles
		Role role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();

		user.getRoles().add(role);

		User newUser = this.userRepo.save(user);

		return newUser;
		
		
//		User user = modelMapper.map(userDto, User.class);
//		System.out.println("-------");
//System.out.println(user);
		// encoded the password
//		userDto.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
//		Role r=new Role();
//		r.setId(1);
//		r.setName(AppConstants.NORMAL_USER.toString());
//		user.setRoles();
		// roles
//	Optional<Role> role = Optional.ofNullable(this.roleRepo.findById(AppConstants.NORMAL_USER).get());
//	if(role.isPresent()) {
//		user.getRoles().add(role.get());
//	}
//		roleRepo.save()
//		User newUser =userRepository.save(userDto);
//
//		return newUser;
	}
	
	

	@Override
	public String checkUsernameAvailability(String username) {
		
		List<User> a= userRepo.findByUsername(username);
		
		if(a.isEmpty()) {
			return "This Username Is Available";
		}
		else {
			return "Username Is Unavailable";			
		}
	}

	@Override
	public User registerUserCustomRole(User userDto) {
		User user = modelMapper.map(userDto, User.class);

		// encoded the password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		
		Role role;

		
		if(user.getRole()==500) {
			role = this.roleRepo.findById(AppConstants.ADMIN_USER).get();
		}
		else {
			role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();			
		}

		System.out.println("ENTERED USER ROLE IS ::::::::::::::: "+user.getRole()+"ROLE CONSTANT IS "+role);

		user.getRoles().add(role);

		User newUser = this.userRepo.save(user);

		return newUser;
	}		
	
}
