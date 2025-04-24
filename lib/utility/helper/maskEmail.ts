export const maskEmail = (email: string) => {
  if (email !== "") {
    return "*".repeat(email.length);
  }
};
