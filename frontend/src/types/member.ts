export type MemberStatus = "ACTIVE" | "INACTIVE";

export type Member = {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  status: MemberStatus;
};

export type CreateMemberRequest = {
  name: string;
  cpf: string;
  birthDate: string;
  status: MemberStatus;
};