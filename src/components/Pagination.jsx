import React, { useEffect, useState } from "react";
import { getPost } from "../api/PostApi";

export const Pagination = () => {
    // const [data, setData] = useState([]); // Paginated data
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [itemsPerPage] = useState(6); // Items per page
    const [totalItems, setTotalItems] = useState(100); // Total items (from API)

    const getPostData = async (page = 1) => {
        try {
            const res = await getPost(page, itemsPerPage);
            console.log(res.data);

            // Assuming your API response contains data and total count
            setData(res.data.posts); // Replace `posts` with the correct response field
            setTotalItems(res.data.totalCount); // Replace `totalCount` with your API's total count field
        } catch (error) {
            console.error("Error fetching paginated data:", error);
        }
    };

    useEffect(() => {
        getPostData(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            {/* Pagination Controls */}
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span style={{ margin: "0 1rem" }}>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
