import { combineReducers } from 'redux';

// import ReduxPromise from 'redux-promise';
//import createstore for redux
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk'
import auth from './LoginReducer';

 
const AppReducers = combineReducers({
        auth
});

const rootReducer = (state, action) => {
	return AppReducers(state,action);
}
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;