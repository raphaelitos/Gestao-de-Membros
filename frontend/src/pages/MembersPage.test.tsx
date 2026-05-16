import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MembersPage } from "@/pages/MembersPage";
import { createMember, getMembers } from "@/api/memberApi";

vi.mock("@/api/memberApi", () => ({
  getMembers: vi.fn(),
  createMember: vi.fn(),
}));

const mockedGetMembers = vi.mocked(getMembers);
const mockedCreateMember = vi.mocked(createMember);

describe("MembersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show empty state when there are no members", async () => {
    mockedGetMembers.mockResolvedValue([]);

    render(<MembersPage />);

    expect(screen.getByText("Carregando membros...")).toBeInTheDocument();

    expect(
      await screen.findByText("Nenhum membro cadastrado")
    ).toBeInTheDocument();
  });

  it("should list members returned from API", async () => {
  mockedGetMembers.mockResolvedValue([
    {
      id: 1,
      name: "João Silva",
      cpf: "52998224725",
      birthDate: "2000-05-10",
      status: "ACTIVE",
    },
  ]);

  render(<MembersPage />);

  const membersSection = screen.getByRole("region", {
    name: "Membros cadastrados",
  });

  expect(await within(membersSection).findByText("João Silva")).toBeInTheDocument();
  expect(within(membersSection).getByText("529.982.247-25")).toBeInTheDocument();
  expect(within(membersSection).getByText("Ativo")).toBeInTheDocument();
  expect(screen.getByText("Total de membros: 1")).toBeInTheDocument();
  });

  it("should create member and add it to the list", async () => {
    const user = userEvent.setup();

    mockedGetMembers.mockResolvedValue([]);

    mockedCreateMember.mockResolvedValue({
      id: 1,
      name: "João Silva",
      cpf: "52998224725",
      birthDate: "2000-05-10",
      status: "ACTIVE",
    });

    render(<MembersPage />);

    await screen.findByText("Nenhum membro cadastrado");

    await user.type(screen.getByLabelText("Nome"), "João Silva");
    await user.type(screen.getByLabelText("CPF"), "52998224725");
    await user.type(screen.getByLabelText("Data de nascimento"), "2000-05-10");

    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => {
      expect(mockedCreateMember).toHaveBeenCalledWith({
        name: "João Silva",
        cpf: "52998224725",
        birthDate: "2000-05-10",
        status: "ACTIVE",
      });
    });

    expect(await screen.findByText("Membro cadastrado")).toBeInTheDocument();
    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Total de membros: 1")).toBeInTheDocument();
  });

  it("should show API error when create member fails", async () => {
    const user = userEvent.setup();

    mockedGetMembers.mockResolvedValue([]);
    mockedCreateMember.mockRejectedValue(
      new Error("Já existe um membro cadastrado com este CPF.")
    );

    render(<MembersPage />);

    await screen.findByText("Nenhum membro cadastrado");

    await user.type(screen.getByLabelText("Nome"), "João Silva");
    await user.type(screen.getByLabelText("CPF"), "52998224725");
    await user.type(screen.getByLabelText("Data de nascimento"), "2000-05-10");

    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(
      await screen.findByText("Já existe um membro cadastrado com este CPF.")
    ).toBeInTheDocument();
  });
});