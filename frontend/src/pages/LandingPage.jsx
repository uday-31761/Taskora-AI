import { Link } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle2,
    Users,
    BarChart3,
    ShieldCheck,
    Clock3
} from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#030712] text-white overflow-hidden">

            {/* BACKGROUND EFFECTS */}
            <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-600/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-600/30 rounded-full blur-[120px]" />

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                    {/* LOGO */}
                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30">
                            T
                        </div>

                        <div>
                            <h1 className="text-xl font-bold">
                                Taskora
                            </h1>

                            <p className="text-xs text-gray-400">
                                Team Productivity Platform
                            </p>
                        </div>

                    </div>

                    {/* NAV LINKS */}
                    <div className="hidden md:flex items-center gap-8 text-gray-300">

                        <a href="#features" className="hover:text-white transition">
                            Features
                        </a>

                        <a href="#solutions" className="hover:text-white transition">
                            Solutions
                        </a>

                        <a href="#analytics" className="hover:text-white transition">
                            Analytics
                        </a>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center gap-3">

                        <Link
                            to="/auth"
                            className="text-gray-300 hover:text-white transition"
                        >
                            Log in
                        </Link>

                        <Link
                            to="/auth"
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 rounded-xl font-medium hover:scale-105 duration-300 shadow-lg"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="container mx-auto px-6 py-24 relative z-10">

                <div className="max-w-5xl mx-auto text-center">

                    <p className="uppercase tracking-[5px] text-blue-400 text-sm font-semibold mb-6">
                        Modern Team Management
                    </p>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">

                        Manage projects
                        <br />

                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            smarter & faster.
                        </span>

                    </h1>

                    <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Taskora helps modern teams collaborate, manage workflows,
                        track progress, and deliver projects efficiently with
                        enterprise-grade productivity tools.
                    </p>

                    {/* HERO BUTTONS */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                        <Link
                            to="/auth"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 duration-300 shadow-2xl"
                        >
                            Start Free
                            <ArrowRight size={20} />
                        </Link>

                        <button className="border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition">
                            Watch Demo
                        </button>

                    </div>

                </div>

                {/* DASHBOARD IMAGE */}
                <div className="mt-20 flex justify-center">

                    <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                        alt="dashboard"
                        className="rounded-3xl shadow-2xl border border-white/10 w-full max-w-6xl h-[520px] object-cover"
                    />

                </div>

            </section>

            {/* STATS */}
            <section className="container mx-auto px-6 py-10 relative z-10">

                <div className="grid md:grid-cols-4 gap-6">

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <h2 className="text-4xl font-bold text-blue-400">50K+</h2>
                        <p className="text-gray-400 mt-2">Tasks Managed</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <h2 className="text-4xl font-bold text-purple-400">12K+</h2>
                        <p className="text-gray-400 mt-2">Active Teams</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <h2 className="text-4xl font-bold text-green-400">99.9%</h2>
                        <p className="text-gray-400 mt-2">System Uptime</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <h2 className="text-4xl font-bold text-pink-400">24/7</h2>
                        <p className="text-gray-400 mt-2">Support Available</p>
                    </div>

                </div>

            </section>

            {/* FEATURES */}
            <section
                id="features"
                className="container mx-auto px-6 py-28 relative z-10"
            >

                <div className="text-center mb-20">

                    <p className="uppercase tracking-[4px] text-blue-400 text-sm font-semibold">
                        FEATURES
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold mt-4">
                        Everything your team needs
                    </h2>

                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                        Powerful tools designed to streamline productivity,
                        collaboration, and project execution.
                    </p>

                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* CARD */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:scale-105 duration-300 backdrop-blur-xl">

                        <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                            <CheckCircle2 className="text-blue-400" size={28} />
                        </div>

                        <h3 className="text-2xl font-semibold mb-4">
                            Smart Task Management
                        </h3>

                        <p className="text-gray-400 leading-relaxed">
                            Create, assign, prioritize, and manage tasks
                            efficiently with real-time status tracking.
                        </p>

                    </div>

                    {/* CARD */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:scale-105 duration-300 backdrop-blur-xl">

                        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                            <Users className="text-purple-400" size={28} />
                        </div>

                        <h3 className="text-2xl font-semibold mb-4">
                            Team Collaboration
                        </h3>

                        <p className="text-gray-400 leading-relaxed">
                            Collaborate seamlessly with team members,
                            share updates, and manage workflows together.
                        </p>

                    </div>

                    {/* CARD */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:scale-105 duration-300 backdrop-blur-xl">

                        <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6">
                            <BarChart3 className="text-pink-400" size={28} />
                        </div>

                        <h3 className="text-2xl font-semibold mb-4">
                            Advanced Analytics
                        </h3>

                        <p className="text-gray-400 leading-relaxed">
                            Gain insights into productivity, workloads,
                            project progress, and overall performance.
                        </p>

                    </div>

                </div>

            </section>

            {/* COMPANY SECTION */}
            <section
                id="solutions"
                className="container mx-auto px-6 py-24 relative z-10"
            >

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <div>

                        <p className="uppercase tracking-[4px] text-blue-400 text-sm font-semibold mb-4">
                            WHY TASKORA
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Built for teams
                            that move fast.
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed mt-8">
                            From startups to enterprise organizations,
                            Taskora helps teams stay aligned,
                            productive, and focused on delivering results.
                        </p>

                        <div className="mt-10 space-y-6">

                            <div className="flex gap-4">

                                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                                    <ShieldCheck className="text-blue-400" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-xl">
                                        Enterprise Security
                                    </h4>

                                    <p className="text-gray-400 mt-1">
                                        Secure authentication and role-based access control.
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-4">

                                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                                    <Clock3 className="text-purple-400" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-xl">
                                        Real-Time Updates
                                    </h4>

                                    <p className="text-gray-400 mt-1">
                                        Stay updated with instant project and task synchronization.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="grid grid-cols-2 gap-5">

                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
                            className="rounded-3xl h-64 object-cover shadow-2xl border border-white/10 hover:scale-105 duration-300"
                        />

                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                            className="rounded-3xl h-64 object-cover shadow-2xl border border-white/10 hover:scale-105 duration-300 mt-10"
                        />

                        <img
                            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
                            className="rounded-3xl h-64 object-cover shadow-2xl border border-white/10 hover:scale-105 duration-300"
                        />

                        <img
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
                            className="rounded-3xl h-64 object-cover shadow-2xl border border-white/10 hover:scale-105 duration-300 mt-10"
                        />

                    </div>

                </div>

            </section>

            {/* ANALYTICS SECTION */}
            <section
                id="analytics"
                className="container mx-auto px-6 py-28 relative z-10"
            >

                <div className="text-center mb-16">

                    <p className="uppercase tracking-[4px] text-blue-400 text-sm font-semibold">
                        ANALYTICS
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold mt-4">
                        Monitor performance in real-time
                    </h2>

                </div>

                <div className="flex justify-center">

                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
                        className="rounded-3xl border border-white/10 shadow-2xl w-full max-w-6xl h-[500px] object-cover"
                    />

                </div>

            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 py-28 relative z-10">

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-[40px] p-14 text-center backdrop-blur-xl">

                    <h2 className="text-4xl md:text-5xl font-bold">
                        Ready to boost your team productivity?
                    </h2>

                    <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
                        Join thousands of teams using Taskora to manage projects,
                        collaborate effectively, and deliver results faster.
                    </p>

                    <div className="mt-10">

                        <Link
                            to="/auth"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-2xl font-semibold text-lg inline-flex items-center gap-2 hover:scale-105 duration-300 shadow-2xl"
                        >
                            Start Your Journey
                            <ArrowRight size={20} />
                        </Link>

                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">

                © {new Date().getFullYear()} Taskora. All rights reserved.

            </footer>

        </div>
    );
};

export default LandingPage;
