package com.messenger.mango.web;

import com.messenger.mango.service.post.PostService;
import com.messenger.mango.web.dto.PostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/post")
@RestController
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<PostDto.ListResponse> findAllDesc() {
        return postService.findAllDesc();
    }

    @GetMapping("/{id}")
    public PostDto.Response findById(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping
    public Long save(@RequestBody PostDto.SaveRequest requestDto) {
        return postService.save(requestDto);
    }

    @PutMapping("/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostDto.UpdateRequest requestDto) {
        return postService.update(id, requestDto);
    }

    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        postService.delete(id);
        return id;
    }
}
