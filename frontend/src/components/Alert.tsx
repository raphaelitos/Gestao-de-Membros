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
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-destructive/50 text-destructive"
      }
    >
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </ShadcnAlert>
  );
}