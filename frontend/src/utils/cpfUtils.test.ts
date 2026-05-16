import { describe, expect, it } from "vitest";

import { formatCpf, isValidCpf, onlyDigits } from "@/utils/cpfUtils";

describe("cpfUtils", () => {
  it("should keep only digits", () => {
    expect(onlyDigits("529.982.247-25")).toBe("52998224725");
  });

  it("should format CPF while typing", () => {
    expect(formatCpf("529")).toBe("529");
    expect(formatCpf("5299")).toBe("529.9");
    expect(formatCpf("529982")).toBe("529.982");
    expect(formatCpf("529982247")).toBe("529.982.247");
    expect(formatCpf("52998224725")).toBe("529.982.247-25");
  });

  it("should limit CPF formatting to eleven digits", () => {
    expect(formatCpf("52998224725123")).toBe("529.982.247-25");
  });

  it("should validate a real CPF", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
  });

  it("should reject CPF with all equal digits", () => {
    expect(isValidCpf("111.111.111-11")).toBe(false);
  });

  it("should reject CPF with invalid check digits", () => {
    expect(isValidCpf("529.982.247-26")).toBe(false);
  });
});