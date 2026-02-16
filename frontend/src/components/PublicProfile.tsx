import React from 'react';
import Chatbot from './chatbot';

interface PublicProfileProps {
    data: {
        profileImage: string | null;
        name: string;
        title: string;
        bio: string;
    };
}

const PublicProfile: React.FC<PublicProfileProps> = ({ data }) => {
    return (
        <div className="h-[100dvh] flex flex-col items-center bg-black-rich relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full flex-1 min-h-0 overflow-hidden flex flex-col items-center pt-20 md:pt-32">

                {/* Hero Section */}
                <div className="w-full max-w-7xl px-8 py-4 md:py-6 flex flex-col md:flex-row items-center gap-6 md:gap-16 shrink-0">

                    {/* Left: Profile Image */}
                    <div className="relative group shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gold to-gold-dark rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full p-1 bg-black-rich">
                            <img
                                src={data.profileImage || 'https://via.placeholder.com/300'}
                                alt={data.name}
                                className="w-full h-full object-cover rounded-full border-2 border-gold/50"
                            />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="text-center md:text-left flex-1 space-y-4 min-w-0">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight truncate leading-tight">
                                {data.name}
                            </h1>
                            <p className="text-lg md:text-xl text-gold font-light tracking-wide truncate mt-1">
                                {data.title}
                            </p>
                        </div>

                        <div className="w-24 h-1 bg-gradient-to-r from-gold to-transparent mx-auto md:mx-0 my-3 opacity-80"></div>

                        <p className="text-gray-400 leading-relaxed max-w-2xl text-base md:text-lg line-clamp-3 md:line-clamp-4">
                            {data.bio}
                        </p>

                        <div className="pt-4">
                            <button className="bg-transparent border border-gold text-gold px-8 py-2.5 rounded-full hover:bg-gold hover:text-black-rich transition-all duration-300 font-semibold uppercase tracking-wider text-sm flex items-center gap-2 mx-auto md:mx-0 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:animate-bounce">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                Download CV
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat Section */}
                <div className="w-full max-w-6xl px-8 pb-8 flex-1 min-h-0 flex flex-col h-full">
                    <div className="flex-1 min-h-0 bg-black-rich/50 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                        <Chatbot />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PublicProfile;
