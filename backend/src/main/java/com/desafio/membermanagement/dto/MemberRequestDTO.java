package com.desafio.membermanagement.dto;

import com.desafio.membermanagement.enums.MemberStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class MemberRequestDTO {

    @NotBlank(message = "Informe o nome do membro.")
    private String name;

    @NotBlank(message = "Informe o CPF do membro.")
    private String cpf;

    @NotNull(message = "Informe a data de nascimento.")
    private LocalDate birthDate;

    @NotNull(message = "Informe o status do membro.")
    private MemberStatus status;

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

    public void setName(String name) {
        this.name = name;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setStatus(MemberStatus status) {
        this.status = status;
    }
}