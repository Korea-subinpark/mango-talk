package com.messenger.mango.web;

import com.messenger.mango.service.chat.ChatService;
import com.messenger.mango.web.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/echo")
    @SendTo("/topic/echo")
    public String echo(String message) {
        System.out.println(message);
        return message;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public ChatDto.Response send(ChatDto.SaveRequest request) {
        Long chatRoomId = chatService.send(request);

        return ChatDto.Response.builder()
                .content(request.getContent())
                .senderName(request.getSenderName())
                .chatRoomId(chatRoomId)
                .build();
    }
}
