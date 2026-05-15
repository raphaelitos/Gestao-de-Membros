package com.desafio.membermanagement.service;

import com.desafio.membermanagement.dto.MemberRequestDTO;
import com.desafio.membermanagement.dto.MemberResponseDTO;
import com.desafio.membermanagement.entity.Member;
import com.desafio.membermanagement.repository.MemberRepository;
import org.springframework.stereotype.Service;

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
        String normalizedCpf = normalizeCpf(request.getCpf());

        if (memberRepository.existsByCpf(normalizedCpf)) {
            throw new IllegalArgumentException("Já existe um membro cadastrado com este CPF.");
        }

        Member member = new Member(
                request.getName().trim(),
                normalizedCpf,
                request.getBirthDate(),
                request.getStatus()
        );

        Member savedMember = memberRepository.save(member);

        return MemberResponseDTO.fromEntity(savedMember);
    }

    private String normalizeCpf(String cpf) {
        return cpf.replaceAll("\\D", "");
    }
}