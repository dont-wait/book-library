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

export interface AuthData {
  userId: string;
  role?: string[];
  auth_token: string;
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
  userAccount: UserAccount;
}

export interface Librarian {
  librarianId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userAccount: UserAccount;
}
export interface Member {
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userAccount: UserAccount;
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
