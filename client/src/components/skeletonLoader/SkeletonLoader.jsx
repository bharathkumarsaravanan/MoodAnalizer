import React from 'react';

export const SkeletonLoader = () => {
    return (
        <div className="animate-pulse w-full h-full">
                <div className="w-full h-full bg-gray-800 rounded-sm"></div>
        </div>
    )
}