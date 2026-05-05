import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData.name, formData.email, formData.password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data || 'Authentication failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">

            {/* BACKGROUND GLOW */}
            <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full top-[-200px] left-[-200px]"></div>
            <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full bottom-[-250px] right-[-200px]"></div>

            {/* MAIN CARD */}
            <div className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

                {/* LEFT BRAND PANEL */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-10 flex-col justify-between">

                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-bold">
                                T
                            </div>
                            <span className="text-xl font-bold text-white">Taskora</span>
                        </div>

                        <h1 className="text-3xl font-bold text-white mt-10 leading-snug">
                            Manage projects <br /> like a pro 🚀
                        </h1>

                        <p className="text-white/80 mt-4 text-sm leading-relaxed">
                            Organize tasks, collaborate with teams, and track progress in one powerful workspace.
                        </p>
                    </div>

                    <div className="text-white/60 text-xs">
                        © {new Date().getFullYear()} Taskora
                    </div>

                </div>

                {/* RIGHT FORM PANEL */}
                <div className="w-full md:w-1/2 p-10">

                    {/* HEADER MESSAGE (UPDATED 🔥) */}
                    <h2 className="text-2xl font-bold text-white">
                        {isLogin ? 'Welcome back' : 'Create your account'}
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                        {isLogin
                            ? 'You’re just 1 step away from your dashboard.'
                            : 'You’re just 1 step away from starting your journey.'}
                    </p>

                    {/* ERROR */}
                    {error && (
                        <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                        {/* NAME */}
                        {!isLogin && (
                            <div>
                                <label className="text-xs text-gray-400">Full Name</label>
                                <div className="relative mt-1">
                                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full pl-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 outline-none"
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {/* EMAIL */}
                        <div>
                            <label className="text-xs text-gray-400">Email</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full pl-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 outline-none"
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-xs text-gray-400">Password</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 outline-none"
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition shadow-lg mt-2"
                        >
                            {isLogin ? 'Sign in' : 'Create account'}
                        </button>

                    </form>

                    {/* SWITCH */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="ml-2 text-blue-400 hover:text-blue-300 font-medium"
                        >
                            {isLogin ? 'Sign up' : 'Login'}
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default AuthPage;