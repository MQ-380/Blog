const initialState = {
  now_page: 'user'
};

export const actionTypes = {
  CHANGE_PAGE: 'CHANGE_PAGE',
}

export const action = {
  change_page: (page) => {
    return {
      type: actionTypes.CHANGE_PAGE,
      page
    }
  },
}

export function reducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.CHANGE_PAGE:
      return {
        ...state,
        now_page: action.page,
      }
    default:
      return state;
  }
}
