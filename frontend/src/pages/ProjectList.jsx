import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { FolderPlus, Users, Calendar, MoreVertical } from 'lucide-react';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const { user } = useAuth();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', newProject);
            setShowModal(false);
            setNewProject({ name: '', description: '' });
            fetchProjects();
        } catch (error) {
            console.error("Error creating project", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* HEADER (FIXED + MODERN) */}
            <div className="flex justify-between items-center bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-6 rounded-2xl shadow-xl border border-white/10">

                <div>
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        Projects
                    </h1>
                    <p className="text-gray-300 text-sm mt-1">
                        Manage your projects and collaborations.
                    </p>
                </div>

                {user?.role === 'ADMIN' && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md"
                    >
                        <FolderPlus size={18} />
                        Add Project
                    </button>
                )}
            </div>

            {/* PROJECT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`} className="group">

                        <div className="relative bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

                            {/* LEFT ACCENT */}
                            <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-all"></div>

                            {/* TOP */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    {project.name.charAt(0)}
                                </div>

                                <button className="text-gray-400 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            {/* CONTENT */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {project.name}
                            </h3>

                            <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                                {project.description}
                            </p>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Users size={16} />
                                    <span>Team</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={16} />
                                    <span>
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                            </div>
                        </div>

                    </Link>
                ))}
            </div>

            {/* EMPTY STATE */}
            {projects.length === 0 && (
                <div className="text-center py-20 bg-white/80 backdrop-blur rounded-2xl border border-gray-200 border-dashed">
                    <FolderPlus size={50} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800">
                        No projects yet
                    </h3>
                    <p className="text-gray-500 mt-1">
                        Create your first project to get started
                    </p>
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">

                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Create Project
                        </h2>

                        <form onSubmit={handleCreateProject} className="space-y-5">

                            <input
                                type="text"
                                placeholder="Project Name"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newProject.name}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, name: e.target.value })
                                }
                            />

                            <textarea
                                placeholder="Description"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                                value={newProject.description}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, description: e.target.value })
                                }
                            />

                            <div className="flex gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 border rounded-xl hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                                >
                                    Create
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
};

export default ProjectList;