const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function emailIsValid(email: string) {
  return emailRegex.test(email);
}

export function getNumber(text: string) {
  return text.replace(/\D+/g, '');
}
