package com.messenger.mango.web;

import com.messenger.mango.service.chat.ChatService;
import com.messenger.mango.web.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/chat")
@RestController
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public Long send(@RequestBody ChatDto.SaveRequest request) {
        return chatService.send(request);
    }
}
