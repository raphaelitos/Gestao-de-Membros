package com.desafio.membermanagement.repository;

import com.desafio.membermanagement.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByCpf(String cpf);
}