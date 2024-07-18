import React from 'react'

const SpanError = ({errors}) => {
    return (
        <div className="w-full h-10 flex align-center">
            <span className="text-rose-500 mt-1 ml-2">{errors?.message}</span>
        </div>
    )
}

export default SpanError