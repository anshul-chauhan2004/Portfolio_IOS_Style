interface CalendarIconProps {
    onClick?: () => void;
    delay?: number;
}

export function CalendarIcon({ onClick, delay = 0 }: CalendarIconProps) {
    // Get current date
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = now.getDate();

    return (
        <div
            className="flex flex-col items-center gap-2 opacity-0 animate-fade-in"
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards',
            }}
        >
            <button
                onClick={onClick}
                className="transition-all duration-200 active:scale-90 hover:scale-105"
            >
                <div
                    className="w-[62px] h-[62px] flex flex-col overflow-hidden"
                    style={{
                        borderRadius: '22%',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Red header with month */}
                    <div
                        className="flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(180deg, #FF6B6B 0%, #EE5A52 100%)',
                            height: '20px',
                            fontSize: '10px',
                            fontWeight: '700',
                            color: 'white',
                            letterSpacing: '0.5px',
                        }}
                    >
                        {month}
                    </div>

                    {/* White body with day number */}
                    <div
                        className="flex items-center justify-center flex-1"
                        style={{
                            background: 'white',
                            fontSize: '28px',
                            fontWeight: '300',
                            color: '#333',
                            lineHeight: '1',
                        }}
                    >
                        {day}
                    </div>
                </div>
            </button>
            <span
                className="text-[11px] max-w-[70px] text-center truncate font-medium"
                style={{
                    color: 'white',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
            >
                Calendar
            </span>
        </div>
    );
}
