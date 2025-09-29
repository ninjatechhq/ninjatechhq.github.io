// Google Apps Script for NinjaTechHQ Contact Form Submissions
// Copy this code into Google Apps Script and deploy as a web app

function doPost(e) {
  try {
    // Get the active spreadsheet - you'll need to create a new Google Sheet for contact submissions
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Get form data
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const phone = e.parameter.phone || '';
    const preferredDate = e.parameter.preferred_date || '';
    const callbackTime = e.parameter.callback_time || '';
    const message = e.parameter.message || '';
    const timestamp = new Date().toISOString();
    const source = 'NinjaTechHQ Contact Form';
    
    // Validate required fields
    if (!name || !email || !message) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'error',
          'error': 'Please fill in all required fields (Name, Email, Message)'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'error',
          'error': 'Please enter a valid email address'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add headers if this is the first row
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      sheet.appendRow([
        'Timestamp', 
        'Name', 
        'Email', 
        'Phone', 
        'Preferred Service Date',
        'Best Time to Call', 
        'Message', 
        'Source',
        'Status'
      ]);
    }
    
    // Add new contact submission
    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      preferredDate,
      callbackTime,
      message,
      source,
      'New'
    ]);
    
    // Optional: Send notification email to NinjaTechHQ
    try {
      const notificationEmail = 'ninjatech5g@gmail.com'; // Update this to your business email
      GmailApp.sendEmail(
        notificationEmail,
        `New Contact Form Submission from ${name}`,
        `New contact form submission received:\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Preferred Service Date: ${preferredDate || 'Not specified'}\n` +
        `Best Time to Call: ${callbackTime}\n` +
        `Message: ${message}\n\n` +
        `Submitted: ${timestamp}\n` +
        `Source: ${source}`
      );
    } catch (emailError) {
      // Don't fail the form submission if email fails
      console.log('Email notification failed:', emailError);
    }
    
    // Optional: Send confirmation email to customer
    try {
      if (email && email.includes('@')) {
        GmailApp.sendEmail(
          email,
          'Thank you for contacting NinjaTechHQ!',
          `Hello ${name},\n\n` +
          `Thank you for reaching out to NinjaTechHQ! We have received your message and will get back to you as soon as possible.\n\n` +
          `Your submitted information:\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone}\n` +
          `Preferred Service Date: ${preferredDate || 'Not specified'}\n` +
          `Best Time to Call: ${callbackTime}\n` +
          `Message: ${message}\n\n` +
          `We typically respond within 24 hours during business days.\n\n` +
          `Best regards,\n` +
          `The NinjaTechHQ Team\n` +
          `📞 904-557-0052\n` +
          `✉️ ninjatech5g@gmail.com`
        );
      }
    } catch (emailError) {
      // Don't fail the form submission if email fails
      console.log('Customer confirmation email failed:', emailError);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Thank you for your message! We\'ll get back to you soon.',
        'name': name,
        'timestamp': timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    console.error('Contact form error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'error': 'Something went wrong. Please try again or call us at 904-557-0052.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput('NinjaTechHQ Contact Form API is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function to verify the script works
function testContactForm() {
  const testData = {
    parameter: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '555-0123',
      preferred_date: '2024-12-15',
      callback_time: 'morning',
      message: 'This is a test message'
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}
