import * as React from "react";

// 타겟 엘리먼트의 value를 boolean 타입으로 표시하는 이벤트 핸들러
export function handleBooleanChange(handler: (checked: boolean) => void) {
    return (event: React.FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).checked);
}

// 타겟 엘리먼트의 value를 string 타입으로 표시하는 이벤트 핸들러
export function handleStringChange(handler: (value: string) => void) {
    return (event: React.FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).value);
}

// 타겟 엘리먼트의 value를 number 타입으로 표시하는 이벤트 핸들러
export function handleNumberChange(handler: (value: number) => void) {
    return handleStringChange(value => handler(parseInt(value)));
}