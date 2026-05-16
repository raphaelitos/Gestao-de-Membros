# Gestão de Membros

Sistema full-stack simples para Gestão de Membros, desenvolvido como parte de um desafio técnico para estágio em Desenvolvimento Full Stack.

A aplicação permite cadastrar e listar membros, respeitando regras de negócio relacionadas à idade mínima, CPF real, CPF único, status ativo/inativo e persistência em banco relacional em memória.

## Stack

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- Maven

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Testes

- JUnit
- MockMvc
- Mockito
- Vitest
- React Testing Library

## Estrutura do projeto

```txt
Gestao-de-Membros/
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── README.md
└── .gitignore
```

## Funcionalidades

- Cadastro de membros.
- Listagem de membros cadastrados.
- Validação de CPF real.
- Bloqueio de CPF duplicado.
- Bloqueio de cadastro para menores de 18 anos.
- Status de membro ativo ou inativo.
- Armazenamento do CPF apenas com números.
- Campo de CPF com máscara amigável no frontend.
- Alertas claros de erro e sucesso.
- Estado visual para lista vazia.
- Persistência em banco H2 em memória.

## Pré-requisitos

Para rodar o projeto, é necessário ter instalado:

- Java 21 ou superior
- Node.js
- npm
- Git

Não é necessário instalar Maven globalmente, pois o backend possui Maven Wrapper.

## Como rodar o projeto

O backend e o frontend devem ser executados em terminais separados.

### 1. Rodar o backend

Na raiz do projeto:

```bash
cd backend
./mvnw spring-boot:run
```

No Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

O backend ficará disponível em:

```txt
http://localhost:8080
```

### 2. Rodar o frontend

Em outro terminal, na raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173
```

## Banco H2

Com o backend rodando, acesse:

```txt
http://localhost:8080/h2-console
```

Use os dados abaixo:

```txt
JDBC URL: jdbc:h2:mem:memberdb
User Name: sa
Password:
```

A senha deve ficar vazia.

Para visualizar os membros cadastrados:

```sql
SELECT * FROM MEMBERS;
```

Como o H2 está configurado em memória, os dados são apagados quando o backend é reiniciado.

## Endpoints principais

### Listar membros

```http
GET /api/members
```

### Cadastrar membro

```http
POST /api/members
```

Exemplo de body:

```json
{
  "name": "João Silva",
  "cpf": "529.982.247-25",
  "birthDate": "2000-05-10",
  "status": "ACTIVE"
}
```

Exemplo de resposta:

```json
{
  "id": 1,
  "name": "João Silva",
  "cpf": "52998224725",
  "birthDate": "2000-05-10",
  "status": "ACTIVE"
}
```

Exemplo de erro:

```json
{
  "message": "Informe um CPF válido."
}
```

## Como rodar os testes

### Backend

```bash
cd backend
./mvnw test
```

### Frontend

```bash
cd frontend
npm run test:run
```

## Como gerar build

### Backend

```bash
cd backend
./mvnw clean package
```

### Frontend

```bash
cd frontend
npm run build
```

## Decisões gerais

A aplicação foi organizada como um monorepo simples, com frontend e backend no mesmo repositório.

O backend concentra as regras de negócio definitivas, garantindo que CPF, idade mínima e duplicidade sejam validados mesmo que a API seja chamada diretamente.

O frontend também possui validações para melhorar a experiência do usuário, mas não é tratado como fonte definitiva das regras.

A solução evita complexidade desnecessária, como autenticação, permissões, Docker, deploy ou gerenciamento global de estado, mantendo o foco nos requisitos do desafio.

## Autor

Desenvolvido por Raphael com assistência de IA Generativa.