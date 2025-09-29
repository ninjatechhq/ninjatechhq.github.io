// Google Apps Script for NinjaTechHQ Newsletter Signup
// Copy this code into Google Apps Script and deploy as a web app

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Get form data
    const email = e.parameter.email;
    const timestamp = e.parameter.timestamp || new Date().toISOString();
    const source = e.parameter.source || 'Newsletter Signup';
    
    // Generate discount code
    const discountCode = 'NINJA15-' + Utilities.getUuid().substring(0, 6).toUpperCase();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'error',
          'error': 'Invalid email address'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if email already exists
    const existingEmails = sheet.getRange('A:A').getValues().flat();
    if (existingEmails.includes(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'error',
          'error': 'Email already subscribed',
          'discountCode': discountCode
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add new row with email data
    sheet.appendRow([email, timestamp, source, discountCode]);
    
    // Send confirmation email (optional)
    // You can uncomment this if you want to send emails
    /*
    GmailApp.sendEmail(
      email,
      'Welcome to NinjaTechHQ Newsletter!',
      `Thank you for subscribing to our bi-monthly newsletter!\n\nYour 15% discount code: ${discountCode}\n\nUse this code for 15% off your next service. Valid for 30 days.\n\nBest regards,\nNinjaTechHQ Team`
    );
    */
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'email': email,
        'discountCode': discountCode,
        'message': 'Successfully subscribed to newsletter!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (optional, for testing)
  return ContentService
    .createTextOutput('NinjaTechHQ Newsletter Signup API is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}
