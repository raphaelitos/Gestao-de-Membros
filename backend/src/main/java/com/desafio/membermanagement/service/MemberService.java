package com.desafio.membermanagement.service;

import com.desafio.membermanagement.dto.MemberRequestDTO;
import com.desafio.membermanagement.dto.MemberResponseDTO;
import com.desafio.membermanagement.entity.Member;
import com.desafio.membermanagement.exception.BusinessException;
import com.desafio.membermanagement.repository.MemberRepository;
import com.desafio.membermanagement.util.CpfValidator;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<MemberResponseDTO> listMembers() {
        return memberRepository.findAll()
                .stream()
                .map(MemberResponseDTO::fromEntity)
                .toList();
    }

    public MemberResponseDTO createMember(MemberRequestDTO request) {
        String normalizedCpf = CpfValidator.normalize(request.getCpf());
        String normalizedName = request.getName().trim();

        validateCpf(normalizedCpf);
        validateAge(request.getBirthDate());
        validateDuplicatedCpf(normalizedCpf);

        Member member = new Member(
                normalizedName,
                normalizedCpf,
                request.getBirthDate(),
                request.getStatus()
        );

        Member savedMember = memberRepository.save(member);

        return MemberResponseDTO.fromEntity(savedMember);
    }

    private void validateCpf(String cpf) {
        if (!CpfValidator.isValid(cpf)) {
            throw new BusinessException("Informe um CPF válido.");
        }
    }

    private void validateAge(LocalDate birthDate) {
        if (birthDate.isAfter(LocalDate.now())) {
            throw new BusinessException("Informe uma data de nascimento válida.");
        }

        int age = Period.between(birthDate, LocalDate.now()).getYears();

        if (age < 18) {
            throw new BusinessException("O membro deve ter pelo menos 18 anos.");
        }
    }

    private void validateDuplicatedCpf(String cpf) {
        if (memberRepository.existsByCpf(cpf)) {
            throw new BusinessException("Já existe um membro cadastrado com este CPF.");
        }
    }
}