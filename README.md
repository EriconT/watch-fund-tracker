# Watch Fund Tracker ⌚️

A lightweight, serverless web application designed to track and visualize savings progress toward two specific watch goals (a Tudor and a Longines) with a target completion date by the end of 2026. 

This app is designed to be completely private, easy to maintain, and installable as a native-feeling iOS web app on an iPhone.

## ✨ Key Features

* **Dynamic Visualization:** Live-updating progress bars and a horizontal bar chart comparing current savings against target costs.
* **Remaining Balances:** Automatically calculates and displays the exact dollar amount still needed to reach each watch goal.
* **Manual Sync (Cache-Busting):** A built-in "force sync" button that forces the browser to fetch the absolute latest `.csv` data from the repository, completely bypassing aggressive mobile browser caching.
* **Dark Mode:** A built-in theme toggle that automatically adapts to your system preferences and saves your choice for future visits.

## 🏗️ How It's Constructed

The tracker is built with a minimalist, front-end-only architecture. There is no database or backend server. Everything runs directly in the browser.

* **Core Structure:** A single `index.html` file handles the entire layout, logic, and theme toggling.
* **Data Storage:** All savings data is stored in a simple, local `data.csv` file.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN) provides a modern, responsive UI.
* **Data Parsing:** [PapaParse](https://www.papaparse.com/) reads the `data.csv` file dynamically when the page loads or when the sync button is pressed.
* **Visualization:** [Chart.js](https://www.chartjs.org/) renders the dynamic horizontal bar chart.
* **Hosting:** The app is hosted for free using **GitHub Pages**.

## ⚙️ Folder Structure

The repository only requires three files to function:
- `index.html` - The main application code.
- `data.csv` - The financial data source.
- `apple-touch-icon.png` - The custom icon for the iOS Home Screen.

## 🔄 How It's Maintained

Because the app is hosted on GitHub Pages and fetches the CSV file on load, updating the live website only requires editing the local spreadsheet. 

**To update the savings progress:**
1. Open `data.csv` locally and add a new row detailing the source of the funds (Column A) and the amount saved (Column B).
2. Save the file.
3. Open **GitHub Desktop**, write a brief commit summary (e.g., "Added freelance gig allocation"), and click **Commit to main**.
4. Click **Push origin** to send the changes to GitHub.
5. Open the app on your phone or browser and tap the **Sync Button** (the circular arrow icon in the top right) to instantly pull the fresh data.

## 📱 iOS Web App Integration

This app includes specific Apple meta tags allowing it to be saved directly to an iPhone Home Screen. When launched from the Home Screen, it hides the Safari address bar and runs in a full-screen, standalone mode, behaving like a native iOS application.

## 🤖 Acknowledgements

The code, styling, logic, and iOS icon for this application were built with the assistance of Google's Gemini.