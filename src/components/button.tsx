import type { ReactNode, ButtonHTMLAttributes } from 'react';

/** Button Variants */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/** Button Sizes */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/** Button Props */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /** Button content */
  children: ReactNode;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width */
  fullWidth?: boolean;
  /** Icon before text */
  leftIcon?: ReactNode;
  /** Icon after text */
  rightIcon?: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Additional className */
  className?: string;
}

/** Size Classes */
const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-[10px] gap-1',
  sm: 'px-3 py-1.5 text-[11px] gap-1.5',
  md: 'px-4 py-2 text-[12px] gap-2',
  lg: 'px-5 py-2.5 text-[13px] gap-2',
};

/** Icon Size Classes */
const iconSizeClasses: Record<ButtonSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-4.5 h-4.5',
};

/** Variant Classes */
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 border border-transparent',
  secondary: 'bg-pink-600 text-white hover:bg-pink-700 active:bg-pink-800 border border-transparent',
  outline: 'bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 border border-zinc-300 hover:border-zinc-400',
  ghost: 'bg-transparent text-zinc-600 hover:bg-zinc-100 active:bg-zinc-200 border border-transparent',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border border-transparent',
};

/** Disabled Classes */
const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

/** Button Component */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-bold
        transition-colors duration-150
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? disabledClasses : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {loading ? (
        <span className={`${iconSizeClasses[size]} animate-spin`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      ) : leftIcon ? (
        <span className={iconSizeClasses[size]}>{leftIcon}</span>
      ) : null}
      
      {children}
      
      {rightIcon && !loading && (
        <span className={iconSizeClasses[size]}>{rightIcon}</span>
      )}
    </button>
  );
}

/** Icon Button - Square button for icons only */
interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /** Icon content */
  icon: ReactNode;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Accessible label */
  label: string;
  /** Additional className */
  className?: string;
}

/** Icon Button Size Classes (square) */
const iconButtonSizeClasses: Record<ButtonSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-7 h-7',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  disabled,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`
        inline-flex items-center justify-center
        transition-colors duration-150 rounded
        ${iconButtonSizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? disabledClasses : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <span className={iconSizeClasses[size]}>{icon}</span>
    </button>
  );
}
