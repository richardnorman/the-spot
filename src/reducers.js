import {
    ADD_SPOT,
    CHANGE_SEARCH
} from './constants';

const initialStateSpotList = {
    spotList: []
}

export const modifySpotList = (state = initialStateSpotList, action) => {
    switch (action.type) {
        case ADD_SPOT:
            return {...state, spotList: action.payload};
        default:
            return state;
    }
}

const initialSearchText = {
    searchText: ''
};

export const changeSearch = (state = initialSearchText, action) => {
    switch (action.type) {
        case CHANGE_SEARCH:
            return {...state, searchText: action.payload};
        default:
            return state;
    }
}