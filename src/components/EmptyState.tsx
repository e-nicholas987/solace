"use client";

import { tableHeaders } from "@/lib/constants/tableHeaders";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface EmptyStateProps {
  type: "error" | "empty" | "loading";
  error?: React.ReactNode;
}

function EmptyStateComponent({ type, error }: EmptyStateProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q");
  const router = useRouter();
  return (
    <tr>
      <th colSpan={tableHeaders.length} className="py-20">
        {type === "loading" && (
          <div className="mx-auto animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-emerald-700" />
        )}
        {type === "error" && (
          <div className="space-y-4">
            <p className="text-red-500 text-sm whitespace-pre">{error}</p>
            <button
              type="button"
              className="bg-emerald-700 text-white px-4 py-2 rounded-md"
              onClick={() => router.refresh()}
            >
              Try Again
            </button>
          </div>
        )}
        {type === "empty" && (
          <div className="space-y-4">
            <p className="text-gray-500 text-center text-sm whitespace-pre">
              No advocates found{" "}
              {searchTerm && (
                <>
                  for: <b>&quot;{searchTerm}&quot;</b>
                </>
              )}
            </p>
          </div>
        )}
      </th>
    </tr>
  );
}

export default function EmptyState({ type, error }: EmptyStateProps) {
  return (
    <Suspense>
      <EmptyStateComponent type={type} error={error} />
    </Suspense>
  );
}
