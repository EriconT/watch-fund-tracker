# Watch Fund Tracker ⌚️

A lightweight, serverless web application designed to track and visualize savings progress toward two specific watch goals (a Tudor and a Longines) with a target completion date by the end of 2026. 

This app is designed to be completely private, easy to maintain, and installable as a native-feeling iOS web app on an iPhone.

## 🏗️ How It's Constructed

The tracker is built with a minimalist, front-end-only architecture. There is no database or backend server. Everything runs directly in the browser.

* **Core Structure:** A single `index.html` file handles the entire layout and logic.
* **Data Storage:** All savings data is stored in a simple, local `data.csv` file.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN) provides a modern, responsive UI with full Dark Mode support.
* **Data Parsing:** [PapaParse](https://www.papaparse.com/) reads the `data.csv` file dynamically when the page loads.
* **Visualization:** [Chart.js](https://www.chartjs.org/) renders the dynamic horizontal bar chart comparing the current savings against the target costs.
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
3. Open **GitHub Desktop**, write a brief commit summary (e.g., "Added monthly allocation"), and click **Commit to main**.
4. Click **Push origin** to send the changes to GitHub.

Within minutes, GitHub Pages automatically serves the updated `data.csv` to the live site, instantly updating the progress bars, remaining totals, and transaction history.

## 📱 iOS Web App Integration

This app includes specific Apple meta tags allowing it to be saved directly to an iPhone Home Screen. When launched from the Home Screen, it hides the Safari address bar and runs in a full-screen, standalone mode, behaving like a native iOS application.

## 🤖 Acknowledgements

The code, styling, and logic for this application were built with the assistance of Google's Gemini.