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
import { formatCpf, onlyDigits } from "@/utils/cpfUtils";

type MemberFormProps = {
  onSubmit: (data: CreateMemberRequest) => void;
};

export function MemberForm({ onSubmit }: MemberFormProps) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [status, setStatus] = useState<MemberStatus>("ACTIVE");
  const [error, setError] = useState("");

  function handleCpfChange(value: string) {
    setCpf(formatCpf(value));
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!name.trim()) {
    setError("Informe o nome do membro.");
    return;
  }

  if (!cpf.trim()) {
    setError("Informe o CPF do membro.");
    return;
  }

  if (!birthDate) {
    setError("Informe a data de nascimento.");
    return;
  }

  setError("");

  onSubmit({
    name: name.trim(),
    cpf: onlyDigits(cpf),
    birthDate,
    status,
  });

  setName("");
  setCpf("");
  setBirthDate("");
  setStatus("ACTIVE");
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
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(event) => handleCpfChange(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
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

          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}