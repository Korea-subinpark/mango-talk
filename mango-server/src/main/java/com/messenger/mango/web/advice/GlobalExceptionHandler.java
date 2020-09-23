package com.messenger.mango.web.advice;

import com.messenger.mango.common.ErrorCode;
import com.messenger.mango.common.exception.PostsNotFoundException;
import com.messenger.mango.web.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.ResponseEntity.status;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PostsNotFoundException.class)
    public ResponseEntity<ErrorResponse> postsNotFoundExceptionHandler(PostsNotFoundException ex) {
        return status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(ErrorCode.NOT_FOUND, ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse(ErrorCode.FAIL));
    }

}
