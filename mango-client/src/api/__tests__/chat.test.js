import React from 'react';
import {render, wait, waitForElement} from '@testing-library/react';
import * as chat from '../chat.t';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ChatListContainer from "../../containers/ChatListConatiner";

describe('API', () => {
    describe("chat", () => {
        const mock = new MockAdapter(Axios, { delayResponse: 1500 }); // 200ms 가짜 딜레이 설정
        // API 요청에 대하여 응답 미리 정하기
        mock.onGet("http://localhost:8080/mango/v1/chatRoom", "", {
            Accept: "application/json, text/plain, */*",
            Authorization: "Bearer 1"
        })
            .reply(200,
                [{username: 'admin', ellipsis: 'xxx...', lastReceivedDate: '1111-11-11 11:11:11'}]);
        it('getChatRoomList API 응답 테스트', async () => {
            const { getByText } = render(<ChatListContainer token="1" />);
            await waitForElement(() => getByText('로딩 중...'));
            await wait();
            await waitForElement(() => getByText('admin'));
        });
    });
});