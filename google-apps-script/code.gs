/**
 * Malith & Nipunika — Homecoming Invitation
 * Google Apps Script backend for RSVP and Wishes.
 *
 * - Creates the "RSVP" and "Wishes" sheets automatically (with styled headers)
 *   the first time they are needed.
 * - POST  -> saves an RSVP or a wish.
 * - GET ?action=wishes -> returns the latest wishes for the guestbook.
 */

const SPREADSHEET_ID = '1n8XwpnI8sIVL_5nnmzbwoANafO4xd2jI3edo5X54jbA';

const SHEETS = {
  RSVP: {
    name: 'RSVP',
    headers: ['Timestamp', 'Full Name', 'Phone', 'Attendance', 'Guests', 'Notes'],
    widths: [170, 220, 150, 170, 80, 360],
  },
  WISHES: {
    name: 'Wishes',
    headers: ['Timestamp', 'Name', 'Message'],
    widths: [170, 220, 520],
  },
};

const HEADER_BG = '#141111';
const HEADER_TEXT = '#ffffff';
const ACCENT = '#b3121d';
const MAX_WISHES = 100;

/* ------------------------------------------------------------------ */
/* Web app entry points                                                */
/* ------------------------------------------------------------------ */

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const payload = parsePayload_(e);
    const type = normaliseType_(payload.sheet || payload.type);

    if (type === 'RSVP') {
      saveRsvp_(payload);
    } else if (type === 'WISHES') {
      saveWish_(payload);
    } else {
      return jsonResponse_({ ok: false, error: 'Invalid sheet. Use "RSVP" or "WISHES".' });
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: errorMessage_(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || '').toLowerCase();

    if (action === 'wishes') {
      return jsonResponse_({ ok: true, wishes: getWishes_() });
    }

    return jsonResponse_({ ok: true, message: 'Malith & Nipunika homecoming endpoint is running.' });
  } catch (error) {
    return jsonResponse_({ ok: false, error: errorMessage_(error) });
  }
}

/**
 * Optional: run this once from the Apps Script editor to create both
 * sheets right away (otherwise they are created on the first submission).
 */
function setupSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  getOrCreateSheet_(ss, SHEETS.RSVP);
  getOrCreateSheet_(ss, SHEETS.WISHES);
}

/* ------------------------------------------------------------------ */
/* RSVP & Wishes                                                        */
/* ------------------------------------------------------------------ */

function saveRsvp_(payload) {
  const name = clean_(payload.name || payload.fullName);
  if (!name) throw new Error('Name is required.');

  const sheet = getOrCreateSheet_(SpreadsheetApp.openById(SPREADSHEET_ID), SHEETS.RSVP);
  sheet.appendRow([
    new Date(),
    name,
    clean_(payload.phone),
    clean_(payload.attendance),
    clean_(payload.guests),
    clean_(payload.notes || payload.dietaryNotes),
  ]);
}

function saveWish_(payload) {
  const name = clean_(payload.name);
  const message = clean_(payload.message);
  if (!name || !message) throw new Error('Name and message are required.');

  const sheet = getOrCreateSheet_(SpreadsheetApp.openById(SPREADSHEET_ID), SHEETS.WISHES);
  sheet.appendRow([new Date(), name, message]);
}

function getWishes_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(ss, SHEETS.WISHES);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const startRow = Math.max(2, lastRow - MAX_WISHES + 1);
  const rows = sheet.getRange(startRow, 1, lastRow - startRow + 1, 3).getValues();

  return rows
    .filter(function (row) { return row[1] && row[2]; })
    .map(function (row) {
      const ts = row[0] instanceof Date ? row[0] : new Date(row[0]);
      return {
        name: String(row[1]),
        message: String(row[2]),
        createdAt: isNaN(ts.getTime()) ? null : ts.toISOString(),
      };
    })
    .reverse(); // newest first
}

/* ------------------------------------------------------------------ */
/* Sheet helpers                                                        */
/* ------------------------------------------------------------------ */

function getOrCreateSheet_(ss, config) {
  let sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }

  const firstCell = sheet.getRange(1, 1).getValue();
  if (sheet.getLastRow() === 0 || firstCell !== config.headers[0]) {
    if (sheet.getLastRow() > 0 && firstCell !== config.headers[0]) {
      sheet.insertRowBefore(1);
    }
    writeHeaders_(sheet, config);
  }

  return sheet;
}

function writeHeaders_(sheet, config) {
  const cols = config.headers.length;
  const header = sheet.getRange(1, 1, 1, cols);

  header
    .setValues([config.headers])
    .setBackground(HEADER_BG)
    .setFontColor(HEADER_TEXT)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(false, false, true, false, false, false, ACCENT, SpreadsheetApp.BorderStyle.SOLID_THICK);

  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);

  config.widths.forEach(function (width, i) {
    sheet.setColumnWidth(i + 1, width);
  });

  // Timestamp column formatting and wrapped text for the last (long text) column
  sheet.getRange('A2:A').setNumberFormat('dd mmm yyyy, hh:mm am/pm');
  sheet.getRange(2, cols, sheet.getMaxRows() - 1, 1).setWrap(true);
}

/* ------------------------------------------------------------------ */
/* Request / response helpers                                           */
/* ------------------------------------------------------------------ */

function normaliseType_(value) {
  const v = String(value || '').toUpperCase();
  if (v === 'RSVP') return 'RSVP';
  if (v === 'WISH' || v === 'WISHES') return 'WISHES';
  return '';
}

function parsePayload_(e) {
  const contents = e && e.postData && e.postData.contents ? e.postData.contents : '';

  if (contents && contents.trim().charAt(0) === '{') {
    try {
      return JSON.parse(contents);
    } catch (_error) {
      // fall through to form parameters
    }
  }

  return (e && e.parameter) || {};
}

function clean_(value) {
  // Prefix formula characters so guest input is never executed as a formula
  const s = String(value == null ? '' : value).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function errorMessage_(error) {
  return String(error && error.message ? error.message : error);
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
