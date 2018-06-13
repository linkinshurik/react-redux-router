import { handleActions } from "redux-actions";
import state from "./state";
import {
    CONSTANT_FULFILLED,
    AUTH_FULFILLED
} from "./actionTypes";

export default handleActions(
    {
        [CONSTANT_FULFILLED]: (state, action) => {
        return {
            ...state,
            data: action.payload
            }
        },
        [AUTH_FULFILLED]: (state, action) => {
            return {
                ...state,
                auth: true,
                profile: action.payload.data
            }
        }
    }, state
);
