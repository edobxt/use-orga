"use server";

export async function authenticate(email: string, password: string) {
  if (
    email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return { success: true };
  }
  return { success: false, error: "Identifiants invalides" };
}