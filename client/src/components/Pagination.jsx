import React from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const Pagination = () => {
    const { pagination } = useLoaderData();
    const { page, totalPage } = pagination;
    const location = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPage) { // Ensure page is within bounds
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('page', pageNumber); // Update the page number in the URL
            navigate(`${location.pathname}?${searchParams.toString()}`); // Navigate to the new URL with updated page
        }
    };

    // Create an array of pages
    const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

    return (
        <div className="join">
            {/* Previous button */}
            <button 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 1} // Disable if on the first page
                className="join-item btn border-none"
            >
                Previous
            </button>

            {/* Page number buttons */}
            {pages.map((pageNumber) => (
                <button 
                    key={pageNumber} 
                    onClick={() => handlePageChange(pageNumber)} // Call the page change handler
                    className={`join-item btn border-none ${pageNumber === page ? 'bg-primary' : ''}`}
                >
                    {pageNumber}
                </button>
            ))}

            {/* Next button */}
            <button 
                onClick={() => handlePageChange(page + 1)} 
                disabled={page === totalPage} // Disable if on the last page
                className="join-item btn border-none"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
