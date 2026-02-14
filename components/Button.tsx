
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'fun';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  // Base: Modern shape, smooth transitions, click effect, playful interactions
  const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 group overflow-hidden isolation-auto select-none";
  
  const variants = {
    // Primary: Nature gradient, subtle shadow, lift effect
    primary: "text-white bg-gradient-to-br from-nature-600 to-nature-800 border border-transparent hover:shadow-[0_8px_20px_-6px_rgba(22,163,74,0.5)] hover:-translate-y-1 hover:rotate-1",
    
    // Secondary: Soft earth/nature background, gentle hover
    secondary: "text-nature-900 bg-nature-100 border-2 border-nature-200 hover:bg-nature-200 hover:border-nature-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-nature-100/50 hover:-rotate-1",
    
    // Outline: Crisp border, fills/darkens on hover
    outline: "text-stone-700 bg-transparent border-2 border-stone-200 hover:border-stone-800 hover:text-stone-900 hover:-translate-y-1 hover:bg-stone-50 hover:rotate-1",
    
    // Danger: Gradient red, shadow
    danger: "text-white bg-gradient-to-br from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 hover:rotate-2",
    
    // Ghost: Minimal hover state
    ghost: "text-stone-600 hover:bg-stone-100 hover:text-nature-700 rounded-xl hover:scale-105",

    // Fun: Special variant for main CTAs
    fun: "text-stone-900 bg-white border-4 border-stone-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] hover:border-nature-300"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm",
    md: "px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base",
    lg: "px-6 py-3 text-base md:px-8 md:py-4 md:text-lg tracking-tight",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {/* Shine effect for primary/danger buttons */}
      {(variant === 'primary' || variant === 'danger') && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />
      )}
      
      {/* Content wrapper to ensure z-index above effects */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;
