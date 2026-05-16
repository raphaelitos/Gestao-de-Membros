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

  useEffect(() => {
    if (feedback?.type !== "success") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [feedback]);

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">
            Gestão de Membros
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-600 md:text-lg">
            Cadastre, visualize e acompanhe os membros da organização.
          </p>
        </header>

        {feedback && (
          <Alert
            type={feedback.type}
            title={feedback.title}
            message={feedback.message}
          />
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[420px_1fr]">
          <MemberForm
            onSubmit={handleCreateMember}
            isSubmitting={isCreatingMember}
          />

          <section
            className="space-y-4"
            aria-labelledby="members-heading"
          >
            <div className="text-center">
              <h2
                id="members-heading"
                className="text-2xl font-bold tracking-tight text-zinc-950"
              >
                Membros cadastrados
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Total de membros: {members.length}
              </p>
            </div>

            {isLoadingMembers ? (
              <div className="rounded-xl border border-zinc-200 bg-white px-6 py-10 text-center text-sm text-zinc-500 shadow-sm">
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