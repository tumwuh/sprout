import { describe, it, expect } from 'vitest';
import htmlToCleanText from '../../utils/htmlToCleanText';

describe('htmlToCleanText', () => {
  it('should remove HTML tags and trim whitespace', () => {
    const html = '<div>Hello <b>World</b>!</div>';
    const cleanText = htmlToCleanText(html);
    expect(cleanText).toBe('Hello World!');
  });

  it('should handle empty strings', () => {
    const html = '';
    const cleanText = htmlToCleanText(html);
    expect(cleanText).toBe('');
  });

  it('should handle strings without HTML tags', () => {
    const html = 'Just some text';
    const cleanText = htmlToCleanText(html);
    expect(cleanText).toBe('Just some text');
  });

  it('should handle strings with multiple HTML tags', () => {
    const html = '<p>This is <span>some</span> <a href="#">text</a>.</p>';
    const cleanText = htmlToCleanText(html);
    expect(cleanText).toBe('This is some text.');
  });

  it('should handle strings with nested HTML tags', () => {
    const html = '<div><p>Nested <span>tags</span> example</p></div>';
    const cleanText = htmlToCleanText(html);
    expect(cleanText).toBe('Nested tags example');
  });
});