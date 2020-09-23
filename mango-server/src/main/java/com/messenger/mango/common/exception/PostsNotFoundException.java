package com.messenger.mango.common.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PostsNotFoundException extends RuntimeException {

    public PostsNotFoundException(String message) {
        super(message);
    }
}
