
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { value: 100 },
  { value: 120 },
  { value: 115 },
  { value: 130 },
  { value: 125 },
  { value: 140 },
  { value: 135 }
];

export const PriceChart = () => {
  return (
    <div className="h-20 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#2563eb" 
            strokeWidth={2} 
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
