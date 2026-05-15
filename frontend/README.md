# Frontend - Gestão de Membros

Interface web do sistema de Gestão de Membros.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Funcionalidades implementadas

- Cadastro de membro
- Máscara de CPF
- Validação de CPF no frontend para melhorar a experiência do usuário
- Validação de idade mínima no frontend para melhorar a experiência do usuário
- Listagem de membros cadastrados via API
- Estado vazio para lista sem membros
- Mensagens de sucesso e erro
- Estado de carregamento

## Observação sobre regras de negócio

As validações feitas no frontend melhoram a experiência do usuário, mas a validação definitiva deve ser feita no backend.

O backend será responsável por garantir:

- CPF real;
- CPF único;
- idade mínima de 18 anos;
- persistência em banco H2;
- armazenamento do CPF apenas com números.

## Como rodar

Instale as dependências:

```bash
npm install

Rode o projeto:

```bash
npm run dev