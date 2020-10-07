package com.messenger.mango.web.dto;

import com.messenger.mango.domain.post.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class PostDto {

    @Getter
    public static class Response {

        private Long id;
        private String title;
        private String content;
        private String author;
        private LocalDateTime createdDate;
        private LocalDateTime modifiedDate;

        public Response(Post entity) {
            this.id = entity.getId();
            this.title = entity.getTitle();
            this.content = entity.getContent();
            this.author = entity.getAuthor();
            this.createdDate = entity.getCreatedDate();
            this.modifiedDate = entity.getModifiedDate();
        }
    }

    @Getter
    public static class ListResponse {

        private Long id;
        private String title;
        private String author;
        private LocalDateTime modifiedDate;

        public ListResponse(Post entity) {
            this.id = entity.getId();
            this.title = entity.getTitle();
            this.author = entity.getAuthor();
            this.modifiedDate = entity.getModifiedDate();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class SaveRequest {

        private String title;
        private String content;
        private String author;

        @Builder
        public SaveRequest(String title, String content, String author) {
            this.title = title;
            this.content = content;
            this.author = author;
        }

        public Post toEntity() {
            return Post.builder()
                    .title(title)
                    .content(content)
                    .author(author)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class UpdateRequest {

        private String title;
        private String content;

        @Builder
        public UpdateRequest(String title, String content) {
            this.title = title;
            this.content = content;
        }
    }

}
