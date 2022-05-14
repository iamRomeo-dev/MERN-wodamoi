/** @jsxImportSource @emotion/react */
import "twin.macro";

export const FullTrainingListItem = ({ fullTraining, props }) => {
  return (
    <div tw="px-6 py-4 flex items-center" {...props}>
      <div tw="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
        <div tw="truncate w-full">
          <div tw="flex items-center justify-between text-sm">
            <>
              {fullTraining.name ? (
                <p tw="font-medium text-indigo-600 truncate">{fullTraining.name.toUpperCase()}</p>
              ) : (
                <p tw="font-medium text-indigo-600 truncate">WOD SANS NOM</p>
              )}
            </>
          </div>
          {fullTraining.description && <p tw="text-sm text-gray-500">{fullTraining.description}</p>}
        </div>
      </div>
    </div>
  );
};
