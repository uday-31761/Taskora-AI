import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Mail,
    Lock,
    User as UserIcon,
    ArrowRight,
    Sparkles
} from 'lucide-react';

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const { login, register } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');

        try {

            if (isLogin) {

                await login(
                    formData.email,
                    formData.password
                );

            } else {

                await register(
                    formData.name,
                    formData.email,
                    formData.password
                );
            }

            navigate('/dashboard');

        } catch (err) {

            setError(
                err.response?.data || 'Authentication failed.'
            );
        }
    };

    return (

        <div className="min-h-screen bg-[#030712] relative overflow-hidden flex items-center justify-center px-4 py-8">

            {/* BACKGROUND */}
            <div className="absolute inset-0">

                <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]" />

                <div className="absolute bottom-[-250px] right-[-200px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px]" />

            </div>

            {/* MAIN LAYOUT */}
            <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-10 items-center">

                {/* LEFT SIDE */}
                <div className="hidden lg:flex flex-col justify-center px-6">

                    {/* LOGO */}
                    <div className="flex items-center gap-4 mb-10">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">

                            <Sparkles className="text-white" size={28} />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold text-white">
                                Taskora
                            </h1>

                            <p className="text-gray-400">
                                Team Productivity Platform
                            </p>

                        </div>

                    </div>

                    {/* TEXT */}
                    <h2 className="text-5xl xl:text-6xl font-extrabold text-white leading-tight">

                        Organize work
                        <br />

                        beautifully.

                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed mt-8 max-w-xl">

                        Manage tasks, collaborate with teams,
                        track project progress, and streamline workflows
                        with a modern productivity platform built for growing companies.

                    </p>

                    {/* IMAGE GRID */}
                    <div className="grid grid-cols-2 gap-5 mt-14">

                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
                            alt=""
                            className="rounded-3xl h-52 object-cover shadow-2xl border border-white/10 hover:scale-105 duration-300"
                        />

                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                            alt=""
                            className="rounded-3xl h-52 object-cover shadow-2xl border border-white/10 mt-10 hover:scale-105 duration-300"
                        />

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="w-full max-w-xl mx-auto">

                    {/* AUTH CONTAINER */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-6 sm:p-8 md:p-10 shadow-2xl">

                        {/* MOBILE LOGO */}
                        <div className="lg:hidden flex items-center gap-3 mb-8">

                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">

                                <Sparkles className="text-white" size={24} />

                            </div>

                            <div>

                                <h1 className="text-2xl font-bold text-white">
                                    Taskora
                                </h1>

                                <p className="text-gray-400 text-sm">
                                    Productivity Platform
                                </p>

                            </div>

                        </div>

                        {/* HEADER */}
                        <div>

                            <p className="uppercase tracking-[4px] text-blue-400 text-xs font-semibold mb-4">
                                Welcome
                            </p>

                            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">

                                {isLogin
                                    ? 'Sign in to continue'
                                    : 'Create your account'}

                            </h2>

                            <p className="text-gray-400 mt-5 text-base leading-relaxed">

                                {isLogin
                                    ? 'Access your workspace and manage your projects seamlessly.'
                                    : 'Start collaborating with your team in minutes.'}

                            </p>

                        </div>

                        {/* ERROR */}
                        {error && (

                            <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-2xl text-sm">

                                {error}

                            </div>

                        )}

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* NAME */}
                            {!isLogin && (

                                <div>

                                    <label className="text-sm text-gray-400">
                                        Full Name
                                    </label>

                                    <div className="relative mt-2">

                                        <UserIcon
                                            className="absolute left-4 top-4 text-gray-400"
                                            size={20}
                                        />

                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full pl-12 py-4 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none focus:border-blue-500 text-base"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value
                                                })
                                            }
                                        />

                                    </div>

                                </div>

                            )}

                            {/* EMAIL */}
                            <div>

                                <label className="text-sm text-gray-400">
                                    Email Address
                                </label>

                                <div className="relative mt-2">

                                    <Mail
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />

                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full pl-12 py-4 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none focus:border-blue-500 text-base"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="text-sm text-gray-400">
                                    Password
                                </label>

                                <div className="relative mt-2">

                                    <Lock
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />

                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 py-4 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none focus:border-blue-500 text-base"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] duration-300 shadow-2xl mt-2"
                            >

                                {isLogin
                                    ? 'Sign In'
                                    : 'Create Account'}

                                <ArrowRight size={20} />

                            </button>

                        </form>

                        {/* SWITCH */}
                        <p className="text-center text-gray-400 mt-8 text-sm sm:text-base">

                            {isLogin
                                ? "Don't have an account?"
                                : 'Already have an account?'}

                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                }}
                                className="ml-2 text-blue-400 hover:text-blue-300 font-semibold"
                            >

                                {isLogin
                                    ? 'Sign Up'
                                    : 'Login'}

                            </button>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AuthPage;
