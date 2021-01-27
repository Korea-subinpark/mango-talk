package com.messenger.mango.web;

import com.messenger.mango.domain.users.User;
import com.messenger.mango.service.chat.ChatRoomService;
import com.messenger.mango.web.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/chatRoom")
@RestController
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping
    public Map<Long, ChatRoomDto.ListResponse> getChatRoomList(@AuthenticationPrincipal User user) {
        List<ChatRoomDto.ListResponse> chatRoomList = chatRoomService.getChatRoomDtoList(user.getUsername());

        Map<Long, ChatRoomDto.ListResponse> response = new HashMap<>();
        for (ChatRoomDto.ListResponse listResponse : chatRoomList) {
            response.put(listResponse.getId(), listResponse);
        }

        return response;
    }

    @GetMapping("/{id}")
    public ChatRoomDto.Response getChatRoom(@PathVariable Long id) {
        return chatRoomService.getChatRoom(id);
    }

    @PostMapping
    public Long save(@RequestBody ChatRoomDto.SaveRequest request, @AuthenticationPrincipal User user) {
        return chatRoomService.save(request, user.getUsername());
    }
}
