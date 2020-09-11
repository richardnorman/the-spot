import {
    ADD_SPOT, 
    CHANGE_SEARCH, 
    UPDATE_SPOT, 
    REMOVE_SPOT, 
    CHANGE_CURRENT_USER,
    SET_SPOT_LIST
} from './constants';

export const addSpot = spot => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
}

export const updateSpot = spot => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
}

export const removeSpot = spot => {
    return {
        type: REMOVE_SPOT,
        payload: spot
    }
}

export const setSpotList = spotList => {
    return {
        type: SET_SPOT_LIST,
        payload: spotList
    }
}

export const changeSearch = searchText => {
    return {
        type: CHANGE_SEARCH,
        payload: searchText
    }
}

export const changeCurrentUser = currentUserEmail => {
    return {
        type: CHANGE_CURRENT_USER,
        payload: currentUserEmail
    }
}