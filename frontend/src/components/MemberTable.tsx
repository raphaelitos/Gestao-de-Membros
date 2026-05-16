import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Member } from "@/types/member";
import { formatCpf } from "@/utils/cpfUtils";

type MemberTableProps = {
  members: Member[];
};

export function MemberTable({ members }: MemberTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-300 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Data de nascimento</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{formatCpf(member.cpf)}</TableCell>
              <TableCell>{formatBirthDate(member.birthDate)}</TableCell>
              <TableCell>
                <span
                  className={
                    member.status === "ACTIVE"
                      ? "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                      : "rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700"
                  }
                >
                  {member.status === "ACTIVE" ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatBirthDate(value: string): string {
  const [year, month, day] = value.split("-");

  return `${day}/${month}/${year}`;
}