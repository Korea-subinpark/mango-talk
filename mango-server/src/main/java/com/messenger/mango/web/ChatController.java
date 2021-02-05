package com.messenger.mango.web;

import com.messenger.mango.domain.users.User;
import com.messenger.mango.service.chat.ChatService;
import com.messenger.mango.web.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate template;

    @MessageMapping("/chat")
    public void send(ChatDto.SaveRequest request, @AuthenticationPrincipal User user) {
        System.out.println(user.getUsername());
        chatService.send(request, user.getUsername());

        Long chatRoomId = request.getChatRoomId();
        ChatDto.Response response = ChatDto.Response.builder()
                .content(request.getContent())
                .senderName(user.getUsername())
                .chatRoomId(chatRoomId)
                .build();

        template.convertAndSend("/topic/chat/" + chatRoomId, response);
    }
}
