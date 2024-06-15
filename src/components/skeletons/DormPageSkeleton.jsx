import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import FavoriteButton from "../FavoriteButton";
import Skeleton from "react-loading-skeleton";

const DormPageSkeleton = () => {
    return (
        <>
            {/* Directory */}
            <div className="flex gap-4 items-center">
                <IoArrowBack />
                <a href="/dorms">Dorm Listings</a>
                <IoIosArrowForward />
                <Skeleton className='w-20 h-5'/>
            </div>

            {/* Gallery */}
            <div className="relative">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 md:col-span-2 md:h-[300px] lg:h-[500px] overflow-hidden">
                        <Skeleton className="w-full h-full object-cover"/>
                    </div>
                    <div className="hidden col-span-1  md:h-[300px] lg:h-[500px] md:flex flex-col gap-4">
                        <div className="h-1/2 overflow-hidden">
                            <Skeleton className='w-full h-full object-cover'/>
                        </div>
                        <div className="h-1/2 overflow-hidden">
                            <Skeleton className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <Skeleton className="w-28 h-8"/>
                    <Skeleton className="w-28 h-8"/>
                </div>
            </div>
            <section className="w-full h-full flex justify-between items-center">
                <div>
                    <Skeleton className="w-32 h-7"/>
                    <Skeleton className="w-72 h-12"/>
                </div>
                <div className="flex gap-2 flex-col">
                    <Skeleton className="w-48 h-7" />
                    <Skeleton className="w-48 h-7" />
                </div>
            </section>
            <section className="w-full h-full flex justify-between items-center">
                <div>
                    <Skeleton className="w-32 h-5" />
                    <Skeleton className="w-32 h-5" />
                </div>
                <div>
                    <Skeleton className="w-52 h-10" />
                </div>
            </section>

            {/* Information */}
            
        </>
    )
}

export default DormPageSkeleton