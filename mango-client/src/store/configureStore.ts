import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()


const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)
    return store
}

export default configureStore