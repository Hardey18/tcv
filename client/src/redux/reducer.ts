import { actionTypes } from "./types"

const initialState = {
    events: [],
    token: null,
}

export const reducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
      case actionTypes.FETCH_EVENTS:
        return {
          ...state,
          events: payload,
        };

      case actionTypes.LOGIN:
          return {
            ...state,
            token: payload
          };

      case actionTypes.LOGOUT:
          return {
            ...state,
            token: payload
          };

      case actionTypes.ADD_EVENT:
          return {
              ...state,
              events: [...state.events, payload]
          }
  
      default:
        return state;
    }
  };