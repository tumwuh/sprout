import { describe, it, expect } from 'vitest';
import { convertMilliseconds } from './convertMilliseconds'; // Adjust the import path as needed

describe('convertMilliseconds', () => {
    it('should handle 0 milliseconds', () => {
        const result = convertMilliseconds(0);
        expect(result).toBe('0:00:000');
    });

    it('should handle milliseconds under 1 second', () => {
        const result = convertMilliseconds(500);
        expect(result).toBe('0:00:500');
    });

    it('should handle milliseconds under 1 minute', () => {
        const result = convertMilliseconds(45000); // 45 seconds
        expect(result).toBe('0:45:000');
    });

    it('should handle milliseconds under 10 minutes', () => {
        const result = convertMilliseconds(599999); // 9 minutes, 59 seconds, 999 milliseconds
        expect(result).toBe('9:59:999');
    });

    it('should handle milliseconds over 1 minute', () => {
        const result = convertMilliseconds(123456); // 2 minutes, 3 seconds, 456 milliseconds
        expect(result).toBe('2:03:456');
    });

    it('should handle large milliseconds', () => {
        const result = convertMilliseconds(123456789); // 2057 minutes, 36 seconds, 789 milliseconds
        expect(result).toBe('2057:36:789');
    });
});