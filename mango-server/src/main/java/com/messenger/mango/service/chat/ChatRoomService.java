package com.messenger.mango.service.chat;

import com.messenger.mango.common.exception.NotFoundException;
import com.messenger.mango.domain.chat.ChatRoom;
import com.messenger.mango.domain.chat.ChatRoomRepository;
import com.messenger.mango.domain.users.User;
import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final UserService userService;
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoom findById(Long id) {
        return chatRoomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("해당 채팅방이 없습니다. id=" + id));
    }

    @Transactional
    public Long save(ChatRoomDto.SaveRequest request) {
        List<User> users = request.getUsers().stream()
                .map(username -> (User) userService.loadUserByUsername(username))
                .collect(Collectors.toList());

        ChatRoom chatRoom = ChatRoom.builder()
                .users(users)
                .build();

        return chatRoomRepository.save(chatRoom)
                .getId();
    }

}
