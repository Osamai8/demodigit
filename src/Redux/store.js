import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

// const customMiddleware = (state) => (next) => (action) => {
//   return typeof action === "function"
//     ? action(store.dispatch, store.getState)
//     : next(action);
// };

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
