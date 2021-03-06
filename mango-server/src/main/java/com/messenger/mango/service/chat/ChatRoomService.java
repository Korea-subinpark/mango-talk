package com.messenger.mango.service.chat;

import com.messenger.mango.common.exception.NotFoundException;
import com.messenger.mango.domain.chat.ChatRoom;
import com.messenger.mango.domain.chat.ChatRoomRepository;
import com.messenger.mango.domain.chat.ChatRoomUser;
import com.messenger.mango.domain.chat.ChatRoomUserRepository;
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
@Transactional(readOnly = true)
public class ChatRoomService {

    private final UserService userService;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomUserRepository chatRoomUserRepository;

    public List<ChatRoomDto.ListResponse> getChatRoomDtoList(String username) {
        List<ChatRoom> chatRoomList = getChatRoomList(username);
        return chatRoomList.stream()
                .map(ChatRoomDto.ListResponse::new)
                .collect(Collectors.toList());
    }

    public List<ChatRoom> getChatRoomList(String username) {
        User user = (User) userService.loadUserByUsername(username);
        return chatRoomUserRepository.findByUserId(user.getId()).stream()
                .map(ChatRoomUser::getChatRoom)
                .collect(Collectors.toList());
    }

    public ChatRoomDto.Response getChatRoom(Long id) {
        ChatRoom chatRoom = findById(id);

        return new ChatRoomDto.Response(chatRoom);
    }

    public ChatRoom findById(Long id) {
        return chatRoomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("해당 채팅방이 없습니다. id=" + id));
    }

    @Transactional
    public Long save(ChatRoomDto.SaveRequest request, String currentUsername) {
        List<ChatRoomUser> users = request.getUserNames().stream()
                .map(username -> (User) userService.loadUserByUsername(username))
                .map(ChatRoomUser::new)
                .collect(Collectors.toList());

        String defaultChatRoomName = users.stream()
                .map(user -> user.getUser().getUsername())
                .filter(username -> !username.equals(currentUsername))
                .collect(Collectors.joining(", "));

        ChatRoom chatRoom = ChatRoom.builder()
                .name(defaultChatRoomName)
                .users(users)
                .build();

        for (ChatRoomUser chatRoomUser : users) {
            chatRoomUser.setChatRoom(chatRoom);
            chatRoomUserRepository.save(chatRoomUser);
        }

        return chatRoomRepository.save(chatRoom)
                .getId();
    }
}

