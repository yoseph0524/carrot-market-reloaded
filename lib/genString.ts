export function generateRanodmString() {
  const randomStr = Math.random().toString(36).substring(2, 12);
  return randomStr;
}
