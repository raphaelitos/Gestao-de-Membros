package com.desafio.membermanagement.dto;

import com.desafio.membermanagement.entity.Member;
import com.desafio.membermanagement.enums.MemberStatus;

import java.time.LocalDate;

public class MemberResponseDTO {

    private Long id;
    private String name;
    private String cpf;
    private LocalDate birthDate;
    private MemberStatus status;

    public MemberResponseDTO(Long id, String name, String cpf, LocalDate birthDate, MemberStatus status) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.status = status;
    }

    public static MemberResponseDTO fromEntity(Member member) {
        return new MemberResponseDTO(
                member.getId(),
                member.getName(),
                member.getCpf(),
                member.getBirthDate(),
                member.getStatus()
        );
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCpf() {
        return cpf;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public MemberStatus getStatus() {
        return status;
    }
}