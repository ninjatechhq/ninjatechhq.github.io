# Google Sheets Email Collection Setup

## Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "NinjaTechHQ Newsletter Signups"
3. Add these column headers in row 1:
   - A1: Email
   - B1: Timestamp 
   - C1: Source
   - D1: Discount Code

## Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Replace the default code with the code from `google-apps-script.js` (see below)
3. Save the project as "Newsletter Signup Handler"

## Step 3: Deploy Web App
1. Click **Deploy > New Deployment**
2. Choose type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the **Web app URL**

## Step 4: Update Website
1. Open `index.html`
2. Find line with `YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE`
3. Replace with your actual Web app URL from step 3

## Step 5: Test
1. Open your website
2. Enter an email and click "Get 15% Off + Free Trial"
3. Check your Google Sheet for the new entry

Your bi-monthly newsletter signups will now be automatically collected!
