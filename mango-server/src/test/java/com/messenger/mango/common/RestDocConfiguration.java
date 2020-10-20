package com.messenger.mango.common;

import org.springframework.boot.test.autoconfigure.restdocs.RestDocsMockMvcConfigurationCustomizer;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentationConfigurer;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;

public class RestDocConfiguration implements RestDocsMockMvcConfigurationCustomizer {
    @Override
    public void customize(MockMvcRestDocumentationConfigurer configurer) {
        configurer.operationPreprocessors()
                .withRequestDefaults(prettyPrint()) // request를 보기 좋게 출력
                .withResponseDefaults(prettyPrint()); // response를 보기 좋게 출력
    }
}
