import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="border-dashed border-zinc-300 bg-white shadow-sm">
      <CardContent className="flex flex-col items-center justify-center px-6 py-10 text-center">
        <h2 className="text-lg font-semibold text-zinc-800">
          Nenhum membro cadastrado
        </h2>

        <p className="mt-2 max-w-md text-sm text-zinc-500">
          Use o formulário acima para cadastrar o primeiro membro. Após o
          cadastro, ele aparecerá automaticamente na listagem.
        </p>
      </CardContent>
    </Card>
  );
}