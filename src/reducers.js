import {
    ADD_SPOT
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