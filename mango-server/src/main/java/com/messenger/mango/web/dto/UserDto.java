package com.messenger.mango.web.dto;

import com.messenger.mango.domain.UserRole;
import com.messenger.mango.domain.users.User;
import lombok.Builder;
import lombok.Getter;

public class UserDto {

    @Getter
    public static class LoginRequest {

        private String username;
        private String password;

        @Builder
        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }

    @Getter
    public static class SaveRequest {

        private String username;
        private String password;

        @Builder
        public SaveRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public User toEntity() {
            return User.builder()
                    .username(username)
                    .password(password)
                    .userRole(UserRole.USER)
                    .build();
        }
    }

    @Getter
    public static class LoginResponse {

        String token;

        @Builder
        public LoginResponse(String token) {
            this.token = token;
        }
    }
}
