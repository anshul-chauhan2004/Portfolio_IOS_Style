import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';

interface SearchResult {
    title: string;
    description: string;
    category: string;
    appId?: string; // Optional app ID to open when clicked
}

interface SearchBarProps {
    onOpenApp?: (appId: string) => void;
}

export function SearchBar({ onOpenApp }: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [countdown, setCountdown] = useState(3);
    const [voiceState, setVoiceState] = useState<'idle' | 'loading' | 'listening'>('idle');

    const [isSearching, setIsSearching] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

    // Search results mapped to apps with accurate descriptions
    const portfolioData: SearchResult[] = [
        { title: 'Calendar', description: 'Work experience timeline and professional journey', category: 'App', appId: 'calendar' },
        { title: 'Settings', description: 'Personal information and contact details', category: 'App', appId: 'settings' },
        { title: 'Weather', description: 'Current weather conditions and 7-day forecast', category: 'App', appId: 'weather' },
        { title: 'Files', description: 'Professional certificates and achievements', category: 'App', appId: 'files' },
        { title: 'Music', description: 'My tech stack and skills', category: 'App', appId: 'music' },
        { title: 'Safari', description: 'Web browser with favorite websites and bookmarks', category: 'App', appId: 'safari' },
        { title: 'Messages', description: 'Contact form and communication', category: 'App', appId: 'messages' },
        { title: 'Contact', description: 'Contact information and phone details', category: 'App', appId: 'phone' },
        { title: 'Notes', description: 'Personal goals, targets, and reminders', category: 'App', appId: 'notes' },
    ];

    const searchResults = portfolioData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Refs to manage cancellation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognitionRef = useRef<any>(null);
    const timerRef = useRef<any>(null);

    const stopVoiceSearch = () => {
        // Clear countdown timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        // Abort recognition if active
        if (recognitionRef.current) {
            try {
                recognitionRef.current.abort();
            } catch (e) {
                // Ignore errors on abort
            }
            recognitionRef.current = null;
        }

        setVoiceState('idle');
        setIsSearching(false);
    };

    // Voice Search Implementation
    const startVoiceSearch = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Voice recognition is not supported in this browser.");
            return;
        }

        // Cleanup any previous session
        stopVoiceSearch();

        // Instant feedback - Loading state
        if (searchBarRef.current) {
            const rect = searchBarRef.current.getBoundingClientRect();
            setActiveRect(rect);
        }
        setVoiceState('loading');
        setSearchQuery('');
        setIsSearching(true);
        setCountdown(3); // Reset countdown

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            // Now strictly listening
            setVoiceState('listening');

            if (searchBarRef.current && !activeRect) {
                const rect = searchBarRef.current.getBoundingClientRect();
                setActiveRect(rect);
            }
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Voice result:', transcript);

            // Command Processing: "Open [App Name]"
            const cleanTranscript = transcript.replace(/[.,!?;:]/g, '');

            if (cleanTranscript.includes('open')) {
                const appMap: Record<string, string> = {
                    'music': 'music',
                    'notes': 'notes',
                    'calendar': 'calendar',
                    'settings': 'settings',
                    'weather': 'weather',
                    'files': 'files',
                    'safari': 'safari',
                    'messages': 'messages',
                    'contact': 'phone',
                    'contacts': 'phone',
                    'phone': 'phone',
                    'project': 'projects',
                    'projects': 'projects'
                };

                const foundKey = Object.keys(appMap).find(key => cleanTranscript.includes(key));

                if (foundKey && onOpenApp) {
                    onOpenApp(appMap[foundKey]);
                    setIsSearching(false);
                    return;
                }
            }

            // Default: Search for the text
            setSearchQuery(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setVoiceState('idle');
        };

        recognition.onend = () => {
            setVoiceState('idle');
        };

        // Artificial delay with countdown
        let count = 3;
        timerRef.current = setInterval(() => {
            count--;
            setCountdown(count);
            if (count === 0) {
                if (timerRef.current) clearInterval(timerRef.current);
                try {
                    recognition.start();
                } catch (e) {
                    console.error("Recognition start error:", e);
                    setVoiceState('idle');
                }
            }
        }, 1000);
    };

    // Lock body scroll when searching
    useEffect(() => {
        if (isSearching) {

            // Also prevent touchmove to stop overscroll on mobile
            const preventDefault = (e: Event) => e.preventDefault();
            document.body.addEventListener('touchmove', preventDefault, { passive: false });
            return () => {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                document.body.removeEventListener('touchmove', preventDefault);
            };
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }, [isSearching]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const activateSearch = () => {
        if (searchBarRef.current) {
            const rect = searchBarRef.current.getBoundingClientRect();
            setActiveRect(rect);
            setIsSearching(true);
        }
    };

    const renderSearchBarContent = (inPortal: boolean) => (
        <div
            className="w-full rounded-full px-5 py-3 flex items-center gap-3 relative overflow-hidden"
            style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                // Ensure text is visible in portal
                color: 'white',
            }}
        >
            {/* Google Logo */}
            <img
                src="/src/assets/google-logo.svg"
                alt="Google"
                width="32"
                height="32"
                style={{ marginLeft: '8px' }}
            />

            {/* Search Input */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={!inPortal ? activateSearch : undefined}
                placeholder={
                    voiceState === 'loading' ? `Wait ${countdown}...` :
                        voiceState === 'listening' ? "Speak Now..." :
                            "Search about me..."
                }
                className="flex-1 bg-transparent text-white text-sm placeholder-white/60 outline-none"
                style={{ caretColor: 'white', outline: 'none' }}
                autoFocus={inPortal}
            />

            {/* Icons */}
            <div className="flex items-center gap-2">
                <button
                    className="rounded-full transition-all duration-300 flex items-center justify-center hover:bg-white/10"
                    onClick={startVoiceSearch}
                    style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: voiceState === 'listening' ? 'rgba(219, 68, 55, 0.4)' : 'transparent',
                        boxShadow: voiceState === 'listening' ? '0 0 15px rgba(219, 68, 55, 0.5)' : 'none',
                        animation: voiceState === 'listening' ? 'pulse 1.5s infinite' : 'none',
                        marginLeft: '8px', // Add some spacing from input if needed, or rely on flex gap
                    }}
                >
                    <img
                        src="/src/assets/google-mic.png"
                        alt="Voice Search"
                        width="24"
                        height="24"
                    />
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Full-Screen Active Search Portal */}
            {isSearching && activeRect && createPortal(
                <div className="absolute inset-0 z-[9999]" style={{ pointerEvents: 'auto' }}>
                    {/* Dark Overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        }}
                        onClick={stopVoiceSearch}
                    />

                    {/* Active Search Bar & Results Positioned Exactly */}
                    <div
                        style={{
                            position: 'absolute',
                            top: (() => {
                                const container = document.getElementById('phone-main-interface');
                                const containerRect = container ? container.getBoundingClientRect() : { top: 0, left: 0 };
                                return `${activeRect.top - containerRect.top}px`;
                            })(),
                            left: (() => {
                                const container = document.getElementById('phone-main-interface');
                                const containerRect = container ? container.getBoundingClientRect() : { top: 0, left: 0 };
                                return `${activeRect.left - containerRect.left}px`;
                            })(),
                            width: `${activeRect.width}px`,
                            zIndex: 10000,
                        }}
                    >
                        {renderSearchBarContent(true)}

                        {/* Search Results Dropdown */}
                        {searchResults.length > 0 && (
                            <div
                                className="absolute top-full rounded-2xl overflow-hidden z-[10000] [&::-webkit-scrollbar]:hidden"
                                style={{
                                    left: '0px',
                                    right: '0px',
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(40px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    maxHeight: '240px',
                                    overflowY: 'scroll',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    marginTop: '12px'
                                }}
                            >
                                {searchResults.slice(0, 5).map((result, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                                        onClick={() => {
                                            // Open app if appId is provided
                                            if (result.appId && onOpenApp) {
                                                onOpenApp(result.appId);
                                            }
                                            setSearchQuery(''); // Clear search text
                                            setIsSearching(false);
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Search className="w-3 h-3" stroke="white" strokeWidth={2} />
                                            <div className="flex-1">
                                                <div className="text-white text-sm font-semibold">{result.title}</div>
                                                <div className="text-white text-xs">{result.description}</div>
                                            </div>
                                            <span className="text-white text-[10px]" style={{ marginRight: '16px' }}>{result.category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No Results */}
                        {searchQuery.trim() !== '' && searchResults.length === 0 && (
                            <div
                                className="absolute top-full rounded-2xl overflow-hidden z-[10000] [&::-webkit-scrollbar]:hidden"
                                style={{
                                    left: '0px',
                                    right: '0px',
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(40px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    marginTop: '12px'
                                }}
                            >
                                <div className="px-4 py-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                    <div className="text-white text-xs text-center">No results found</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>,
                document.getElementById('phone-main-interface') || document.body
            )}

            <div className="flex flex-col items-center gap-2 opacity-0 animate-fade-in col-span-4 relative z-0"
                data-tutorial="search"
                style={{
                    animationDelay: '0ms',
                    animationFillMode: 'forwards',
                    height: 'auto',
                }}
            >
                {/* Search Bar Container - Ref used for measurement */}
                <div className="w-full relative z-0" ref={searchBarRef}>
                    {/* 
                       If searching, we hide this content (opacity 0) so it doesn't duplicate visually, 
                       but keep it in DOM to maintain layout space and ref measurement 
                    */}
                    <div style={{ opacity: isSearching ? 0 : 1 }}>
                        {renderSearchBarContent(false)}
                    </div>
                </div>
            </div>
        </>
    );
}
