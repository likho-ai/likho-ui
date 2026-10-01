import type { HTMLAttributes } from 'react';

import { cn } from '../lib/cn';

export interface MeterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** What is measured, for example "Hindi". */
  label: string;
  /** From 0 to 1. Values outside that range are clamped. */
  value: number;
  /** Text shown at the right, for example "0.91" or "12 calls". Defaults to the value with two decimals. */
  valueText?: string;
}

/** A labelled bar for one value between 0 and 1: language probability, job progress. */
export function Meter({ label, value, valueText, className, ...props }: MeterProps) {
  const clamped = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
  const text = valueText ?? clamped.toFixed(2);
  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      <div className="flex justify-between gap-3 text-sm">
        <span className="text-ink">{label}</span>
        <span className="tabular-nums text-ink-2">{text}</span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={clamped}
        aria-valuetext={text}
        className="h-2 rounded-full bg-accent-soft"
      >
        <div className="h-2 rounded-full bg-accent" style={{ width: `${clamped * 100}%` }} />
      </div>
    </div>
  );
}
