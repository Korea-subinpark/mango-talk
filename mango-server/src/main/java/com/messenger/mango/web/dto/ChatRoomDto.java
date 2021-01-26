package com.messenger.mango.web.dto;

import com.messenger.mango.domain.chat.Chat;
import com.messenger.mango.domain.chat.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ChatRoomDto {

    @Getter
    @NoArgsConstructor
    public static class ListResponse {

        private Long id;
        private String username;
        private String ellipsis;
        private LocalDateTime lastReceivedDate;

        public ListResponse(ChatRoom chatRoom) {
            this.id = chatRoom.getId();
            this.username = chatRoom.getName();

            List<Chat> chats = chatRoom.getChats();
            if (chats.size() > 0) {
                Chat lastChat = chats.get(chats.size() - 1);
                this.ellipsis = lastChat.getContent();
                this.lastReceivedDate = lastChat.getCreatedDate();
            }
        }

        @Builder
        public ListResponse(Long id, String username, String ellipsis, LocalDateTime lastReceivedDate) {
            this.id = id;
            this.username = username;
            this.ellipsis = ellipsis;
            this.lastReceivedDate = lastReceivedDate;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class SaveRequest {

        private List<String> userNames;

        @Builder
        public SaveRequest(List<String> userNames) {
            this.userNames = userNames;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private Long id;
        private String username;
        private List<ChatDto.Response> chats;

        public Response(ChatRoom chatRoom) {
            this.id = chatRoom.getId();
            this.username = chatRoom.getName();
            this.chats = chatRoom.getChats().stream()
                    .map(ChatDto.Response::new)
                    .collect(Collectors.toList());
        }
    }
}
