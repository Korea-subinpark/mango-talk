package com.messenger.mango.domain.post;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostRepositoryTest {

    @Autowired
    PostRepository postRepository;

    @After
    public void cleanup() {
        postRepository.deleteAll();
    }

    @Test
    public void 게시글저장() {
        // given
        String title = "title";
        String content = "content";

        Post post = Post.builder()
                .title(title)
                .content(content)
                .author("abc@abc.com")
                .build();

        postRepository.save(post);

        // when
        List<Post> list = postRepository.findAll();


        // then
        Post result = list.get(0);
        assertThat(post.getTitle()).isEqualTo(title);
        assertThat(post.getContent()).isEqualTo(content);
    }

    @Test
    public void BaseTimeEntity_등록() {
        // given
        String title = "test title";
        String content = "test content";
        String author = "test author";
        LocalDateTime now = LocalDateTime.of(2020, 9, 11, 0, 0, 0);
        postRepository.save(Post.builder()
                .title(title)
                .content(content)
                .author(author)
                .build());

        // when
        List<Post> all = postRepository.findAll();

        // then
        Post post = all.get(0);

        System.out.println(">>>>>>>>>>>>>>> createdDate=" + post.getCreatedDate() + ", modifiedDate=" + post.getModifiedDate());

        assertThat(post.getCreatedDate()).isAfter(now);
        assertThat(post.getModifiedDate()).isAfter(now);
    }

}
