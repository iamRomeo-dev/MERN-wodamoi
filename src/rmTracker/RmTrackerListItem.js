/** @jsxImportSource @emotion/react */
import { BanIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "twin.macro";
import { useDeleteRm } from "../APIsRmTracker";
import { Badge, VerticalSignal } from "../shared/Badge";
import { StartDate } from "../shared/Date";
import { ModalConfirm } from "../shared/ModalConfirm";

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
  const [isDeletable, setIsDeletable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { mutateAsync: deleteRm } = useDeleteRm();
  const location = useLocation();

  const rmPathname = location.pathname.split("/").pop();
  console.log("RmTrackerListItem", rmPathname);

  const color = getInactifStatusColor(rm.movment);
  const onRemove = (e) => {
    e.preventDefault();
    deleteRm(rm._id);
  };

  return (
    <div tw="relative hover:bg-gray-50" onClick={() => setIsDeletable(!isDeletable)}>
      <VerticalSignal color={color} />
      <div tw="px-4 py-4 sm:px-6">
        <div tw="flex items-center justify-between">
          <div tw="flex items-center gap-1">
            {isDeletable === true ? (
              <span
                tw="rounded-full h-5 w-5 bg-red-500 cursor-pointer"
                onClick={() => {
                  setIsDeletable(false);
                  setShowModal(!showModal);
                }}
              >
                <BanIcon tw="text-white" />
              </span>
            ) : (
              <p tw="text-sm font-medium text-gray-700 truncate w-40">{rm.movment.toUpperCase()}</p>
            )}
          </div>

          <div tw="ml-2 flex-shrink-0 flex">
            <p tw="text-sm font-medium text-gray-400 truncate mr-4">{rm.weight.toUpperCase()} kg</p>
            <Badge status={rm.movment}>
              <StartDate start={rm.createdAt} />
            </Badge>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalConfirm
          showModal={showModal}
          setShowModal={setShowModal}
          onRemove={onRemove}
          title="Voulez-vous supprimer définitivement ce PR ?"
        />
      )}
    </div>
  );
};
