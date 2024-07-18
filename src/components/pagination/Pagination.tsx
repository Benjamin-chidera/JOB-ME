import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Maximum number of buttons to show

    if (totalPages <= maxButtons) {
      // If total pages are less than or equal to maxButtons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`join-item btn btn-sm ${
              currentPage === i ? "btn-active" : ""
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show first page
      buttons.push(
        <button
          key={1}
          className={`join-item btn btn-sm ${
            currentPage === 1 ? "btn-active" : ""
          }`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );

      // Show dots if currentPage is more than 3
      if (currentPage > 3) {
        buttons.push(
          <button key="dots1" className="join-item btn btn-sm btn-disabled">
            ...
          </button>
        );
      }

      // Show current page and one page before and after
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        buttons.push(
          <button
            key={i}
            className={`join-item btn btn-sm ${
              currentPage === i ? "btn-active" : ""
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }

      // Show dots if currentPage is less than totalPages - 2
      if (currentPage < totalPages - 2) {
        buttons.push(
          <button key="dots2" className="join-item btn btn-sm btn-disabled">
            ...
          </button>
        );
      }

      // Always show last page
      buttons.push(
        <button
          key={totalPages}
          className={`join-item btn btn-sm ${
            currentPage === totalPages ? "btn-active" : ""
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <main className="flex justify-center items-center">
      <div className="join text-center">{renderPageButtons()}</div>
    </main>
  );
};
