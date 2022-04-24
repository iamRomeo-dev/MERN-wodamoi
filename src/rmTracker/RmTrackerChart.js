/** @jsxImportSource @emotion/react */
import "twin.macro";
import { useLocation, useParams } from "react-router-dom";
import { useRmQuery } from "../APIsRmTracker";
import { useAuth0 } from "@auth0/auth0-react";
import { Filter } from "../shared/QueryHelper";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const RmTrackerChart = () => {
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
          movment: Filter.regex(movment),
        },
      ],
    }),
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2">
          <span className="block text-black">{`${payload[0].value} kg`}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1>eofjze fezjf pezofj ze,</h1>
      <ResponsiveContainer aspect={2}>
        <LineChart
          data={rm?.list}
          margin={{
            top: 50,
            right: 15,
            left: 15,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="createdAt"
            axisLine={true}
            dy={10}
            tickLine={true}
            stroke="rgba(255, 0, 0, 0.8)"
          />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="weight"
            stroke="rgba(255, 0, 0, 0.8)"
            strokeWidth={1}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RmTrackerChart;
