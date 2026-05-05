import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, LogOut, Menu } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Projects', path: '/projects', icon: FolderKanban },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

            {/* Sidebar */}
            <aside
                className={`${collapsed ? 'w-20' : 'w-72'
                    } transition-all duration-300 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col`}
            >

                {/* Logo */}
                <div className="p-4 flex items-center justify-between border-b border-white/10">
                    {!collapsed && (
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                            TaskFlow
                        </span>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-lg hover:bg-white/10"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Nav */}
                <div className="flex-1 px-3 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'text-gray-300 hover:bg-white/10'
                                    }`}
                            >

                                {/* Active bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-0 h-full w-1 bg-indigo-400 rounded-r"></div>
                                )}

                                <Icon size={20} />

                                {!collapsed && (
                                    <span className="font-medium">{item.name}</span>
                                )}

                                {/* Tooltip */}
                                {collapsed && (
                                    <span className="absolute left-full ml-3 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom */}
                <div className="p-4 border-t border-white/10 space-y-4">

                    {/* User */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                            {user?.name?.charAt(0)}
                        </div>

                        {!collapsed && (
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {user?.role}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition"
                    >
                        {!collapsed && <span>Logout</span>}
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;