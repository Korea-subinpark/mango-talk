package com.messenger.mango.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    FAIL("요청에 실패했습니다."),
    BAD_PARAMETER("요청 파라미터가 잘못되었습니다."),
    NOT_FOUND("리소스를 찾지 못했습니다."),
    UNAUTHORIZED("인증에 실패했습니다."),
    FORBIDDEN("권한이 없습니다.");

    private final String message;

    public String getCode() {
        return name();
    }

}
