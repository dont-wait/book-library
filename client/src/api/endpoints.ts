const BASE_URL = 'http://localhost:6969/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/log-in`,
    LOGOUT: `${BASE_URL}/auth/log-out`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh`,
  },
  BOOKS: {
    GET_ALL: `${BASE_URL}/books`,
    GET_BY_ID: (id: string) => `${BASE_URL}/books/${id}`,
    BORROW: (id: string) => `${BASE_URL}/books/${id}/borrow`,
    RETURN: (id: string) => `${BASE_URL}/books/${id}/return`,
  },
  DASHBOARD: {
    STATS: `${BASE_URL}/admin/dashboard/stats`,
  },
  ADMIN: {
    GET_PROFILE: `${BASE_URL}/admins/myInfo`,
    // User management
    GET_ALL_USERS: `${BASE_URL}/admins`,
    ADD_USER: `${BASE_URL}/admins`,
    UPDATE_USER: (id: string) => `${BASE_URL}/admins/${id}`,
    DELETE_USER: (id: string) => `${BASE_URL}/admins/${id}`,
    TOGGLE_USER_ACTIVATION: (id: string) => `${BASE_URL}/admins/${id}/toggle-activation`,

    // Book management
    GET_ALL_BOOKS: `${BASE_URL}/books`,
    ADD_BOOK: `${BASE_URL}/books`,
    UPDATE_BOOK: (id: string) => `${BASE_URL}/books/${id}`,
    DELETE_BOOK: (id: string) => `${BASE_URL}/books/${id}`,

    // Author management
    GET_ALL_AUTHORS: `${BASE_URL}/authors`,
    ADD_AUTHOR: `${BASE_URL}/authors`,
    UPDATE_AUTHOR: (id: string) => `${BASE_URL}/authors/${id}`,
    DELETE_AUTHOR: (id: string) => `${BASE_URL}/authors/${id}`,

    // Category management
    GET_ALL_CATEGORIES: `${BASE_URL}/categories`,
    ADD_CATEGORY: `${BASE_URL}/categories`,
    UPDATE_CATEGORY: (id: string) => `${BASE_URL}/categories/${id}`,
    DELETE_CATEGORY: (id: string) => `${BASE_URL}/categories/${id}`,

    // Publisher management
    GET_ALL_PUBLISHERS: `${BASE_URL}/publishers`,
    ADD_PUBLISHER: `${BASE_URL}/publishers`,
    UPDATE_PUBLISHER: (id: string) => `${BASE_URL}/publishers/${id}`,
    DELETE_PUBLISHER: (id: string) => `${BASE_URL}/publishers/${id}`,

    // Borrow management
    GET_ALL_BORROWS: `${BASE_URL}/borrows`,
    ADD_BORROW: `${BASE_URL}/borrows`,
    UPDATE_BORROW: (id: string) => `${BASE_URL}/borrow-receipts/${id}`,
    DELETE_BORROW: (id: string) => `${BASE_URL}/borrow-receipts/${id}`,

    // Return management
    GET_ALL_RETURNS: `${BASE_URL}/returns`,
    ADD_RETURN: `${BASE_URL}/returns`,
    UPDATE_RETURN: (id: string) => `${BASE_URL}/return_receipts/${id}`,
    DELETE_RETURN: (id: string) => `${BASE_URL}/return_receipts/${id}`,
  },
} as const; 