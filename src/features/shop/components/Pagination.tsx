"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper to generate updated search params while preserving existing filters
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6 mt-8 ">
      {/* Mobile view */}
      <div className="flex flex-1 justify-between sm:hidden">
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Previous
          </Link>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-neutral-200 bg-neutral-100 px-4 py-2 text-xs font-semibold text-neutral-400">
            Previous
          </span>
        )}

        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Next
          </Link>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-neutral-200 bg-neutral-100 px-4 py-2 text-xs font-semibold text-neutral-400">
            Next
          </span>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-neutral-600">
            Showing Page <span className="font-bold text-neutral-900">{currentPage}</span> of{" "}
            <span className="font-bold text-neutral-900">{totalPages}</span>
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-2xs" aria-label="Pagination">
            {/* Previous Page Link */}
            {currentPage > 1 ? (
              <Link
                href={createPageURL(currentPage - 1)}
                className="relative inline-flex items-center rounded-l-md border border-neutral-300 bg-white p-2 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-l-md border border-neutral-200 bg-neutral-100 p-2 text-neutral-300 cursor-not-allowed">
                <ChevronLeft className="h-4 w-4" />
              </span>
            )}

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isCurrent = page === currentPage;
              return (
                <Link
                  key={page}
                  href={createPageURL(page)}
                  className={`relative inline-flex items-center px-3.5 py-2 text-xs font-bold transition-colors ${
                    isCurrent
                      ? "z-10 bg-amber-500 text-neutral-950 border border-amber-500"
                      : "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {page}
                </Link>
              );
            })}

            {/* Next Page Link */}
            {currentPage < totalPages ? (
              <Link
                href={createPageURL(currentPage + 1)}
                className="relative inline-flex items-center rounded-r-md border border-neutral-300 bg-white p-2 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-r-md border border-neutral-200 bg-neutral-100 p-2 text-neutral-300 cursor-not-allowed">
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}