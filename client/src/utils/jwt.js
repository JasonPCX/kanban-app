const TOKEN_KEY = "kanban_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const destroyToken = () => localStorage.removeItem(TOKEN_KEY);
