import React, { useState, useEffect, useRef } from 'react';

interface Message {
	id: string;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
}

type AskResponse = {
	answer: string;
};

const Chatbot: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			text: "Hello! I am the personal assistant of S. Kaveen. I can answer anything about Kaveen, his skills, and experience. How can I help you?",
			sender: 'bot',
			timestamp: new Date()
		}
	]);
	const [input, setInput] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '';

	const askBackend = async (query: string): Promise<string> => {
		const response = await fetch(`${API_BASE_URL}/api/ask`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		});

		if (!response.ok) {
			let detail = 'Request failed';
			try {
				const err = await response.json();
				detail = err?.detail || detail;
			} catch {
				// ignore
			}
			throw new Error(detail);
		}

		const data = (await response.json()) as AskResponse;
		return data.answer;
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		const userMsg: Message = {
			id: Date.now().toString(),
			text: input.trim(),
			sender: 'user',
			timestamp: new Date()
		};
		setMessages(prev => [...prev, userMsg]);
		setInput('');
		setIsTyping(true);

		try {
			const answer = await askBackend(userMsg.text);
			const botMsg: Message = {
				id: (Date.now() + 1).toString(),
				text: answer,
				sender: 'bot',
				timestamp: new Date()
			};
			setMessages(prev => [...prev, botMsg]);
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unknown error';
			const botMsg: Message = {
				id: (Date.now() + 1).toString(),
				text: `Error: ${message}`,
				sender: 'bot',
				timestamp: new Date()
			};
			setMessages(prev => [...prev, botMsg]);
		} finally {
			setIsTyping(false);
		}
	};

	return (
		<div className="flex flex-col h-full bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
			{/* Header */}
			<div className="p-4 border-b border-white/10 bg-black/60 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
					<span className="font-heading font-medium text-gold tracking-wide">AI Assistant Interaction</span>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
					>
						<div
							className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
								? 'bg-gold/20 text-white border border-gold/30 rounded-tr-none'
								: 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
								}`}
						>
							{msg.text}
						</div>
					</div>
				))}
				{isTyping && (
					<div className="flex justify-start">
						<div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-1">
							<span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
							<span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
							<span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			<form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/60">
				<div className="flex gap-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Ask about skills, experience..."
						disabled={isTyping}
						className="flex-1 bg-black-rich border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-60"
					/>
					<button
						type="submit"
						disabled={!input.trim() || isTyping}
						className="bg-gold text-black-rich p-3 rounded-xl hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
							<path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
};

export default Chatbot;
