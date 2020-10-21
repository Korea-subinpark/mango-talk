package com.messenger.mango.web;

import com.messenger.mango.common.BaseControllerTest;
import com.messenger.mango.service.post.PostService;
import com.messenger.mango.web.dto.PostDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PostControllerTest extends BaseControllerTest {

    @Autowired
    private PostService postService;

    public static final String baseUrl = "http://localhost:8080/mango/v1/post";

    @Test
    @DisplayName("게시글을 ID로 조회한다")
    @WithMockUser(roles = "USER")
    void getPost() throws Exception {
        // given
        String title = "test title";
        String content = "test content";
        String author = "test author";

        PostDto.SaveRequest requestDto = PostDto.SaveRequest.builder()
                .title(title)
                .content(content)
                .author(author)
                .build();

        postService.save(requestDto);

        // when
        String url = baseUrl + "/{id}";
        ResultActions result = mockMvc.perform(get(url, 1L));

        // then
        result.andExpect(status().isOk())
                .andDo(document(
                        "post-find-one",
                        pathParameters(
                                parameterWithName("id").description("게시글 ID")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("게시글 ID"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("게시글 내용"),
                                fieldWithPath("author").type(JsonFieldType.STRING).description("게시글 글쓴이"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("게시글이 생성된 날짜/시간"),
                                fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("게시글이 마지막으로 수정된 날짜/시간")
                        )
                ));
    }
}
