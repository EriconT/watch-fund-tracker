// Watch Fund Tracker Data API (V4 - Two Goals)

function handleGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 1. Get the Summary / Goal Data
  const totalSaved = sheet.getRange("E14").getValue();
  const tudorPrice = sheet.getRange("E15").getValue();
  const gmtPrice = sheet.getRange("E19").getValue();

  // 2. Get the Transaction Log
  const lastRow = sheet.getLastRow();
  let transactions = [];

  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 2);
    const dataValues = dataRange.getValues();

    for (let i = 0; i < dataValues.length; i++) {
      const desc = dataValues[i][0];
      const amt = dataValues[i][1];

      if (desc && desc.toString().trim() !== "") {
        transactions.push({
          row: i + 2, // The actual spreadsheet row number
          description: desc,
          amount: amt
        });
      }
    }
  }

  // 3. Output JSON
  const returnData = {
    summary: {
      totalSaved: totalSaved,
      tudorCost: tudorPrice,
      gmtCost: gmtPrice
    },
    transactions: transactions
  };

  return ContentService.createTextOutput(JSON.stringify(returnData))
    .setMimeType(ContentService.MimeType.JSON);
}

// Helper to recalculate Total cell specifically
function recalculateTotal(sheet) {
  const lastRow = sheet.getLastRow();
  let newTotal = 0;

  if (lastRow > 1) {
    const amountRange = sheet.getRange(2, 2, lastRow - 1, 1);
    const amountValues = amountRange.getValues();

    for (let i = 0; i < amountValues.length; i++) {
        let val = amountValues[i][0];
        if (typeof val === 'string') {
            val = parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
        } else if (typeof val !== 'number') {
            val = 0;
        }
        newTotal += val;
    }
  }
  sheet.getRange("E14").setValue(newTotal);
}

// Row number of the last non-empty cell in column A (0 if the column is empty).
// Deleting an entry only clears its cells, so column A can have blank gaps.
// Counting the filled cells would then point at an existing entry and overwrite it;
// scanning up from the bottom always finds the real last entry.
function lastFilledRowInA(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return 0;
  const aVals = sheet.getRange(1, 1, lastRow, 1).getValues();
  for (let i = aVals.length - 1; i >= 0; i--) {
    if (String(aVals[i][0]).trim() !== "") return i + 1;
  }
  return 0;
}


function handlePost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action || 'add'; // Default to 'add' if no action specified

    if (action === 'add') {
      const description = postData.description;
      const amount = postData.amount;

      if (!description || !amount) throw new Error("Missing description or amount");

      // Write below the last entry, never on top of one (row 1 is the header).
      const newRow = Math.max(lastFilledRowInA(sheet), 1) + 1;
      sheet.getRange(newRow, 1, 1, 2).setValues([[description, amount]]);

      recalculateTotal(sheet);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Row added" }))
        .setMimeType(ContentService.MimeType.JSON);

    } else if (action === 'delete') {
      const rowIndex = parseInt(postData.rowIndex);
      if (!rowIndex || isNaN(rowIndex)) throw new Error("Invalid row index for deletion");

      // Delete the data
      sheet.getRange(rowIndex, 1, 1, 2).clearContent();

      // Recalculate
      recalculateTotal(sheet);

      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Row deleted" }))
        .setMimeType(ContentService.MimeType.JSON);

    } else if (action === 'edit') {
      const rowIndex = parseInt(postData.rowIndex);
      const description = postData.description;
      const amount = postData.amount;

      if (!rowIndex || isNaN(rowIndex)) throw new Error("Invalid row index for edit");
      if (!description || !amount) throw new Error("Missing description or amount");

      sheet.getRange(rowIndex, 1).setValue(description);
      sheet.getRange(rowIndex, 2).setValue(amount);

      recalculateTotal(sheet);

      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Row updated" }))
        .setMimeType(ContentService.MimeType.JSON);

    } else {
      throw new Error("Unknown action requested");
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}
