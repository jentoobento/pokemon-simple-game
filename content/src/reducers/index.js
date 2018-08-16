import { combineReducers } from 'redux';
import addPokemonReducer from './addPokemonReducer';

export default combineReducers({
    addPokemonReducer: addPokemonReducer
})