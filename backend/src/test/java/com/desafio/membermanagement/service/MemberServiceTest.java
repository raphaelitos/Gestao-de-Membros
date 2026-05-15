package com.desafio.membermanagement.service;

import com.desafio.membermanagement.dto.MemberRequestDTO;
import com.desafio.membermanagement.dto.MemberResponseDTO;
import com.desafio.membermanagement.entity.Member;
import com.desafio.membermanagement.enums.MemberStatus;
import com.desafio.membermanagement.exception.BusinessException;
import com.desafio.membermanagement.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MemberServiceTest {

    private MemberRepository memberRepository;
    private MemberService memberService;

    @BeforeEach
    void setUp() {
        memberRepository = Mockito.mock(MemberRepository.class);
        memberService = new MemberService(memberRepository);
    }

    @Test
    void shouldCreateMemberWhenDataIsValid() {
        MemberRequestDTO request = createRequest(
                "João Silva",
                "529.982.247-25",
                LocalDate.of(2000, 5, 10),
                MemberStatus.ACTIVE
        );

        when(memberRepository.existsByCpf("52998224725")).thenReturn(false);

        when(memberRepository.save(any(Member.class))).thenAnswer(invocation -> {
            Member member = invocation.getArgument(0);
            member.setId(1L);
            return member;
        });

        MemberResponseDTO response = memberService.createMember(request);

        assertEquals(1L, response.getId());
        assertEquals("João Silva", response.getName());
        assertEquals("52998224725", response.getCpf());
        assertEquals(LocalDate.of(2000, 5, 10), response.getBirthDate());
        assertEquals(MemberStatus.ACTIVE, response.getStatus());

        verify(memberRepository).existsByCpf("52998224725");
        verify(memberRepository).save(any(Member.class));
    }

    @Test
    void shouldRejectInvalidCpf() {
        MemberRequestDTO request = createRequest(
                "Maria Souza",
                "111.111.111-11",
                LocalDate.of(2000, 5, 10),
                MemberStatus.ACTIVE
        );

        BusinessException exception = assertThrows(
                BusinessException.class,
                () -> memberService.createMember(request)
        );

        assertEquals("Informe um CPF válido.", exception.getMessage());

        verify(memberRepository, never()).save(any(Member.class));
    }

    @Test
    void shouldRejectMemberUnderEighteenYearsOld() {
        MemberRequestDTO request = createRequest(
                "Pedro Santos",
                "390.533.447-05",
                LocalDate.now().minusYears(17),
                MemberStatus.ACTIVE
        );

        BusinessException exception = assertThrows(
                BusinessException.class,
                () -> memberService.createMember(request)
        );

        assertEquals("O membro deve ter pelo menos 18 anos.", exception.getMessage());

        verify(memberRepository, never()).save(any(Member.class));
    }

    @Test
    void shouldRejectFutureBirthDate() {
        MemberRequestDTO request = createRequest(
                "Ana Lima",
                "390.533.447-05",
                LocalDate.now().plusDays(1),
                MemberStatus.ACTIVE
        );

        BusinessException exception = assertThrows(
                BusinessException.class,
                () -> memberService.createMember(request)
        );

        assertEquals("Informe uma data de nascimento válida.", exception.getMessage());

        verify(memberRepository, never()).save(any(Member.class));
    }

    @Test
    void shouldRejectDuplicatedCpf() {
        MemberRequestDTO request = createRequest(
                "Carlos Lima",
                "529.982.247-25",
                LocalDate.of(1998, 3, 20),
                MemberStatus.ACTIVE
        );

        when(memberRepository.existsByCpf("52998224725")).thenReturn(true);

        BusinessException exception = assertThrows(
                BusinessException.class,
                () -> memberService.createMember(request)
        );

        assertEquals("Já existe um membro cadastrado com este CPF.", exception.getMessage());

        verify(memberRepository).existsByCpf("52998224725");
        verify(memberRepository, never()).save(any(Member.class));
    }

    private MemberRequestDTO createRequest(
            String name,
            String cpf,
            LocalDate birthDate,
            MemberStatus status
    ) {
        MemberRequestDTO request = new MemberRequestDTO();
        request.setName(name);
        request.setCpf(cpf);
        request.setBirthDate(birthDate);
        request.setStatus(status);
        return request;
    }
}