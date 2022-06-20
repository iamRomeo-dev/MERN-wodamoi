/** @jsxImportSource @emotion/react */
import "twin.macro";
import tw from "twin.macro";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { useEffect, useState } from "react";

export const Pagination = ({ data, pageParams, totalOfPages }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setnumberOfPages] = useState(0);
  useEffect(() => {
    setnumberOfPages(totalOfPages);
  }, [totalOfPages]);

  const history = useNavigate();
  const location = useLocation();
  const pages = [...Array(numberOfPages).keys()];
  const goToPrevious = (page) => {
    setPageNumber(Math.max(0, Number(page) - 1));
    history(
      `${location.pathname}${qs.stringify(
        {
          page: Number(page) - 1,
        },
        { addQueryPrefix: true }
      )}`
    );
  };
  const goToNext = (page) => {
    setPageNumber(Math.min(numberOfPages, Number(page) + 1));
    history(
      `${location.pathname}${qs.stringify(
        {
          page: Number(page) + 1,
        },
        { addQueryPrefix: true }
      )}`
    );
  };

  return (
    <nav tw="px-4 flex items-center justify-between sm:px-0 mt-4">
      {/* PREVIOUS button */}
      <div tw="-mt-px w-0 flex-1 flex">
        {Number(pageNumber) !== 0 ? (
          // Active previous btn
          <button
            onClick={() => goToPrevious(pageNumber)}
            tw="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-white hover:text-gray-200 hover:border-gray-300"
          >
            <ArrowNarrowLeftIcon tw="mr-3 h-5 w-5 text-white" aria-hidden="true" />
            Précédent
          </button>
        ) : (
          // Inactive previous btn
          <span tw="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-white opacity-20 hover:text-gray-200 hover:border-gray-300">
            <ArrowNarrowLeftIcon tw="mr-3 h-5 w-5 text-white" aria-hidden="true" />
            Précédent
          </span>
        )}
      </div>
      <div tw="hidden md:-mt-px md:flex">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              setPageNumber(page);
              history(
                `${location.pathname}${qs.stringify(
                  {
                    page,
                  },
                  { addQueryPrefix: true }
                )}`
              );
            }}
            tw="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            css={pageNumber === page && tw`text-indigo-400 border-indigo-300 border-t-2`}
          >
            {Number(page) + 1}
          </button>
        ))}
      </div>
      <div tw="-mt-px w-0 flex-1 flex justify-end">
        {Number(pageNumber) + 1 !== numberOfPages ? (
          <button
            onClick={() => goToNext(pageNumber)}
            tw="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-white hover:text-gray-200 hover:border-gray-300"
          >
            Suivant
            <ArrowNarrowRightIcon tw="ml-3 h-5 w-5 text-white" aria-hidden="true" />
          </button>
        ) : (
          <span tw="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-white opacity-20 hover:text-gray-200 hover:border-gray-300">
            Suivant
            <ArrowNarrowRightIcon tw="ml-3 h-5 w-5 text-white" aria-hidden="true" />
          </span>
        )}
      </div>
    </nav>
  );
};
