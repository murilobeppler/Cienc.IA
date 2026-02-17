"use client";

import { useState } from "react";

interface CodePreviewProps {
    code: string;
    language?: string;
}

export default function CodePreview({ code, language = "nextflow" }: CodePreviewProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-xs font-mono opacity-60 ml-2">{language}</span>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium"
                >
                    {copied ? "✓ Copiado" : "Copiar"}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-slate-300">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
