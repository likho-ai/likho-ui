import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button, Logo, MASCOT_POSES, Mascot, Meter, RECORDING_STATUSES, StatusChip, Tag, cn } from '../src';

describe('cn', () => {
  it('lets the later Tailwind class win', () => {
    expect(cn('px-5', 'px-2')).toBe('px-2');
  });
  it('drops false and empty values', () => {
    const hidden = false as boolean;
    expect(cn('a', hidden && 'b', undefined, 'c')).toBe('a c');
  });
});

describe('Button', () => {
  it('is a real button that does not submit forms by default', () => {
    render(<Button>Upload call</Button>);
    const button = screen.getByRole('button', { name: 'Upload call' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('calls onClick, and not when disabled', () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Save</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('uses the gradient for primary and a surface for secondary', () => {
    render(
      <>
        <Button variant="primary">A</Button>
        <Button>B</Button>
      </>,
    );
    expect(screen.getByRole('button', { name: 'A' }).className).toContain('--likho-btn');
    expect(screen.getByRole('button', { name: 'B' }).className).toContain('bg-surface');
  });

  it('is at least 44px tall in every size', () => {
    for (const size of ['md', 'sm', 'icon'] as const) {
      const { unmount } = render(<Button size={size}>x</Button>);
      expect(screen.getByRole('button').className).toMatch(/min-h-11|size-11/);
      unmount();
    }
  });

  it('gives its look to a link with asChild, without adding a button type', () => {
    render(
      <Button asChild variant="primary">
        <a href="/recordings">Recordings</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Recordings' });
    expect(link).toHaveAttribute('href', '/recordings');
    expect(link).not.toHaveAttribute('type');
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('StatusChip', () => {
  it.each([
    ['new', 'New'],
    ['queued', 'Queued'],
    ['transcribing', 'Transcribing'],
    ['done', 'Done'],
    ['failed', 'Failed'],
  ] as const)('shows a word for %s and colours from its tokens', (status, label) => {
    render(<StatusChip status={status} />);
    const chip = screen.getByText(label);
    expect(chip).toHaveAttribute('data-status', status);
    expect(chip.getAttribute('style')).toContain(`--likho-status-${status}`);
  });

  it('accepts a custom label', () => {
    render(<StatusChip status="done" label="Default" />);
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.queryByText('Done')).toBeNull();
  });

  it('covers every status', () => {
    expect(RECORDING_STATUSES).toEqual(['new', 'queued', 'transcribing', 'done', 'failed']);
  });
});

describe('Meter', () => {
  it('exposes the value to assistive technology', () => {
    render(<Meter label="Hindi" value={0.91} />);
    const meter = screen.getByRole('meter', { name: 'Hindi' });
    expect(meter).toHaveAttribute('aria-valuenow', '0.91');
    expect(meter).toHaveAttribute('aria-valuetext', '0.91');
    expect(screen.getByText('0.91')).toBeInTheDocument();
  });

  it.each([
    [1.7, '1', '100%'],
    [-0.2, '0', '0%'],
    [Number.NaN, '0', '0%'],
  ])('clamps %s to the range', (value, now, width) => {
    render(<Meter label="x" value={value} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', now);
    expect((meter.firstElementChild as HTMLElement).style.width).toBe(width);
  });

  it('shows custom value text', () => {
    render(<Meter label="Hindi" value={0.86} valueText="12 calls" />);
    expect(screen.getByText('12 calls')).toBeInTheDocument();
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '12 calls');
  });
});

describe('Tag', () => {
  it('renders its text', () => {
    render(<Tag>turbo</Tag>);
    expect(screen.getByText('turbo')).toBeInTheDocument();
  });
});

describe('brand', () => {
  it('names the mascot for each pose', () => {
    const names = MASCOT_POSES.map((pose) => {
      const { unmount } = render(<Mascot pose={pose} />);
      const name = screen.getByRole('img').getAttribute('aria-label');
      unmount();
      return name;
    });
    expect(new Set(names).size).toBe(3);
    expect(names.every((n) => n?.startsWith('Likho'))).toBe(true);
  });

  it('can be hidden from screen readers', () => {
    const { container } = render(<Mascot decorative />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('draws the check only when done and the sound waves only when listening', () => {
    const count = (pose: (typeof MASCOT_POSES)[number]) => {
      const { container, unmount } = render(<Mascot pose={pose} />);
      const result = {
        circles: container.querySelectorAll('circle').length,
        greenCheck: container.querySelector('circle[fill="#17834A"]') !== null,
        waves: container.querySelector('g[stroke="#7C3AED"]') !== null,
      };
      unmount();
      return result;
    };
    expect(count('idle')).toMatchObject({ greenCheck: false, waves: false });
    expect(count('listening')).toMatchObject({ greenCheck: false, waves: true });
    expect(count('done')).toMatchObject({ greenCheck: true, waves: false });
  });

  it('gives two mascots on one page different gradient ids', () => {
    const { container } = render(
      <>
        <Mascot />
        <Mascot pose="done" />
      </>,
    );
    const ids = [...container.querySelectorAll('linearGradient')].map((g) => g.id);
    expect(new Set(ids).size).toBe(2);
  });

  it('shows the wordmark next to the mark', () => {
    render(<Logo />);
    expect(screen.getByText('Likho')).toBeInTheDocument();
  });
});
