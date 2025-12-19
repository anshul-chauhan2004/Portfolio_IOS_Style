import { useState, useEffect } from 'react';

interface ClockWidgetProps {
    onClick?: () => void;
    delay?: number;
}

export function ClockWidget({ onClick, delay = 0 }: ClockWidgetProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Calculate angles for clock hands
    const secondAngle = (seconds * 6) - 90; // 6 degrees per second
    const minuteAngle = (minutes * 6 + seconds * 0.1) - 90; // 6 degrees per minute + smooth transition
    const hourAngle = (hours * 30 + minutes * 0.5) - 90; // 30 degrees per hour + smooth transition

    return (
        <div
            className="flex flex-col items-center gap-2 relative z-[20]"
            style={{
                animationDelay: `${delay}ms`,
            }}
        >
            <button
                onClick={onClick}
                className="relative transition-all duration-200 active:scale-90 hover:scale-105"
                style={{
                    width: '62px',
                    height: '62px',
                    borderRadius: '22%',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                    padding: 0,
                    background: '#1c1c1e',
                    border: 'none',
                    overflow: 'visible',
                }}
            >
                {/* Clock Face */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Clock numbers */}
                    {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => {
                        const angle = (index * 30) - 90;
                        const radius = 18;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                        return (
                            <span
                                key={num}
                                style={{
                                    position: 'absolute',
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '7px',
                                    fontWeight: '400',
                                    color: '#000',
                                }}
                            >
                                {num}
                            </span>
                        );
                    })}

                    {/* Center dot */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#000',
                            zIndex: 10,
                        }}
                    />

                    {/* Hour hand */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '14px',
                            height: '2px',
                            background: '#000',
                            transformOrigin: 'right center',
                            transform: `rotate(${hourAngle}deg)`,
                            right: '50%',
                            borderRadius: '1px',
                            transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                        }}
                    />

                    {/* Minute hand */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '20px',
                            height: '2px',
                            background: '#000',
                            transformOrigin: 'right center',
                            transform: `rotate(${minuteAngle}deg)`,
                            right: '50%',
                            borderRadius: '1px',
                            transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                        }}
                    />

                    {/* Second hand */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '22px',
                            height: '1px',
                            background: '#ff3b30',
                            transformOrigin: 'right center',
                            transform: `rotate(${secondAngle}deg)`,
                            right: '50%',
                            transition: 'transform 0.05s linear',
                        }}
                    />
                </div>
            </button>
            <span
                className="text-[11px] max-w-[70px] text-center truncate font-medium"
                style={{
                    color: 'white',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
            >
                Clock
            </span>
        </div>
    );
}
