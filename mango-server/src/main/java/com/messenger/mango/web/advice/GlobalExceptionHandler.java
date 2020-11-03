package com.messenger.mango.web.advice;

import com.messenger.mango.common.ErrorCode;
import com.messenger.mango.common.exception.NotFoundException;
import com.messenger.mango.common.exception.PostNotFoundException;
import com.messenger.mango.web.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.ResponseEntity.status;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({PostNotFoundException.class, UsernameNotFoundException.class, NotFoundException.class})
    public ResponseEntity<ErrorResponse> notFoundExceptionHandler(Exception ex) {
        return status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(ErrorCode.NOT_FOUND, ex.getMessage()));
    }

    @ExceptionHandler({BadCredentialsException.class, IllegalArgumentException.class})
    public ResponseEntity<ErrorResponse> authExceptionHandler(Exception ex) {
        return ResponseEntity.badRequest()
                .body(new ErrorResponse(ErrorCode.BAD_PARAMETER, ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        return ResponseEntity.badRequest()
                .body(new ErrorResponse(ErrorCode.FAIL));
    }

}
