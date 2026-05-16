# Frontend - Gestão de Membros

Frontend do sistema de Gestão de Membros, desenvolvido com React, TypeScript, Vite, Tailwind CSS e shadcn/ui.

A interface permite cadastrar membros, visualizar a listagem, receber alertas de erro e sucesso, digitar CPF com máscara e consumir a API do backend.

## Stack técnica

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Vitest
- React Testing Library

## Estrutura principal

```txt
frontend/
├── package.json
├── vite.config.ts
└── src/
    ├── api/
    │   └── memberApi.ts
    ├── components/
    │   ├── Alert.tsx
    │   ├── EmptyState.tsx
    │   ├── MemberForm.tsx
    │   └── MemberTable.tsx
    ├── pages/
    │   └── MembersPage.tsx
    ├── test/
    │   └── setup.ts
    ├── types/
    │   └── member.ts
    ├── utils/
    │   ├── cpfUtils.ts
    │   └── dateUtils.ts
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

## Organização

### `api/`

Contém a comunicação HTTP com o backend.

Arquivo principal:

```txt
api/memberApi.ts
```

Funções principais:

```ts
getMembers()
createMember()
```

A comunicação é feita com `fetch`, sem Axios, pois o projeto possui apenas operações simples de `GET` e `POST`.

### `components/`

Contém componentes reutilizáveis da interface.

Principais componentes:

```txt
Alert.tsx
EmptyState.tsx
MemberForm.tsx
MemberTable.tsx
```

### `pages/`

Contém a tela principal da aplicação.

Arquivo principal:

```txt
pages/MembersPage.tsx
```

Essa página coordena:

- carregamento dos membros;
- envio do formulário;
- atualização da tabela;
- exibição de alertas;
- estados de carregamento;
- estado vazio.

### `types/`

Contém os tipos TypeScript do domínio.

Arquivo principal:

```txt
types/member.ts
```

Tipos principais:

```ts
Member
CreateMemberRequest
MemberStatus
```

### `utils/`

Contém funções auxiliares.

Arquivos:

```txt
utils/cpfUtils.ts
utils/dateUtils.ts
```

Responsabilidades:

- remover máscara do CPF;
- aplicar máscara de CPF;
- validar CPF no frontend;
- calcular idade;
- verificar idade mínima.

## Funcionalidades no frontend

- Formulário de cadastro de membro.
- Campo de CPF com máscara.
- Envio do CPF apenas com números.
- Validação visual de CPF.
- Validação visual de idade mínima.
- Listagem de membros vindos da API.
- Estado vazio quando não há membros.
- Alerta de sucesso.
- Alerta de erro.
- Estado de carregamento da listagem.
- Desabilitação do formulário durante envio.

## Observação sobre validações

O frontend possui validações para melhorar a experiência do usuário.

Mesmo assim, a validação definitiva acontece no backend.

O backend é responsável por garantir:

- CPF real;
- CPF único;
- idade mínima de 18 anos;
- persistência no banco;
- CPF salvo apenas com números.

## Contrato esperado da API

Por padrão, o frontend espera que o backend esteja em:

```txt
http://localhost:8080
```

A URL pode ser configurada com a variável:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Se essa variável não existir, o frontend usa `http://localhost:8080`.

### Listar membros

```http
GET /api/members
```

Resposta esperada:

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

Body enviado:

```json
{
  "name": "João Silva",
  "cpf": "52998224725",
  "birthDate": "2000-05-10",
  "status": "ACTIVE"
}
```

Resposta esperada:

```json
{
  "id": 1,
  "name": "João Silva",
  "cpf": "52998224725",
  "birthDate": "2000-05-10",
  "status": "ACTIVE"
}
```

### Erro esperado

```json
{
  "message": "Informe um CPF válido."
}
```

## Como rodar

Na pasta `frontend`:

```bash
npm install
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173
```

Para a aplicação funcionar completamente, o backend deve estar rodando em:

```txt
http://localhost:8080
```

## Variável de ambiente

Opcionalmente, crie um arquivo `.env` na pasta `frontend`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Testes

Para rodar os testes uma vez:

```bash
npm run test:run
```

Para rodar em modo watch:

```bash
npm run test
```

Os testes cobrem:

- formatação de CPF;
- normalização de CPF;
- validação de CPF;
- cálculo de idade;
- validação de idade mínima;
- renderização do formulário;
- validações do formulário;
- envio de dados com CPF normalizado;
- estado vazio da página;
- listagem de membros vindos da API;
- exibição de erro retornado pela API.

## Build

Para gerar o build:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Decisões técnicas

### React com TypeScript

TypeScript foi usado para deixar explícito o formato dos dados usados pela aplicação e reduzir erros durante a integração com a API.

### Vite

Vite foi usado pela simplicidade de configuração, velocidade em desenvolvimento e integração natural com Vitest.

### shadcn/ui

shadcn/ui foi usado para criar uma interface limpa com componentes reutilizáveis, sem a necessidade de construir um design system próprio.

### Tailwind CSS

Tailwind foi usado para estilização simples e direta dos componentes.

### Fetch API

A comunicação com o backend foi feita com `fetch`, evitando dependências adicionais.

Para o escopo do projeto, `fetch` é suficiente.

### Testes

Vitest e React Testing Library foram usados para testar comportamento da interface sem depender do backend real.

A API é mockada nos testes da página principal.