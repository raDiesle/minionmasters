import localStorage from "local-storage";

export const LAST_USERNAME_LOCALSTORAGE_KEY = "lastUsername";

const usernameFromLocalStorage = localStorage(LAST_USERNAME_LOCALSTORAGE_KEY);
