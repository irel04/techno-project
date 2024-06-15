import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CustomInputSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="flex gap-1 text-primary font-semibold"
      >
        <Skeleton width={150} height={27}/>
      </label>
      <Skeleton className="w-full rounded border  p-2 text-sm text-black"/>
    </div>
  )
}

export default CustomInputSkeleton