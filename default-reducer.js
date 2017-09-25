import {identity} from 'ramda';

export const requestReducer = {
    next(state, action) {
        return Object.assign({}, state, {
            isLoading: action.payload || true,
            hasLoaded: false,
            error: false,
            response: undefined,
        });
    },
};

export const transformResponseReducer = transform => {
    return {
        next(state, action) {
            return Object.assign({}, state, {
                response: action.payload,
                isLoading: false,
                hasLoaded: true,
                error: false,
            });
        },
        throw(state, action) {
            return Object.assign({}, state, {
                isLoading: false,
                hasLoaded: false,
                error: true,
                response: transform(action.payload),
            });
        },
    };
};

export const responseReducer = transformResponseReducer(identity);
