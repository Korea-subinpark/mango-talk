package com.messenger.mango.web;

import com.messenger.mango.domain.users.User;
import com.messenger.mango.service.chat.ChatService;
import com.messenger.mango.web.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/chat")
@RestController
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate template;

    @MessageMapping("/chat")
    public void send(ChatDto.SaveRequest request, StompHeaderAccessor accessor) {
        String username = accessor.getUser().getName();
        Long chatId = chatService.save(request, username);

        Long chatRoomId = request.getChatRoomId();
        ChatDto.Response response = chatService.getChat(chatId);

        template.convertAndSend("/topic/chat/" + chatRoomId, response);
    }

    @GetMapping("/{id}")
    public ChatDto.Response getChat(@PathVariable Long id, @AuthenticationPrincipal User user) {
        ChatDto.Response chat = chatService.getChat(id);
        chat.markOwner(user.getUsername());

        return chat;
    }
}
