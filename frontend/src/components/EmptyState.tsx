import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center px-6 py-10 text-center">
        <h2 className="text-lg font-semibold">Nenhum membro cadastrado</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Use o formulário acima para cadastrar o primeiro membro. Após o
          cadastro, ele aparecerá automaticamente na listagem.
        </p>
      </CardContent>
    </Card>
  );
}