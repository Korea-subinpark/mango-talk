package com.messenger.mango.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/mango");
        config.setApplicationDestinationPrefixes("/mango");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) { // endpoint를 등록하여 WS 사용이 불가능한 경우 대체 전송을 사용할 수 있도록 SockJS 풀백 옵션 활성화
        registry.addEndpoint("/")
                .setAllowedOrigins("*")
                .withSockJS();
    }
}
