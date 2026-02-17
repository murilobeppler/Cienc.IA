"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newProject, setNewProject] = useState({ name: "", description: "" });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:8000/projects/");
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const createProject = async () => {
        try {
            const response = await fetch("http://localhost:8000/projects/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            });
            if (response.ok) {
                setShowCreateModal(false);
                setNewProject({ name: "", description: "" });
                fetchProjects();
            }
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
        <div className="min-h-screen glow-mesh text-slate-100">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
                            C
                        </div>
                        <span className="text-xl font-bold tracking-tight font-outfit">CiencIA</span>
                    </Link>
                    <div className="flex gap-4 text-sm">
                        <Link href="/chat" className="opacity-60 hover:opacity-100 transition-opacity">Chat AI</Link>
                        <Link href="/visualizer" className="opacity-60 hover:opacity-100 transition-opacity">Visualizador</Link>
                        <Link href="/projects" className="opacity-100 font-semibold">Projetos</Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-24 px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold font-outfit mb-2">Meus Projetos</h1>
                            <p className="text-slate-400">Organize seus pipelines bioinformáticos</p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 transition-colors font-semibold"
                        >
                            + Novo Projeto
                        </button>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className="glass rounded-2xl border border-white/10 p-6 hover:border-sky-500/30 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-2xl">
                                        🧬
                                    </div>
                                    <span className="text-xs opacity-40">
                                        {new Date(project.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold font-outfit mb-2 group-hover:text-sky-400 transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-slate-400 line-clamp-2">
                                    {project.description || "Sem descrição"}
                                </p>
                            </Link>
                        ))}

                        {projects.length === 0 && (
                            <div className="col-span-full text-center py-20">
                                <div className="text-6xl mb-4 opacity-20">📁</div>
                                <p className="text-slate-400">Nenhum projeto criado ainda.</p>
                                <p className="text-sm opacity-60 mt-2">Clique em "Novo Projeto" para começar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="glass rounded-2xl border border-white/10 p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-6">Novo Projeto</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nome do Projeto</label>
                                <input
                                    type="text"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                    placeholder="Ex: Análise RNA-seq Câncer"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500/50 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Descrição</label>
                                <textarea
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    placeholder="Descreva o objetivo do projeto..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500/50 focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="flex-1 px-4 py-3 rounded-xl glass border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={createProject}
                                disabled={!newProject.name}
                                className="flex-1 px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 transition-colors font-semibold disabled:opacity-50"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
