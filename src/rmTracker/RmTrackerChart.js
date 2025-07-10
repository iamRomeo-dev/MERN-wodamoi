/** @jsxImportSource @emotion/react */
import "twin.macro";
import { useParams } from "react-router-dom";
import { useRmQuery } from "../APIsRmTracker";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Spinner } from "../shared/Spinner";
import { Filter } from "../shared/QueryHelper";
import { useAuth0 } from "@auth0/auth0-react";

const RmTrackerChartSuccessExist = ({ rm }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div tw="bg-white p-1 rounded-lg opacity-50">
          <span tw="block text-xs font-medium text-gray-700">{`${payload[0].value} kg`}</span>
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

  let weightArray = rm.map((data) => data.weight);
  weightMax.push(Math.max(...weightArray));
  weightMin.push(Math.min(...weightArray));

  return (
    <>
      <ResponsiveContainer width={"95%"} aspect={2}>
        <LineChart
          data={rm}
          margin={{
            top: 20,
            right: 15,
            left: 0,
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

const RmTrackerChartSuccess = ({ data, movment }) => {
  const rm = data.list.filter((word) => word.movment.toLowerCase() === movment.toLowerCase());

  if (rm.length > 0) {
    return <RmTrackerChartSuccessExist rm={rm} />;
  } else {
    return (
      <p tw="flex justify-center text-white text-xs mb-4">Impossible d'afficher le graphique</p>
    );
  }
};

const RmTrackerChart = () => {
  const { user } = useAuth0();
  const { movment } = useParams();

  const { status, data } = useRmQuery({
    ...Filter.from({
      $and: [
        {
          createdBy: { $regex: user.email, $options: "i" },
        },
      ],
    }),
  });
  if (status === "error") {
    return <p tw="flex justify-center text-xs text-white">Impossible d'afficher le graphique</p>;
  }

  if (status === "loading") {
    return <Spinner tw="h-6 w-6 fixed left-1/2 md:left-2/3 top-1/2" />;
  }

  if (status === "success") {
    return <RmTrackerChartSuccess data={data} movment={movment} />;
  }
};

export default RmTrackerChart;
