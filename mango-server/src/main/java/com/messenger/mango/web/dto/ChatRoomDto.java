package com.messenger.mango.web.dto;

import com.messenger.mango.domain.chat.ChatRoom;
import com.messenger.mango.domain.users.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

public class ChatRoomDto {

    @Getter
    @NoArgsConstructor
    public static class ListResponse {

        private Long id;
        private String name;
        private List<User> users;

        public ListResponse(ChatRoom chatRoom) {
            this.id = chatRoom.getId();
            this.name = chatRoom.getName();
            this.users = chatRoom.getUsers().stream()
                    .map(user -> user.getUser())
                    .collect(Collectors.toList());
        }

        @Builder
        public ListResponse(Long id, String name, List<User> users) {
            this.id = id;
            this.name = name;
            this.users = users;
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
}
