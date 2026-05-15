import { MemberForm } from "@/components/MemberForm";
import type { CreateMemberRequest } from "@/types/member";

export function MembersPage() {
  function handleCreateMember(data: CreateMemberRequest) {
    console.log("Dados do membro enviados pelo formulário:", data);
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestão de Membros
          </h1>
          <p className="mt-2 text-muted-foreground">
            Cadastre e acompanhe os membros da organização.
          </p>
        </div>

        <MemberForm onSubmit={handleCreateMember} />
      </div>
    </main>
  );
}