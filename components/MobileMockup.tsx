import React from 'react';

interface MobileMockupProps {
    children: React.ReactNode;
    currentApp: string;
    onGoHome: () => void;
}

const MobileMockup: React.FC<MobileMockupProps> = ({ children, currentApp, onGoHome }) => {
    return (
        <div className="w-[300px] h-[600px] bg-black rounded-[40px] border-[10px] border-gray-800 shadow-2xl overflow-hidden relative flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>

            <div className="flex-grow bg-blue-900 overflow-hidden relative">
                {children}
            </div>

            {/* Home Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <button onClick={onGoHome} className="w-32 h-1.5 bg-white/50 rounded-full hover:bg-white/80 transition-colors"></button>
            </div>
        </div>
    );
};

export default MobileMockup;
