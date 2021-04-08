import login, * as chatActions from '../login';

describe('login', () => {
    describe('actions', () => {
        it('actions 생성', () => {
            const expectedActions = [
                {
                    type: 'login/LOGIN_SUCCESS',
                    payload: {}
                },
                {
                    type: 'login/INPUT_USERNAME',
                    payload: {}
                },
                {
                    type: 'login/INPUT_PASSWORD',
                    payload: {}
                },
                {
                    type: 'LOGOUT'
                },

            ];
            const actions = [
                chatActions.loginSuccess({}),
                chatActions.setUsername({}),
                chatActions.setPassword({}),
                chatActions.logout()
            ];
            expect(actions).toEqual(expectedActions);
        });
    });
});