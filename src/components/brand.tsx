import { type SVGAttributes, useId } from 'react';

import { cn } from '../lib/cn';

const INK = '#1E1A4D';

function BrandGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stopColor="#FF7F3F" />
      <stop offset="0.5" stopColor="#FF2D58" />
      <stop offset="1" stopColor="#B872D1" />
    </linearGradient>
  );
}

export interface LogoMarkProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

/** The Likho mark: a sound wave above a line of writing. Decorative; pair it with the word "Likho". */
export function LogoMark({ size = 36, ...props }: LogoMarkProps) {
  const gradient = useId();
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" {...props}>
      <defs>
        <BrandGradient id={gradient} />
      </defs>
      <rect width="48" height="48" rx="13" fill={`url(#${gradient})`} />
      <g fill="#FFFFFF">
        <rect x="10" y="17" width="5" height="10" rx="2.5" />
        <rect x="18" y="10" width="5" height="24" rx="2.5" />
        <rect x="26" y="14" width="5" height="16" rx="2.5" />
        <rect x="34" y="19" width="5" height="6" rx="2.5" />
        <rect x="10" y="37" width="20" height="3.5" rx="1.75" opacity="0.9" />
        <rect x="33" y="37" width="6" height="3.5" rx="1.75" opacity="0.55" />
      </g>
    </svg>
  );
}

/** Mark and wordmark together. */
export function Logo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 text-ink', className)}>
      <LogoMark size={size} />
      <span className="font-extrabold tracking-tight" style={{ fontSize: size * 0.61 }}>
        Likho
      </span>
    </span>
  );
}

export const MASCOT_POSES = ['idle', 'listening', 'done'] as const;
export type MascotPose = (typeof MASCOT_POSES)[number];

const POSE_LABEL: Record<MascotPose, string> = {
  idle: 'Likho, a round robot wearing a headset',
  listening: 'Likho is listening',
  done: 'Likho has finished',
};

export interface MascotProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  pose?: MascotPose;
  size?: number;
  /** Hide from screen readers when the text beside it already says the same. */
  decorative?: boolean;
}

/** The Likho mascot. "listening" while a job runs, "done" when it has finished. */
export function Mascot({ pose = 'idle', size = 132, decorative = false, ...props }: MascotProps) {
  const gradient = useId();
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      data-pose={pose}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': POSE_LABEL[pose] })}
      {...props}
    >
      <defs>
        <BrandGradient id={gradient} />
      </defs>
      <ellipse cx="100" cy="184" rx="46" ry="7" fill={INK} opacity="0.12" />
      <path d="M100 40 V24" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="19" r="7" fill="#FF5A4A" />
      <circle cx="100" cy="104" r="64" fill={`url(#${gradient})`} />
      <ellipse cx="76" cy="66" rx="24" ry="13" fill="#FFFFFF" opacity="0.22" transform="rotate(-28 76 66)" />
      <path d="M30 106 A70 70 0 0 1 170 106" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <rect x="20" y="92" width="20" height="38" rx="10" fill={INK} />
      <rect x="160" y="92" width="20" height="38" rx="10" fill={INK} />
      <rect x="56" y="82" width="88" height="54" rx="27" fill={INK} />
      {pose === 'done' ? (
        <g fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M76 112 q8.5 -13 17 0" />
          <path d="M107 112 q8.5 -13 17 0" />
        </g>
      ) : (
        <g fill="#FFFFFF" transform={pose === 'listening' ? 'translate(4 2)' : undefined}>
          <rect x="79" y="97" width="11" height={pose === 'listening' ? 18 : 22} rx="5.5" />
          <rect x="110" y="97" width="11" height={pose === 'listening' ? 18 : 22} rx="5.5" />
        </g>
      )}
      <path d="M30 130 Q30 158 60 158" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <circle cx="66" cy="158" r="7" fill="#FF5A4A" />
      {pose === 'listening' && (
        <g fill="none" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round">
          <path d="M186 98 q7 13 0 26" />
          <path d="M194 90 q11 21 0 42" opacity="0.6" />
        </g>
      )}
      {pose === 'done' && (
        <>
          <circle cx="152" cy="152" r="21" fill="#17834A" stroke="#FFFFFF" strokeWidth="5" />
          <path
            d="M142 152 l7 7 l13 -14"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
