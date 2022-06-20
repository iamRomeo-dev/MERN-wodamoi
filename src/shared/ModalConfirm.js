/** @jsxImportSource @emotion/react */
import "twin.macro";
import { Button } from "./Buttons";

export const ModalConfirm = ({ showModal, setShowModal, onRemove, title }) => {
  return (
    <>
      <div
        tw="fixed z-10 inset-0 overflow-hidden mt-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <div tw="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            tw="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span tw="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div tw="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div tw="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div tw="sm:flex sm:items-start justify-between">
                <div tw="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 tw="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {title}
                  </h3>
                </div>
              </div>
            </div>
            <div tw="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <div tw="flex space-x-3 items-center justify-end">
                <Button onClick={() => setShowModal(!showModal)}>Annuler</Button>
                <Button onClick={onRemove}>Supprimer</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
