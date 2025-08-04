import TableHead from "./TableHead";
import EmptyState from "./EmptyState";
import Search from "./Search";

export default function TableLoader() {
  return (
    <div className="flex-1">
      <Search />
      <table className="w-full overflow-y-auto">
        <TableHead />
        <tbody>
          <EmptyState type="loading" />
        </tbody>
      </table>
    </div>
  );
}
