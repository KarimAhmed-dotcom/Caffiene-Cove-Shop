# ☕ Caffeine Cove Booking Website

A fully responsive coffee shop booking website built using **HTML**, **CSS**, and **JavaScript**, with integration to **Google Sheets** via **Google Apps Script** to store customer booking data.

---

## 🔥 Features

- 🎯 **Real-time Form Validation**
  - Full Name must be at least 8 characters
  - Email must be in valid format (e.g., user@example.com)
  - Phone number must be 11 digits and start with: `010`, `011`, `012`, or `015`
  - Number of persons must be between 1 and 99
  - Booking date must be from the current year and not in the past
  - Booking time must be in the future

- 📥 **Data Submission**
  - On successful validation, form data is submitted via `fetch` to a live **Google Apps Script** endpoint
  - Data is appended to a **Google Sheet** in real-time

- 🚫 **User Feedback**
  - Input errors are displayed live as the user types
  - Submission button gets disabled during sending
  - Success or failure is communicated using **SweetAlert** or alert messages

- 📱 **Fully Responsive Design**
  - Toggleable navbar with smooth interaction
  - Clean layout compatible with desktop and mobile

---

## 🧰 Technologies Used

- **Frontend:**
  - HTML5
  - CSS3
  - Vanilla JavaScript (DOM manipulation, form validation, fetch API)
  - SweetAlert2 (for user alerts)

- **Backend / Integration:**
  - Google Apps Script (`doPost` method to write to Google Sheets)
  - Google Sheets API

- **Other Skills Demonstrated:**
  - Form handling and state management
  - Date and time validation using `Date` object
  - CORS setup for Google Script integration
  - Git version control
  - GitHub for code hosting

---

## 📁 Project Structure
Caffiene-Cove-Shop/
│
├── index.html
├── style.css
├── script.js
└── README.md



