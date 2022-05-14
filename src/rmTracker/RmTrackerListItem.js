/** @jsxImportSource @emotion/react */
import { BanIcon } from "@heroicons/react/solid";
import { useState } from "react";
import "twin.macro";
import { useDeleteRm } from "../APIsRmTracker";
import { Badge, VerticalSignal } from "../shared/Badge";
import { StartDate } from "../shared/Date";

export const getInactifStatusColor = (inactifStatus) => {
  switch (inactifStatus) {
    case "METCON":
      return "gray";
    case "AMRAP":
      return "green";
    case "FOR TIME":
      return "red";
    case "push press":
      return "yellow";
    default:
      return "green";
  }
};

export const RmTrackerListItem = ({ rm }) => {
  const [isNew, setIsNew] = useState(false);
  const { mutateAsync: deleteRm } = useDeleteRm();
  const color = getInactifStatusColor(rm.movment);
  const onRemove = (e) => {
    e.preventDefault();
    deleteRm(rm._id);
  };
  return (
    <div tw="relative hover:bg-gray-50" onClick={() => setIsNew(!isNew)}>
      <VerticalSignal color={color} />
      <div tw="px-4 py-4 sm:px-6">
        <div tw="flex items-center justify-between">
          <div tw="flex items-center gap-1">
            {isNew === true && (
              <span tw="rounded-full h-6 w-6 bg-red-500" onClick={onRemove}>
                <BanIcon tw="text-white" />
              </span>
            )}
            <p tw="text-sm font-medium text-gray-700 truncate">{rm.movment.toUpperCase()}</p>
          </div>

          <div tw="ml-2 flex-shrink-0 flex">
            <p tw="text-sm font-medium text-gray-400 truncate mr-4">{rm.weight.toUpperCase()} kg</p>
            <Badge status={rm.movment}>
              <StartDate start={rm.createdAt} />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
