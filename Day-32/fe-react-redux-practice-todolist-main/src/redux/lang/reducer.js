import {CHANGE_LANG} from "./actions";

const initialState = {
    lang: "EN"
}

const langReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            return {
                ...state,
                lang: action.payload
        }
        default:
            return state;
    }
}

export default langReducer;