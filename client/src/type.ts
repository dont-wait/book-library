export const ROLES = {
  "ADMIN": "ADMIN",
  "MEMBER": "MEMBER",
  "LIBRARIAN": "LIBRARIAN"
}

export interface AuthData {
  userId: string,
  roles: string
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: (auth: AuthData | null) => void;
}

export interface Book {
  bookId: number;
  bookName: string;
  cost: number;
  description: string;
  bookImageURL: string;
  quantity: number;
  isbn: string;
  publicationDate: string | null;
  rating: number;
  floorPosition: string | null;
  publisherName: string;
  categoryName: string;
  authorName: string;
}
export interface Publisher {
  publisherId: number;
  publisherName: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}
export interface Author {
  authorId: number;
  authorName: string;
}

export interface BorrowBook {
  borrowReceiptId: string;
  borrowDate: string;
  dueDate: string;
  quantity: number;
  userId: string;
  name: string; //status book
  statusReceiptName: string;
  bookName: string;
  costBorrow: number;
}

export interface ReturnBook {
  returnReceiptId: string;
  returnDate: string;
  borrowReceiptId: string;
  statusBookName: string;
}

export interface UserAccount {
  isActivated: boolean;
  roles: string[];
}

export interface Admin {
  adminId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userAccount: {
    isActivated: boolean;
    roles: string[];
  };
}

export interface Librarian {
  librarianId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userAccount: {
    isActivated: boolean;
    roles: string[];
  };
}
export interface Member {
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userAccount: {
    isActivated: boolean;
    roles: string[];
  };
}


