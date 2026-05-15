import { useState } from "react";

import { Alert } from "@/components/Alert";
import { EmptyState } from "@/components/EmptyState";
import { MemberForm } from "@/components/MemberForm";
import { MemberTable } from "@/components/MemberTable";

import type { CreateMemberRequest, Member } from "@/types/member";

type Feedback = {
  type: "success" | "error";
  title: string;
  message: string;
};

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function handleCreateMember(data: CreateMemberRequest) {
    const cpfAlreadyExists = members.some((member) => member.cpf === data.cpf);

    if (cpfAlreadyExists) {
      setFeedback({
        type: "error",
        title: "CPF duplicado",
        message: "Já existe um membro cadastrado com este CPF.",
      });

      return;
    }

    const newMember: Member = {
      id: Date.now(),
      ...data,
    };

    setMembers((currentMembers) => [newMember, ...currentMembers]);

    setFeedback({
      type: "success",
      title: "Membro cadastrado",
      message: "O membro foi cadastrado com sucesso.",
    });
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestão de Membros
          </h1>

          <p className="mt-2 text-muted-foreground">
            Cadastre, visualize e acompanhe os membros da organização.
          </p>
        </div>

        {feedback && (
          <Alert
            type={feedback.type}
            title={feedback.title}
            message={feedback.message}
          />
        )}

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <MemberForm onSubmit={handleCreateMember} />

          <section className="space-y-3">
            <div>
              <h2 className="text-xl font-semibold">Membros cadastrados</h2>
              <p className="text-sm text-muted-foreground">
                Total de membros: {members.length}
              </p>
            </div>

            {members.length > 0 ? (
              <MemberTable members={members} />
            ) : (
              <EmptyState />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}