import type { HTMLAttributes } from 'react';

import { cn } from '../lib/cn';

/** A small neutral label: a language, a length, a model name. */
export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full bg-tag px-2.5 py-1 text-[13px] font-medium text-tag-ink',
        className,
      )}
      {...props}
    />
  );
}
