import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './reducers/home';
import sprint from './reducers/sprint';
import story from './reducers/story';
import task from './reducers/task';
import cardInputForm from './reducers/cardInputForm';

export default combineReducers({
    home,
    sprint,
    story,
    task,
    cardInputForm,
    router: routerReducer
});