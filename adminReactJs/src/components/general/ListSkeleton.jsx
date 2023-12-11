import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ListSkeleton() {
  return (
    <div className="w-full h-[500px] overflow-y-auto overflow-x-scroll">
      <table className="w-full text-sm text-left">
        <thead className="sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              <Skeleton />
            </th>

            <th scope="col" className="px-6 py-3">
              <Skeleton />
            </th>

            <th scope="col" className="px-6 py-3">
              <Skeleton />
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3]?.map((data, index) => {
            return (
              <tr key={index} className="">
                <td scope="row" className="px-6 py-4">
                  <Skeleton />
                </td>
                <td scope="row" className="px-6 py-4">
                  <Skeleton />
                </td>
                <td scope="row" className="px-6 py-4">
                  <Skeleton />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ListSkeleton;
