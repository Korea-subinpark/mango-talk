import {useReducer, useEffect} from 'react';

function reducer(state: any, action: any) {
    switch (action.type) {
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case "ERROR":
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(action.type);
    }
}

// deps는 useEffect의 두 번째 파라미터인 deps에 전달하는 데이터. 비동기 함수가 파라미터를 필요로하고, 파라미터가 바뀔 때마다 새로운 데이터를
// 불러오고 싶은 경우에 deps를 사용. 의존성 데이터
function useAsync(callback: () => any, deps = []) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });
    const fetchData = async () => {
        dispatch({ type: "LOADING" });
        try {
            const data = await callback();
            dispatch({ type: "SUCCESS", data });
        } catch (e) {
            dispatch({ type: "ERROR", error: e });
        }
    };
    useEffect(() => {
        fetchData();
    }, deps);
    return [state, fetchData];
}

export default useAsync;