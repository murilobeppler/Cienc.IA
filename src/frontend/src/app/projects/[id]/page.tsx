"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Pipeline {
    id: number;
    name: string;
    script: string;
    status: string;
    created_at: string;
}

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id;

    const [pipelines, setPipelines] = useState<Pipeline[]>([]);
    const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedScript, setEditedScript] = useState("");
    const [runLogs, setRunLogs] = useState("");
    const [activeTab, setActiveTab] = useState<"editor" | "logs">("editor");

    useEffect(() => {
        fetchPipelines();
    }, [projectId]);

    const fetchPipelines = async () => {
        try {
            const response = await fetch(`http://localhost:8000/projects/pipelines?project_id=${projectId}`);
            const data = await response.json();
            setPipelines(data);
        } catch (error) {
            console.error("Error fetching pipelines:", error);
        }
    };

    const createPipeline = async () => {
        const name = prompt("Nome do pipeline:");
        if (!name) return;

        try {
            const response = await fetch("http://localhost:8000/projects/pipelines", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    project_id: Number(projectId),
                    name,
                    script: "#!/usr/bin/env nextflow\n\nnextflow.enable.dsl=2\n\n// Seu pipeline aqui\n",
                }),
            });
            if (response.ok) {
                fetchPipelines();
            }
        } catch (error) {
            console.error("Error creating pipeline:", error);
        }
    };

    const savePipeline = async () => {
        if (!selectedPipeline) return;

        try {
            const response = await fetch(`http://localhost:8000/projects/pipelines/${selectedPipeline.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ script: editedScript }),
            });
            if (response.ok) {
                setIsEditing(false);
                fetchPipelines();
                alert("✅ Pipeline salvo!");
            }
        } catch (error) {
            console.error("Error saving pipeline:", error);
        }
    };

    const executePipeline = async () => {
        if (!selectedPipeline) return;

        try {
            const response = await fetch(`http://localhost:8000/projects/pipelines/${selectedPipeline.id}/execute`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pipeline_id: selectedPipeline.id, params: {} }),
            });
            const data = await response.json();
            setActiveTab("logs");
            setRunLogs(`▶ Executando pipeline...\nRun ID: ${data.run_id}\n${data.message}\n\nMonitorando execução...`);
            alert(`✅ ${data.message}`);
        } catch (error) {
            console.error("Error executing pipeline:", error);
            alert("❌ Erro ao executar pipeline");
        }
    };

    const selectPipeline = (pipeline: Pipeline) => {
        setSelectedPipeline(pipeline);
        setEditedScript(pipeline.script);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen glow-mesh text-slate-100">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/projects" className="text-slate-400 hover:text-slate-100">
                            ← Projetos
                        </Link>
                        <div className="w-px h-6 bg-white/10"></div>
                        <span className="font-bold">Projeto #{projectId}</span>
                    </div>
                    <button
                        onClick={createPipeline}
                        className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 transition-colors text-sm font-semibold"
                    >
                        + Novo Pipeline
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-20 flex h-screen">
                {/* Sidebar - Pipelines List */}
                <div className="w-64 border-r border-white/10 glass p-4 overflow-y-auto">
                    <h2 className="text-sm font-bold uppercase opacity-60 mb-4">Pipelines</h2>
                    <div className="space-y-2">
                        {pipelines.map((pipeline) => (
                            <button
                                key={pipeline.id}
                                onClick={() => selectPipeline(pipeline)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedPipeline?.id === pipeline.id
                                        ? "bg-sky-500/20 border border-sky-500/30"
                                        : "glass border border-white/10 hover:bg-white/5"
                                    }`}
                            >
                                <div className="font-semibold text-sm">{pipeline.name}</div>
                                <div className="text-xs opacity-60 mt-1">{pipeline.status}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col">
                    {selectedPipeline ? (
                        <>
                            {/* Tabs */}
                            <div className="flex gap-2 p-4 border-b border-white/10 glass">
                                <button
                                    onClick={() => setActiveTab("editor")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "editor"
                                            ? "bg-sky-500 text-white"
                                            : "hover:bg-white/5"
                                        }`}
                                >
                                    📝 Editor
                                </button>
                                <button
                                    onClick={() => setActiveTab("logs")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "logs"
                                            ? "bg-sky-500 text-white"
                                            : "hover:bg-white/5"
                                        }`}
                                >
                                    📄 Logs
                                </button>
                                <div className="flex-1"></div>
                                {activeTab === "editor" && (
                                    <div className="flex gap-2">
                                        {!isEditing ? (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="px-4 py-2 rounded-lg glass border border-white/10 hover:bg-white/5 text-sm font-medium"
                                            >
                                                ✏️ Editar
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setEditedScript(selectedPipeline.script);
                                                    }}
                                                    className="px-4 py-2 rounded-lg glass border border-white/10 hover:bg-white/5 text-sm font-medium"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={savePipeline}
                                                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-sm font-medium"
                                                >
                                                    💾 Salvar
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={executePipeline}
                                            disabled={isEditing}
                                            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-sm font-medium"
                                        >
                                            ▶ Executar
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-hidden">
                                {activeTab === "editor" && (
                                    <div className="h-full p-4">
                                        {isEditing ? (
                                            <textarea
                                                value={editedScript}
                                                onChange={(e) => setEditedScript(e.target.value)}
                                                className="w-full h-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:border-sky-500/50 focus:outline-none font-mono text-sm resize-none"
                                                spellCheck={false}
                                            />
                                        ) : (
                                            <div className="h-full glass rounded-xl border border-white/10 p-4 overflow-auto">
                                                <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap">
                                                    {selectedPipeline.script}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === "logs" && (
                                    <div className="h-full p-4">
                                        <div className="h-full glass rounded-xl border border-white/10 p-4 overflow-auto">
                                            <pre className="font-mono text-xs text-emerald-300 whitespace-pre-wrap">
                                                {runLogs || "Nenhuma execução ainda.\nClique em 'Executar' para rodar o pipeline."}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center opacity-40">
                            <div>
                                <div className="text-6xl mb-4">📝</div>
                                <p>Selecione um pipeline na sidebar</p>
                                <p className="text-sm mt-2">ou crie um novo</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
