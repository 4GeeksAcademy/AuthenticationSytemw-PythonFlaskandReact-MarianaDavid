export const initialStore = () => {
  return {
    token: localStorage.getItem("token"),
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_token":
      return {
        ...store,
        token: action.payload,
      };
    default:
      throw Error("Unknown action.");
  }
}