import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId
    return (
        <div className='w-full'>
            {
                label && <label htmlFor={id} className=''>
                    <select
                        {...props}
                        id={id}
                        ref={ref}
                        className={`px-3 py-2 rounded-lg  bg-[#141E46] text-[#8DECB4] outline-none focus:bg-[#222b46] duration-200 border border-gray-800 w-full ${className}`}
                    >
                        {
                            options?.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))
                        }
                    </select>
                </label>
            }
        </div>
    )
}

export default React.forwardRef(Select);