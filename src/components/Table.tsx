import EmptyState from "./EmptyState";
import getAdvocates, { SearchParams } from "@/lib/services/getAdvocates";
import TableHead from "./TableHead";
import Pagination from "./Pagination";
import Search from "./Search";

export default async function Table({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const { data, error } = await getAdvocates(searchParams);
  const advocates = data?.data;
  const pagination = data?.meta.pagination;

  return (
    <>
      <Search pagination={data?.meta.pagination} />
      <div className="flex-1 flex overflow-y-auto flex-col p-4 md:p-0">
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHead />
            <tbody className="bg-white md:divide-y divide-gray-200">
              {advocates && (
                <>
                  {advocates.length > 0 ? (
                    advocates.map((advocate, index) => (
                      <tr
                        key={advocate.id}
                        className="odd:bg-white md:even:bg-gray-50 "
                      >
                        {/* Large screen */}
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.firstName}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.lastName}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.city}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.degree}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-pre-line text-sm text-gray-900">
                          <div className="flex flex-wrap gap-2">
                            {advocate.specialties.map((specialty) => (
                              <span
                                key={specialty}
                                className="inline-block whitespace-nowrap bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.yearsOfExperience}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.phoneNumber}
                        </td>

                        {/* Small screen < 768px */}
                        <td className={`md:hidden ${index > 0 ? "pt-4" : ""}`}>
                          <div className="border overflow-hidden border-gray-200 rounded-lg">
                            <div className="font-bold bg-gray-50 text-lg p-2">
                              {advocate.firstName} {advocate.lastName}
                            </div>
                            <div className="text-sm text-gray-600  p-2">
                              <b>City:</b> {advocate.city}
                            </div>
                            <div className="text-sm bg-gray-50 text-gray-600  p-2">
                              <b>Degree:</b> {advocate.degree}
                            </div>
                            <div className="text-sm text-gray-600  p-2">
                              <b>Specialties:</b>
                              <ul className="mt-1">
                                {advocate.specialties.map((specialty) => (
                                  <li
                                    key={specialty}
                                    className="list-disc list-inside"
                                  >
                                    {specialty}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="text-sm bg-gray-50 text-gray-600  p-2">
                              <b>Years of Experience:</b>{" "}
                              {advocate.yearsOfExperience}
                            </div>
                            <div className="text-sm text-gray-600 p-2">
                              <b>Phone:</b> {advocate.phoneNumber}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <EmptyState type="empty" />
                  )}
                </>
              )}
              {error && <EmptyState type="error" error={error} />}
            </tbody>
          </table>
        </div>
        {pagination && <Pagination pagination={pagination} />}
      </div>
    </>
  );
}
