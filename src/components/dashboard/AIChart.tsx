import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

const AIChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAIChartData = async () => {
    setLoading(true);
    try {
      // Simulate an API call to fetch AI-generated chart data
      const response: { name: string; value: number }[] = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { name: 'Jan', value: Math.random() * 100 },
              { name: 'Feb', value: Math.random() * 100 },
              { name: 'Mar', value: Math.random() * 100 },
              { name: 'Apr', value: Math.random() * 100 },
              { name: 'May', value: Math.random() * 100 },
              { name: 'Jun', value: Math.random() * 100 },
            ]),
          1000
        )
      );
      setData(response);
    } catch (error) {
      console.error('Error fetching AI chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIChartData();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">AI-Generated Chart</h3>
      {loading ? (
        <p>Loading AI data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
      <Button onClick={fetchAIChartData} className="mt-4">
        Refresh Data
      </Button>
    </div>
  );
};

export default AIChart;