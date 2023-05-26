package com.restapi.utility;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class MVCConfig implements WebMvcConfigurer {
	
	public void addResourceHandlers(ResourceHandlerRegistry registry)
	{
		
		
	}
	
	@SuppressWarnings("unused")
	private void exposeDirectory(String direName , ResourceHandlerRegistry registry)
	{
		Path uploadDir = Paths.get(direName);
		
		String uploadPath = uploadDir.toFile().getAbsolutePath();
		
		if(direName.startsWith("../"))
		{
			direName = direName.replace("../", "");
			registry.addResourceHandler("/"+direName+"/**").addResourceLocations("File:/"+uploadPath);
		}
	}

}
