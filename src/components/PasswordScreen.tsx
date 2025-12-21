import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface PasswordScreenProps {
    onSuccess: () => void;
}

export function PasswordScreen({ onSuccess }: PasswordScreenProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === '1234') {
            onSuccess();
        } else {
            setError(true);
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
                setPassword('');
            }, 500);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            right: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            animation: 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <style>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateY(-50%) translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(-50%) translateX(0);
                    }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
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
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                animation: isShaking ? 'shake 0.5s' : 'none'
            }}>
                {/* Lock Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                    animation: 'pulse 2s ease-in-out infinite'
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
                    Enter Password
                </h2>

                <p style={{
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'center',
                    marginBottom: '32px',
                    lineHeight: '1.5'
                }}>
                    Please enter the password to unlock the portfolio experience
                </p>

                {/* Password Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{
                        position: 'relative',
                        marginBottom: '24px'
                    }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                fontSize: '16px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: error ? '2px solid #ef4444' : '2px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                color: 'white',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                fontFamily: 'monospace',
                                letterSpacing: '4px',
                                textAlign: 'center'
                            }}
                            onFocus={(e) => {
                                e.target.style.border = '2px solid rgba(102, 126, 234, 0.6)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                            }}
                            onBlur={(e) => {
                                if (!error) {
                                    e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                }
                            }}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p style={{
                            color: '#ef4444',
                            fontSize: '14px',
                            textAlign: 'center',
                            marginBottom: '16px',
                            fontWeight: 500
                        }}>
                            Incorrect password. Try again!
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                        }}
                    >
                        Unlock
                        <ArrowRight size={20} />
                    </button>
                </form>

                {/* Hint */}
                <p style={{
                    marginTop: '24px',
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    textAlign: 'center',
                    fontStyle: 'italic'
                }}>
                    Hint: 1234
                </p>
            </div>
        </div>
    );
}
