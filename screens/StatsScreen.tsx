
import React from 'react';
import { useGame } from '../context/GameContext';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatsScreen: React.FC = () => {
    const { state } = useGame();
    const { history, player, discography } = state;

    const chartData = Object.keys(history).map(year => ({
        year: parseInt(year, 10),
        ...history[parseInt(year, 10)],
    })).sort((a,b) => a.year - b.year);

    const formatNumber = (num: number) => {
        if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
        if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
        return num;
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Career Statistics</h1>

            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Progression</h2>
                 <div className="h-64 w-full">
                    {chartData.length > 1 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                <XAxis dataKey="year" stroke="rgba(255, 255, 255, 0.6)" />
                                <YAxis yAxisId="left" stroke="rgba(255, 255, 255, 0.6)" tickFormatter={formatNumber} />
                                <YAxis yAxisId="right" orientation="right" stroke="rgba(255, 255, 255, 0.6)" tickFormatter={formatNumber} />
                                <Tooltip contentStyle={{ backgroundColor: '#1C1C1E', border: '1px solid #333' }} labelStyle={{ color: '#FFF' }} />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="fame" stroke="#FFD700" strokeWidth={2} name="Fame" />
                                <Line yAxisId="right" type="monotone" dataKey="fans" stroke="#00BFFF" strokeWidth={2} name="Fans" />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-ios-label-secondary">
                            <p>Not enough data for a chart. Play for more than a year!</p>
                        </div>
                    )}
                 </div>
            </div>

            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-2">Discography Summary</h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-3xl font-bold">{discography.tracks.length}</p>
                        <p className="text-ios-label-secondary">Tracks Released</p>
                    </div>
                     <div>
                        <p className="text-3xl font-bold">{discography.albums.length}</p>
                        <p className="text-ios-label-secondary">Albums Released</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsScreen;
