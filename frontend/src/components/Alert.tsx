import {
  Alert as ShadcnAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

type AlertProps = {
  type: "success" | "error";
  title: string;
  message: string;
};

export function Alert({ type, title, message }: AlertProps) {
  return (
    <ShadcnAlert
      className={
        type === "success"
          ? "border-green-200 bg-green-50 text-green-900"
          : "border-destructive/50 bg-destructive/5 text-destructive"
      }
    >
      <AlertTitle className="font-semibold">{title}</AlertTitle>
      <AlertDescription className="mt-1 text-sm">
        {message}
      </AlertDescription>
    </ShadcnAlert>
  );
}