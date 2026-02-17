"use client";

import { useState } from "react";
import ProteinViewer3D from "@/components/ProteinViewer3D";
import ScatterPlot from "@/components/ScatterPlot";

export default function VisualizerPage() {
    const [activeTab, setActiveTab] = useState<"protein" | "charts">("protein");
    const [pdbId, setPdbId] = useState("1TIM");

    // Sample data for charts
    const sampleData = {
        x: Array.from({ length: 50 }, () => Math.random() * 100),
        y: Array.from({ length: 50 }, () => Math.random() * 100),
        labels: Array.from({ length: 50 }, (_, i) => `Gene ${i + 1}`),
    };

    return (
        <div className="min-h-screen glow-mesh text-slate-100">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
                            C
                        </div>
                        <span className="text-xl font-bold tracking-tight font-outfit">CiencIA</span>
                    </a>
                    <div className="flex gap-4 text-sm">
                        <a href="/chat" className="opacity-60 hover:opacity-100 transition-opacity">Chat AI</a>
                        <a href="/visualizer" className="opacity-100 font-semibold">Visualizador</a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-24 px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold font-outfit mb-2">Visualizador Científico</h1>
                        <p className="text-slate-400">Explore proteínas em 3D e visualize dados experimentais</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab("protein")}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "protein"
                                ? "bg-sky-500 text-white"
                                : "glass border border-white/10 hover:bg-white/5"
                                }`}
                        >
                            🧬 Proteínas 3D
                        </button>
                        <button
                            onClick={() => setActiveTab("charts")}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "charts"
                                ? "bg-sky-500 text-white"
                                : "glass border border-white/10 hover:bg-white/5"
                                }`}
                        >
                            📊 Gráficos Científicos
                        </button>
                    </div>

                    {/* Content */}
                    <div className="glass rounded-2xl border border-white/10 p-6">
                        {activeTab === "protein" && (
                            <div>
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* RCSB PDB Search */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">🔬 RCSB PDB ID</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={pdbId}
                                                onChange={(e) => setPdbId(e.target.value.toUpperCase())}
                                                placeholder="Ex: 1TIM, 2HHB"
                                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500/50 focus:outline-none"
                                            />
                                            <button
                                                onClick={() => window.location.reload()}
                                                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 transition-colors font-semibold"
                                            >
                                                Carregar
                                            </button>
                                        </div>
                                        <p className="text-xs opacity-60 mt-2">Estruturas experimentais</p>
                                    </div>

                                    {/* AlphaFold Search */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">🧬 AlphaFold (Gene/UniProt)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Ex: TP53, Q5VSL9"
                                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500/50 focus:outline-none"
                                                id="alphafold-search"
                                            />
                                            <button
                                                onClick={async () => {
                                                    const input = (document.getElementById('alphafold-search') as HTMLInputElement).value;
                                                    if (!input) return;

                                                    const isUniProt = /^[A-Z0-9]{6,10}$/.test(input);

                                                    try {
                                                        let endpoint = isUniProt ? '/alphafold/prediction' : '/alphafold/search';
                                                        let body = isUniProt ? { uniprot_id: input } : { gene_name: input };

                                                        const response = await fetch(`http://localhost:8000${endpoint}`, {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify(body)
                                                        });

                                                        const data = await response.json();

                                                        if (data.success) {
                                                            if (data.pdb_data) {
                                                                alert('✅ Estrutura AlphaFold encontrada!');
                                                            } else if (data.results) {
                                                                alert(`Encontrados ${data.results.length} resultados:\n${data.results.map((r: any) => `${r.gene_name} - ${r.uniprot_id}`).join('\n')}`);
                                                            }
                                                        } else {
                                                            alert(`❌ ${data.error}`);
                                                        }
                                                    } catch (error) {
                                                        alert('Erro ao buscar AlphaFold');
                                                    }
                                                }}
                                                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition-colors font-semibold"
                                            >
                                                Buscar
                                            </button>
                                        </div>
                                        <p className="text-xs opacity-60 mt-2">Predições AlphaFold (IA)</p>
                                    </div>
                                </div>

                                <div className="h-[600px]">
                                    <ProteinViewer3D pdbId={pdbId} />
                                </div>

                                <div className="mt-4 p-4 glass rounded-xl border border-sky-500/20">
                                    <h3 className="font-bold text-sm mb-2">ℹ️ Sobre o Visualizador</h3>
                                    <p className="text-sm opacity-80">
                                        Este visualizador utiliza <strong>3Dmol.js</strong> e busca estruturas do{" "}
                                        <a
                                            href="https://www.rcsb.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sky-400 hover:underline"
                                        >
                                            RCSB Protein Data Bank
                                        </a>
                                        . Use os controles para alternar entre representações (Cartoon, Stick, Sphere).
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === "charts" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Análise de Expressão Gênica</h2>
                                <p className="text-slate-400 mb-6">Exemplo de scatter plot para dados de PCA ou expressão diferencial</p>

                                <div className="h-[500px] glass rounded-xl border border-white/10 p-4">
                                    <ScatterPlot
                                        data={sampleData}
                                        title="PCA - Componente 1 vs Componente 2"
                                    />
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass p-4 rounded-xl border border-white/10">
                                        <div className="text-2xl font-bold text-sky-400">50</div>
                                        <div className="text-sm opacity-60">Genes Analisados</div>
                                    </div>
                                    <div className="glass p-4 rounded-xl border border-white/10">
                                        <div className="text-2xl font-bold text-emerald-400">12</div>
                                        <div className="text-sm opacity-60">Upregulated</div>
                                    </div>
                                    <div className="glass p-4 rounded-xl border border-white/10">
                                        <div className="text-2xl font-bold text-red-400">8</div>
                                        <div className="text-sm opacity-60">Downregulated</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
