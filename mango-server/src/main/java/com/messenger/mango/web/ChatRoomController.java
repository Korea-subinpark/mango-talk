package com.messenger.mango.web;

import com.messenger.mango.service.chat.ChatRoomService;
import com.messenger.mango.web.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/chatRoom")
@RestController
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping
    public List<ChatRoomDto.ListResponse> getChatRoomList(@RequestBody String username) {
        return chatRoomService.getChatRoomList(username);
    }

    @PostMapping
    public Long save(@RequestBody ChatRoomDto.SaveRequest request) {
        return chatRoomService.save(request);
    }
}
