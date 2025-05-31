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
  USERS: {
    GET_PROFILE: `${BASE_URL}/users/profile`,
    GET_BORROWED_BOOKS: `${BASE_URL}/users/borrowed-books`,
  },
  ADMIN: {
    // User management
    GET_ALL_USERS: `${BASE_URL}/admin/users`,
    ADD_USER: `${BASE_URL}/admin/users`,
    UPDATE_USER: (id: string) => `${BASE_URL}/admin/users/${id}`,
    DELETE_USER: (id: string) => `${BASE_URL}/admin/users/${id}`,

    // Book management
    GET_ALL_BOOKS: `${BASE_URL}/admin/books`,
    ADD_BOOK: `${BASE_URL}/admin/books`,
    UPDATE_BOOK: (id: string) => `${BASE_URL}/admin/books/${id}`,
    DELETE_BOOK: (id: string) => `${BASE_URL}/admin/books/${id}`,

    // Author management
    GET_ALL_AUTHORS: `${BASE_URL}/admin/authors`,
    ADD_AUTHOR: `${BASE_URL}/admin/authors`,
    UPDATE_AUTHOR: (id: string) => `${BASE_URL}/admin/authors/${id}`,
    DELETE_AUTHOR: (id: string) => `${BASE_URL}/admin/authors/${id}`,

    // Category management
    GET_ALL_CATEGORIES: `${BASE_URL}/admin/categories`,
    ADD_CATEGORY: `${BASE_URL}/admin/categories`,
    UPDATE_CATEGORY: (id: string) => `${BASE_URL}/admin/categories/${id}`,
    DELETE_CATEGORY: (id: string) => `${BASE_URL}/admin/categories/${id}`,

    // Publisher management
    GET_ALL_PUBLISHERS: `${BASE_URL}/admin/publishers`,
    ADD_PUBLISHER: `${BASE_URL}/admin/publishers`,
    UPDATE_PUBLISHER: (id: string) => `${BASE_URL}/admin/publishers/${id}`,
    DELETE_PUBLISHER: (id: string) => `${BASE_URL}/admin/publishers/${id}`,
  },
} as const; 