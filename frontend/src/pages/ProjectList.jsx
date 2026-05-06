import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import {
    FolderPlus,
    Users,
    Calendar,
    ArrowRight
} from 'lucide-react';

const ProjectList = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [newProject, setNewProject] = useState({
        name: '',
        description: ''
    });

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

            setNewProject({
                name: '',
                description: ''
            });

            fetchProjects();

        } catch (error) {

            console.error("Error creating project", error);

        }
    };

    if (loading) {

        return (

            <div className="min-h-screen bg-[#030712] flex items-center justify-center">

                <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            </div>

        );
    }

    return (

        <div className="min-h-screen bg-[#030712] text-white px-4 sm:px-6 lg:px-10 py-6 overflow-x-hidden">

            {/* HEADER */}

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-7 mb-8 shadow-2xl">

                {/* GLOW */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    {/* LEFT */}
                    <div>

                        <p className="text-blue-400 uppercase tracking-[3px] text-xs mb-2">
                            Workspace
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Team Projects
                        </h1>

                        <p className="text-gray-400 mt-2 text-sm sm:text-base">
                            Manage tasks, teams, and project workflows efficiently.
                        </p>

                    </div>

                    {/* BUTTON */}
                    {user?.role === 'ADMIN' && (

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition-all px-5 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-2xl w-full sm:w-auto"
                        >
                            <FolderPlus size={18} />
                            Create Project
                        </button>

                    )}

                </div>

            </div>

            {/* PROJECT GRID */}

            {projects.length > 0 ? (

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                    {projects.map((project) => (

                        <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="group"
                        >

                            <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">

                                {/* TOP */}

                                <div className="flex items-start justify-between mb-5">

                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold shadow-lg shrink-0">
                                        {project.name?.charAt(0)}
                                    </div>

                                    <div className="bg-white/10 px-3 py-1 rounded-full text-xs text-gray-300">
                                        Active
                                    </div>

                                </div>

                                {/* CONTENT */}

                                <h2 className="text-xl font-bold mb-3 break-words group-hover:text-blue-400 transition-all">
                                    {project.name}
                                </h2>

                                <p className="text-gray-400 text-sm leading-relaxed break-words min-h-[60px]">
                                    {project.description || 'No description available'}
                                </p>

                                {/* FOOTER */}

                                <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/10">

                                    <div className="flex items-center gap-2 text-gray-400 text-sm">

                                        <Users size={15} />

                                        <span>
                                            Team
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2 text-gray-400 text-sm">

                                        <Calendar size={15} />

                                        <span>
                                            {project.createdAt
                                                ? new Date(project.createdAt).toLocaleDateString()
                                                : 'Today'}
                                        </span>

                                    </div>

                                </div>

                                {/* OPEN */}

                                <div className="mt-5 flex items-center justify-between">

                                    <span className="text-sm text-blue-400 font-medium">
                                        Open Project
                                    </span>

                                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 group-hover:bg-blue-500 flex items-center justify-center transition-all">

                                        <ArrowRight
                                            size={17}
                                            className="text-blue-400 group-hover:text-white"
                                        />

                                    </div>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            ) : (

                <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 backdrop-blur-xl py-20 px-6 text-center">

                    <FolderPlus
                        size={60}
                        className="mx-auto text-gray-500 mb-5"
                    />

                    <h2 className="text-2xl font-bold mb-3">
                        No Projects Yet
                    </h2>

                    <p className="text-gray-400 max-w-md mx-auto">
                        Start by creating your first team project and begin collaborating with your members.
                    </p>

                </div>

            )}

            {/* MODAL */}

            {showModal && (

                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#0f172a] p-6 sm:p-8 shadow-2xl">

                        <h2 className="text-2xl font-bold mb-6">
                            Create New Project
                        </h2>

                        <form
                            onSubmit={handleCreateProject}
                            className="space-y-5"
                        >

                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Project Name
                                </label>

                                <input
                                    type="text"
                                    required
                                    placeholder="Enter project name"
                                    value={newProject.name}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            name: e.target.value
                                        })
                                    }
                                    className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                                />

                            </div>

                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Description
                                </label>

                                <textarea
                                    placeholder="Enter project description"
                                    value={newProject.description}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            description: e.target.value
                                        })
                                    }
                                    className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-blue-500 transition-all min-h-[120px] resize-none"
                                />

                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-3">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] py-3 rounded-2xl font-semibold transition-all"
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
