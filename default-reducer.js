const identity = x => x;

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

export const transformResponseReducer = (transform = identity) => {
    return {
        next(state, action) {
            return Object.assign({}, state, {
                response: transform(action.payload),
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
                response: action.payload,
            });
        },
    };
};

export const responseReducer = transformResponseReducer();
