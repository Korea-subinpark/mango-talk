package com.messenger.mango.domain.chat;

import com.messenger.mango.domain.users.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;

@Getter
@NoArgsConstructor
@Entity
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "user")
    private List<ChatRoomUser> users = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom", cascade = ALL)
    private List<Chat> chats = new ArrayList<>();

    @Builder
    public ChatRoom(Long id, String name, List<ChatRoomUser> users, List<Chat> chats) {
        this.id = id;
        this.name = name;
        this.users = users;
        this.chats = chats;
    }
}
