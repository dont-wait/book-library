export interface Book {
  bookId: number;
  book_name: string;
  cost: number;
  description: string;
  book_image_url: string;
  quantity: number;
  isbn: string;
  publicationDate: string | null;
  rating: number;
  floorPosition: string | null;
  publisherId: number;
  categoryId: number;
  authorId: number;
}

interface UserAccount {
  isActivated: boolean;
  roles: string[];
}

export interface User {
  adminId: string;
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
  name: string;
  bookId: number;
}
