import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface PasswordInfoProps {
    onContinue: () => void;
}

export function PasswordInfo({ onContinue }: PasswordInfoProps) {
    const [isClosing, setIsClosing] = useState(false);

    const handleContinue = () => {
        setIsClosing(true);
        setTimeout(() => {
            onContinue();
        }, 400); // Wait for animation to complete
    };

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: isClosing ? 'translate(-50%, -50%) scale(0.95)' : 'translate(-50%, -50%)',
            opacity: isClosing ? 0 : 1,
            zIndex: 100,
            animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
        }}>
            <style>{`
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>

            <div style={{
                width: '380px',
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}>
                {/* Lock Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(30, 41, 59, 0.4)'
                }}>
                    <Lock size={40} color="white" />
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '12px',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                }}>
                    Phone Password
                </h2>

                <p style={{
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'center',
                    marginBottom: '32px',
                    lineHeight: '1.5'
                }}>
                    Use this password to unlock the phone and explore the portfolio
                </p>

                {/* Password Display */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '2px solid rgba(148, 163, 184, 0.4)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '32px',
                    textAlign: 'center',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    <p style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 600
                    }}>
                        Password
                    </p>
                    <div style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        color: 'white',
                        letterSpacing: '12px',
                        fontFamily: 'monospace',
                        textShadow: '0 4px 20px rgba(148, 163, 184, 0.6)'
                    }}>
                        1234
                    </div>
                </div>

                {/* Instructions */}
                <div style={{
                    background: 'rgba(148, 163, 184, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '24px'
                }}>
                    <p style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: '1.6',
                        margin: 0
                    }}>
                        💡 <strong>Tip:</strong> Click on the phone screen and enter <strong>1234</strong> to unlock and start exploring!
                    </p>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(30, 41, 59, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 41, 59, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(30, 41, 59, 0.4)';
                    }}
                >
                    Got it, Let's Start!
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
