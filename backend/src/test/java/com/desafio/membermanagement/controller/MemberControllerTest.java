package com.desafio.membermanagement.controller;

import com.desafio.membermanagement.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        memberRepository.deleteAll();
    }

    @Test
    void shouldReturnEmptyListWhenThereAreNoMembers() throws Exception {
        mockMvc.perform(get("/api/members"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void shouldCreateMemberWhenDataIsValid() throws Exception {
        String requestBody = """
                {
                  "name": "João Silva",
                  "cpf": "529.982.247-25",
                  "birthDate": "2000-05-10",
                  "status": "ACTIVE"
                }
                """;

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("João Silva"))
                .andExpect(jsonPath("$.cpf").value("52998224725"))
                .andExpect(jsonPath("$.birthDate").value("2000-05-10"))
                .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    void shouldListCreatedMembers() throws Exception {
        String requestBody = """
                {
                  "name": "João Silva",
                  "cpf": "529.982.247-25",
                  "birthDate": "2000-05-10",
                  "status": "ACTIVE"
                }
                """;

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/members"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("João Silva"))
                .andExpect(jsonPath("$[0].cpf").value("52998224725"));
    }

    @Test
    void shouldReturnBadRequestWhenCpfIsInvalid() throws Exception {
        String requestBody = """
                {
                  "name": "Maria Souza",
                  "cpf": "111.111.111-11",
                  "birthDate": "2000-05-10",
                  "status": "ACTIVE"
                }
                """;

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Informe um CPF válido."));
    }

    @Test
    void shouldReturnBadRequestWhenMemberIsUnderEighteen() throws Exception {
        String requestBody = """
                {
                  "name": "Pedro Santos",
                  "cpf": "390.533.447-05",
                  "birthDate": "2010-05-10",
                  "status": "ACTIVE"
                }
                """;

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("O membro deve ter pelo menos 18 anos."));
    }

    @Test
    void shouldReturnBadRequestWhenCpfIsDuplicated() throws Exception {
        String requestBody = """
                {
                  "name": "João Silva",
                  "cpf": "529.982.247-25",
                  "birthDate": "2000-05-10",
                  "status": "ACTIVE"
                }
                """;

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Já existe um membro cadastrado com este CPF."));
    }
}