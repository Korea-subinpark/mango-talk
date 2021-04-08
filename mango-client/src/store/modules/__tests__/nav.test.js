import nav, * as navActions from '../nav';

describe('nav', () => {
    describe('actions', () => {
        it('actions 생성', () => {
            const expectedActions = [
                {
                    type: 'nav/CHANGE_NAVBAR_TAB_ID',
                    payload: {}
                }
            ];
            const actions = [
                navActions.setNavbarTabId({})
            ];
            expect(actions).toEqual(expectedActions);
        });
    });
});