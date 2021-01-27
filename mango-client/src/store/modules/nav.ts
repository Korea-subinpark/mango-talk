// action type
const CHANGE_NAVBAR_TAB_ID = 'nav/CHANGE_NAVBAR_TAB_ID';

// module state
const initialState = {
    navbarTabId: "chat-list"
};

// 소켓 생성
export const setNavbarTabId = (navbarTabId: any) => ({
    type: CHANGE_NAVBAR_TAB_ID,
    payload: navbarTabId
});

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case CHANGE_NAVBAR_TAB_ID:
            state.navbarTabId = action.payload;
            return { navbarTabId: action.payload };
        default:
            return state;
    }
}
