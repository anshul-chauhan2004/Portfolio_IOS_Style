import { LucideIcon } from 'lucide-react';

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  color: 'peach' | 'coral' | 'yellow' | 'blue' | 'lavender' | 'beige';
  onClick?: () => void;
  delay?: number;
}

const colorStyles = {
  peach: {
    gradient: 'bg-gradient-to-br from-[#FFD4C3] to-[#FFBFA8]',
  },
  coral: {
    gradient: 'bg-gradient-to-br from-[#FFB8B8] to-[#FFA0A0]',
  },
  yellow: {
    gradient: 'bg-gradient-to-br from-[#FFF4C3] to-[#FFE9A0]',
  },
  blue: {
    gradient: 'bg-gradient-to-br from-[#C3E0FF] to-[#A8CEFF]',
  },
  lavender: {
    gradient: 'bg-gradient-to-br from-[#E0D4FF] to-[#CABFFF]',
  },
  beige: {
    gradient: 'bg-gradient-to-br from-[#E8DECA] to-[#D8CCB8]',
  },
};

export function AppIcon({ icon: Icon, label, color, onClick, delay = 0 }: AppIconProps) {
  const styles = colorStyles[color];

  return (
    <div
      className="flex flex-col items-center gap-2 animate-fade-in"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        animationFillMode: 'forwards',
      }}
    >
      <button
        onClick={onClick}
        className={`w-[62px] h-[62px] ${styles.gradient} flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105`}
        style={{
          borderRadius: '22%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
      </button>
      <span
        className="text-[11px] max-w-[70px] text-center truncate font-medium"
        style={{
          color: 'white',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        }}
      >
        {label}
      </span>
    </div>
  );
}