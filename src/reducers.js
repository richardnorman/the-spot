import {
    ADD_SPOT,
    CHANGE_SEARCH,
    UPDATE_SPOT,
    REMOVE_SPOT,
    CHANGE_CURRENT_USER,
    SET_SPOT_LIST
} from './constants';

//for now before DB integration

const findObjectByTitleReturnIndex = (list, object) => {
    let index = 0;
    for (let spot of list) {
        if(spot.title === object.title) {
            break;
        }
        else {
            index++;
        }
    }
    return index;
}

const initialStateSpotList = {
    spotList: []
}

export const modifySpotList = (state = initialStateSpotList, action) => {
    switch (action.type) {
        case ADD_SPOT:
            return {...state, spotList: [action.payload, ...state.spotList]};
        case UPDATE_SPOT:
            let updatedList = state.spotList;
            const updateAtIndex = findObjectByTitleReturnIndex(state.spotList, action.payload);
            updatedList[updateAtIndex] = action.payload;
            return {...state, spotList: updatedList};
        case REMOVE_SPOT:
            let removedList = state.spotList;
            const removeAtIndex = findObjectByTitleReturnIndex(state.spotList, action.payload);
            removedList.splice(removeAtIndex, 1);
            return {...state, spotList: removedList}
        case SET_SPOT_LIST:
            return {...state, spotList: action.payload}
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

const initialCurrentUser = {
    currentUserEmail: ''
};

export const changeCurrentUser = (state = initialCurrentUser, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_USER:
            return {...state, currentUserEmail: action.payload}
        default:
            return state;
    }
}