import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';


export default (initialState = {}, context = {}) => {
  const enhancers = [];
  const middleware = [thunk];

  const devToolsExtension = context.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  );

  if (module.hot) {
    module.hot.accept('./modules/index', () => {
      const reducer = require('./modules/index');
      store.replaceReducer(reducer.__esModule ? reducer.default : reducer);
    });
  }

  return store;
};
