import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import {
    Plus,
    UserPlus,
    ArrowRight,
    ArrowLeft,
    Clock
} from 'lucide-react';

const ProjectDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showMemberModal, setShowMemberModal] = useState(false);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: ''
    });

    const [newMemberEmail, setNewMemberEmail] = useState('');

    useEffect(() => {
        fetchProjectData();
    }, [id]);

    const fetchProjectData = async () => {

        try {

            const [projRes, tasksRes] = await Promise.all([
                api.get(`/projects/${id}`),
                api.get(`/tasks/project/${id}`)
            ]);

            setProject(projRes.data);
            setTasks(tasksRes.data);

        } catch (error) {

            console.error('Error fetching project data', error);

        } finally {

            setLoading(false);

        }
    };

    const handleCreateTask = async (e) => {

        e.preventDefault();

        try {

            await api.post(`/tasks/project/${id}`, newTask);

            setShowTaskModal(false);

            setNewTask({
                title: '',
                description: '',
                status: 'TODO',
                priority: 'MEDIUM',
                dueDate: ''
            });

            fetchProjectData();

        } catch (error) {

            console.error('Error creating task', error);

        }
    };

    const handleAddMember = async (e) => {

        e.preventDefault();

        try {

            await api.post(`/projects/${id}/members`, {
                email: newMemberEmail
            });

            setShowMemberModal(false);
            setNewMemberEmail('');

            fetchProjectData();

        } catch (error) {

            console.error('Error adding member', error);

        }
    };

    const handleUpdateStatus = async (taskId, newStatus) => {

        try {

            await api.patch(`/tasks/${taskId}/status`, {
                status: newStatus
            });

            fetchProjectData();

        } catch (error) {

            console.error('Error updating status', error);

        }
    };

    if (loading) {

        return (

            <div className="min-h-screen bg-[#030712] flex items-center justify-center">

                <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            </div>

        );
    }

    if (!project) {

        return (

            <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white text-2xl">
                Project Not Found
            </div>

        );
    }

    const todoTasks = tasks.filter(t => t.status === 'TODO');
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
    const doneTasks = tasks.filter(t => t.status === 'DONE');

    const renderTaskCard = (task) => (

        <div
            key={task.id}
            className="bg-[#111827] border border-white/10 rounded-3xl p-4 hover:border-blue-500/40 transition-all duration-300 shadow-xl"
        >

            {/* PRIORITY */}
            <div className="flex items-center justify-between mb-4">

                <span
                    className={`text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${
                        task.priority === 'HIGH'
                            ? 'bg-red-500/20 text-red-300'
                            : task.priority === 'MEDIUM'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-green-500/20 text-green-300'
                    }`}
                >
                    {task.priority}
                </span>

            </div>

            {/* TITLE */}
            <h3 className="text-base md:text-lg font-bold text-white mb-2 break-words">
                {task.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-sm leading-relaxed break-words mb-5">
                {task.description || 'No description'}
            </p>

            {/* FOOTER */}
            <div className="flex items-center justify-between gap-2 pt-4 border-t border-white/10">

                <div className="flex items-center gap-2 text-xs text-gray-400">

                    <Clock size={13} />

                    <span>
                        {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : 'No Date'}
                    </span>

                </div>

                <div className="flex gap-2 flex-wrap">

                    {task.status === 'TODO' && (

                        <button
                            onClick={() =>
                                handleUpdateStatus(task.id, 'IN_PROGRESS')
                            }
                            className="w-8 h-8 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-300 hover:text-white flex items-center justify-center transition-all"
                        >
                            <ArrowRight size={15} />
                        </button>

                    )}

                    {task.status === 'IN_PROGRESS' && (

                        <>
                            <button
                                onClick={() =>
                                    handleUpdateStatus(task.id, 'TODO')
                                }
                                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                            >
                                <ArrowLeft size={15} />
                            </button>

                            <button
                                onClick={() =>
                                    handleUpdateStatus(task.id, 'DONE')
                                }
                                className="w-8 h-8 rounded-xl bg-green-500/10 hover:bg-green-500 text-green-300 hover:text-white flex items-center justify-center"
                            >
                                <ArrowRight size={15} />
                            </button>
                        </>

                    )}

                    {task.status === 'DONE' && (

                        <button
                            onClick={() =>
                                handleUpdateStatus(task.id, 'IN_PROGRESS')
                            }
                            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                        >
                            <ArrowLeft size={15} />
                        </button>

                    )}

                </div>

            </div>

        </div>

    );

    return (

        <div className="min-h-screen bg-[#030712] text-white px-3 sm:px-5 lg:px-8 py-5 overflow-x-hidden">

            {/* HEADER */}

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-7 shadow-2xl mb-8">

                {/* GLOW */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

                <div className="relative z-10 flex flex-col gap-6">

                    {/* TOP */}
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">

                        {/* LEFT */}
                        <div className="max-w-4xl">

                            <div className="flex items-center gap-4 mb-4">

                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-xl shrink-0">
                                    {project.name?.charAt(0)}
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs sm:text-sm text-blue-400 uppercase tracking-[3px]">
                                        Project Workspace
                                    </p>

                                    <h1 className="text-2xl sm:text-4xl font-bold break-words">
                                        {project.name}
                                    </h1>

                                </div>

                            </div>

                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                                {project.description}
                            </p>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

                            {user?.role === 'ADMIN' && (

                                <button
                                    onClick={() => setShowMemberModal(true)}
                                    className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-3 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
                                    <UserPlus size={18} />
                                    Add Member
                                </button>

                            )}

                            <button
                                onClick={() => setShowTaskModal(true)}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition-all px-5 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-2xl w-full sm:w-auto"
                            >
                                <Plus size={18} />
                                Create Task
                            </button>

                        </div>

                    </div>

                    {/* MEMBERS */}
                    <div>

                        <p className="text-sm text-gray-400 mb-4">
                            Team Members
                        </p>

                        <div className="flex flex-wrap gap-3">

                            {project.members?.map((m) => (

                                <div
                                    key={m.id}
                                    className="relative group"
                                >

                                    {/* AVATAR */}
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold uppercase text-sm cursor-pointer shadow-lg hover:scale-110 transition-all">
                                        {m.name.charAt(0)}
                                    </div>

                                    {/* TOOLTIP */}
                                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-[#111827] border border-white/10 rounded-xl px-4 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">

                                        <p className="text-sm font-semibold text-white">
                                            {m.name}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {m.email}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

            {/* TASK SECTIONS */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* TODO */}

                <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-5">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-xl font-bold">
                            To Do
                        </h2>

                        <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {todoTasks.length}
                        </span>

                    </div>

                    <div className="space-y-4">
                        {todoTasks.map(renderTaskCard)}
                    </div>

                </div>

                {/* IN PROGRESS */}

                <div className="rounded-[28px] border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl p-5">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-xl font-bold">
                            In Progress
                        </h2>

                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                            {inProgressTasks.length}
                        </span>

                    </div>

                    <div className="space-y-4">
                        {inProgressTasks.map(renderTaskCard)}
                    </div>

                </div>

                {/* DONE */}

                <div className="rounded-[28px] border border-green-500/20 bg-green-500/5 backdrop-blur-xl p-5">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-xl font-bold">
                            Done
                        </h2>

                        <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                            {doneTasks.length}
                        </span>

                    </div>

                    <div className="space-y-4">
                        {doneTasks.map(renderTaskCard)}
                    </div>

                </div>

            </div>

        </div>

    );
};

export default ProjectDetails;
