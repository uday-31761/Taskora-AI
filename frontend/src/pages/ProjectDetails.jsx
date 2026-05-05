import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Plus, UserPlus, Calendar, ArrowRight, ArrowLeft, ArrowLeftRight, Clock } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modals state
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showMemberModal, setShowMemberModal] = useState(false);

    // Forms state
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: '' });
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
            console.error("Error fetching project data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/tasks/project/${id}`, newTask);
            setShowTaskModal(false);
            setNewTask({ title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: '' });
            fetchProjectData();
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/projects/${id}/members`, { email: newMemberEmail });
            setShowMemberModal(false);
            setNewMemberEmail('');
            fetchProjectData();
        } catch (error) {
            console.error("Error adding member", error);
            alert("Failed to add member. Please check the email.");
        }
    };

    const handleUpdateStatus = async (taskId, newStatus) => {
        try {
            await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
            fetchProjectData();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    if (!project) return <div>Project not found</div>;

    const todoTasks = tasks.filter(t => t.status === 'TODO');
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
    const doneTasks = tasks.filter(t => t.status === 'DONE');

    const renderTaskCard = (task) => (
        <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 hover:border-blue-300 transition-colors cursor-grab group">
            <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${task.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                    task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                    {task.priority}
                </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>

            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-xs text-gray-500 gap-1 bg-gray-50 px-2 py-1 rounded-md">
                    <Clock size={12} />
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {task.status === 'TODO' && (
                        <button onClick={() => handleUpdateStatus(task.id, 'IN_PROGRESS')} className="p-1.5 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors" title="Move to In Progress">
                            <ArrowRight size={14} />
                        </button>
                    )}
                    {task.status === 'IN_PROGRESS' && (
                        <>
                            <button onClick={() => handleUpdateStatus(task.id, 'TODO')} className="p-1.5 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors" title="Move to To Do">
                                <ArrowLeft size={14} />
                            </button>
                            <button onClick={() => handleUpdateStatus(task.id, 'DONE')} className="p-1.5 bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 rounded-lg transition-colors" title="Move to Done">
                                <ArrowRight size={14} />
                            </button>
                        </>
                    )}
                    {task.status === 'DONE' && (
                        <button onClick={() => handleUpdateStatus(task.id, 'IN_PROGRESS')} className="p-1.5 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors" title="Move to In Progress">
                            <ArrowLeft size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 shrink-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                        <p className="text-gray-600 max-w-3xl">{project.description}</p>
                    </div>
                    <div className="flex gap-3">
                        {user?.role === 'ADMIN' && (
                            <button
                                onClick={() => setShowMemberModal(true)}
                                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2"
                            >
                                <UserPlus size={18} />
                                Add Member
                            </button>
                        )}
                        <button
                            onClick={() => setShowTaskModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
                        >
                            <Plus size={18} />
                            New Task
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100 overflow-visible">
                    <span className="text-sm font-medium text-gray-500">Team:</span>

                    <div className="flex -space-x-2 overflow-visible">
                        {project.members && project.members.map((m) => (
                            <div key={m.id} className="relative group">

                                {/* Avatar */}
                                <div className="h-8 w-8 rounded-full ring-2 ring-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 uppercase cursor-pointer">
                                    {m.name.charAt(0)}
                                </div>

                                {/* Tooltip */}
                                <div className="absolute z-50 bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200">
                                    <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
                                        {m.name}
                                    </div>

                                    {/* Arrow */}
                                    <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1"></div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
                {/* To Do */}
                <div className="flex-1 min-w-[320px] max-w-[400px] flex flex-col bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                            To Do
                        </h3>
                        <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{todoTasks.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        {todoTasks.map(renderTaskCard)}
                        {todoTasks.length === 0 && (
                            <div className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-sm text-gray-400">
                                No tasks to do
                            </div>
                        )}
                    </div>
                </div>

                {/* In Progress */}
                <div className="flex-1 min-w-[320px] max-w-[400px] flex flex-col bg-blue-50/30 rounded-2xl p-4 border border-blue-50">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                            In Progress
                        </h3>
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">{inProgressTasks.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        {inProgressTasks.map(renderTaskCard)}
                        {inProgressTasks.length === 0 && (
                            <div className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-sm text-gray-400">
                                Nothing in progress
                            </div>
                        )}
                    </div>
                </div>

                {/* Done */}
                <div className="flex-1 min-w-[320px] max-w-[400px] flex flex-col bg-green-50/30 rounded-2xl p-4 border border-green-50">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                            Done
                        </h3>
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">{doneTasks.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        {doneTasks.map(renderTaskCard)}
                        {doneTasks.length === 0 && (
                            <div className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-sm text-gray-400">
                                No completed tasks
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Task Modal */}
            {showTaskModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h2>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    rows="3"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        value={newTask.status}
                                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                                    >
                                        <option value="TODO">To Do</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="DONE">Done</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    >
                                        <option value="LOW">Low</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HIGH">High</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowTaskModal(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Member Modal */}
            {showMemberModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Member</h2>
                        <p className="text-sm text-gray-500 mb-6">Enter the email address of the user you want to add to this project.</p>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    required
                                    placeholder="user@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newMemberEmail}
                                    onChange={(e) => setNewMemberEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowMemberModal(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Add Member</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
