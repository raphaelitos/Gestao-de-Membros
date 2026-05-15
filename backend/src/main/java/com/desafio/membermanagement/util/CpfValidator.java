package com.desafio.membermanagement.util;

public class CpfValidator {

    private CpfValidator() {
    }

    public static String normalize(String cpf) {
        if (cpf == null) {
            return "";
        }

        return cpf.replaceAll("\\D", "");
    }

    public static boolean isValid(String cpf) {
        String normalizedCpf = normalize(cpf);

        if (normalizedCpf.length() != 11) {
            return false;
        }

        if (hasAllEqualDigits(normalizedCpf)) {
            return false;
        }

        int firstCheckDigit = calculateCheckDigit(normalizedCpf.substring(0, 9), 10);
        int secondCheckDigit = calculateCheckDigit(normalizedCpf.substring(0, 10), 11);

        return normalizedCpf.charAt(9) == Character.forDigit(firstCheckDigit, 10)
                && normalizedCpf.charAt(10) == Character.forDigit(secondCheckDigit, 10);
    }

    private static boolean hasAllEqualDigits(String cpf) {
        return cpf.chars().allMatch(character -> character == cpf.charAt(0));
    }

    private static int calculateCheckDigit(String base, int initialWeight) {
        int sum = 0;

        for (int index = 0; index < base.length(); index++) {
            int digit = Character.getNumericValue(base.charAt(index));
            int weight = initialWeight - index;

            sum += digit * weight;
        }

        int remainder = sum % 11;

        if (remainder < 2) {
            return 0;
        }

        return 11 - remainder;
    }
}