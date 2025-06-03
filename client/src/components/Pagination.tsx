import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxDisplayedPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxDisplayedPages = 5,
}) => {
  // Không hiển thị phân trang nếu chỉ có 1 trang
  if (totalPages <= 1) {
    return null;
  }

  // Tính toán các trang sẽ hiển thị
  const calculatePageRange = () => {
    // Nếu tổng số trang ít hơn số trang tối đa hiển thị
    if (totalPages <= maxDisplayedPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Tính toán vị trí bắt đầu và kết thúc
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxDisplayedPages / 2)
    );
    let endPage = startPage + maxDisplayedPages - 1;

    // Điều chỉnh nếu endPage vượt quá totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageNumbers = calculatePageRange();

  return (
    <div className='d-flex justify-content-center my-4'>
      <BootstrapPagination>
        {/* Nút Previous */}
        <BootstrapPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {/* Nút trang đầu tiên */}
        {pageNumbers[0] > 1 && (
          <>
            <BootstrapPagination.Item onClick={() => onPageChange(1)}>
              1
            </BootstrapPagination.Item>
            {pageNumbers[0] > 2 && <BootstrapPagination.Ellipsis disabled />}
          </>
        )}

        {/* Các nút trang */}
        {pageNumbers.map((number) => (
          <BootstrapPagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}>
            {number}
          </BootstrapPagination.Item>
        ))}

        {/* Nút trang cuối cùng */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <BootstrapPagination.Ellipsis disabled />
            )}
            <BootstrapPagination.Item onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </BootstrapPagination.Item>
          </>
        )}

        {/* Nút Next */}
        <BootstrapPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;
