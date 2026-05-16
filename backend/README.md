# Backend - Gestão de Membros

Backend do sistema de Gestão de Membros, desenvolvido com Java e Spring Boot.

A API é responsável por cadastrar e listar membros, aplicar as regras de negócio obrigatórias e persistir os dados em banco H2 em memória.

## Stack técnica

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation
- H2 Database
- Maven
- JUnit
- MockMvc
- Mockito

## Estrutura principal

```txt
backend/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/desafio/membermanagement/
    │   │       ├── controller/
    │   │       │   └── MemberController.java
    │   │       ├── dto/
    │   │       │   ├── ErrorResponseDTO.java
    │   │       │   ├── MemberRequestDTO.java
    │   │       │   └── MemberResponseDTO.java
    │   │       ├── entity/
    │   │       │   └── Member.java
    │   │       ├── enums/
    │   │       │   └── MemberStatus.java
    │   │       ├── exception/
    │   │       │   ├── BusinessException.java
    │   │       │   └── GlobalExceptionHandler.java
    │   │       ├── repository/
    │   │       │   └── MemberRepository.java
    │   │       ├── service/
    │   │       │   └── MemberService.java
    │   │       ├── util/
    │   │       │   └── CpfValidator.java
    │   │       └── MembermanagementApplication.java
    │   │
    │   └── resources/
    │       └── application.properties
    │
    └── test/
        └── java/
            └── com/desafio/membermanagement/
                ├── controller/
                ├── service/
                └── util/
```

## Arquitetura

O backend segue uma arquitetura simples em camadas.

### Controller

Camada responsável por expor os endpoints REST.

Arquivo principal:

```txt
controller/MemberController.java
```

Endpoints:

```http
GET /api/members
POST /api/members
```

### Service

Camada responsável pelas regras de negócio.

Arquivo principal:

```txt
service/MemberService.java
```

Responsabilidades:

- normalizar CPF;
- validar CPF real;
- validar CPF duplicado;
- validar idade mínima de 18 anos;
- validar data de nascimento futura;
- criar membro;
- listar membros.

### Repository

Camada responsável pelo acesso ao banco de dados com Spring Data JPA.

Arquivo principal:

```txt
repository/MemberRepository.java
```

### Entity

Representa a tabela de membros no banco.

Arquivo principal:

```txt
entity/Member.java
```

Campos principais:

- `id`
- `name`
- `cpf`
- `birthDate`
- `status`

### DTOs

Representam os dados de entrada, saída e erro da API.

Arquivos:

```txt
dto/MemberRequestDTO.java
dto/MemberResponseDTO.java
dto/ErrorResponseDTO.java
```

### Exceptions

Centralizam os erros de negócio e o tratamento padronizado das respostas.

Arquivos:

```txt
exception/BusinessException.java
exception/GlobalExceptionHandler.java
```

### Utils

Contém lógicas auxiliares reutilizáveis.

Arquivo principal:

```txt
util/CpfValidator.java
```

## Regras de negócio no backend

### Idade mínima

O backend impede o cadastro de membros menores de 18 anos.

A idade é calculada com base na data completa de nascimento, usando `LocalDate` e `Period`.

### CPF real

O CPF é validado usando o cálculo dos dígitos verificadores.

Também são rejeitados CPFs compostos por dígitos repetidos, como:

```txt
00000000000
11111111111
```

### CPF único

O CPF é verificado no Service antes do cadastro.

Além disso, a coluna `cpf` possui restrição de unicidade no banco.

### CPF salvo apenas com números

O backend remove qualquer caractere não numérico antes de salvar.

Exemplo:

```txt
529.982.247-25
```

é persistido como:

```txt
52998224725
```

### Status do membro

O status é representado pelo enum `MemberStatus`:

```java
ACTIVE
INACTIVE
```

## Configuração do H2

Arquivo:

```txt
src/main/resources/application.properties
```

Configuração principal:

```properties
spring.datasource.url=jdbc:h2:mem:memberdb
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

Com o backend rodando, acesse:

```txt
http://localhost:8080/h2-console
```

Dados de acesso:

```txt
JDBC URL: jdbc:h2:mem:memberdb
User Name: sa
Password:
```

A senha deve ficar vazia.

## Como rodar

Na pasta `backend`:

```bash
./mvnw spring-boot:run
```

No Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

A aplicação ficará disponível em:

```txt
http://localhost:8080
```

## Endpoints

### Listar membros

```http
GET /api/members
```

Resposta:

```json
[
  {
    "id": 1,
    "name": "João Silva",
    "cpf": "52998224725",
    "birthDate": "2000-05-10",
    "status": "ACTIVE"
  }
]
```

### Cadastrar membro

```http
POST /api/members
```

Body:

```json
{
  "name": "João Silva",
  "cpf": "529.982.247-25",
  "birthDate": "2000-05-10",
  "status": "ACTIVE"
}
```

Resposta de sucesso:

```json
{
  "id": 1,
  "name": "João Silva",
  "cpf": "52998224725",
  "birthDate": "2000-05-10",
  "status": "ACTIVE"
}
```

Status HTTP:

```txt
201 Created
```

## Formato de erro

A API retorna erros no formato:

```json
{
  "message": "Mensagem do erro."
}
```

Exemplos:

```json
{
  "message": "Informe um CPF válido."
}
```

```json
{
  "message": "Já existe um membro cadastrado com este CPF."
}
```

```json
{
  "message": "O membro deve ter pelo menos 18 anos."
}
```

## CORS

O backend libera requisições do frontend local:

```txt
http://localhost:5173
```

Essa configuração permite que a aplicação React acesse a API durante o desenvolvimento.

## Testes

Para rodar os testes:

```bash
./mvnw test
```

Os testes cobrem:

- normalização de CPF;
- validação de CPF;
- cadastro válido;
- rejeição de CPF inválido;
- rejeição de CPF duplicado;
- rejeição de menor de idade;
- listagem de membros;
- contrato dos endpoints REST;
- mensagens de erro da API.

## Build

Para gerar o build:

```bash
./mvnw clean package
```

## Observações técnicas

- O banco H2 está configurado em memória.
- Os dados são apagados ao reiniciar o backend.
- O Maven Wrapper está configurado.
- Não é necessário instalar Maven globalmente.
- É necessário ter Java instalado.