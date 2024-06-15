import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import FavoriteButton from "../components/FavoriteButton";

const DormPageSkeleton = () => {
    return (
        <>
            {/* Directory */}
            <div className="flex gap-4 items-center">
                <IoArrowBack />
                <a href="/dorms">Dorm Listings</a>
                <IoIosArrowForward />
                <Skeleton className='w-2'/>
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
                    <FavoriteButton />
                    <Skeleton className=" max-w-fit px-4 text-sm"/>
                </div>
            </div>

            {/* Information */}
            <section className="flex items-center md:items-start justify-between">
                <div>
                    <Skeleton className='w-2'/>
                    <Skeleton className='flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4'/>
                </div>
                <Skeleton className='w-2'/>
            </section>

            <section className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
                <div className="">
                    <p className="text-lg font-semibold">Description</p>
                    <p>{dormDetails[0].description}</p>
                </div>
                <Skeleton className='w-2'/>
                <Skeleton className='w-2'/>
                
            </section>

            <section className="flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full flex flex-col gap-4">
                    {/* Features */}

                    <div className="flex flex-col gap-1">
                        <Skeleton className='w-2'/>
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-hidden">
                            {Array.from({length: 5}).map((_, index) => (
                                <li><Skeleton className='w-2'/></li>
                            ))}
                        </ul>
                    </div>
                    {/* Amenities */}
                    <div className="w-full flex flex-col gap-1">
                        <Skeleton className='w-2' />
                        <ul className="grid grid-cols-2  md:grid-cols-3 gap-2 max-h-48 overflow-hidden">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <li><Skeleton className='w-2' /></li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment terms */}
                    <div className="w-full flex flex-col gap-1">
                        <Skeleton className='w-2'/>
                        <ul className="flex flex-col gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <li><Skeleton className='w-2' /></li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Skeleton className='w-2'/>
                        <ul className="flex flex-col gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <li><Skeleton className='w-2' /></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Map */}
                <Skeleton className="mt-4 w-full"/>
            </section>

            <section className="flex justify-between items-start"></section>

            {/* Owner */}
            <div className="flex gap-4 items-center">
                {/* Picture of Dorm Owner */}
                <Skeleton className="h-24 w-24"/>
                <div className="flex flex-col gap-1">
                    <Skeleton className='w-2'/>
                    <Skeleton className="max-w-fit text-sm"/>
                </div>
            </div>
        </>
    )
}

export default DormPageSkeleton