package com.desafio.membermanagement.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CpfValidatorTest {

    @Test
    void shouldNormalizeCpfKeepingOnlyDigits() {
        String normalizedCpf = CpfValidator.normalize("529.982.247-25");

        assertEquals("52998224725", normalizedCpf);
    }

    @Test
    void shouldReturnTrueWhenCpfIsValid() {
        boolean isValid = CpfValidator.isValid("529.982.247-25");

        assertTrue(isValid);
    }

    @Test
    void shouldReturnFalseWhenCpfHasAllEqualDigits() {
        boolean isValid = CpfValidator.isValid("111.111.111-11");

        assertFalse(isValid);
    }

    @Test
    void shouldReturnFalseWhenCpfHasLessThanElevenDigits() {
        boolean isValid = CpfValidator.isValid("1234567890");

        assertFalse(isValid);
    }

    @Test
    void shouldReturnFalseWhenCpfCheckDigitsAreInvalid() {
        boolean isValid = CpfValidator.isValid("529.982.247-26");

        assertFalse(isValid);
    }
}