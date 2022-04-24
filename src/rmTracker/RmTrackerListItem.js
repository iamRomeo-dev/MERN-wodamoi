/** @jsxImportSource @emotion/react */
import "twin.macro";
import HashtagIcon from "@heroicons/react/outline/HashtagIcon";
import GlobeAltIcon from "@heroicons/react/outline/GlobeAltIcon";
import IdentificationIcon from "@heroicons/react/outline/IdentificationIcon";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, BadgeDot, VerticalSignal } from "../shared/Badge";
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

export const RmTrackerListItem = ({ rm, props }) => {
  const color = getInactifStatusColor(rm.movment);

  const navigate = useNavigate();
  const handleUpsertWorkOrder = () => {
    navigate(`/mobile/${rm._id}`);
  };
  console.log("eoeeo", rm);
  return (
    <div onClick={handleUpsertWorkOrder} tw="relative hover:bg-gray-50 cursor-pointer">
      <VerticalSignal color={color} />
      <div tw="px-4 py-4 sm:px-6">
        <div tw="flex items-center justify-between">
          <p tw="text-sm font-medium text-gray-700 truncate">{rm.movment.toUpperCase()}</p>
          <p tw="text-sm font-medium text-gray-700 truncate">{rm.weight.toUpperCase()} kg</p>
          <div tw="ml-2 flex-shrink-0 flex">
            <Badge status={rm.movment}>
              <StartDate start={rm.createdAt} />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
