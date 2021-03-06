import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import userReducer from "./user";
import songReducer from "./song";
import commentReducer from "./comment";
import playlistReducer from "./playlist";
import albumReducer from "./album"


const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  user: userReducer,
  song: songReducer,
  comment: commentReducer,
  playlist: playlistReducer,
  album: albumReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
