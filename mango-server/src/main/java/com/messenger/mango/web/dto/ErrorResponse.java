package com.messenger.mango.web.dto;

import com.messenger.mango.common.ErrorCode;
import lombok.Getter;

@Getter
public class ErrorResponse {

    private ErrorCode code;
    private String message;

    public ErrorResponse(ErrorCode code) {
        this.code = code;
        this.message = code.getMessage();
    }

    public ErrorResponse(ErrorCode code, String message) {
        this.code = code;
        this.message = message;
    }

}
