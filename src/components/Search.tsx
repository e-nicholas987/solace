"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import buildQueryString from "@/lib/helpers/buildQueryString";
import { Pagination } from "@/lib/services/getAdvocates";

const renderResultText = (
  pagination: Pagination | undefined,
  searchTerm: string
) => {
  if (!pagination) return null;
  const { count, offset, limit, totalPages, total } = pagination;

  if (count > 0) {
    const start = offset + 1;
    const end = Math.min(offset + limit, total);

    return (
      <span className="text-gray-500 whitespace-nowrap text-sm">
        Showing {start}-{end} of {total}
        {searchTerm && (
          <>
            {" "}
            result{count > 1 ? "s" : ""} for: &quot;
            <b className="text-black">{searchTerm}</b>&quot;
          </>
        )}{" "}
        ({totalPages} Page{totalPages > 1 ? "s" : ""})
      </span>
    );
  }
  return (
    <span className="text-gray-500 text-sm">
      Searching {searchTerm && ` for: "${searchTerm}"`}
    </span>
  );
};

export default function Search({
  pagination,
}: {
  pagination?: Pagination | undefined;
}) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState<string>(searchTerm);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const url = buildQueryString(pathname, {
        q: inputValue,
        page: inputValue ? "1" : undefined,
      });
      replace(url);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, pathname, replace]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleResetSearch = () => {
    setInputValue("");
    replace(pathname, { scroll: true });
  };

  return (
    <div className="flex px-4 gap-x-6 gap-y-2 md:pt-4 flex-col sm:flex-row sm:items-center sm:justify-between w-full md:mb-4 gap-2">
      {renderResultText(pagination, searchTerm)}
      <div className="relative md:ml-auto md:max-w-md w-full">
        <input
          value={inputValue}
          onChange={handleSearch}
          type="search"
          placeholder="Search advocates..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition placeholder:text-sm"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
          {inputValue ? (
            <button
              type="button"
              onClick={handleResetSearch}
              className="cursor-pointer text-base bg-emerald-100 rounded-md p-1 text-emerald-700 hover:bg-emerald-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
