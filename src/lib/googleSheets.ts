import { getGuestFromLocation } from './invite';

// Web app URL of google-apps-script/code.gs
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxsUwkS_5tF8L27rEoyJKXk5knRfaOGhizK8aOG4QWqxFWqnN9d3gyjpbRxoXLVg2fVzg/exec';

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

async function readJson(res: Response) {
  try {
    return await res.json();
  } catch {
    // Apps Script returns an HTML page when the web app is not deployed for "Anyone"
    throw new Error('The guest list is not reachable right now. Please try again later.');
  }
}

async function post(sheet: 'RSVP' | 'WISHES', data: object): Promise<void> {
  // text/plain keeps this a "simple" request, so the browser skips the CORS preflight
  // that Apps Script cannot answer.
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ sheet, ...data }),
  });
  const json = await readJson(res);
  if (!json.ok) throw new Error(json.error || 'Could not save your response.');
}

// "Invited As" records which personalised link the RSVP came from (e.g. "Mr. Sanjaya")
export const submitRsvp = (data: RsvpPayload) => post('RSVP', { ...data, invitedAs: getGuestFromLocation() });

export const submitWish = (data: WishPayload) => post('WISHES', data);

export async function fetchWishes(): Promise<SheetWish[]> {
  const res = await fetch(`${SCRIPT_URL}?action=wishes`);
  const json = await readJson(res);
  return json.ok && Array.isArray(json.wishes) ? json.wishes : [];
}
