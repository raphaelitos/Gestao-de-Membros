export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
    6,
    9
  )}-${digits.slice(9)}`;
}

export function isValidCpf(value: string): boolean {
  const cpf = onlyDigits(value);

  if (cpf.length !== 11) {
    return false;
  }

  const hasAllEqualDigits = /^(\d)\1+$/.test(cpf);

  if (hasAllEqualDigits) {
    return false;
  }

  const firstCheckDigit = calculateCheckDigit(cpf.slice(0, 9), 10);
  const secondCheckDigit = calculateCheckDigit(cpf.slice(0, 10), 11);

  return cpf[9] === String(firstCheckDigit) && cpf[10] === String(secondCheckDigit);
}

function calculateCheckDigit(base: string, initialWeight: number): number {
  const total = base
    .split("")
    .map(Number)
    .reduce((sum, digit, index) => {
      return sum + digit * (initialWeight - index);
    }, 0);

  const remainder = total % 11;

  if (remainder < 2) {
    return 0;
  }

  return 11 - remainder;
}