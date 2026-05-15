import type { CreateMemberRequest, Member } from "@/types/member";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const MEMBERS_ENDPOINT = `${API_BASE_URL}/api/members`;

type ApiErrorResponse = {
  message?: string;
};

export async function getMembers(): Promise<Member[]> {
  const response = await fetch(MEMBERS_ENDPOINT);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os membros cadastrados.");
  }

  return response.json();
}

export async function createMember(
  data: CreateMemberRequest
): Promise<Member> {
  const response = await fetch(MEMBERS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await getErrorMessage(response);
    throw new Error(errorMessage);
  }

  return response.json();
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const errorBody = (await response.json()) as ApiErrorResponse;

    if (errorBody.message) {
      return errorBody.message;
    }
  } catch {
    // Caso o backend não retorne JSON, usamos uma mensagem padrão.
  }

  return "Não foi possível concluir a operação.";
}