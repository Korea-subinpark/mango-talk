package com.messenger.mango.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.messenger.mango.common.BaseControllerTest;
import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.UserDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthControllerTest extends BaseControllerTest {

    @Autowired
    private UserService userService;
    @Autowired
    ObjectMapper objectMapper;

    public static final String baseUrl = "http://localhost:8080/mango/v1/auth";

    @Test
    @DisplayName("로그인 성공")
    void loginSuccess() throws Exception {
        //given
        String username = "admin";
        String password = "qwe123";

        UserDto.SaveRequest saveRequest = UserDto.SaveRequest.builder()
                .username(username)
                .password(password)
                .build();

        userService.save(saveRequest);

        //when
        UserDto.LoginRequest loginRequest = UserDto.LoginRequest.builder()
                .username(username)
                .password(password)
                .build();

        String url = baseUrl + "/login";
        ResultActions result = mockMvc.perform(
                post(url)
                        .content(objectMapper.writeValueAsString(loginRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andExpect(status().isOk())
                .andDo(document(
                        "auth-login",
                        requestFields(
                                fieldWithPath("username").type(JsonFieldType.STRING).description("사용자 ID"),
                                fieldWithPath("password").type(JsonFieldType.STRING).description("사용자 PW")
                        ),
                        responseFields(
                                fieldWithPath("token").type(JsonFieldType.STRING).description("Access Token")
                        )
                ));

    }
}