package com.messenger.mango.common.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PostNotFoundException extends RuntimeException {

    public PostNotFoundException(String message) {
        super(message);
    }
}
