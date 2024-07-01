package com.restapi.utility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
public class FileUploadResponse {
	
	     private String fileName;
	     private String downloadUri;
	     private long size;
	     
	     
	     public FileUploadResponse() {
			// TODO Auto-generated constructor stub
		}


		public String getFileName() {
			return fileName;
		}


		public void setFileName(String fileName) {
			this.fileName = fileName;
		}


		public String getDownloadUri() {
			return downloadUri;
		}


		public void setDownloadUri(String downloadUri) {
			this.downloadUri = downloadUri;
		}


		public long getSize() {
			return size;
		}


		public void setSize(long size) {
			this.size = size;
		}
	     
	     
}
