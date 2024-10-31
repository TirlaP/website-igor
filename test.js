const nodemailer = require("nodemailer");

async function testEmail() {
	// Create transporter
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: "petru.tirla@gmail.com",
			pass: "fyvi xynp lgfw iimz",
		},
		debug: true,
		logger: true,
	});

	try {
		// Verify connection
		console.log("Verifying connection...");
		const verified = await transporter.verify();
		console.log("Connection verified:", verified);

		// Send test email
		console.log("Sending test email...");
		const info = await transporter.sendMail({
			from: "petru.tirla@gmail.com",
			to: "petru.tirla1@gmail.com",
			subject: "Test Email",
			text: "If you receive this, the email configuration is working!",
		});

		console.log("Email sent successfully!");
		console.log("Message ID:", info.messageId);
		console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
	} catch (error) {
		console.error("Error:", error);
	}
}

testEmail();
