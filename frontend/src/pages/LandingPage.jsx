import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, BarChart3 } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">

            {/* BACKGROUND GLOW */}
            <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[120px]" />

            {/* NAV */}
            <nav className="container mx-auto px-6 py-5 flex justify-between items-center border-b border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 group cursor-pointer">

                    {/* Logo */}
                    <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition">

                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-2xl blur-md opacity-40 bg-white"></div>

                        T
                    </div>

                    {/* Brand name */}
                    <div className="flex flex-col leading-tight">
                        <span className="text-xl font-bold tracking-wide text-white">
                            Taskora
                        </span>
                        <span className="text-[11px] text-gray-400 tracking-wider">
                            Work smarter. Ship faster.
                        </span>
                    </div>

                </div>

                <div className="flex items-center gap-3">
                    <Link to="/auth" className="text-gray-300 hover:text-white px-4 py-2">
                        Log in
                    </Link>

                    <Link
                        to="/auth"
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2.5 rounded-xl font-medium hover:scale-105 transition shadow-lg"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="container mx-auto px-6 py-24 text-center relative z-10">

                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                    Manage your team’s work <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        beautifully.
                    </span>
                </h1>

                <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
                    Taskora helps teams plan, track, and deliver projects faster with clarity.
                </p>

                <div className="mt-8 flex justify-center">
                    <Link
                        to="/auth"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 hover:scale-105 transition shadow-2xl"
                    >
                        Start for free <ArrowRight size={18} />
                    </Link>
                </div>

                {/* DASHBOARD PREVIEW IMAGE */}
                <div className="mt-16 flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                        alt="dashboard"
                        className="rounded-2xl shadow-2xl border border-white/10 w-full max-w-5xl"
                    />
                </div>

            </section>

            {/* FEATURES */}
            <section className="py-24 border-t border-white/10 relative z-10">

                <div className="container mx-auto px-6">

                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        Everything you need to manage projects
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10">

                        {/* CARD */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-105 transition shadow-lg">

                            <CheckCircle2 className="text-blue-400 mb-5" size={28} />

                            <h3 className="text-xl font-semibold mb-3">Task Management</h3>
                            <p className="text-gray-400">
                                Create, assign, and track tasks from Todo to Done with ease.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-105 transition shadow-lg">

                            <Users className="text-indigo-400 mb-5" size={28} />

                            <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
                            <p className="text-gray-400">
                                Work with your team in real-time and manage everything in one place.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-105 transition shadow-lg">

                            <BarChart3 className="text-purple-400 mb-5" size={28} />

                            <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
                            <p className="text-gray-400">
                                Get insights into performance, workload, and project progress.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* EXTRA SECTION (COMPANY FEEL) */}
            <section className="py-24 text-center">

                <h2 className="text-3xl font-bold mb-6">
                    Built for teams that move fast 🚀
                </h2>

                <p className="text-gray-400 max-w-xl mx-auto">
                    From startups to enterprises, TaskFlow helps teams stay aligned,
                    productive, and ahead of deadlines.
                </p>

                <div className="mt-10 flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                        className="rounded-xl w-full max-w-4xl shadow-xl"
                    />
                </div>

            </section>

            {/* FOOTER */}
            <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/10">
                © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </footer>

        </div>
    );
};

export default LandingPage;