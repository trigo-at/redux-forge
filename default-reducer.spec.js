const {requestReducer, responseReducer} = require('./forge.cjs');

test('forge/requestReducer', () => {
    const state = {};
    const action = {
        payload: 42,
    };
    const newState = requestReducer.next(state, action);
    expect(newState).toMatchObject({
        isLoading: 42,
        hasLoaded: false,
        error: false,
        response: undefined,
    });
});

test('forge/responseReducer', () => {
    const state = {};
    const action = {
        payload: {
            name: 'gandalf',
            resId: 42,
        },
    };
    const newState = responseReducer.next(state, action);
    expect(newState).toMatchObject({
        isLoading: false,
        hasLoaded: true,
        error: false,
        response: {
            name: 'gandalf',
            resId: 42,
        },
    });
});

test('forge/responseReducer error', () => {
    const state = {};
    const action = {
        error: true,
        payload: 'gandalf died',
    };
    const newState = responseReducer.throw(state, action);
    expect(newState).toMatchObject({
        isLoading: false,
        hasLoaded: false,
        error: true,
        response: 'gandalf died',
    });
});
