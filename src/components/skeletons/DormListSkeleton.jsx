import React from 'react'
import Skeleton from 'react-loading-skeleton'

const DormListSkeleton = () => {
    return (
        <div className="bg-white shadow-custom w-full lg:max-w-[25rem] h-[18rem] max-h-[25rem] rounded flex flex-col gap-2 cursor-pointer">
            <Skeleton className="h-[10rem] w-full object-cover" />
            <div className="flex flex-col gap-2 p-3">
                <div className="flex justify-between">
                    <div className="flex flex-col leading-none">
                        <h1 className="text-xl font-bold"><Skeleton width={150} /></h1>
                        <p className="flex items-center gap-1 text-sm">
                            <Skeleton width={100} />
                            <Skeleton width={70} />
                        </p>
                        <p className="text-primary font-semibold">
                            <Skeleton width={100} />
                        </p>
                    </div>

                    <div className="">
                        <Skeleton width={80} />
                        <Skeleton width={80} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Skeleton width={80} />
                    <Skeleton width={80} />
                </div>
            </div>
        </div>
    )
}

export default DormListSkeleton