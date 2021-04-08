import chat, * as chatActions from '../chat';

describe('chat', () => {
    describe('actions', () => {
        it('actions 생성', () => {
            const expectedActions = [
                {
                    type: 'chat/CREATE_SOCKET',
                    payload: {}
                }
            ];
            const actions = [
                chatActions.setStompClient({})
            ];
            expect(actions).toEqual(expectedActions);
        });
    });
});