package com.messenger.mango.web.dto;

import com.messenger.mango.domain.chat.Chat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

        private Long id;
        private String content;
        private String senderName;
        private Long chatRoomId;
        private LocalDateTime createdDate;
        private boolean isOwner;

        public Response(Chat chat) {
            this.id = chat.getId();
            this.content = chat.getContent();
            this.senderName = chat.getSender().getUsername();
            this.chatRoomId = chat.getChatRoom().getId();
            this.createdDate = chat.getCreatedDate();
            this.isOwner = false;
        }

        public void markOwner(String username) {
            if (senderName.equals(username)) {
                isOwner = true;
            }
        }

        @Builder
        public Response(Long id, String content, String senderName, Long chatRoomId, LocalDateTime createdDate) {
            this.id = id;
            this.content = content;
            this.senderName = senderName;
            this.chatRoomId = chatRoomId;
            this.createdDate = createdDate;
        }
    }
}
