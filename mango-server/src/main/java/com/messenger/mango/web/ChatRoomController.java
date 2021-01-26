package com.messenger.mango.web;

import com.messenger.mango.common.jwt.JwtTokenProvider;
import com.messenger.mango.service.chat.ChatRoomService;
import com.messenger.mango.web.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/chatRoom")
@RestController
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public Map<Long, ChatRoomDto.ListResponse> getChatRoomList(HttpServletRequest request) {
        String token = jwtTokenProvider.resolveToken(request);
        String username = jwtTokenProvider.getUsername(token);
        List<ChatRoomDto.ListResponse> chatRoomList = chatRoomService.getChatRoomList(username);

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
    public Long save(@RequestBody ChatRoomDto.SaveRequest request, HttpServletRequest httpRequest) {
        String token = jwtTokenProvider.resolveToken(httpRequest);
        String username = jwtTokenProvider.getUsername(token);
        return chatRoomService.save(request, username);
    }
}
