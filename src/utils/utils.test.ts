import { describe, it, expect } from 'vitest';
import { classNames, isValidUrl } from '../utils';

describe('classNames', () => {
  it('should join class names with spaces', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar');
  });

  it('should filter out falsy values', () => {
    expect(classNames('foo', '', 'bar', null, 'baz')).toBe('foo bar baz');
  });

  it('should return empty string when no classes', () => {
    expect(classNames('', null)).toBe('');
  });

  it('should handle single class', () => {
    expect(classNames('foo')).toBe('foo');
  });
});

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path')).toBe(true);
    expect(isValidUrl('https://example.com/path?query=1')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('just text')).toBe(false);
  });
});