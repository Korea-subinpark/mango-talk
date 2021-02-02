package com.messenger.mango.service.chat;

import com.messenger.mango.domain.chat.Chat;
import com.messenger.mango.domain.chat.ChatRepository;
import com.messenger.mango.domain.chat.ChatRoom;
import com.messenger.mango.domain.users.User;
import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final ChatRoomService chatRoomService;

    // TODO 푸시알람 구현
    /** 채팅을 전송하는 함수 */
    @Transactional
    public Long send(ChatDto.SaveRequest request) {
        User sender = (User) userService.loadUserByUsername(request.getSenderName());
        ChatRoom chatRoom = chatRoomService.findById(request.getChatRoomId());

        Chat chat = Chat.builder()
                .sender(sender)
                .chatRoom(chatRoom)
                .content(request.getContent())
                .status(false)
                .build();

        return chatRepository.save(chat)
                .getId();
    }

    public void markOwnerToChat(List<ChatDto.Response> chats, String username) {
        for (ChatDto.Response chat : chats) {
            chat.markOwner(username);
        }
    }
}
