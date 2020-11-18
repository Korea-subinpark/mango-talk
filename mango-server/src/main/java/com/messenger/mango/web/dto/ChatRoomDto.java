package com.messenger.mango.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class ChatRoomDto {

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
