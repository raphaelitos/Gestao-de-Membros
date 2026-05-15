export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(`${birthDate}T00:00:00`);

  let age = today.getFullYear() - birth.getFullYear();

  const currentMonth = today.getMonth();
  const birthMonth = birth.getMonth();

  const hasNotHadBirthdayThisYear =
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && today.getDate() < birth.getDate());

  if (hasNotHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}

export function isAtLeast18YearsOld(birthDate: string): boolean {
  return calculateAge(birthDate) >= 18;
}