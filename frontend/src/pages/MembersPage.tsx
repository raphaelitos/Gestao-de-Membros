import { useEffect, useState } from "react";

import { createMember, getMembers } from "@/api/memberApi";
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
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isCreatingMember, setIsCreatingMember] = useState(false);

  async function handleCreateMember(data: CreateMemberRequest) {
    try {
      setIsCreatingMember(true);
      setFeedback(null);

      const createdMember = await createMember(data);

      setMembers((currentMembers) => [createdMember, ...currentMembers]);

      setFeedback({
        type: "success",
        title: "Membro cadastrado",
        message: "O membro foi cadastrado com sucesso.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        title: "Erro ao cadastrar membro",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível cadastrar o membro.",
      });

      throw error;
    } finally {
      setIsCreatingMember(false);
    }
  }

  useEffect(() => {
    let shouldUpdateState = true;

    async function fetchMembers() {
      try {
        setIsLoadingMembers(true);

        const membersFromApi = await getMembers();

        if (shouldUpdateState) {
          setMembers(membersFromApi);
        }
      } catch (error) {
        if (shouldUpdateState) {
          setFeedback({
            type: "error",
            title: "Erro ao carregar membros",
            message:
              error instanceof Error
                ? error.message
                : "Não foi possível carregar os membros cadastrados.",
          });
        }
      } finally {
        if (shouldUpdateState) {
          setIsLoadingMembers(false);
        }
      }
    }

    fetchMembers();

    return () => {
      shouldUpdateState = false;
    };
  }, []);

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
          <MemberForm
            onSubmit={handleCreateMember}
            isSubmitting={isCreatingMember}
          />

          <section className="space-y-3">
            <div>
              <h2 className="text-xl font-semibold">Membros cadastrados</h2>
              <p className="text-sm text-muted-foreground">
                Total de membros: {members.length}
              </p>
            </div>

            {isLoadingMembers ? (
              <div className="rounded-md border bg-background px-6 py-10 text-center text-sm text-muted-foreground">
                Carregando membros...
              </div>
            ) : members.length > 0 ? (
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