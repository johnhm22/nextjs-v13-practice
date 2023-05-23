'use client' //error components must be client components

import { useEffect } from 'react'

const Error = ({ error, reset }) => {
    useEffect(() => {
        //log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    //attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}
