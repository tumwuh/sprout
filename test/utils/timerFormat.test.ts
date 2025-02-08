import { describe, it, expect } from 'vitest';
import timerFormat from '../../utils/timerFormat'; // Adjust the import path as needed

describe('timerFormat', () => {
    it('should handle 0 milliseconds', () => {
        const result = timerFormat(0);
        expect(result).toBe('00:00:000');
    });

    it('should handle milliseconds under 1 second', () => {
        const result = timerFormat(500);
        expect(result).toBe('00:00:500');
    });

    it('should handle milliseconds under 1 minute', () => {
        const result = timerFormat(45000); // 45 seconds
        expect(result).toBe('00:45:000');
    });

    it('should handle milliseconds under 10 minutes', () => {
        const result = timerFormat(599999); // 9 minutes, 59 seconds, 999 milliseconds
        expect(result).toBe('09:59:999');
    });

    it('should handle milliseconds over 1 minute', () => {
        const result = timerFormat(123456); // 2 minutes, 3 seconds, 456 milliseconds
        expect(result).toBe('02:03:456');
    });

    it('should handle large milliseconds', () => {
        const result = timerFormat(123456789); // 2057 minutes, 36 seconds, 789 milliseconds
        expect(result).toBe('2057:36:789');
    });
});