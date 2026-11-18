/**
 * Passphrase gate for the Watch Fund Tracker web app.
 *
 * Add this as a new file in the Apps Script project bound to the Google Sheet.
 * It takes over doGet/doPost and only hands a request to the existing code when
 * the request carries the right passphrase.
 *
 * Setup (see README):
 *   1. In the existing script file, rename  doGet  -> handleGet
 *                                    and    doPost -> handlePost
 *   2. Project Settings -> Script Properties -> add property PASSPHRASE.
 *      The passphrase lives only there, never in this file or the repo.
 *   3. Deploy -> Manage deployments -> edit the existing deployment ->
 *      Version: "New version" -> Deploy. (A *new* deployment would change the URL.)
 */

// Plain GETs are refused: reads now come in as POST {action: 'read'} so the
// passphrase is in the request body, not the URL.
function doGet() {
  return jsonResponse_({ status: 'unauthorized', message: 'Passphrase required.' });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse_({ status: 'error', message: 'Invalid request.' });
  }

  var expected = PropertiesService.getScriptProperties().getProperty('PASSPHRASE');
  if (!expected || body.passphrase !== expected) {
    Utilities.sleep(1000); // slow down guessing
    return jsonResponse_({ status: 'unauthorized', message: 'Passphrase required.' });
  }

  if (body.action === 'read') {
    return handleGet(e);
  }
  return handlePost(e);
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
