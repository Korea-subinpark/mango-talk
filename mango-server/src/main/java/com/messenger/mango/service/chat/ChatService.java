package com.messenger.mango.service.chat;

import com.messenger.mango.common.exception.NotFoundException;
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
@Transactional(readOnly = true)
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final ChatRoomService chatRoomService;

    public Chat findById(Long id) {
        return chatRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("해당 채팅이 없습니다. id=" + id));
    }

    // TODO 푸시알람 구현
    /** 채팅을 전송하는 함수 */
    @Transactional
    public Long send(ChatDto.SaveRequest request, String username) {
        User sender = (User) userService.loadUserByUsername(username);
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
