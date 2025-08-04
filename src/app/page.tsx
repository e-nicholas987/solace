import getAdvocates, { SearchParams } from "@/lib/services/getAdvocates";
import Search from "@/components/Search";
import { Suspense } from "react";
import Table from "@/components/Table";
import TableLoader from "@/components/TableLoader";

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  return (
    <main className="flex pt-4  md:p-4 flex-col space-y-6 items-center justify-center min-h-svh max-h-svh">
      <h1 className="text-5xl px-4 shrink-0 md:text-6xl font-playfair font-bold text-emerald-700 text-center mb-6 tracking-wide">
        Solace Advocates
      </h1>
      <div className="flex-1 overflow-hidden flex flex-col md:border border-gray-200 w-full md:rounded-lg md:shadow-lg">
        <Suspense fallback={<TableLoader />}>
          <Table searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
