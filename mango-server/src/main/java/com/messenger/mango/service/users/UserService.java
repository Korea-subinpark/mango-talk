package com.messenger.mango.service.users;

import com.messenger.mango.domain.users.UserRepository;
import com.messenger.mango.web.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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

        UserDto.SaveRequest encodedRequestDto = UserDto.SaveRequest.builder()
                .username(requestDto.getUsername())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .build();

        return userRepository.save(encodedRequestDto.toEntity())
                .getId();
    }
}
