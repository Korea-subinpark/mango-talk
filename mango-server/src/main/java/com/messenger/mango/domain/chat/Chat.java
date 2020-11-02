package com.messenger.mango.domain.chat;

import com.messenger.mango.domain.BaseTimeEntity;
import com.messenger.mango.domain.users.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Chat extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User receiver;

    private String content;

    private boolean status;

    @Builder
    public Chat(Long id, User sender, User receiver, String content, boolean status) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.status = status;
    }
}
