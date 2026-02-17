"use client";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${isUser
                        ? "bg-sky-500 text-white"
                        : "glass text-slate-100 border border-white/10"
                    }`}
            >
                {!isUser && (
                    <div className="flex items-center gap-2 mb-2 text-xs opacity-60">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white text-[10px]">
                            AI
                        </div>
                        <span>CiencIA Assistant</span>
                    </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
        </div>
    );
}
