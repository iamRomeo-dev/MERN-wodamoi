/** @jsxImportSource @emotion/react */
import "twin.macro";
import { useLocation, useParams } from "react-router-dom";
import { useRmQuery } from "../APIsRmTracker";
import { Filter } from "../shared/QueryHelper";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth0 } from "@auth0/auth0-react";

const RmTrackerChart = () => {
  const { user } = useAuth0();
  const { movment } = useParams();

  const pageSize = 20;
  const location = useLocation();
  const pageParams = location.search.substr(location.search.length - 1);

  const { status, data: rm } = useRmQuery({
    limit: pageSize,
    skip: Number(pageParams) * pageSize,
    ...Filter.from({
      $and: [
        {
          createdBy: Filter.regex(user.name),
          movment: Filter.regex(movment),
        },
      ],
    }),
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div tw="bg-white p-1 rounded-lg opacity-50">
          <span tw="block text-sm font-medium text-gray-700">{`${payload[0].value} kg`}</span>
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (date) => {
    return (
      date.toString().slice(8, 10) +
      "/" +
      date.toString().slice(5, 7) +
      "/" +
      date.toString().slice(2, 4)
    );
  };

  const weightMax = [];

  const weightMin = [];
  if (status === "success") {
    let weightArray = rm?.list.map((data) => data.weight);
    weightMax.push(Math.max(...weightArray));
    weightMin.push(Math.min(...weightArray));
  }

  return (
    <>
      <ResponsiveContainer width={"100%"} aspect={2}>
        <LineChart
          data={rm?.list}
          margin={{
            top: 20,
            right: 15,
            left: -25,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="createdAt"
            axisLine={true}
            dy={10}
            tickLine={true}
            reversed
            tickFormatter={formatXAxis}
            tick={{ fontSize: 8 }}
          />
          <YAxis
            orientation="left"
            interval="number"
            allowDecimals={false}
            axisLine={true}
            tick={{ fontSize: 5 }}
            // label={{ value: "Toto", angle: -90, position: "insideLeft" }} this set a legend on the side of the chart
            // tick={false}
            domain={[weightMin[0], weightMax[0]]}
          />
          <Tooltip content={<CustomTooltip />} />

          <Line type="monotone" dataKey="weight" stroke="#c880dd" strokeWidth={1} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RmTrackerChart;
