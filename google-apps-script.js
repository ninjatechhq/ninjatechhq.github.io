/**
 * Google Apps Script for BSCM Contact Form Integration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a new Google Sheet or use existing one
 * 5. Update the SHEET_ID variable below with your Google Sheet ID
 * 6. Deploy as web app with execute permissions set to "Anyone"
 * 7. Copy the web app URL and update the contact form
 */

// CONFIGURATION - UPDATE THESE VALUES
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your actual Google Sheet ID
const SHEET_NAME = 'Contact Submissions'; // Name of the sheet tab

/**
 * Main function to handle POST requests from contact form
 */
function doPost(e) {
  try {
    // Parse the form data
    const formData = JSON.parse(e.postData.contents);
    
    // Log the submission (for debugging)
    console.log('Form submission received:', formData);
    
    // Save to Google Sheet
    const result = saveToSheet(formData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Thank you for your message! We will contact you soon.',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Sorry, there was an error submitting your message. Please try again or call us directly.',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'BSCM Contact Form API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Save form data to Google Sheet
 */
function saveToSheet(formData) {
  try {
    // Open the Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    let worksheet = sheet.getSheetByName(SHEET_NAME);
    
    // Create the sheet if it doesn't exist
    if (!worksheet) {
      worksheet = sheet.insertSheet(SHEET_NAME);
      
      // Add headers
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Message',
        'IP Address',
        'User Agent'
      ];
      worksheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = worksheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#B87333');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Prepare the data row
    const timestamp = new Date();
    const rowData = [
      timestamp,
      formData.name || '',
      formData.email || '',
      formData.phone || '',
      formData.message || '',
      formData.ipAddress || 'Unknown',
      formData.userAgent || 'Unknown'
    ];
    
    // Add the data to the sheet
    worksheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    worksheet.autoResizeColumns(1, rowData.length);
    
    // Send email notification (optional)
    sendEmailNotification(formData, timestamp);
    
    return {
      success: true,
      rowNumber: worksheet.getLastRow()
    };
    
  } catch (error) {
    console.error('Error saving to sheet:', error);
    throw error;
  }
}

/**
 * Send email notification when form is submitted (optional)
 */
function sendEmailNotification(formData, timestamp) {
  try {
    // Configure email settings
    const emailTo = 'Tyler@bscminc.com'; // Tyler's email
    const emailSubject = 'New Contact Form Submission - BSCM, INC.';
    
    const emailBody = `
New contact form submission received:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}

Submitted: ${timestamp.toLocaleString()}
IP Address: ${formData.ipAddress || 'Unknown'}

Please respond to this inquiry as soon as possible.

Best regards,
BSCM Website System
    `;
    
    // Send the email
    MailApp.sendEmail({
      to: emailTo,
      subject: emailSubject,
      body: emailBody
    });
    
    console.log('Email notification sent successfully');
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw error here - form submission should still succeed
  }
}

/**
 * Test function to verify setup
 */
function testSetup() {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '555-0123',
      message: 'This is a test submission to verify the Google Sheets integration is working properly.',
      ipAddress: '127.0.0.1',
      userAgent: 'Test Browser'
    };
    
    const result = saveToSheet(testData);
    console.log('Test successful:', result);
    return result;
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}
