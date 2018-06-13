import { createAction } from 'redux-actions';
import axios from 'axios';
    
import {
    CONSTANT,
    AUTH
} from './actionTypes';

const URL = 'http://127.0.0.1:8080/'

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

export const Authenticate = createAction(AUTH, async (login, pass) => {
    try {
        return axios.get( URL + 'login/?login=' + login + '&passwd=' + pass )
    }
    catch(err) {
        return Promise.reject(err);
    }
})