package com.messenger.mango.service.chat;

import com.messenger.mango.common.exception.NotFoundException;
import com.messenger.mango.domain.chat.ChatRoom;
import com.messenger.mango.service.users.UserService;
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
class ChatRoomServiceTest {

    @Autowired
    ChatRoomService chatRoomService;
    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    static final String username = "chatRoomTester";
    static final String password = "qwe123";

    @Test
    @DisplayName("채팅방 저장")
    void saveTest() {
        // given
        testUserCreate();
        List<String> userList = new ArrayList<>();
        userList.add(username);

        ChatRoomDto.SaveRequest request = ChatRoomDto.SaveRequest.builder()
                .userNames(userList)
                .build();

        // when
        Long chatRoomId = chatRoomService.save(request, username);

        // then
        ChatRoom chatRoom = chatRoomService.findById(chatRoomId);
        assertEquals(chatRoomId, chatRoom.getId());

        ChatRoomDto.Response response = chatRoomService.getChatRoom(chatRoomId);
        assertEquals(chatRoomId, response.getId());

        List<ChatRoom> chatRoomList = chatRoomService.getChatRoomList(username);
        assertEquals(chatRoomId, chatRoomList.get(0).getId());

        List<ChatRoomDto.ListResponse> chatRoomDtoList = chatRoomService.getChatRoomDtoList(username);
        assertEquals(chatRoomId, chatRoomDtoList.get(0).getId());
    }

    @Test
    @DisplayName("채팅방, 없는 ID 조회")
    void getWrongIDTest() {
        // given
        Long id = 2L;

        // when
        // then
        assertThrows(NotFoundException.class, () -> {
            chatRoomService.findById(id);
        });
    }

    private void testUserCreate() {
        UserDto.SaveRequest request = UserDto.SaveRequest.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .build();
        userService.save(request);
    }

}