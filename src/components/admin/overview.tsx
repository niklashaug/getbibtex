import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Week 1",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 2",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 3",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 4",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 5",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 6",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 7",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 8",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 9",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Week 10",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          tickFormatter={(value: any) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}