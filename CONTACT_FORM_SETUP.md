# NinjaTechHQ Contact Form - Google Sheets Setup Guide

This guide will help you connect your contact form to automatically save submissions to a Google Sheet.

## 📋 What You'll Get
- All form submissions automatically saved to Google Sheets
- Email notifications to your business email for new submissions
- Confirmation emails sent to customers
- Professional form validation and error handling

## 🚀 Step-by-Step Setup

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "NinjaTechHQ Contact Form Submissions"
4. The script will automatically create headers when the first submission is received

### Step 2: Set Up Google Apps Script
1. In your Google Sheet, go to `Extensions` → `Apps Script`
2. Delete any existing code in the script editor
3. Copy and paste the entire contents of `contact-form-script.js` (from this directory)
4. **IMPORTANT**: Update the notification email address on line 52:
   ```javascript
   const notificationEmail = 'ninjatech5g@gmail.com'; // Update this to your business email
   ```

### Step 3: Deploy the Script
1. In Apps Script, click the `Deploy` button (top right)
2. Choose `New deployment`
3. Click the gear icon ⚙️ next to "Type" and select `Web app`
4. Set the following settings:
   - **Description**: "NinjaTechHQ Contact Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click `Deploy`
6. **Copy the Web app URL** - you'll need this for the next step
7. Click `Done`

### Step 4: Update Contact Form
1. Open `contact.html` in your code editor
2. Find line 133 where it says:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual web app URL from Step 3
4. Save the file

### Step 5: Test the Setup
1. Open your contact form in a web browser
2. Fill out and submit a test form
3. Check your Google Sheet - you should see the submission appear
4. Check your email for the notification

## 📊 Google Sheet Structure
The script will automatically create these columns:
- **Timestamp**: When the form was submitted
- **Name**: Customer's name
- **Email**: Customer's email address
- **Phone**: Customer's phone number
- **Best Time to Call**: Preferred callback time
- **Message**: Customer's detailed message
- **Source**: Always "NinjaTechHQ Contact Form"
- **Status**: Defaults to "New" for tracking follow-ups

## 📧 Email Features
The script includes two email features:

### Business Notification Email
- Sent to: `ninjatech5g@gmail.com` (configurable)
- Subject: "New Contact Form Submission from [Customer Name]"
- Includes all form details

### Customer Confirmation Email
- Sent to: Customer's email address
- Subject: "Thank you for contacting NinjaTechHQ!"
- Professional thank you message with your contact info

## 🔧 Customization Options

### Change Email Settings
In the Google Apps Script, you can customize:
- Line 52: Business notification email address
- Lines 75-87: Customer confirmation email content
- Lines 45-62: Business notification email content

### Add More Form Fields
To add new fields to your form:
1. Add the HTML input to `contact.html`
2. Update the Google Apps Script to capture the new field
3. The script will automatically add new columns to your sheet

## 🛠️ Troubleshooting

### Form Shows "Configure Google Apps Script URL" Error
- Make sure you replaced `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual web app URL
- The URL should look like: `https://script.google.com/macros/s/[SCRIPT_ID]/exec`

### Submissions Not Appearing in Sheet
- Check that you deployed the script as a web app with "Anyone" access
- Verify the web app URL is correct in `contact.html`
- Check the Google Apps Script execution log for errors

### Emails Not Sending
- Gmail API might be disabled - go to Apps Script dashboard and enable Gmail API
- Check your Google account's email sending limits
- Verify email addresses are correct in the script

### Permission Errors
- Make sure you authorized the script when deploying
- The script needs permission to access Gmail and Google Sheets

## 🔒 Security Notes
- The script only accepts POST requests from your contact form
- All submissions are validated for required fields and email format
- No sensitive data should be collected through this form
- Consider adding CAPTCHA for additional spam protection

## 📞 Support
If you encounter any issues with this setup:
- Check the Google Apps Script execution log for detailed error messages
- Ensure all permissions are granted when prompted
- Test with a simple form submission first

---

**Your contact form is now ready to automatically save all submissions to Google Sheets and send professional email notifications!**
