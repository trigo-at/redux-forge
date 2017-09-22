export const actionCreatorFactory = type => {
    const typeString = type.toString();
    const actionCreator = (payload, meta) => {
        const action = {type, payload, meta};
        if (payload instanceof Error) {
            action.error = true;
        }
        return action;
    };
    actionCreator.toString = () => typeString;
    return actionCreator;
};

const errorAware = (handler, state, action) => {
    if (action.error && handler.throw) {
        return handler.throw(state, action);
    }
    return handler.next(state, action);
};

export const forge = (name, handlers, initialState = {}) => {
    if (name.includes('/')) {
        throw Error(
            '"/" not allowed in "name". Its used as namespace separator.'
        );
    }
    const actions = Object.keys(handlers).reduce(
        (acc, key) =>
            Object.assign(acc, {[key]: actionCreatorFactory(`${name}/${key}`)}),
        {}
    );

    const reducer = (state = initialState, action) => {
        const [module, type] = action.type.split('/');
        const handlerType = module === name ? type : action.type;
        if (!handlers[handlerType]) {
            return state;
        }
        return errorAware(handlers[handlerType], state, action);
    };

    const types = Object.keys(actions).reduce(
        (acc, key) => Object.assign(acc, {[key]: actions[key].toString()}),
        {}
    );
    return {actions, types, reducer};
};

export const createMiddleware = (
    actionCreators,
    fn
) => store => next => action => {
    const actionTypes = actionCreators.map(acc => acc.toString());
    if (actionTypes.includes(action.type)) {
        fn(store, next, action);
        return;
    }
    next(action);
};

export * from './default-reducer';
