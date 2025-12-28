import { useState } from 'react'

const Chatbot = () => {
	const [message, setMessage] = useState('')

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}

	return (
		<div className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
			<div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
				<div className="p-5 flex items-center gap-4 border-b border-slate-200">
					<div className="h-14 w-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center">
						<svg
							width="26"
							height="26"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 3c3.5 0 6 2.6 6 6v2c0 3.4-2.5 6-6 6s-6-2.6-6-6V9c0-3.4 2.5-6 6-6Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinejoin="round"
							/>
							<path
								d="M9 10h.01M15 10h.01"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
							/>
							<path
								d="M9 14h6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<path
								d="M8 20h8"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>

					<div className="flex-1">
						<div className="flex items-center gap-2">
							<h1 className="text-lg font-semibold text-slate-900">Personal AI Assistant</h1>
							<span className="text-sky-500 text-lg leading-none">✧</span>
						</div>
						<p className="text-slate-500">Always here to help</p>
					</div>
				</div>

				<div className="h-[min(520px,65vh)] bg-white">
					<div className="p-6">
						<div className="max-w-2xl bg-slate-100 rounded-2xl p-5 text-slate-900">
							<p>
								Hello! I&apos;m your Personal AI Assistant. I can help you with questions about your
								profile, resume, and more. How can I assist you today?
							</p>
							<p className="mt-4 text-sm text-slate-500">06:58 PM</p>
						</div>
					</div>
				</div>

				<div className="p-5 bg-white">
					<form onSubmit={onSubmit} className="flex items-center gap-4">
						<input
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Type your message..."
							className="flex-1 h-14 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
						/>
						<button
							type="submit"
							aria-label="Send message"
							className="h-14 w-14 rounded-xl bg-sky-300 text-white flex items-center justify-center"
						>
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M22 2 11 13"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M22 2 15 22l-4-9-9-4 20-7Z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</form>

					<p className="mt-3 text-center text-sm text-slate-500">
						Press Enter to send • Powered by AI
					</p>
				</div>
			</div>
		</div>
	)
}

export default Chatbot
