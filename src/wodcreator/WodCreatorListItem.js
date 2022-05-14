/** @jsxImportSource @emotion/react */
import "twin.macro";
import HashtagIcon from "@heroicons/react/outline/HashtagIcon";
import GlobeAltIcon from "@heroicons/react/outline/GlobeAltIcon";
import IdentificationIcon from "@heroicons/react/outline/IdentificationIcon";
import { Badge, BadgeDot } from "../shared/Badge";

export const getInactifStatusColor = (inactifStatus) => {
  switch (inactifStatus) {
    case "METCON":
      return "gray";
    case "AMRAP":
      return "green";
    case "FOR TIME":
      return "red";
    case "EMOM":
      return "yellow";
    default:
      return "green";
  }
};

export const WodCreatorListItem = ({ wod, props }) => {
  const color = getInactifStatusColor(wod.type);

  return (
    <div tw="px-6 py-4 flex items-center" {...props}>
      <div tw="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
        <div tw="truncate w-full">
          <div tw="flex items-center justify-between text-sm">
            <>
              {wod.name ? (
                <p tw="font-medium text-indigo-600 truncate">{wod.name.toUpperCase()}</p>
              ) : (
                <p tw="font-medium text-indigo-600 truncate">WOD SANS NOM</p>
              )}
              {wod.type && (
                <div tw="flex items-center gap-1 text-sm text-gray-500">
                  <Badge color={color}>
                    <BadgeDot />
                    {wod?.type} {wod.time && wod.time + " min"}
                  </Badge>
                </div>
              )}
            </>
          </div>
          <ListTitle wod={wod} />
        </div>
      </div>
    </div>
  );
};

export const ListTitle = ({ wod }) => {
  return (
    <div tw="mt-2 flex items-center justify-between flex-wrap w-full">
      <div tw="flex">
        <div tw="flex items-center flex-wrap gap-4 text-sm text-gray-500">
          <div tw="flex items-center gap-1 text-sm text-gray-500">
            <HashtagIcon tw="w-5 h-5 text-gray-400" />
            <p>{wod?.name}</p>
          </div>

          <div tw="flex items-center gap-1 text-sm text-gray-500">
            <GlobeAltIcon tw="w-5 h-5 text-gray-400" />
            <p>aa</p>
          </div>

          {/* {workSite.start_date && (
            <div tw="flex items-center gap-1 text-sm text-gray-500">
              <CalendarIcon tw="w-5 h-5 text-gray-400" />
              <p>{workSite.start_date.split("T")[0].split("-").reverse().join("-")}</p>
            </div>
          )} */}

          <div tw="flex items-center gap-1 text-sm text-gray-500">
            <IdentificationIcon tw="w-5 h-5 text-gray-400" />
            <p>www</p>
          </div>
        </div>
      </div>
    </div>
  );
};
