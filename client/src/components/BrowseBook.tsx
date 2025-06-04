// import { useState, useEffect } from "react";
// import BooksGrid from "./BookGrid";
// import { Book } from "../type";
// import { useBookContext } from "../contexts/BookContext";
// import { Pagination } from "react-bootstrap";

// const BrowseBook = () => {
//     const { books } = useBookContext(); // Assuming you are fetching books from the context or API
//     const [currentPage, setCurrentPage] = useState(1);
//     const booksPerPage = 8; // Adjust the number of books per page
//     const [currentBooks, setCurrentBooks] = useState<Book[]>([]);

//     useEffect(() => {
//         // Calculate which books to show on the current page
//         const indexOfLastBook = currentPage * booksPerPage;
//         const indexOfFirstBook = indexOfLastBook - booksPerPage;
//         setCurrentBooks(books.slice(indexOfFirstBook, indexOfLastBook));
//     }, [currentPage, books]);

//     // Handle page change
//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//     };

//     // Calculate the total pages
//     const totalPages = Math.ceil(books.length / booksPerPage);

//     return (
//         <div>
//             <BooksGrid books={currentBooks} />

//             {/* Pagination */}
//             <Pagination className="justify-content-center mt-4">
//                 <Pagination.Prev
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                 />
//                 {[...Array(totalPages)].map((_, index) => (
//                     <Pagination.Item
//                         key={index}
//                         active={index + 1 === currentPage}
//                         onClick={() => handlePageChange(index + 1)}
//                     >
//                         {index + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                 />
//             </Pagination>
//         </div>
//     );
// };

// export default BrowseBook;
