import { afterEach, describe, expect, it, vi } from "vitest";

import { calculateAge, isAtLeast18YearsOld } from "@/utils/dateUtils";

describe("dateUtils", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should calculate age when birthday already happened this year", () => {
    vi.setSystemTime(new Date("2026-05-15T12:00:00"));

    expect(calculateAge("2000-05-10")).toBe(26);
  });

  it("should calculate age when birthday has not happened this year", () => {
    vi.setSystemTime(new Date("2026-05-15T12:00:00"));

    expect(calculateAge("2000-12-10")).toBe(25);
  });

  it("should return true when person is at least 18 years old", () => {
    vi.setSystemTime(new Date("2026-05-15T12:00:00"));

    expect(isAtLeast18YearsOld("2008-05-15")).toBe(true);
  });

  it("should return false when person is under 18 years old", () => {
    vi.setSystemTime(new Date("2026-05-15T12:00:00"));

    expect(isAtLeast18YearsOld("2008-05-16")).toBe(false);
  });
});