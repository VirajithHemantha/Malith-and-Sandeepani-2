const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz2FIa3ve4AoRTA2WEVZXfUFM_puHYmZ2TlZQbm33QgyyBwPmAfoJsrXFzok5uGWkuD/exec';

export interface RsvpPayload {
  name: string;
  phone: string;
  attendance: string;
  guests: string;
  notes: string;
}

export interface WishPayload {
  name: string;
  message: string;
}

export interface SheetWish {
  name: string;
  message: string;
  createdAt: string | null;
}

async function post(sheet: 'RSVP' | 'WISHES', data: object): Promise<void> {
  // text/plain keeps this a "simple" request, so the browser skips the CORS preflight
  // that Apps Script cannot answer.
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ sheet, ...data }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'Could not save your response.');
}

export const submitRsvp = (data: RsvpPayload) => post('RSVP', data);

export const submitWish = (data: WishPayload) => post('WISHES', data);

export async function fetchWishes(): Promise<SheetWish[]> {
  const res = await fetch(`${SCRIPT_URL}?action=wishes`);
  const json = await res.json();
  return json.ok && Array.isArray(json.wishes) ? json.wishes : [];
}
