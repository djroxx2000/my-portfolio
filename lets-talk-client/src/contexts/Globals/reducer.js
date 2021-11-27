export const reducer = (state, action) => {
  switch (action.type) {
    case "toggle_theme":
      return {
        ...state,
        themeDark: !state.themeDark,
      };
    case "toggle_nav":
      return {
        ...state,
        navOpen: !state.navOpen,
      };
    case "click_nav":
      return {
        ...state,
        navClick: !state.navClick,
      };
    case "toggle_modal":
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    default:
      return state;
  }
};

export const initialState = {
  themeDark: true,
  navOpen: true,
  navClick: true,
  modalOpen: false,
};
