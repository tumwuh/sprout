export default function timerFormat(ms: number) {
    // Constants for conversion
    const MS_IN_SECOND = 1000;
    const MS_IN_MINUTE = 60 * MS_IN_SECOND;

    // Calculate minutes, seconds, and milliseconds
    let minutes = Math.floor(ms / MS_IN_MINUTE);
    ms %= MS_IN_MINUTE;

    let seconds = Math.floor(ms / MS_IN_SECOND);
    ms %= MS_IN_SECOND;

    // Pad milliseconds to 3 digits
    const milliseconds = String(ms).padStart(3, '0');

    // Return the formatted string (MM:SS.mmm)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${milliseconds}`;
}