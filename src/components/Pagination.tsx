"use client";

import buildQueryString from "@/lib/helpers/buildQueryString";
import { GetAdvocatesResponse } from "@/lib/services/getAdvocates";
import { usePathname, useRouter } from "next/navigation";

export default function Pagination({
  pagination,
}: {
  pagination: GetAdvocatesResponse["meta"]["pagination"];
}) {
  const { replace } = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number | null) => {
    if (!page) return;
    const url = buildQueryString(pathname, {
      page: page.toString(),
    });
    replace(url);
  };

  if (!pagination.previousPage && !pagination.nextPage) return null;

  return (
    <div className="mt-4 md:mt-0 md:p-4 flex gap-2 justify-end">
      <button
        aria-label={
          pagination.previousPage ? `Go to previous page` : "No previous page"
        }
        disabled={!pagination.previousPage}
        className={`bg-emerald-700 text-white px-4 py-2 rounded-md ${
          !pagination.previousPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(pagination.previousPage)}
      >
        Previous
      </button>
      <button
        aria-label={
          pagination.nextPage
            ? `Go to next page ${pagination.nextPage}`
            : "No next page"
        }
        disabled={!pagination.nextPage}
        className={`bg-emerald-700 text-white px-4 py-2 rounded-md ${
          !pagination.nextPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(pagination.nextPage)}
      >
        Next
      </button>
    </div>
  );
}
