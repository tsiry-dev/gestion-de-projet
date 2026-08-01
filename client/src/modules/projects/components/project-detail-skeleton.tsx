export default function ProjectDetailSkeleton() {
  return (
    <div className="h-[80vh] overflow-hidden animate-pulse">
      
      {/* DialogHead Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>


      <div className="flex mt-3 min-h-[60vh]">

        {/* Sidebar Skeleton */}
        <aside className="w-[20%] px-2 space-y-4">
          
          {/* Status */}
          <div className="h-6 bg-gray-200 rounded w-20"></div>

          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-4/5"></div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>

          {/* Owner */}
          <div className="mt-5">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>

        </aside>



        {/* Main */}
        <main className="flex gap-2 border-l border-gray-300 flex-1">


          {/* Tasks Skeleton */}
          <div className="ml-3 flex-5">

            {/* Header */}
            <div className="flex justify-between mb-4">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>


            {/* Columns */}
            <div className="grid grid-cols-5 gap-2">

              {[...Array(5)].map((_, column) => (
                <div 
                  key={column}
                  className="
                    rounded-lg
                    bg-gray-100
                    p-2
                    min-h-[300px]
                  "
                >

                  {/* Column title */}
                  <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>


                  {/* Task cards */}
                  {[...Array(3)].map((_, task) => (
                    <div
                      key={task}
                      className="
                        bg-white
                        rounded-lg
                        p-3
                        mb-2
                        border
                        border-gray-200
                      "
                    >
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>

                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>

                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}

                </div>
              ))}

            </div>

          </div>




          {/* ListTeam Skeleton */}
          <aside className="
              flex-1
              border-l
              border-gray-300
              px-2
          ">

            {/* Title Equipes */}
            <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>


            {/* Team cards */}
            <div className="space-y-2">

              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                  "
                >

                  <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="
                        h-8
                        w-8
                        rounded-full
                        bg-gray-200
                    "></div>


                    <div className="space-y-2">

                      {/* Team name */}
                      <div className="
                          h-4
                          bg-gray-200
                          rounded
                          w-28
                      "></div>


                      {/* Members */}
                      <div className="
                          h-3
                          bg-gray-200
                          rounded
                          w-20
                      "></div>

                    </div>

                  </div>


                  {/* Button */}
                  <div className="
                      h-6
                      bg-gray-200
                      rounded
                      w-10
                  "></div>

                </div>
              ))}

            </div>

          </aside>



        </main>

      </div>

    </div>
  );
}