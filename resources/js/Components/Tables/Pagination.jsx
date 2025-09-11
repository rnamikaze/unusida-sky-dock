import React, { useState } from "react";
import { Button, HStack, Input } from "@chakra-ui/react";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
    const [inputPage, setInputPage] = useState("");

    // Generate page numbers (5 buttons, current in the middle if possible)
    const getPageNumbers = () => {
        let start = Math.max(currentPage - 2, 1);
        let end = start + 4;

        if (end > lastPage) {
            end = lastPage;
            start = Math.max(end - 4, 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        const page = Number(inputPage);
        if (page >= 1 && page <= lastPage) {
            onPageChange(page);
        }
        setInputPage("");
    };

    return (
        <HStack spacing={2}>
            {/* First button */}
            <Button
                onClick={() => onPageChange(1)}
                isDisabled={currentPage === 1}
                size="sm"
            >
                « First
            </Button>

            {/* Prev button */}
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                size="sm"
            >
                Prev
            </Button>

            {/* Page number buttons */}
            {getPageNumbers().map((page) => (
                <Button
                    key={page}
                    onClick={() => onPageChange(page)}
                    // variant={page === currentPage ? "solid" : "ghost"}
                    colorScheme={page === currentPage ? "orange" : "gray"}
                    size="sm"
                    // borderColor={"#2e2006"}
                >
                    {page}
                </Button>
            ))}

            {/* Next button */}
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                isDisabled={currentPage === lastPage}
                size="sm"
            >
                Next
            </Button>

            {/* Last button */}
            <Button
                onClick={() => onPageChange(lastPage)}
                isDisabled={currentPage === lastPage}
                size="sm"
            >
                Last »
            </Button>

            {/* Page input */}
            <form onSubmit={handleInputSubmit}>
                <HStack spacing={1}>
                    <Input
                        borderRadius={"6px"}
                        placeholder="Go to page"
                        value={inputPage}
                        onChange={(e) => setInputPage(e.target.value)}
                        size="sm"
                        width="100px"
                        borderColor={"transparent"}
                        bg={"#302207"}
                        _placeholder={{
                            color: "white",
                        }}
                    />
                    <Button type="submit" size="sm" colorScheme="orange">
                        Go
                    </Button>
                </HStack>
            </form>
        </HStack>
    );
}
