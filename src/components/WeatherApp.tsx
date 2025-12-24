import { useState, useEffect } from 'react';

interface WeatherData {
    location: string;
    current: {
        temp: number;
        condition: string;
        icon: number;
        isDay: number;
    };
    hourly: Array<{
        time: string;
        temp: number;
        icon: number;
        isDay: number;
    }>;
    daily: Array<{
        day: string;
        date: string;
        icon: number;
        high: number;
        low: number;
    }>;
}

const getWeatherIcon = (code: number, size = 24, isDay = 1) => {
    const fontSize = size === 56 ? '56px' : size === 24 ? '24px' : '20px';

    if (code === 0) {
        // Sunny / Clear
        return <span style={{ fontSize, lineHeight: 1 }}>{isDay ? '☀️' : '🌙'}</span>;
    }
    if (code <= 3) {
        // Cloudy
        return <span style={{ fontSize, lineHeight: 1 }}>{isDay ? '☁️' : '☁️'}</span>;
    }
    if (code <= 67) {
        // Rainy
        return <span style={{ fontSize, lineHeight: 1 }}>🌧️</span>;
    }
    if (code <= 77) {
        // Snowy
        return <span style={{ fontSize, lineHeight: 1 }}>❄️</span>;
    }
    return <span style={{ fontSize, lineHeight: 1 }}>🌦️</span>;
};

const getWeatherEmoji = (code: number) => {
    if (code === 0) return '☀️'; // Daily forecast doesn't need night icons usually
    if (code <= 3) return '☁️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    return '🌦️';
};

interface WeatherAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

export function WeatherApp({ onClose, onStartClose }: WeatherAppProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entry animation
        requestAnimationFrame(() => {
            setIsVisible(true);
        });

        const fetchWeather = async () => {
            try {
                // Fetch real data from Open-Meteo API including is_day
                const res = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=30.6942&longitude=76.8606&current=temperature_2m,weather_code,is_day&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7'
                );
                const data = await res.json();

                const now = new Date();
                const currentHour = now.getHours();

                // Get next 24 hours starting from current hour
                const hourlyData = [];
                for (let i = 0; i < 24; i++) {
                    const hourIndex = currentHour + i;
                    if (hourIndex < 24) {
                        hourlyData.push({
                            time: data.hourly.time[hourIndex],
                            temp: Math.round(data.hourly.temperature_2m[hourIndex]),
                            icon: data.hourly.weather_code[hourIndex],
                            isDay: data.hourly.is_day[hourIndex]
                        });
                    } else {
                        // Handle next day hours
                        const nextDayIndex = hourIndex - 24;
                        if (nextDayIndex < data.hourly.time.length) {
                            hourlyData.push({
                                time: data.hourly.time[hourIndex],
                                temp: Math.round(data.hourly.temperature_2m[hourIndex]),
                                icon: data.hourly.weather_code[hourIndex],
                                isDay: data.hourly.is_day[hourIndex]
                            });
                        }
                    }
                }

                // Filter out past days
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const dailyData = data.daily.time
                    .map((day: string, i: number) => ({
                        day,
                        date: new Date(day).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                        icon: data.daily.weather_code[i],
                        high: Math.round(data.daily.temperature_2m_max[i]),
                        low: Math.round(data.daily.temperature_2m_min[i])
                    }))
                    .filter((item: any) => {
                        // Create date in local time to compare correctly
                        const parts = item.day.split('-');
                        const itemDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                        return itemDate >= today;
                    });

                setWeather({
                    location: 'Panchkula',
                    current: {
                        temp: Math.round(data.current.temperature_2m),
                        condition: data.current.weather_code === 0 ? 'Sunny' : data.current.weather_code <= 3 ? 'Cloudy' : 'Rainy',
                        icon: data.current.weather_code,
                        isDay: data.current.is_day
                    },
                    hourly: hourlyData,
                    daily: dailyData
                });
            } catch (error) {
                console.error('Weather fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const handleClose = () => {
        if (onStartClose) onStartClose();
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    if (loading || !weather) {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom, #4A90E2 0%, #2E5C8A 100%)',
                    zIndex: 200,
                    borderRadius: '2.5rem',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.92)',
                    transition: 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            >
                <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    const formatHourTime = (timeStr: string) => {
        const date = new Date(timeStr);
        const hour = date.getHours();
        return `${hour}:00`;
    };

    const getDayName = (dateStr: string, index: number) => {
        if (index === 0) return 'Today';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const getShortDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 200,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                borderRadius: '2.5rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                touchAction: 'none',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
        >
            {/* Blue Hero Section */}
            <div
                style={{
                    background: 'linear-gradient(to bottom, #4A90E2 0%, #2E5C8A 100%)',
                    paddingTop: '3.5rem',
                    paddingBottom: '1.5rem',
                    paddingLeft: '1.25rem',
                    paddingRight: '1.25rem',
                    flexShrink: 0
                }}
            >
                {/* Header with Back Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', position: 'relative' }}>
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            left: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: 'white',
                            fontSize: '17px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <span style={{ fontSize: '17px', fontWeight: 600, color: 'white' }}>Weather</span>
                </div>

                {/* City Name Centered */}
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 500, color: 'white', margin: 0 }}>
                        {weather.location}
                    </h1>
                </div>

                {/* Current Temperature */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    {getWeatherIcon(weather.current.icon, 56, weather.current.isDay)}
                    <div style={{ fontSize: '96px', fontWeight: 200, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
                        {weather.current.temp}°
                    </div>
                </div>

                {/* Hourly Strip */}
                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    alignItems: 'center',
                    padding: '0.75rem 0.5rem',
                    borderRadius: '1rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    gap: '1rem'
                }} className="no-scrollbar">
                    {weather.hourly.map((hour, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', minWidth: '50px', flexShrink: 0 }}>
                            <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)' }}>
                                {formatHourTime(hour.time)}
                            </div>
                            {getWeatherIcon(hour.icon, 20, hour.isDay)}
                            <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>
                                {hour.temp}°
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* White Daily Forecast Section */}
            <div
                style={{
                    flex: 1,
                    background: 'white',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                className="no-scrollbar"
            >
                <div style={{ padding: '1rem 1.25rem 0.75rem', flexShrink: 0 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#000', margin: 0 }}>Daily Forecast</h3>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem 1.5rem' }} className="no-scrollbar">
                    {weather.daily.map((day, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.75rem 0',
                                borderBottom: i < weather.daily.length - 1 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                                <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                    {getWeatherEmoji(day.icon)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#000' }}>
                                        {getDayName(day.day, i)}
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.5)' }}>
                                        {getShortDate(day.day)}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.5)', minWidth: '32px', textAlign: 'right' }}>
                                    {day.low}°
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: '#000', minWidth: '32px', textAlign: 'right' }}>
                                    {day.high}°
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
