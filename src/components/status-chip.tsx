import type { HTMLAttributes } from 'react';

import { cn } from '../lib/cn';

export const RECORDING_STATUSES = ['new', 'queued', 'transcribing', 'done', 'failed'] as const;
export type RecordingStatus = (typeof RECORDING_STATUSES)[number];

const LABELS: Record<RecordingStatus, string> = {
  new: 'New',
  queued: 'Queued',
  transcribing: 'Transcribing',
  done: 'Done',
  failed: 'Failed',
};

export interface StatusChipProps extends HTMLAttributes<HTMLSpanElement> {
  status: RecordingStatus;
  /** Text shown instead of the default label for the status. */
  label?: string;
}

/** The state of a recording or a job. Always a dot and a word, never colour alone. */
export function StatusChip({ status, label, className, style, ...props }: StatusChipProps) {
  return (
    <span
      data-status={status}
      className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] font-semibold', className)}
      style={{ background: `var(--likho-status-${status})`, color: `var(--likho-status-${status}-ink)`, ...style }}
      {...props}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label ?? LABELS[status]}
    </span>
  );
}
