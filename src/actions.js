import {
    ADD_SPOT, CHANGE_SEARCH
} from './constants';

export const addSpot = spot => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
}

export const changeSearch = searchText => {
    return {
        type: CHANGE_SEARCH,
        payload: searchText
    }
}