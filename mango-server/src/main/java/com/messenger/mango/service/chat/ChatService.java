package com.messenger.mango.service.chat;

import com.messenger.mango.domain.chat.Chat;
import com.messenger.mango.domain.chat.ChatRepository;
import com.messenger.mango.domain.users.User;
import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;

    // TODO 푸시알람 구현
    /** 채팅을 전송하는 함수 */
    @Transactional
    public Long send(ChatDto.SaveRequest request) {
        User sender = (User) userService.loadUserByUsername(request.getSenderName());
        User receiver = (User) userService.loadUserByUsername(request.getReceiverName());

        Chat chat = Chat.builder()
                .sender(sender)
                .receiver(receiver)
                .content(request.getContent())
                .status(false)
                .build();

        return chatRepository.save(chat)
                .getId();
    }
}
