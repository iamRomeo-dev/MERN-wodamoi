/** @jsxImportSource @emotion/react */
import "twin.macro";
import HashtagIcon from "@heroicons/react/outline/HashtagIcon";
import CalendarIcon from "@heroicons/react/outline/CalendarIcon";
import GlobeAltIcon from "@heroicons/react/outline/GlobeAltIcon";
import IdentificationIcon from "@heroicons/react/outline/IdentificationIcon";
import LocationMarkerIcon from "@heroicons/react/outline/LocationMarkerIcon";
import { Skeleton } from "../shared/Skeleton";

export const WodCreatorListItemSkeleton = () => {
  return (
    <li tw="p-3 hover:text-white cursor-pointer hover:bg-gray-100 shadow-sm overflow-hidden">
      <div tw="px-4 py-4 flex items-center sm:px-6">
        <div tw="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div tw="truncate w-full">
            <div tw="flex items-center justify-between text-sm">
              <p tw="font-medium text-indigo-600 truncate">
                <Skeleton />
              </p>
              <div tw="flex items-center gap-1 text-sm text-gray-500">
                <IdentificationIcon tw="w-5 h-5 text-gray-400" />
                <Skeleton />
              </div>
            </div>
            <div tw="mt-2 flex items-center justify-between flex-wrap w-full">
              <div tw="flex">
                <div tw="flex items-center gap-4 text-sm text-gray-500">
                  <div tw="flex items-center gap-1 text-sm text-gray-500">
                    <HashtagIcon tw="w-5 h-5 text-gray-400" />
                    <Skeleton />
                  </div>
                  <div tw="flex items-center gap-1 text-sm text-gray-500">
                    <LocationMarkerIcon tw="w-5 h-5 text-gray-400" />
                    <Skeleton />
                  </div>
                  <div tw="flex items-center gap-1 text-sm text-gray-500">
                    <GlobeAltIcon tw="w-5 h-5 text-gray-400" />
                    <Skeleton />
                  </div>
                </div>
              </div>
              <div tw="flex items-center gap-1 text-sm text-gray-500">
                <CalendarIcon tw="w-5 h-5 text-gray-400" />
                <Skeleton />
              </div>
            </div>
          </div>
          <div tw="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5"></div>
        </div>
      </div>
    </li>
  );
};
