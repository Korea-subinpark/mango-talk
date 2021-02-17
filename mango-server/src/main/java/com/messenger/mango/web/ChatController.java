package com.messenger.mango.web;

import com.messenger.mango.service.chat.ChatService;
import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate template;
    private final UserService userService;

    @MessageMapping("/chat")
    public void send(ChatDto.SaveRequest request, StompHeaderAccessor accessor) {
        String username = accessor.getUser().getName();
        chatService.send(request, username);

        Long chatRoomId = request.getChatRoomId();
        ChatDto.Response response = ChatDto.Response.builder()
                .content(request.getContent())
                .senderName(username)
                .chatRoomId(chatRoomId)
                .build();

        template.convertAndSend("/topic/chat/" + chatRoomId, response);
    }
}
