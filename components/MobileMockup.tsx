import React from 'react';

interface MobileMockupProps {
    children: React.ReactNode;
    currentApp: string;
    onGoHome: () => void;
    onGoBack: () => void;
}

const MobileMockup: React.FC<MobileMockupProps> = ({ children, currentApp, onGoHome, onGoBack }) => {
    return (
        <div className="w-[300px] h-[600px] bg-black rounded-[40px] border-[10px] border-gray-800 shadow-2xl overflow-hidden relative flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>

            <div className="flex-grow bg-blue-900 overflow-hidden relative">
                {children}
            </div>

            {/* Navigation Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center">
                {currentApp !== 'homescreen' && (
                    <button onClick={onGoBack} aria-label="Go back" className="absolute left-4 bottom-2 p-1 text-white/50 hover:text-white/80 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
                <button onClick={onGoHome} aria-label="Go to homescreen" className="w-32 h-1.5 bg-white/50 rounded-full hover:bg-white/80 transition-colors"></button>
            </div>
        </div>
    );
};

export default MobileMockup;
