package com.messenger.mango.service.users;

import com.messenger.mango.domain.chat.ChatRoom;
import com.messenger.mango.domain.chat.ChatRoomUser;
import com.messenger.mango.domain.users.User;
import com.messenger.mango.domain.users.UserRepository;
import com.messenger.mango.web.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public List<ChatRoom> getChatRoomList(String username) {
        User user = (User) loadUserByUsername(username);
        return user.getChatRooms().stream()
                .map(ChatRoomUser::getChatRoom)
                .collect(Collectors.toList());
    }

    public List<Long> getChatRoomIdList(String username) {
        return getChatRoomList(username).stream()
                .map(chatRoom -> chatRoom.getId())
                .collect(Collectors.toList());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("해당 계정이 없습니다. username=" + username));
    }

    @Transactional
    public Long save(UserDto.SaveRequest requestDto) {
        if (userRepository.findByUsername(requestDto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("중복된 아이디입니다. username=" + requestDto.getUsername());
        }

        return userRepository.save(requestDto.toEntity())
                .getId();
    }
}
