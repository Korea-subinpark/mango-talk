package com.messenger.mango.web.dto;

import com.messenger.mango.domain.UserRole;
import com.messenger.mango.domain.users.User;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

public class UserDto {

    @Getter
    public static class LoginRequest {

        @NotEmpty(message = "ID는 필수 입력입니다.")
        private String username;
        @NotEmpty(message = "비밀번호는 필수 입력입니다.")
        private String password;

        @Builder
        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }

    @Getter
    public static class SaveRequest {

        @NotEmpty(message = "ID는 필수 입력입니다.")
        private String username;
        @NotEmpty(message = "비밀번호는 필수 입력입니다.")
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
