import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Line } from 'recharts';
import type { ChartData } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { format, parseISO } from 'date-fns';

interface ProfitLossChartProps {
  data: ChartData[];
  height?: number;
}

export const ProfitLossChart: React.FC<ProfitLossChartProps> = ({ data, height = 400 }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available for chart</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd');
    } catch {
      return dateString;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{formatDate(label)}</p>
          <p className="text-sm text-gray-600">
            Daily P/L: <span className={payload[0].value >= 0 ? 'text-success-600' : 'text-danger-600'}>
              {formatCurrency(payload[0].value)}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Cumulative: <span className={payload[1].value >= 0 ? 'text-success-600' : 'text-danger-600'}>
              {formatCurrency(payload[1].value)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit/Loss Over Time</h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="cumulativeProfitLoss"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="#3b82f6"
            fillOpacity={0.1}
            name="Cumulative P/L"
          />
          <Line
            type="monotone"
            dataKey="profitLoss"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            name="Daily P/L"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Daily Profit/Loss</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600">Cumulative Profit/Loss</span>
        </div>
      </div>
    </div>
  );
}; 