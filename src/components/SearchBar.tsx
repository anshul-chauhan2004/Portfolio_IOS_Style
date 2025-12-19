import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';

interface SearchResult {
    title: string;
    description: string;
    category: string;
}

export function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

    // Sample portfolio data
    const portfolioData: SearchResult[] = [
        { title: 'Full Stack Developer', description: 'Experienced in React, Node.js, and TypeScript', category: 'Skills' },
        { title: 'Web Development', description: 'Building modern web applications with cutting-edge technologies', category: 'Expertise' },
        { title: 'UI/UX Design', description: 'Creating beautiful and intuitive user interfaces', category: 'Skills' },
        { title: 'Projects', description: 'View my latest work and case studies', category: 'Portfolio' },
        { title: 'Contact', description: 'Get in touch for collaborations', category: 'Contact' },
        { title: 'About Me', description: 'Learn more about my background and journey', category: 'Profile' },
    ];

    const searchResults = portfolioData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Logic handled by overlay click
        }
        return () => { };
    }, []);

    // Lock body scroll when searching
    useEffect(() => {
        if (isSearching) {
            // Calculate scrollbar width to prevent layout shift
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = 'hidden';
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }

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
                placeholder="Search about me..."
                className="flex-1 bg-transparent text-white text-sm placeholder-white/60 outline-none"
                style={{ caretColor: 'white', outline: 'none' }}
                autoFocus={inPortal}
            />

            {/* Icons */}
            <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <img
                        src="/src/assets/google-mic.png"
                        alt="Voice Search"
                        width="20"
                        height="20"
                        style={{ marginRight: '12px' }}
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
                        onClick={() => setIsSearching(false)}
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
                                            setSearchQuery(result.title);
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
                style={{
                    animationDelay: '0ms',
                    animationFillMode: 'forwards',
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
