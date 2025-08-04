import { tableHeaders } from "@/lib/constants/tableHeaders";

export default async function TableHead() {
  return (
    <>
      <colgroup className="hidden md:table-column-group">
        {tableHeaders.map((header) => (
          <col
            key={header}
            className={header === "Specialties" ? "w-[40%]" : "w-auto"}
          />
        ))}
      </colgroup>
      <thead className="bg-emerald-700 sticky top-0">
        <tr>
          {tableHeaders.map((header) => (
            <th
              key={header}
              className="px-6 hidden md:table-cell py-3 whitespace-nowrap text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}
