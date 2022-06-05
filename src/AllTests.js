/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import "twin.macro";
import { Page, PageContent } from "./shared/Page";
import { useEffect, useState } from "react";
import { useRmQuery } from "./APIsRmTracker";
import { Filter } from "./shared/QueryHelper";
import { useAuth0 } from "@auth0/auth0-react";

// J'ai un tableau (myTab)
// Je le parcours dans le map, et je veux stoquer dans ce tableau tout mes inputs dans un seul state
const AllTests = () => {
  const [search, setSearch] = useState([]);
  const myTab = ["1", "2", "3", "4"];

  const debouncedSearch = useDebounce(search);
  console.log("debouncedSearch", debouncedSearch);

  useEffect(() => {
    console.log("useEffect");
    // const newWorkOrder = {
    //   ...workOrdersData?.list[0],
    // };
    // search.forEach((val, i) => (newWorkOrder.photos[i].legend = val));
    // newWorkOrder.photos = upsertWorkOrder();
  }, [debouncedSearch]);

  //Test promises
  // const { user } = useAuth0();
  // const { status, data } = useRmQuery({
  //   ...Filter.from({
  //     $and: [
  //       {
  //         createdBy: Filter.regex(user.name),
  //       },
  //     ],
  //   }),
  // });

  // const { mutate, isLoading: isSaving } = useRmPatchMutation(wodId);

  // const toto = () => {
  //   upsertWorkOrder({
  //     ...workOrdersData?.list[0],
  //     goBackReasons: [
  //       ...workOrdersData?.list[0].goBackReasons,
  //       {
  //         description: data.description,
  //         time: new Date(),
  //         originStatus: workOrdersData?.list[0].status,
  //       },
  //     ],
  //     status: WorkOrderStatus.EN_COURS,
  //   });
  //   navigate(`/mobile/${otId}/en-cours`);
  // };
  return (
    <div>
      <Helmet title="Tests" />
      <Page tw="relative">
        <PageContent>
          {/* <button onClick={toto} tw="border border-red-500 p-4 rounded-md bg-white">
            Valider
          </button> */}
        </PageContent>
        <PageContent>
          <h1>toto</h1>
          {myTab.map((photo, index) => (
            <div key={index} tw="relative">
              <li tw="col-span-1 rounded-lg divide-y divide-gray-200">
                <div tw="space-y-4">{photo}</div>
              </li>
              <form>
                <div tw="space-y-1 mt-2">
                  <input
                    tw="p-1 flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                    type="text"
                    id="legend"
                    onChange={(e) => {
                      const newSearch = [...search];
                      newSearch[index] = e.target.value;
                      setSearch(newSearch);
                    }}
                  />
                </div>
              </form>
            </div>
          ))}
        </PageContent>
      </Page>
    </div>
  );
};

export default AllTests;

const useDebounce = (value, delay = 1000) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};
