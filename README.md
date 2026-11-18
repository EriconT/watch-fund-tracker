# On The Way To A Tudor ⌚️

A lightweight, serverless web application designed to track and visualize savings progress toward two Tudor watch goals (Tudor 1926 and Tudor Black Bay 58 GMT) with a target completion date by the end of 2026. 

This app is designed to be completely private, easy to maintain, and installable as a native-feeling iOS web app on an iPhone.

## ✨ Key Features

* **Dynamic Visualization:** Live-updating progress bars and a horizontal bar chart comparing current savings against target costs.
* **Remaining Balances:** Automatically calculates and displays the exact dollar amount still needed to reach each watch goal.
* **In-App Management:** Add, edit, and delete savings entries directly from the web interface without needing to touch a spreadsheet.
* **Cloud Sync:** Uses a Google Sheets backend via Apps Script to ensure data is always instantly synced and protected against aggressive mobile browser caching.
* **Dark Mode:** A built-in theme toggle that automatically adapts to your system preferences and saves your choice for future visits.

## 🏗️ How It's Constructed

The tracker is built with a minimalist architecture using a serverless backend.

* **Core Structure:** A single `index.html` file handles the entire layout, logic, and theme toggling.
* **Data Storage:** All savings data is stored remotely in a **Google Sheet**.
* **Backend API:** A custom **Google Apps Script** acts as a REST API, handling `GET` requests to load data and `POST` requests to modify the sheet.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN) provides a modern, responsive UI.
* **Visualization:** [Chart.js](https://www.chartjs.org/) renders the dynamic horizontal bar chart.
* **Hosting:** The frontend app is hosted for free using **GitHub Pages**.

## 🔒 Passphrase Protection

The Apps Script URL is visible in `index.html`, so the script itself checks a passphrase before reading or changing anything. The app asks for it once per device and remembers it in that browser. If the passphrase is wrong or changes, the app asks again.

**One-time setup in the Apps Script editor:**
1. In the existing script file, rename `doGet` to `handleGet` and `doPost` to `handlePost`.
2. Add a new script file and paste in [`apps-script/Auth.gs`](apps-script/Auth.gs).
3. **Project Settings → Script Properties →** add a property named `PASSPHRASE` with your passphrase. It lives only there, never in this repo.
4. **Deploy → Manage deployments →** edit the existing deployment, set **Version** to *New version*, and click **Deploy**. Don't create a new deployment, because that would change the URL.

To change the passphrase, edit the script property. Every device will be asked for the new one on its next sync.

## ⚙️ Folder Structure

The frontend repository only requires three files to function:
- `index.html` - The main application code and API fetching logic.
- `apple-touch-icon.png` - The custom icon for the iOS Home Screen.
- `tudor.jpg` - The banner image at the top of the page.

The `apps-script/` folder is not served by the site. It holds copies of the code that runs in Google Apps Script:
- `Auth.gs` - the passphrase check.
- `Code.gs` - reads, adds, edits and deletes entries in the sheet.

After changing either file here, paste it into the Apps Script editor and redeploy (**Deploy → Manage deployments →** edit, **Version:** *New version*, **Deploy**).

## 🔄 How It's Maintained

Because the app is connected to a live Google Sheet backend via Apps Script, you no longer need to edit local files or make git commits to update your savings.

**To update the savings progress:**
1. Open the app on your phone or browser.
2. Scroll down to the **Add New Savings Entry** section.
3. Enter a description and an amount, then click **Add Funds**.
4. The app will immediately post the data to Google Sheets, recalculate your totals, and automatically refresh the dashboard.

Alternatively, you can edit or delete past entries directly from the app by clicking the pencil or trash can icons in the Savings Breakdown table. You can also edit the Google Sheet manually if you prefer.

## 📱 iOS Web App Integration

This app includes specific Apple meta tags allowing it to be saved directly to an iPhone Home Screen. When launched from the Home Screen, it hides the Safari address bar and runs in a full-screen, standalone mode, behaving like a native iOS application.

## 🤖 Acknowledgements

The code, styling, logic, and iOS icon for this application were built with the assistance of Google's Gemini.