import { applyMiddleware } from 'redux';
import { createInjectStore } from 'redux-injector';
import logger from 'redux-logger'
import PromiseMiddleware from '../middleware/PromoseMiddleware';
var thunkMiddleware = require('redux-thunk').default;

export default function configureStore(preloadedState, rootReducer) {
    const magicPromiseMiddleware = PromiseMiddleware();
    const middleware = applyMiddleware(thunkMiddleware, magicPromiseMiddleware, logger);
    const store = createInjectStore(rootReducer, preloadedState, middleware);
    return store;
}
