import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemberForm } from "@/components/MemberForm";

describe("MemberForm", () => {
  it("should render form fields", () => {
    render(<MemberForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de nascimento")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cadastrar" })).toBeInTheDocument();
  });

  it("should show validation error when name is empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<MemberForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(screen.getByText("Informe o nome do membro.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should format CPF while typing", async () => {
    const user = userEvent.setup();

    render(<MemberForm onSubmit={vi.fn()} />);

    const cpfInput = screen.getByLabelText("CPF");

    await user.type(cpfInput, "52998224725");

    expect(cpfInput).toHaveValue("529.982.247-25");
  });

  it("should show validation error when CPF is invalid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<MemberForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Nome"), "João Silva");
    await user.type(screen.getByLabelText("CPF"), "11111111111");
    await user.type(screen.getByLabelText("Data de nascimento"), "2000-05-10");
    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(screen.getByText("Informe um CPF válido.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error when member is under eighteen", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<MemberForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Nome"), "João Silva");
    await user.type(screen.getByLabelText("CPF"), "52998224725");
    await user.type(screen.getByLabelText("Data de nascimento"), "2010-05-10");
    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(
      screen.getByText("O membro deve ter pelo menos 18 anos.")
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should submit valid data with normalized CPF", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<MemberForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Nome"), "João Silva");
    await user.type(screen.getByLabelText("CPF"), "52998224725");
    await user.type(screen.getByLabelText("Data de nascimento"), "2000-05-10");

    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "João Silva",
      cpf: "52998224725",
      birthDate: "2000-05-10",
      status: "ACTIVE",
    });
  });

  it("should disable fields while submitting", () => {
    render(<MemberForm onSubmit={vi.fn()} isSubmitting />);

    expect(screen.getByLabelText("Nome")).toBeDisabled();
    expect(screen.getByLabelText("CPF")).toBeDisabled();
    expect(screen.getByLabelText("Data de nascimento")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cadastrando..." })).toBeDisabled();
  });
});