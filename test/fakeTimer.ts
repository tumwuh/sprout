import { install } from "@sinonjs/fake-timers";
import { afterAll, beforeEach } from "vitest";

export function fakeTimers() {
    const clock = install();

    beforeEach(() => {
        clock.reset();
    });

    afterAll(() => {
        clock.uninstall();
    });

    return clock;
}