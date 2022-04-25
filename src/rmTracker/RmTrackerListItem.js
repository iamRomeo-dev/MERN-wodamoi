/** @jsxImportSource @emotion/react */
import "twin.macro";
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
  const color = getInactifStatusColor(rm.movment);

  return (
    <div tw="relative hover:bg-gray-50">
      <VerticalSignal color={color} />
      <div tw="px-4 py-4 sm:px-6">
        <div tw="flex items-center justify-between">
          <p tw="text-sm font-medium text-gray-700 truncate">{rm.movment.toUpperCase()}</p>

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
