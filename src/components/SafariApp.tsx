
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Share, Book, Copy, RefreshCw, X, ShieldCheck, Compass, Mic, MoreHorizontal, User, Edit } from 'lucide-react';
import safariBg from '../assets/safari-bg.png';

interface SafariAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

export function SafariApp({ onClose, onStartClose }: SafariAppProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const handleClose = () => {
        if (onStartClose) onStartClose();
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;

        // Smart Detection
        if (query.includes('.') && !query.includes(' ')) {
            const url = query.startsWith('http') ? query : `https://${query}`;
            window.open(url, '_blank');
            setSearchQuery('');
            return;
        }

        // Google Search (Embedded)
        const url = `https://www.google.com/search?igu=1&q=${encodeURIComponent(query)}`;
        setCurrentUrl(url);
    };

    const handleFavoriteClick = (url: string) => {
        window.open(url, '_blank');
    };

    const handleBack = () => {
        if (currentUrl) {
            setCurrentUrl(null);
            setSearchQuery('');
        } else {
            // If already at home page, close the app
            handleClose();
        }
    };

    const handleExternalOpen = () => {
        if (currentUrl) {
            window.open(currentUrl, '_blank');
        }
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // Real Background Image
                backgroundImage: `url(${safariBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '2.5rem',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                pointerEvents: isVisible ? 'auto' : 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }}
        >
            {/* Status Bar Spacer */}
            <div style={{ height: '50px', backgroundColor: 'transparent' }} />

            {/* Content Area */}
            <div style={{ flex: 1, position: 'relative', overflowY: 'auto' }}>
                {currentUrl ? (
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                        <iframe
                            src={currentUrl}
                            title="Browser"
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                paddingBottom: '90px'
                            }}
                        />
                    </div>
                ) : (
                    <div style={{
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: '30px',
                    }}>

                        {/* Favourites Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            padding: '0 4px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <User size={24} color="white" fill="white" />
                                <span style={{ fontSize: '22px', fontWeight: 700, color: 'white' }}>Favourites</span>
                            </div>
                        </div>

                        {/* Favorites Grid */}
                        <div style={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '16px',
                            marginBottom: '40px'
                        }}>
                            {/* Row 1 */}
                            <FavoriteIcon
                                label="Apple"
                                color="white"
                                textColor="white"
                                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" style={{ width: '24px' }} />}
                                onClick={() => handleFavoriteClick('https://apple.com')}
                            />
                            <FavoriteIcon
                                label="iCloud"
                                color="#5fc9f8"
                                textColor="white"
                                bg="#333"
                                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ICloud_logo.svg" style={{ width: '32px' }} />}
                                onClick={() => handleFavoriteClick('https://icloud.com')}
                            />
                            <FavoriteIcon
                                label="Google"
                                color="white"
                                textColor="white"
                                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" style={{ width: '24px' }} />}
                                onClick={() => handleFavoriteClick('https://google.com')}
                            />
                            <FavoriteIcon
                                label="Yahoo"
                                color="#6001d2"
                                textColor="white"
                                bg="#6001d2"
                                icon={<span style={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>Y!</span>}
                                onClick={() => handleFavoriteClick('https://yahoo.com')}
                            />

                            {/* Row 2 */}
                            <FavoriteIcon
                                label="Bing"
                                color="white"
                                textColor="white"
                                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Bing_Fluent_Logo.svg" style={{ width: '24px' }} />}
                                onClick={() => handleFavoriteClick('https://bing.com')}
                            />
                            <FavoriteIcon
                                label="Wikipedia"
                                color="white"
                                textColor="white"
                                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg" style={{ width: '28px' }} />}
                                onClick={() => handleFavoriteClick('https://wikipedia.org')}
                            />
                            <FavoriteIcon
                                label="Facebook"
                                color="#1877F2"
                                textColor="white"
                                bg="#1877F2"
                                icon={<span style={{ color: 'white', fontWeight: 800, fontSize: '24px', fontFamily: 'sans-serif' }}>f</span>}
                                onClick={() => handleFavoriteClick('https://facebook.com')}
                            />
                            <FavoriteIcon
                                label="Twitter"
                                color="black"
                                textColor="white"
                                bg="black"
                                icon={<span style={{ color: 'white', fontWeight: 800, fontSize: '22px', fontFamily: 'sans-serif' }}>X</span>}
                                onClick={() => handleFavoriteClick('https://twitter.com')}
                            />
                        </div>

                        {/* Edit Button */}
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                            <button style={{
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                color: 'white',
                                border: 'none',
                                padding: '8px 24px',
                                borderRadius: '20px',
                                fontSize: '15px',
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)'
                            }}>
                                Edit
                            </button>
                        </div>

                    </div>
                )}
            </div>


            {/* Bottom Bar - Floating/Docked Style */}
            <div style={{
                position: 'absolute',
                bottom: 20,
                left: 16,
                right: 16,
                height: '60px',
                zIndex: 202,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 4px'
            }}>
                {/* Back Button (Circle) */}
                <div
                    onClick={handleBack}
                    style={{
                        width: '52px', // Equal width
                        height: '52px', // Equal height
                        borderRadius: '50%', // Perfect Circle
                        backgroundColor: 'rgba(0,0,0,0.35)', // Dark translucent
                        backdropFilter: 'blur(20px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0 // Prevent squashing
                    }}
                >
                    <ChevronLeft size={24} color="white" />
                </div>

                {/* Search Pill */}
                <form
                    onSubmit={handleSearch}
                    style={{
                        flex: 1,
                        margin: '0 12px',
                        height: '52px', // Match height
                        backgroundColor: 'rgba(0,0,0,0.35)', // Dark translucent
                        backdropFilter: 'blur(20px)',
                        borderRadius: '40px', // Rounded pill
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 16px',
                        position: 'relative'
                    }}
                >
                    <Search size={18} color="rgba(255,255,255,0.6)" style={{ marginRight: '8px' }} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search or enter website"
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '16px',
                            color: 'white',
                            outline: 'none',
                            fontWeight: 400
                        }}
                    />
                    <Mic size={18} color="white" />
                </form>
            </div>

        </div >
    );
}

// Helper component for Icons
const FavoriteIcon = ({ icon, label, color, textColor, bg, onClick }: any) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
        }}
    >
        <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: bg || 'white',
            borderRadius: '16px', // Rounded corners
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            {icon}
        </div>
        <span style={{ fontSize: '12px', color: textColor || 'white', fontWeight: 500 }}>{label}</span>
    </div>
);
