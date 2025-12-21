import { useEffect, useState } from 'react';

interface WelcomeLoaderProps {
    onComplete: () => void;
}

export function WelcomeLoader({ onComplete }: WelcomeLoaderProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress bar - 2.5 seconds duration
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 25); // 100 steps * 25ms = 2500ms = 2.5 seconds

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #000000 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 6s ease infinite'
        }}>
            <style>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
            `}</style>

            <div style={{
                textAlign: 'center',
                animation: 'fadeInUp 1s ease-out'
            }}>
                {/* Welcome Text */}
                <h1 style={{
                    fontSize: '48px',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: '16px',
                    letterSpacing: '-1px',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    background: 'linear-gradient(to right, #ffffff, #f0f0f0, #ffffff)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 3s linear infinite'
                }}>
                    Welcome
                </h1>

                <p style={{
                    fontSize: '24px',
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '48px',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                }}>
                    to Anshul Chauhan's Portfolio
                </p>

                {/* Progress Bar */}
                <div style={{
                    width: '300px',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    margin: '0 auto'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }} />
                </div>

                {/* Loading Text */}
                <p style={{
                    marginTop: '24px',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 300,
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}>
                    Loading Experience...
                </p>
            </div>
        </div>
    );
}
