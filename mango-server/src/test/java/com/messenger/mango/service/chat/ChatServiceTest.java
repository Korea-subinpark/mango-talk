package com.messenger.mango.service.chat;

import com.messenger.mango.common.exception.NotFoundException;
import com.messenger.mango.domain.chat.Chat;
import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.ChatDto;
import com.messenger.mango.web.dto.ChatRoomDto;
import com.messenger.mango.web.dto.UserDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ChatServiceTest {

    @Autowired
    ChatService chatService;
    @Autowired
    UserService userService;
    @Autowired
    ChatRoomService chatRoomService;
    @Autowired
    PasswordEncoder passwordEncoder;

    static final String username = "chatTester";
    static final String password = "qwe123";

    @Test
    @DisplayName("채팅 저장")
    void saveTest() {
        // given
        Long chatRoomId = testCreate();
        ChatDto.SaveRequest request = ChatDto.SaveRequest.builder().chatRoomId(chatRoomId).content("hello").build();

        // when
        Long chatId = chatService.save(request, username);

        //then
        Chat chat = chatService.findById(chatId);
        assertEquals(chatId, chat.getId());

        ChatDto.Response response = chatService.getChat(chatId);
        assertEquals(chatId, response.getId());
    }

    @Test
    @DisplayName("채팅 오너 표시")
    void ownerTest() {
        // given
        List<ChatDto.Response> chatList = new ArrayList<>();

        ChatDto.Response response1 = ChatDto.Response.builder()
                .senderName(username)
                .build();

        ChatDto.Response response2 = ChatDto.Response.builder()
                .senderName("test")
                .build();

        chatList.add(response1);
        chatList.add(response2);

        // when
        chatService.markOwnerToChat(chatList, username);

        // then
        assertEquals(Boolean.TRUE, chatList.get(0).isOwner());
        assertEquals(Boolean.FALSE, chatList.get(1).isOwner());
    }

    @Test
    @DisplayName("채팅, 없는 ID 조회")
    void getWrongIDTest() {
        // given
        Long id = 2L;

        // when
        // then
        assertThrows(NotFoundException.class, () -> {
            chatService.findById(id);
        });
    }

    private Long testCreate() {
        UserDto.SaveRequest request = UserDto.SaveRequest.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .build();
        userService.save(request);

        List<String> userName = new ArrayList<>();
        userName.add(username);
        ChatRoomDto.SaveRequest saveRequest = ChatRoomDto.SaveRequest.builder().userNames(userName).build();
        return chatRoomService.save(saveRequest, username);
    }

}