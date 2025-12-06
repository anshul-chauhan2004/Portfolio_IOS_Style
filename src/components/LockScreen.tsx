import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface LockScreenProps {
    onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(' AM', '').replace(' PM', ''));
            setDate(now.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', ''));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleNumberClick = (num: string) => {
        if (password.length < 4) {
            const newPassword = password + num;
            setPassword(newPassword);

            if (newPassword.length === 4) {
                if (newPassword === '1234') {
                    setTimeout(onUnlock, 200);
                } else {
                    setError(true);
                    setTimeout(() => {
                        setPassword('');
                        setError(false);
                    }, 500);
                }
            }
        }
    };

    const handleDelete = () => {
        setPassword(prev => prev.slice(0, -1));
    };

    // Keyboard support for passcode entry
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only handle keyboard input when password screen is visible
            if (!isPasswordVisible) return;

            // Handle number keys (0-9)
            if (e.key >= '0' && e.key <= '9') {
                handleNumberClick(e.key);
            }
            // Handle backspace/delete
            else if (e.key === 'Backspace' || e.key === 'Delete') {
                handleDelete();
            }
            // Handle Enter key to submit
            else if (e.key === 'Enter' && password.length === 4) {
                if (password === '1234') {
                    onUnlock();
                } else {
                    setError(true);
                    setTimeout(() => {
                        setPassword('');
                        setError(false);
                    }, 500);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPasswordVisible, password, onUnlock]);

    // Swipe detection
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50; // minimum distance for swipe

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isUpSwipe = distance > minSwipeDistance;
        if (isUpSwipe) {
            setIsPasswordVisible(true);
        }
    };

    // Mouse swipe detection
    const [mouseStart, setMouseStart] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setMouseStart(e.clientY);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !mouseStart) return;
        const distance = mouseStart - e.clientY;
        if (distance > minSwipeDistance) {
            setIsPasswordVisible(true);
            setIsDragging(false);
        }
    };

    const onMouseUp = () => {
        setIsDragging(false);
        setMouseStart(null);
    };


    return (
        <div
            className="absolute inset-0 z-[100] flex flex-col items-center justify-between text-white overflow-hidden px-6 py-8 bg-black/5 pointer-events-auto"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
            {/* Top Section - Dynamic Island and Status Icons */}
            <div className="w-full relative pt-2">
                {/* Dynamic Island - centered pill shape */}
                <div
                    style={{
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '120px',
                        height: '35px',
                        backgroundColor: 'black',
                        borderRadius: '20px',
                        zIndex: 50
                    }}
                />

                {/* Status Icons - top right */}
                <div
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '14px',
                        zIndex: 51
                    }}
                >
                    {/* Signal Bars */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '16px' }}>
                        <div style={{ width: '4px', height: '6px', backgroundColor: 'white', borderRadius: '1px' }} />
                        <div style={{ width: '4px', height: '9px', backgroundColor: 'white', borderRadius: '1px' }} />
                        <div style={{ width: '4px', height: '12px', backgroundColor: 'white', borderRadius: '1px' }} />
                        <div style={{ width: '4px', height: '15px', backgroundColor: 'white', borderRadius: '1px' }} />
                    </div>

                    {/* 5G Text */}
                    <span style={{ fontSize: '15px', fontWeight: '600', letterSpacing: '0.3px' }}>5G</span>

                    {/* Battery Icon */}
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                        <rect x="1" y="2" width="26" height="12" rx="3" stroke="white" strokeWidth="1.3" fill="white" fillOpacity="0.3" />
                        <rect x="3" y="4" width="20" height="8" rx="1.5" fill="white" />
                        <rect x="28" y="6" width="3" height="4" rx="1.2" fill="white" fillOpacity="0.6" />
                    </svg>
                </div>
            </div>

            {/* Middle Section - Time and Date (or Passcode Entry) */}
            {!isPasswordVisible ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', flex: 1, paddingTop: '60px' }}>
                    <div style={{ fontSize: '22px', fontWeight: '600', opacity: 1, marginBottom: '4px' }}>
                        {date}
                    </div>
                    <div style={{
                        fontSize: '100px',
                        fontWeight: '300',
                        lineHeight: '1',
                        letterSpacing: '2px',
                        color: 'white'
                    }}>
                        {time.split(':').map((part, index) => (
                            <span key={index}>
                                {part}
                                {index === 0 && <span style={{ position: 'relative', top: '-15px' }}>:</span>}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 w-full animate-slide-up">
                    {/* Blur background for keypad area - removed to show wallpaper */}

                    <div className="relative z-10 flex flex-col items-center">
                        <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>Enter Passcode</div>


                        {/* Password Dots */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '16px',
                                marginBottom: '32px'
                            }}
                            className={error ? 'animate-shake' : ''}
                        >
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: '14px',
                                        height: '14px',
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                        backgroundColor: i < password.length ? 'white' : 'transparent',
                                        transition: 'all 0.2s'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Keypad */}
                        <div className="w-full max-w-[340px]">
                            {/* Numbers 1-9 in 3x3 grid */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '20px',
                                    marginBottom: '20px'
                                }}
                            >
                                {[
                                    { num: 1, letters: '' },
                                    { num: 2, letters: 'ABC' },
                                    { num: 3, letters: 'DEF' },
                                    { num: 4, letters: 'GHI' },
                                    { num: 5, letters: 'JKL' },
                                    { num: 6, letters: 'MNO' },
                                    { num: 7, letters: 'PQRS' },
                                    { num: 8, letters: 'TUV' },
                                    { num: 9, letters: 'WXYZ' }
                                ].map((item) => (
                                    <button
                                        key={item.num}
                                        onClick={() => handleNumberClick(item.num.toString())}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            backdropFilter: 'blur(10px)',
                                            border: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s',
                                            color: 'white'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                                    >
                                        <span style={{ fontSize: '36px', fontWeight: '300', lineHeight: '1' }}>{item.num}</span>
                                        {item.letters && (
                                            <span style={{ fontSize: '9px', fontWeight: '500', letterSpacing: '0.05em', opacity: '0.5', marginTop: '2px' }}>{item.letters}</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Bottom row: Cancel, 0, Delete */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '24px',
                                    alignItems: 'center'
                                }}
                            >
                                <button
                                    className="text-sm font-medium text-white/80 active:text-white text-center"
                                    onClick={() => setIsPasswordVisible(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => handleNumberClick('0')}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        backdropFilter: 'blur(10px)',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                        color: 'white',
                                        gridColumn: '2'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                                >
                                    <span style={{ fontSize: '36px', fontWeight: '300' }}>0</span>
                                </button>

                                <button
                                    className="text-sm font-medium text-white/80 active:text-white text-center"
                                    onClick={handleDelete}
                                >
                                    {password.length > 0 ? 'Delete' : ''}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* Bottom Section - Swipe Up Prompt */}
            {!isPasswordVisible && (
                <div className="flex flex-col items-center pb-8 w-full">
                    <style>{`
                        @keyframes swipe-bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-8px); }
                        }
                    `}</style>
                    <span
                        className="text-sm font-medium opacity-80 drop-shadow-md mb-4"
                        style={{
                            animation: 'swipe-bounce 2s ease-in-out infinite'
                        }}
                    >
                        Swipe up to unlock
                    </span>
                </div>
            )}

            {/* Home Indicator Bar - iPhone style white bar at bottom */}
            <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '140px',
                height: '5px',
                backgroundColor: 'white',
                borderRadius: '10px',
                opacity: 0.5
            }} />
        </div>
    );
}
