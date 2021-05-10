import { combineReducers } from "redux";

function categories(state = [], action) {

    switch (action.type) {
        case "SET_CATEGORIES":
            return {
                ...state,
                category: action.payload
            }
        default:
            return state;
    }
}

function status(state = false, action) {

    switch (action.type) {
        case "SET_STATUS":
            return {
                ...state,
                category: action.payload
            }

        default:
            return state;
    }
}

function deleteCategory(state = '', action) {

    switch (action.type) {
        case "SET_DELETE":
            return {
                ...state,
                category: action.payload
            }

        default:
            return state;
    }
}

function getCategory(state = [], action) {

    switch (action.type) {
        case "GET_CATEGORY":
            return {
                ...state
            }

        default:
            return state;
    }
}

function pageTitle(state = '', action) {

    switch (action.type) {
        case "SET_TITLE":
            return {
                ...state,
                title: action.payload
            }

        default:
            return state;
    }
}

function editCategory(state = 'false', action) {

    switch (action.type) {
        case "SET_EDIT":
            return {
                ...state,
                edit: action.payload
            }

        default:
            return state;
    }
}

function viewLocation(state = 'false', action) {

    switch (action.type) {
        case "SET_VIEW":
            return {
                ...state,
                view: action.payload
            }

        default:
            return state;
    }
}
const rootReducer = combineReducers({
    categories,
    status,
    deleteCategory,
    getCategory,
    pageTitle,
    editCategory,
    viewLocation
});

export default rootReducer;