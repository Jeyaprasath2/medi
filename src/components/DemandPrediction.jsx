import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { trainLinearRegressionModel, predictDemand } from '../utils/mlUtils';
import { fetchSalesData } from '../utils/salesUtils';

const DemandPrediction = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const { data: salesData, isLoading, error } = useQuery({
    queryKey: ['salesData'],
    queryFn: fetchSalesData,
  });

  useEffect(() => {
    if (salesData) {
      const trainData = salesData.map((sale, index) => ({
        time: index,
        demand: sale.quantity,
      }));

      trainLinearRegressionModel(trainData).then(trainedModel => {
        setModel(trainedModel);

        const futurePredictions = Array.from({ length: 10 }, (_, i) => {
          const time = trainData.length + i;
          return {
            time,
            predictedDemand: predictDemand(trainedModel, time),
          };
        });

        setPredictions(futurePredictions);
      });
    }
  }, [salesData]);

  if (isLoading) return <div>Loading sales data...</div>;
  if (error) return <div>Error loading sales data: {error.message}</div>;

  const chartData = [
    ...salesData.map((sale, index) => ({
      time: index,
      actualDemand: sale.quantity,
      predictedDemand: null,
    })),
    ...predictions,
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drug Demand Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actualDemand" stroke="#8884d8" name="Actual Demand" />
            <Line type="monotone" dataKey="predictedDemand" stroke="#82ca9d" name="Predicted Demand" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DemandPrediction;