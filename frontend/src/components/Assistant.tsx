import React, { useState } from 'react';
import Chatbot from './chatbot';

interface AssistantProps {
    data: {
        profileImage: string | null;
        name: string;
        title: string;
        degree: string;
        bio: string;
    };
}

const Assistant: React.FC<AssistantProps> = ({ data }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(true);

    return (
        <div className="h-[100dvh] flex bg-black-rich overflow-hidden font-sans text-white relative">

            {/* Mobile Toggle for Profile (Only visible on small screens) */}
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="md:hidden absolute top-4 left-4 z-50 p-2 bg-black-rich/80 backdrop-blur border border-gold/30 rounded-full text-gold"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            {/* Left Panel: Profile / Context */}
            <div className={`
                absolute md:relative z-40 bg-black-rich/95 md:bg-black-rich border-r border-gold/10
                w-full md:w-[350px] lg:w-[400px] h-full flex flex-col transition-all duration-300 ease-in-out
                ${isProfileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center text-center custom-scrollbar">

                    {/* Close Button Mobile */}
                    <button
                        onClick={() => setIsProfileOpen(false)}
                        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative group mb-6 mt-10 md:mt-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-gold to-gold-dark rounded-full opacity-70 blur-md group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative w-40 h-40 rounded-full p-1 bg-black-rich overflow-hidden">
                            <img
                                src={data.profileImage || 'https://via.placeholder.com/300'}
                                alt={data.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl font-heading font-bold text-white tracking-tight mb-2">
                        {data.name}
                    </h1>

                    {/* Degree Section */}
                    <p className="text-gray-400 font-light text-sm mb-1">
                        {data.degree}
                    </p>

                    <p className="text-gold font-medium tracking-wide text-lg mb-6  text-sm">
                        {data.title}
                    </p>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6"></div>

                    <div className="w-full text-left space-y-4">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <h3 className="text-gold text-xs font-bold uppercase tracking-wider mb-2">About</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {data.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Chat Interface */}
            <div className="flex-1 flex flex-col h-full relative bg-[url('https://images.unsplash.com/photo-1550684846-938a165b53e8?q=80&w=2667&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black-rich/80 backdrop-blur-sm"></div>

                <div className="relative z-10 flex-1 flex flex-col h-full max-w-5xl mx-auto w-full p-4 md:p-6 lg:p-8">
                    <div className="flex-1 bg-black-rich/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                        <Chatbot />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assistant;
