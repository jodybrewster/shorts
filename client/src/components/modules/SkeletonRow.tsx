import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonRow: React.FC = () => {
    return (
        <div className="flex flex-row">
            <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-200 ml-[10px] mr-[10px]" />
            <Skeleton className="w-full h-[20px] rounded-full bg-gray-200 mr-[50px]" />
            <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-200 mr-[50px]" />
            <Skeleton className="w-[50px] h-[20px] rounded-full bg-gray-200 mr-[10px]" />
            <Skeleton className="w-[50px] h-[20px] rounded-full bg-gray-200 mr-[10px]" />
            <Skeleton className="w-[50px] h-[20px] rounded-full bg-gray-200 mr-[20px]" />
        </div>
    )
}