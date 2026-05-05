import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import {
    PieChart, Pie, Cell,
    ResponsiveContainer, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Clock, CheckCircle2, CircleDashed, LayoutList } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            const res = await api.get('/dashboard/stats');
            setStats(res.data);
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
                Loading...
            </div>
        );
    }

    const COLORS = ['#6366f1', '#f59e0b', '#22c55e'];

    const pieData = [
        { name: 'To Do', value: stats.todo },
        { name: 'In Progress', value: stats.inProgress },
        { name: 'Done', value: stats.done },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-6 space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome back, <span className="text-indigo-400">{user?.name}</span>
                </h1>
                <p className="text-gray-400 mt-1">
                    Here's what's happening in your workspace
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                <StatCard
                    title="Total Tasks"
                    value={stats.totalTasks}
                    icon={<LayoutList />}
                    color="from-indigo-500 to-indigo-700"
                />

                <StatCard
                    title="In Progress"
                    value={stats.inProgress}
                    icon={<CircleDashed />}
                    color="from-yellow-500 to-orange-500"
                />

                <StatCard
                    title="Completed"
                    value={stats.done}
                    icon={<CheckCircle2 />}
                    color="from-green-500 to-emerald-600"
                />

                <StatCard
                    title="Overdue"
                    value={stats.overdue}
                    icon={<Clock />}
                    color="from-red-500 to-pink-600"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Pie */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 h-[420px]">
                    <h2 className="text-lg font-semibold mb-4 text-gray-200">
                        Task Status Distribution
                    </h2>

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 h-[420px]">
                    <h2 className="text-lg font-semibold mb-4 text-gray-200">
                        Tasks Overview
                    </h2>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pieData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                {pieData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

/* Reusable Card */
const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r ${color} shadow-lg`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm">{title}</p>
                    <h3 className="text-2xl font-bold text-white">{value}</h3>
                </div>
                <div className="text-white/90">
                    {icon}
                </div>
            </div>

            {/* glow effect */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/20 blur-2xl rounded-full"></div>
        </div>
    );
};