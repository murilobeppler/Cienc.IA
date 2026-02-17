"use client";

import { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import CodePreview from "@/components/CodePreview";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Olá! Sou a CiencIA Assistant. Descreva seu experimento e vou gerar um pipeline Nextflow personalizado para você. 🧬",
        },
    ]);
    const [input, setInput] = useState("");
    const [generatedScript, setGeneratedScript] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Send to backend
            const response = await fetch("http://localhost:8000/chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    context: messages,
                }),
            });

            const data = await response.json();

            const aiMessage: Message = {
                role: "assistant",
                content: data.response,
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: "assistant",
                content: "Erro ao se comunicar com o servidor. Verifique se o backend está rodando.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGeneratePipeline = async () => {
        if (!input.trim()) return;

        setIsLoading(true);
        const userMessage: Message = { role: "user", content: `Gerar pipeline: ${input}` };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch("http://localhost:8000/chat/generate-pipeline", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: input,
                }),
            });

            const data = await response.json();

            setGeneratedScript(data.script);
            const aiMessage: Message = {
                role: "assistant",
                content: `Pipeline gerado com sucesso!\n\n${data.explanation}`,
            };
            setMessages((prev) => [...prev, aiMessage]);
            setInput("");
        } catch (error) {
            const errorMessage: Message = {
                role: "assistant",
                content: "Erro ao gerar pipeline. Verifique sua API key do Gemini no backend.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
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
                    <div className="text-sm opacity-60">AI Pipeline Generator</div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-20 px-4 pb-32">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
                    {/* Chat Panel */}
                    <div className="flex flex-col glass rounded-2xl border border-white/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                            <h2 className="font-bold text-lg">Chat com IA</h2>
                            <p className="text-xs opacity-60 mt-1">Descreva seu experimento</p>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg, idx) => (
                                <ChatMessage key={idx} role={msg.role} content={msg.content} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="glass rounded-2xl px-5 py-3 border border-white/10">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse delay-75"></div>
                                            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse delay-150"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/5 bg-white/5">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                    placeholder="Descreva seu experimento..."
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500/50 focus:outline-none"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading}
                                    className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 transition-colors font-semibold disabled:opacity-50"
                                >
                                    Enviar
                                </button>
                            </div>
                            <button
                                onClick={handleGeneratePipeline}
                                disabled={isLoading || !input.trim()}
                                className="w-full mt-2 px-6 py-2 rounded-xl glass border border-sky-500/30 hover:bg-sky-500/10 transition-colors text-sm font-medium disabled:opacity-50"
                            >
                                ⚡ Gerar Pipeline Nextflow
                            </button>
                        </div>
                    </div>

                    {/* Code Preview Panel */}
                    <div className="flex flex-col glass rounded-2xl border border-white/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                            <h2 className="font-bold text-lg">Pipeline Gerado</h2>
                            <p className="text-xs opacity-60 mt-1">Código pronto para execução</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {generatedScript ? (
                                <>
                                    <CodePreview code={generatedScript} language="nextflow" />
                                    <div className="mt-4 flex gap-3">
                                        <button className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition-colors font-semibold">
                                            ▶ Executar Pipeline
                                        </button>
                                        <button className="px-4 py-3 rounded-xl glass border border-white/10 hover:bg-white/5 transition-colors">
                                            💾 Salvar
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex items-center justify-center text-center opacity-40">
                                    <div>
                                        <div className="text-4xl mb-4">🧬</div>
                                        <p className="text-sm">Nenhum pipeline gerado ainda.</p>
                                        <p className="text-xs mt-2">Use o chat para descrever seu experimento</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
