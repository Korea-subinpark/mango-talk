package com.messenger.mango.domain.chat;

import com.messenger.mango.domain.BaseTimeEntity;
import com.messenger.mango.domain.users.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Getter
@NoArgsConstructor
@Entity
public class Chat extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    private User sender;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    private String content;

    private boolean status;

    @Builder
    public Chat(Long id, User sender, ChatRoom chatRoom, String content, boolean status) {
        this.id = id;
        this.sender = sender;
        this.chatRoom = chatRoom;
        this.content = content;
        this.status = status;
    }
}
