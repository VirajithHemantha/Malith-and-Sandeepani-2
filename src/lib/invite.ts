// Couple details used across the invitation and the admin link generator
export const GROOM_NAME = 'Malith';
export const BRIDE_NAME = 'Nipunika';

export const PREFIXES = [
  { key: 'mr', label: 'Mr.' },
  { key: 'mrs', label: 'Mrs.' },
  { key: 'miss', label: 'Miss' },
  { key: 'mrmrs', label: 'Mr. & Mrs.' },
  { key: 'family', label: 'Family' },
  { key: 'dear', label: 'Dear' },
] as const;

export type PrefixKey = (typeof PREFIXES)[number]['key'];

const isPrefixKey = (value: string | null): value is PrefixKey =>
  PREFIXES.some((p) => p.key === value);

/**
 * Combines prefix and name into the guest's display name.
 * "Dear" adds nothing here — the greeting itself already starts with "Dear".
 */
export function buildDisplayName(prefix: PrefixKey, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, ' ');
  if (!name) return '';

  switch (prefix) {
    case 'family':
      return `${name} and Family`;
    case 'dear':
      return name;
    default:
      return `${PREFIXES.find((p) => p.key === prefix)!.label} ${name}`;
  }
}

/** {baseURL}/{guestName}, with the prefix carried as ?p= when it changes the display name. */
export function buildInviteLink(baseUrl: string, prefix: PrefixKey, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, ' ');
  const base = baseUrl.replace(/\/+$/, '');
  const query = prefix === 'dear' ? '' : `?p=${prefix}`;
  return `${base}/${encodeURIComponent(name)}${query}`;
}

export function buildInviteMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${GROOM_NAME} & ${BRIDE_NAME}`;
}

/** Reads the guest from the current URL (e.g. /Sanjaya?p=mr). Returns '' when there is none. */
export function getGuestFromLocation(): string {
  const segment = window.location.pathname.split('/').filter(Boolean)[0];
  if (!segment) return '';

  let name: string;
  try {
    name = decodeURIComponent(segment);
  } catch {
    return '';
  }

  const p = new URLSearchParams(window.location.search).get('p');
  return buildDisplayName(isPrefixKey(p) ? p : 'dear', name);
}
