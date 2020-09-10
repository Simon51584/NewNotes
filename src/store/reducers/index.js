import {combineReducers} from 'redux';
import notesReducer from './notesReducer';

//alises notesReducer file underneath this one as notePad.

const rootReducer = combineReducers({notePad: notesReducer});

export default rootReducer;