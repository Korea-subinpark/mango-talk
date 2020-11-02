package com.messenger.mango.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChatDto {

    @Getter
    @NoArgsConstructor
    public static class SaveRequest {

        private String senderName;
        private String receiverName;
        private String content;

        @Builder
        public SaveRequest(String senderName, String receiverName, String content) {
            this.senderName = senderName;
            this.receiverName = receiverName;
            this.content = content;
        }
    }
}
