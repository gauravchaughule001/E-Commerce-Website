//package com.restapi.exception;
//
//public class RecordNotFoundException extends RuntimeException {
//
//	 private static final long serialVersionUID = 1L;
//	 private String message;
//
//	 public RecordNotFoundException() {}
//
//	 public RecordNotFoundException(String msg)
//	 {
//	     super(msg);
//	     this.message = msg;
//	 }
//}


package com.restapi.exception;

public class RecordNotFoundException extends RuntimeException {

	 private static final long serialVersionUID = 1L;
	 public RecordNotFoundException() {}

	 public RecordNotFoundException(String msg)
	 {
	     super(msg);
	 }
}

