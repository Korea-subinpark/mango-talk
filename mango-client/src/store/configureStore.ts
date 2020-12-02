import { createStore } from 'redux';
import modules from './modules';

// create store
const configure = () => {
    const store = createStore(modules);
    return store;
}

export default configure;