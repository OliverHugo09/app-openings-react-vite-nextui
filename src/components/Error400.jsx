import React from 'react'

export const Error400 = () => {
    return (
        <>
            <h1 className="text-9xl font-extrabold text-white tracking-widest">400</h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Bad Request
            </div>
            <button className="mt-5">
                <a
                    className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                >
                    <span
                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <span className="relative block px-8 py-3 bg-[#000000] border border-current">
                        <router-link to="/">Go Home</router-link>
                    </span>
                </a>
            </button>
        </>
    )
}
