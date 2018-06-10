import { createAction } from 'redux-actions';
    
import {
    CONSTANT,
    AUTH
} from './actionTypes';;


export const SimpleAction = createAction(CONSTANT, async () => {
    try {
        const result = await new Promise(res => setTimeout(() => {
            res('response')
        }, 1000))
        return Promise.all([result]);
    }
    catch (err) {
        return Promise.reject(err);
    }
});

export const Authenticate = createAction(AUTH, async (val) => {
    try {
        const result = await new Promise(res => setTimeout(() => {
            res(val)
        }, 1000))
        return Promise.resolve(result)
    }
    catch(err) {
        return Promise.reject(err);
    }
})