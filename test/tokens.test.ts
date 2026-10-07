import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Vitest runs from the package root.
const css = readFileSync(resolve(process.cwd(), 'src/tokens.css'), 'utf8');

const block = (selector: string): Map<string, string> => {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`no ${selector} block`);
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('\n}', start));
  return new Map([...body.matchAll(/(--likho-[a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1]!, m[2]!.trim()]));
};

const light = block(':root');
const dark = block('.dark');

// WCAG relative luminance and contrast ratio for #rrggbb colours.
const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};

describe('tokens', () => {
  it('defines every token in both themes', () => {
    expect([...light.keys()].sort()).toEqual([...dark.keys()].sort());
    expect(light.size).toBeGreaterThan(30);
  });

  it('maps every colour token that components use into the Tailwind theme', () => {
    for (const name of [
      'ground',
      'surface',
      'surface-2',
      'line',
      'ink',
      'ink-2',
      'ink-3',
      'accent',
      'accent-soft',
      'on-accent',
      'tag',
      'tag-ink',
    ]) {
      expect(css).toContain(`--color-${name}: var(--likho-${name});`);
    }
  });

  describe.each([
    ['light', light],
    ['dark', dark],
  ])('%s theme contrast', (_name, theme) => {
    const get = (token: string) => theme.get(`--likho-${token}`)!;

    it.each(['ink', 'ink-2', 'ink-3', 'link'])('%s on the page and on cards is at least 4.5:1', (token) => {
      expect(contrast(get(token), get('ground'))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get(token), get('surface'))).toBeGreaterThanOrEqual(4.5);
    });

    it('white text on both ends of the button gradient is at least 4.5:1', () => {
      const stops = get('btn').match(/#[0-9a-f]{6}/gi)!;
      expect(stops).toHaveLength(2);
      for (const stop of stops) expect(contrast(get('on-accent'), stop)).toBeGreaterThanOrEqual(4.5);
    });

    it.each(['new', 'queued', 'transcribing', 'done', 'failed'])(
      'status %s text on its chip is at least 4.5:1',
      (status) => {
        expect(contrast(get(`status-${status}-ink`), get(`status-${status}`))).toBeGreaterThanOrEqual(4.5);
      },
    );

    it('tag text on its background is at least 4.5:1', () => {
      expect(contrast(get('tag-ink'), get('tag'))).toBeGreaterThanOrEqual(4.5);
    });

    it('the large headline gradient is at least 3:1 on the page at every stop', () => {
      for (const token of ['headline-1', 'headline-2']) {
        for (const stop of get(token).match(/#[0-9a-f]{6}/gi)!) {
          expect(contrast(stop, get('ground'))).toBeGreaterThanOrEqual(3);
        }
      }
    });
  });
});
