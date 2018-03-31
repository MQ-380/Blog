const initialState = {
  now_page: 'message',
  now_article: ''
};

export const actionTypes = {
  CHANGE_PAGE: 'CHANGE_PAGE'
};

export const action = {
  change_page: (page, articleName = undefined) => {
    return {
      type: actionTypes.CHANGE_PAGE,
      page,
      articleName
    };
  }
};

export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE:
      return {
        ...state,
        now_page: action.page,
        now_article: action.articleName ? action.articleName : ''
      };
    default:
      return state;
  }
}
