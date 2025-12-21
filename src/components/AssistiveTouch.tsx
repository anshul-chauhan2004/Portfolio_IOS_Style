import { useState, useRef, useEffect } from 'react';

interface AssistiveTouchProps {
    onLock: () => void;
}

export function AssistiveTouch({ onLock }: AssistiveTouchProps) {
    // Position relative to phone screen (380x780)
    const [position, setPosition] = useState({ x: 300, y: 400 }); // Start on right side, middle
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const lastClickTime = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDoubleClick = () => {
        const now = Date.now();
        const timeSinceLastClick = now - lastClickTime.current;

        if (timeSinceLastClick < 300) {
            // Double click detected
            onLock();
        }

        lastClickTime.current = now;
    };

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation();
        const touch = e.touches[0];
        const rect = containerRef.current?.parentElement?.getBoundingClientRect();
        if (!rect) return;

        dragStartPos.current = {
            x: touch.clientX - rect.left - position.x,
            y: touch.clientY - rect.top - position.y
        };
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        e.stopPropagation();

        const touch = e.touches[0];
        const rect = containerRef.current?.parentElement?.getBoundingClientRect();
        if (!rect) return;

        const newX = touch.clientX - rect.left - dragStartPos.current.x;
        const newY = touch.clientY - rect.top - dragStartPos.current.y;

        // Keep within phone screen bounds
        const maxX = 380 - 60;
        const maxY = 780 - 60;

        setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Mouse handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const rect = containerRef.current?.parentElement?.getBoundingClientRect();
        if (!rect) return;

        dragStartPos.current = {
            x: e.clientX - rect.left - position.x,
            y: e.clientY - rect.top - position.y
        };
        setIsDragging(true);
    };

    // Global mouse move and up handlers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const rect = containerRef.current?.parentElement?.getBoundingClientRect();
            if (!rect) return;

            const newX = e.clientX - rect.left - dragStartPos.current.x;
            const newY = e.clientY - rect.top - dragStartPos.current.y;

            // Keep within phone screen bounds
            const maxX = 380 - 60;
            const maxY = 780 - 60;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            data-assistive-touch="true"
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: 9999,
                touchAction: 'none',
                userSelect: 'none',
                opacity: 1,
                transition: isDragging ? 'none' : 'transform 0.2s ease',
                transform: isDragging ? 'scale(1.1)' : 'scale(1)'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onClick={handleDoubleClick}
        >
            {/* Concentric circles design */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)'
            }} />
            <div style={{
                position: 'absolute',
                width: '70%',
                height: '70%',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }} />
            <div style={{
                position: 'absolute',
                width: '40%',
                height: '40%',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
            }} />
        </div>
    );
}
