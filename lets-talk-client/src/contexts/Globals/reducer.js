import demo from "../../assets/demo.jpeg";

export const reducer = (state, action) => {
  // Debug logs
  // console.log(action.type);
  // console.log(action.payload);
  switch (action.type) {
    case "username_change":
      return {
        ...state,
        username: action.payload.username,
        userId: action.payload.userId,
      };
    case "init_messages":
      const initMessages = action.payload.messages;
      return {
        ...state,
        messages: initMessages,
      };
    case "add_message":
      const messages = [...state.messages, action.payload];
      return {
        ...state,
        messages: messages,
      };
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
    case "toggle_content_modal":
      return action.payload !== undefined
        ? {
            ...state,
            ...action.payload,
          }
        : { ...state, contentModalOpen: !state.contentModalOpen };
    case "populate_content_modal":
      return {
        ...state,
        ...action.payload,
      };
    case "toggle_chat_modal":
      return action.payload !== undefined
        ? {
            ...state,
            ...action.payload,
          }
        : { ...state, chatModalOpen: !state.chatModalOpen };
    case "toggle_notification":
      if (action.payload.checkOn && !state.notificationOn) {
        return state;
      }
      delete action.payload.checkOn;
      return {
        ...state,
        ...action.payload,
      };
    case "toggle_notification_pref":
      return {
        ...state,
        ...action.payload,
      };
    case "toggle_chat_options":
      return {
        ...state,
        ...action.payload,
      };
    case "toggle_game":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const initialState = {
  username: "Unset",
  userId: "Unset",
  messages: [],
  themeDark: true,
  navOpen: true,
  navClick: true,
  modalOpen: false,
  contentModalOpen: false,
  chatModalOpen: false,
  contentModalTitle: "Demo",
  contentModalDescription:
    "This is my special little modal. Do you like it. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non nam tempore cumque quae molestias accusantium repellat, alias iure sed itaque aliquid excepturi fuga quasi aut earum repellendus dolorem vero? Qui? Eum expedita similique repudiandae ullam voluptas quas illum quis animi explicabo facilis doloremque voluptates, qui illo, consequuntur exercitationem error. Accusamus eligendi obcaecati et odio totam voluptatem illo impedit voluptatibus assumenda! Eius eaque quasi voluptatibus eligendi adipisci, reiciendis quibusdam quis, dicta, accusantium obcaecati excepturi. Esse, alias, cum dignissimos eaque ducimus quibusdam amet aliquid iste unde iusto aliquam ullam ab magni odit. Rerum ad magni harum cumque labore aliquid similique corrupti nostrum illum aut. Porro perferendis, minima molestias voluptatem vel est deserunt quia beatae unde blanditiis delectus distinctio perspiciatis maiores veniam officia.",
  contentModalImg: demo,
  opponentId: null,
  curGame: null,
  playGame: false,
  notificationOpen: 0,
  notificationMsg: "Someone is inviting you to TicTacToe",
  notificationOn: true,
  navCoreOn: true,
  chatOptionsOpen: false,
};
