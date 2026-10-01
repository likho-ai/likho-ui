import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ButtonHTMLAttributes, Ref } from 'react';

import { cn } from '../lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[15px] font-semibold ' +
    'cursor-pointer transition-[filter,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 ' +
    'focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-55 [&_svg]:size-[18px] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'border border-transparent text-on-accent [background-image:var(--likho-btn)] hover:brightness-110',
        secondary: 'border border-line bg-surface text-ink hover:bg-surface-2',
        ghost: 'border border-transparent bg-transparent text-ink-2 hover:bg-surface-2',
      },
      size: {
        md: 'min-h-11 px-5',
        sm: 'min-h-11 px-3.5',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render the child element (for example a link) with the button's look. */
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({ className, variant, size, asChild = false, type, ref, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...(asChild ? {} : { type: type ?? 'button' })}
      {...props}
    />
  );
}
