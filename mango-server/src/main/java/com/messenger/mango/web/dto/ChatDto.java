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
}
