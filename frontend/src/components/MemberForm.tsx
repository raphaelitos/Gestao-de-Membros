import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { CreateMemberRequest, MemberStatus } from "@/types/member";
import { formatCpf, isValidCpf, onlyDigits } from "@/utils/cpfUtils";
import { isAtLeast18YearsOld } from "@/utils/dateUtils";

type MemberFormProps = {
  onSubmit: (data: CreateMemberRequest) => Promise<void> | void;
  isSubmitting?: boolean;
};

export function MemberForm({
  onSubmit,
  isSubmitting = false,
}: MemberFormProps) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [status, setStatus] = useState<MemberStatus>("ACTIVE");
  const [error, setError] = useState("");

  function handleCpfChange(value: string) {
    setCpf(formatCpf(value));
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedCpf = onlyDigits(cpf);

    if (!normalizedName) {
      setError("Informe o nome do membro.");
      return;
    }

    if (!normalizedCpf) {
      setError("Informe o CPF do membro.");
      return;
    }

    if (!isValidCpf(normalizedCpf)) {
      setError("Informe um CPF válido.");
      return;
    }

    if (!birthDate) {
      setError("Informe a data de nascimento.");
      return;
    }

    if (!isAtLeast18YearsOld(birthDate)) {
      setError("O membro deve ter pelo menos 18 anos.");
      return;
    }

    setError("");

        try {
      await onSubmit({
        name: normalizedName,
        cpf: normalizedCpf,
        birthDate,
        status,
      });

      setName("");
      setCpf("");
      setBirthDate("");
      setStatus("ACTIVE");
    } catch {
      // Os campos preenchidos sao mantidos para o usuário corrigir ou tentar novamente.
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar membro</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md border border-destructive/50 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Ex.: João Silva"
              value={name}
              disabled={isSubmitting}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={cpf}
              disabled={isSubmitting}
              onChange={(event) => handleCpfChange(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              O CPF será salvo apenas com números.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              disabled={isSubmitting}
              onChange={(event) => setBirthDate(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
              disabled={isSubmitting}
              onValueChange={(value) => setStatus(value as MemberStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}