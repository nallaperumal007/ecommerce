
//send the mail for forgetpassword
// Import the nodemailer library
const nodemailer = require('nodemailer');

// Define a function named sendEmail that takes an options object as a parameter
const sendEmail = async options => {
    // Set up the email transport configuration using environment variables
    const transport = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    };
     //https://nodemailer.com/smtp/
    // Create a nodemailer transporter using the defined transport configuration
    const transporter = nodemailer.createTransport(transport);

    // Create an email message object with sender, recipient, subject, and text content
    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,      // Recipient's email address
        subject: options.subject, // Email subject
        text: options.message    // Plain text content of the email
    };

    // Send the email using the nodemailer transporter
    await transporter.sendMail(message);
}

// Export the sendEmail function to make it accessible in other modules
module.exports = sendEmail;
