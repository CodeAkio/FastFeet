import { parseISO, format } from 'date-fns';

export default function formatDate(date) {
  return date ? format(parseISO(date), 'dd/MM/yyyy') : '--/--/----';
}
