package com.messenger.mango.web;

import com.messenger.mango.service.chat.ChatRoomService;
import com.messenger.mango.web.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/chat-room")
@RestController
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping
    public Long save(@RequestBody ChatRoomDto.SaveRequest request) {
        return chatRoomService.save(request);
    }
}
