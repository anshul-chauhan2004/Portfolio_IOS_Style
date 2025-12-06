import { useState } from 'react';
import { Bell, Music, Timer } from 'lucide-react';

export function DynamicIsland() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeState, setActiveState] = useState<'default' | 'music' | 'timer'>('default');

    return (
        <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-[100] flex justify-center"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div
                className={`bg-black rounded-[20px] transition-all duration-300 ease-spring ${isExpanded
                    ? 'w-[200px] h-[80px] rounded-[24px]'
                    : 'w-[100px] h-[28px]'
                    }`}
            >
                <div className="relative w-full h-full flex items-center justify-between px-3 overflow-hidden">
                    {/* Default State (Collapsed) */}
                    <div className={`absolute inset-0 flex items-center justify-between px-3 transition-opacity duration-200 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {/* Camera indicator */}
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> {/* Mic indicator */}
                    </div>

                    {/* Expanded State */}
                    <div className={`w-full flex items-center justify-between transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                <Music className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-xs font-medium">Playing</span>
                                <span className="text-white/60 text-[10px]">Lost in Space</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-[1px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
