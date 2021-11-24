export const reducer = (state, action) => {
	switch (action.type) {
		case 'toggle_theme':
			return {
				...state,
				themeDark: !state.themeDark,
			};

		default:
			return state;
	}
};

export const initialState = {
	themeDark: true,
};
