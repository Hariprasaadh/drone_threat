
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const generateSignalData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    const baseValue = Math.sin(i * 0.5) * 20 + 50;
    const noise = Math.random() * 15 - 7.5;
    data.push({
      time: i,
      signal: Math.max(0, Math.min(100, baseValue + noise)),
      anomaly: i === 8 || i === 15 ? baseValue + noise + 20 : null,
    });
  }
  return data;
};

const RFSignalChart: React.FC = () => {
  const [data, setData] = React.useState(generateSignalData);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(generateSignalData());
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 text-xs border border-border rounded-md shadow-md">
          <p className="font-medium">{`Time: ${label}s`}</p>
          <p className="text-primary">{`Signal Strength: ${payload[0].value.toFixed(2)}`}</p>
          {payload[1]?.value && (
            <p className="text-destructive font-medium">{`Anomaly Detected!`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">RF Signal Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -5 }}
                className="text-xs text-muted-foreground"
              />
              <YAxis 
                domain={[0, 100]}
                label={{ value: 'Strength', angle: -90, position: 'insideLeft' }}
                className="text-xs text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="signal" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, className: "fill-primary stroke-background stroke-2" }}
              />
              <Line 
                type="monotone" 
                dataKey="anomaly" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={{ r: 5, className: "fill-destructive stroke-background stroke-2" }}
                activeDot={{ r: 6, className: "fill-destructive stroke-background stroke-2" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-1.5 rounded-md bg-primary/10">
            <p className="font-medium text-primary">Signal Range</p>
            <p className="text-muted-foreground">2.4-5.8 GHz</p>
          </div>
          <div className="p-1.5 rounded-md bg-destructive/10">
            <p className="font-medium text-destructive">Anomalies</p>
            <p className="text-muted-foreground">2 Detected</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RFSignalChart;
