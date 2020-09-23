package com.messenger.mango.service.posts;

import com.messenger.mango.common.exception.PostsNotFoundException;
import com.messenger.mango.domain.posts.Posts;
import com.messenger.mango.domain.posts.PostsRepository;
import com.messenger.mango.web.dto.PostsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostsService {

    private final PostsRepository postsRepository;

    @Transactional(readOnly = true)
    public List<PostsDto.ListResponse> findAllDesc() {
        return postsRepository.findAllDesc().stream()
                .map(PostsDto.ListResponse::new)
                .collect(Collectors.toList());
    }

    public PostsDto.Response findById(Long id) {
        Posts entity = postsRepository.findById(id)
                .orElseThrow(() -> new PostsNotFoundException("해당 게시글이 없습니다. id=" + id));

        return new PostsDto.Response(entity);
    }

    @Transactional
    public Long save(PostsDto.SaveRequest requestDto) {
        return postsRepository.save(requestDto.toEntity())
                .getId();
    }

    @Transactional
    public Long update(Long id, PostsDto.UpdateRequest requestDto) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new PostsNotFoundException("해당 게시글이 없습니다. id=" + id));

        posts.update(requestDto.getTitle(), requestDto.getContent());
        return id;
    }

    @Transactional
    public void delete(Long id) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new PostsNotFoundException("해당 게시글이 없습니다. id=" + id));

        postsRepository.delete(posts);
    }

}
