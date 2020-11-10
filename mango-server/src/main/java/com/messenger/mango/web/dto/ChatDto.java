package com.messenger.mango.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChatDto {

    @Getter
    @NoArgsConstructor
    public static class SaveRequest {

        private String senderName;
        private String content;
        private Long chatRoomId;

        @Builder
        public SaveRequest(String senderName, String content, Long chatRoomId) {
            this.senderName = senderName;
            this.content = content;
            this.chatRoomId = chatRoomId;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private String content;
        private String senderName;
        private Long chatRoomId;

        @Builder
        public Response(String content, String senderName, Long chatRoomId) {
            this.content = content;
            this.senderName = senderName;
            this.chatRoomId = chatRoomId;
        }
    }
}
