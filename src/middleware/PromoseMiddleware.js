import { createAction } from "redux-actions"

const Pending = createAction("PENDING", action => action);
const Fulfilled = createAction("FULFILLED", action => action);
const Rejected = createAction("REJECTED", action => action);

const defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

const uniqueId = () => Math.random().toString(36).substr(2, 9);
const isPromise = (e) => e instanceof Promise;

export default function PromiseMiddleware() {
    const promiseTypeSuffixes = defaultTypes;

    return ref => {
        const { dispatch } = ref;
        return next => action => {
            action.id = uniqueId();
            if (action.payload) {
                if (!isPromise(action.payload) && !isPromise(action.payload.promise)) {
                    return next(action);
                }
            } else {
                return next(action);
            }
            const { type, payload, meta } = action;
            const [
                PENDING,
                FULFILLED,
                REJECTED
            ] = promiseTypeSuffixes;

            const getAction = (newPayload, isRejected) => {
                return Object.assign({
                    type: type + '_' + (isRejected ? REJECTED : FULFILLED)
                }, newPayload ? {
                    payload: newPayload
                } : {}, !!meta ? { meta: meta } : {}, isRejected ? {
                    error: true
                } : {});
            };

            let promise;
            let data;

            if (!isPromise(action.payload) && typeof action.payload === 'object') {
                promise = payload.promise;
                data = payload.data;
            } else {
                promise = payload;
                data = null;
            }

            dispatch(Pending(action));
            var pendingAction = Object.assign(
                {
                    type: type + '_' + PENDING
                },
                !!data ? { payload: data } : {},
                !!meta ? { meta: meta } : {}
            )
            next(pendingAction);

            const handleReject = reason => {
                action.payload["Error"] = reason;
                dispatch(Rejected(action));
                const rejectedAction = getAction(reason, true);
                dispatch(rejectedAction);
                throw reason;
            };

            const handleFulfill = (reason = null) => {
                action.payload["Success"] = getMessage(reason);
                dispatch(Fulfilled(action));
                const resolvedAction = getAction(reason, false);
                dispatch(resolvedAction);
                return { reason, action: resolvedAction };
            };
            return promise.then(handleFulfill, handleReject);
        };
    };
}

var getMessage = (reason) => {
    if (!reason) {
        return;
    }
    let result = null;
    let processedReason = reason;

    if (reason && reason.length && processedReason.forEach) {
        processedReason.forEach(o => {
            if (o && o.status === 206) {
                result = {
                    data: o["data"],
                    status: o["status"],
                    message: o["headers"]["message"]
                }
            }
        });

        processedReason = reason[0];
    }

    if (result != null) {
        return result;
    }

    if (processedReason.status === 201 && processedReason["headers"]) {
        return processedReason["headers"]["message"];
    }
}
