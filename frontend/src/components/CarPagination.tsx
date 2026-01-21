"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface CarPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function CarPagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: CarPaginationProps) {
    const getPageNumbers = (): (number | "ellipsis")[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            return [1, 2, 3, 4, "ellipsis", totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [
                1,
                "ellipsis",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "ellipsis",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "ellipsis",
            totalPages,
        ];
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination className={cn("mx-auto", className)}>
            <PaginationContent className="gap-2">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        className={cn(
                            "h-10 w-10 p-0 flex items-center justify-center rounded-lg border border-gray-200 transition-colors",
                            currentPage === 1
                                ? "pointer-events-none opacity-40"
                                : "cursor-pointer hover:bg-gray-50"
                        )}
                    />
                </PaginationItem>

                {pageNumbers.map((page, index) => (
                    <PaginationItem key={`${page}-${index}`}>
                        {page === "ellipsis" ? (
                            <PaginationEllipsis className="h-10 w-10 flex items-center justify-center text-gray-400" />
                        ) : (
                            <PaginationLink
                                onClick={() => onPageChange(page)}
                                isActive={currentPage === page}
                                className={cn(
                                    "h-10 w-10 p-0 flex items-center justify-center rounded-lg border transition-all duration-200 font-medium cursor-pointer",
                                    currentPage === page
                                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300"
                                )}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        className={cn(
                            "h-10 w-10 p-0 flex items-center justify-center rounded-lg border border-gray-200 transition-colors",
                            currentPage === totalPages
                                ? "pointer-events-none opacity-40"
                                : "cursor-pointer hover:bg-gray-50"
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
