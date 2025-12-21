import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialStep {
    title: string;
    description: string;
    target?: string; // CSS selector for element to highlight
    position?: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialProps {
    onComplete: () => void;
}

const tutorialSteps: TutorialStep[] = [
    {
        title: 'Welcome to My Portfolio! 👋',
        description: 'This is an interactive iOS-style portfolio. Let me show you around!',
    },
    {
        title: 'Calendar App 📅',
        description: 'View my work experience timeline and professional journey',
        target: '[data-tutorial="calendar"]',
        position: 'bottom'
    },
    {
        title: 'Settings App ⚙️',
        description: 'Find my personal information and contact details',
        target: '[data-tutorial="settings"]',
        position: 'bottom'
    },
    {
        title: 'Weather App 🌤️',
        description: 'Check current weather conditions and 7-day forecast',
        target: '[data-tutorial="weather"]',
        position: 'bottom'
    },
    {
        title: 'Files App 📁',
        description: 'Browse my professional certificates and achievements',
        target: '[data-tutorial="files"]',
        position: 'bottom'
    },
    {
        title: 'Music App 🎵',
        description: 'Explore my complete tech stack and skills',
        target: '[data-tutorial="music"]',
        position: 'bottom'
    },
    {
        title: 'Search Bar 🔍',
        description: 'Quickly find and open any app - try searching for "Calendar" or "Music"',
        target: '[data-tutorial="search"]',
        position: 'bottom'
    },
    {
        title: 'Swipe to Navigate ↔️',
        description: 'Swipe left or right to see more apps on the next page',
    },
    {
        title: "You're All Set! 🎉",
        description: 'Explore the apps to learn more about my work and skills. Enjoy!',
    }
];

export function Tutorial({ onComplete }: TutorialProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const step = tutorialSteps[currentStep];

    useEffect(() => {
        if (step.target) {
            const element = document.querySelector(step.target);
            if (element) {
                const rect = element.getBoundingClientRect();
                setTargetRect(rect);
            }
        } else {
            setTargetRect(null);
        }
    }, [currentStep, step.target]);

    const handleNext = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem('hasSeenTutorial', 'true');
        onComplete();
    };

    const getTooltipPosition = () => {
        if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

        const tooltipWidth = 320;
        const tooltipHeight = 200;
        const padding = 20;

        let top = 0;
        let left = 0;

        switch (step.position) {
            case 'bottom':
                top = targetRect.bottom + padding;
                left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
                break;
            case 'top':
                top = targetRect.top - tooltipHeight - padding;
                left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
                break;
            case 'left':
                top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
                left = targetRect.left - tooltipWidth - padding;
                break;
            case 'right':
                top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
                left = targetRect.right + padding;
                break;
            default:
                return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        }

        return { top: `${top}px`, left: `${left}px` };
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            pointerEvents: 'auto'
        }}>
            {/* Dark overlay with spotlight cutout */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
            }} onClick={handleComplete} />

            {/* Spotlight highlight */}
            {targetRect && (
                <div style={{
                    position: 'absolute',
                    top: `${targetRect.top - 8}px`,
                    left: `${targetRect.left - 8}px`,
                    width: `${targetRect.width + 16}px`,
                    height: `${targetRect.height + 16}px`,
                    borderRadius: '24px',
                    border: '3px solid rgba(59, 130, 246, 0.8)',
                    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.5)',
                    pointerEvents: 'none',
                    animation: 'pulse 2s ease-in-out infinite',
                    transition: 'all 0.3s ease'
                }} />
            )}

            {/* Tooltip */}
            <div style={{
                position: 'absolute',
                ...getTooltipPosition(),
                width: '320px',
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                pointerEvents: 'auto',
                transition: 'all 0.3s ease'
            }}>
                {/* Close button */}
                <button
                    onClick={handleComplete}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.05)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'}
                >
                    <X size={18} color="#666" />
                </button>

                {/* Content */}
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: '#000',
                    paddingRight: '32px'
                }}>
                    {step.title}
                </h3>
                <p style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.5',
                    marginBottom: '24px'
                }}>
                    {step.description}
                </p>

                {/* Progress dots */}
                <div style={{
                    display: 'flex',
                    gap: '6px',
                    marginBottom: '20px',
                    justifyContent: 'center'
                }}>
                    {tutorialSteps.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: index === currentStep ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: index === currentStep ? '#3b82f6' : '#ddd',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>

                {/* Navigation buttons */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'space-between'
                }}>
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        style={{
                            flex: 1,
                            padding: '12px 20px',
                            background: currentStep === 0 ? '#f3f4f6' : 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: 500,
                            color: currentStep === 0 ? '#9ca3af' : '#374151',
                            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <ChevronLeft size={18} />
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        style={{
                            flex: 1,
                            padding: '12px 20px',
                            background: '#3b82f6',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: 500,
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                    >
                        {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.5);
                    }
                    50% {
                        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.2), 0 0 60px rgba(59, 130, 246, 0.7);
                    }
                }
            `}</style>
        </div>
    );
}
