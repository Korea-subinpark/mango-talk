package com.messenger.mango.service.post;

import com.messenger.mango.common.exception.PostNotFoundException;
import com.messenger.mango.domain.post.Post;
import com.messenger.mango.domain.post.PostRepository;
import com.messenger.mango.web.dto.PostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public List<PostDto.ListResponse> findAllDesc() {
        return postRepository.findAllDesc().stream()
                .map(PostDto.ListResponse::new)
                .collect(Collectors.toList());
    }

    public PostDto.Response findById(Long id) {
        Post entity = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("해당 게시글이 없습니다. id=" + id));

        return new PostDto.Response(entity);
    }

    @Transactional
    public Long save(PostDto.SaveRequest requestDto) {
        return postRepository.save(requestDto.toEntity())
                .getId();
    }

    @Transactional
    public Long update(Long id, PostDto.UpdateRequest requestDto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("해당 게시글이 없습니다. id=" + id));

        post.update(requestDto.getTitle(), requestDto.getContent());
        return id;
    }

    @Transactional
    public void delete(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("해당 게시글이 없습니다. id=" + id));

        postRepository.delete(post);
    }

}
