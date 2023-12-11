import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ViewSkeleton() {
  return (
    <div className="h-[650px] p-10 overflow-y-auto bg-white dark:bg-[#121212] dark:text-white">
      {/* User info cards */}
      <div className="flex flex-col mx-auto gap-5 w-11/12 p-10 bg-white dark:bg-[#121212] rounded-xl">
        {/* User Details */}

        <div className="w-full flex justify-evenly border border-gray-400 p-5 items-center rounded-xl">
          <div className="w-1/5">
            <div className="rounded-2xl h-32 w-32">
              <Skeleton height={120} />
            </div>
          </div>
          <div className="w-4/5 flex flex-col gap-5">
            <div className="flex flex-col">
              <div>
                <p className="text-2xl font-bold">
                  <Skeleton count={2} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Personal Information */}
          <div className="flex flex-col w-full border border-gray-400 p-2 items-center rounded-xl">
            <div className="text-lg font-bold p-3 w-full text-center rounded-t-xl bg-zinc-300 dark:bg-[#242424]">
              <Skeleton />
            </div>
            <div className="mx-10 my-5 flex flex-col w-full px-10">
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
            </div>
          </div>
          {/* Token information */}
          <div className="flex flex-col w-full border border-gray-400 p-2 items-center rounded-xl">
            <div className="text-lg font-bold p-3 w-full text-center rounded-t-xl bg-zinc-300 dark:bg-[#242424]">
              <Skeleton />
            </div>
            <div className="mx-10 my-5 flex flex-col w-full px-10">
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
              <div className="p-3 border-b border-gray-700 flex">
                <div className="text-md font-semibold w-2/3">
                  <Skeleton />
                </div>
                <div className="w-1/3">
                  <Skeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewSkeleton;
