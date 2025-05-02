"use client";

import {
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
    }[];
  };
}

export function LineChart({ data }: LineChartProps) {
  const datasetKeys = data.datasets.map((d) => d.label);

  const chartData = data.labels.map((label, i) => {
    const entry: Record<string, number | string> = { label };
    data.datasets.forEach((ds) => {
      entry[ds.label] = ds.data[i] ?? 0;
    });
    return entry;
  });

  const chartConfig = data.datasets.reduce((acc: any, ds, i) => {
    acc[ds.label] = {
      label: ds.label,
      color: ds.borderColor ?? `hsl(var(--chart-${i + 1}))`,
    };
    return acc;
  }, {});

  return (
    <ChartContainer config={chartConfig}>
      <RechartsLineChart
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        {datasetKeys.map((key: string) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}

export default LineChart;
