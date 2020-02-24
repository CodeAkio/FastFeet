export default function formattedId(id) {
  const zeroLeftId = String(id).padStart(2, '0');
  return `#${zeroLeftId}`;
}
