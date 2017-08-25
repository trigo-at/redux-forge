import {forge, actionCreatorFactory, createMiddleware} from './forge';

const handler = {
    getRequest: {
        next(state, action) {
            return {
                ...state,
                payload: action.payload,
                meta: action.meta,
            };
        },
    },
    get: {
        next(state, action) {
            return {
                ...state,
                payload: action.payload,
                meta: action.meta,
            };
        },
        throw(state, action) {
            return {
                ...state,
                payload: action.payload,
                meta: action.meta,
            };
        },
    },
};

const expectedResult = {
    actions: {
        getRequest: actionCreatorFactory('demo/getRequest'),
        get: actionCreatorFactory('demo/get'),
    },
    types: {
        getRequest: 'demo/getRequest',
        get: 'demo/get',
    },
};

test('forge/types', () => {
    const forged = forge('demo', handler, {});
    expect(forged.types).toMatchObject(expectedResult.types);
});

test('forge/actions', () => {
    const forged = forge('demo', handler, {});
    expect(forged.actions.getRequest.toString()).toBe(
        expectedResult.actions.getRequest.toString()
    );
    expect(forged.actions.get.toString()).toBe(
        expectedResult.actions.get.toString()
    );

    const action = forged.actions.getRequest({gandalf: 42}, {meta: 4});
    expect(action).toMatchObject({
        type: 'demo/getRequest',
        payload: {gandalf: 42},
        meta: {meta: 4},
    });
});

test('forge/reducer', () => {
    const forged = forge('demo', handler, {});
    const action = forged.actions.getRequest({gandalf: 42}, {meta: 4});

    const reduced = forged.reducer(
        {
            payload: {gandalf: 41},
        },
        action
    );
    expect(reduced).toMatchObject({
        payload: {gandalf: 42},
        meta: {meta: 4},
    });
});

test('forge/middleware', () => {
    const forged = forge('demo', handler, {});
    const next = jest.fn();
    const drink = jest.fn();
    const gandalfMiddleware = createMiddleware(
        [forged.actions.getRequest],
        drink
    );
    gandalfMiddleware()(next)({
        type: 'demo/getRequest',
        payload: {gandalf: 42},
        meta: {meta: 4},
    });
    expect(drink).toHaveBeenCalled();
});
