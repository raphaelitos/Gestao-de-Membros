package com.desafio.membermanagement.controller;

import com.desafio.membermanagement.dto.MemberRequestDTO;
import com.desafio.membermanagement.dto.MemberResponseDTO;
import com.desafio.membermanagement.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public List<MemberResponseDTO> listMembers() {
        return memberService.listMembers();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MemberResponseDTO createMember(@Valid @RequestBody MemberRequestDTO request) {
        return memberService.createMember(request);
    }
}