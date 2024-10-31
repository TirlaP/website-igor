const nodemailer = require("nodemailer");

// Create email transporter
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
	debug: true, // Show debug output
	logger: true, // Log information into console
});

// Verify transporter configuration
async function verifyTransporter() {
	try {
		const verification = await transporter.verify();
		console.log("Transporter verification:", verification);
		return verification;
	} catch (error) {
		console.error("Transporter verification failed:", error);
		throw error;
	}
}

exports.handler = async (event, context) => {
	console.log("Function started");
	console.log("Environment variables present:", {
		EMAIL_USER: !!process.env.EMAIL_USER,
		EMAIL_PASS: !!process.env.EMAIL_PASS,
		RECIPIENT_EMAIL: !!process.env.RECIPIENT_EMAIL,
	});

	// Only allow POST
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method Not Allowed" }),
		};
	}

	try {
		// Verify transporter before proceeding
		await verifyTransporter();

		const data = JSON.parse(event.body);
		console.log("Received form data:", {
			...data,
			email: data.email ? "✓" : "✗",
			name: data.name ? "✓" : "✗",
			message: data.message ? "✓" : "✗",
		});

		// Basic validation
		if (!data.email || !data.name || !data.message) {
			console.log("Validation failed");
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "Missing required fields",
					missing: {
						email: !data.email,
						name: !data.name,
						message: !data.message,
					},
				}),
			};
		}

		// Configure email
		const mailOptions = {
			from: {
				name: "Contact Form",
				address: process.env.EMAIL_USER,
			},
			to: process.env.RECIPIENT_EMAIL,
			subject: `New Contact Form Submission from ${data.name}`,
			html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Project Type:</strong> ${data["project-type"]}</p>
                <p><strong>Budget Range:</strong> ${data.budget}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
            `,
			text: `
                New Contact Form Submission
                Name: ${data.name}
                Email: ${data.email}
                Project Type: ${data["project-type"]}
                Budget Range: ${data.budget}
                Message: ${data.message}
            `,
		};

		console.log("Attempting to send email...");

		// Send email
		const info = await transporter.sendMail(mailOptions);

		console.log("Email sent successfully:", info);
		console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Form submitted successfully",
				messageId: info.messageId,
			}),
		};
	} catch (error) {
		console.error("Detailed error:", {
			message: error.message,
			stack: error.stack,
			code: error.code,
			command: error.command,
		});

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Error submitting form",
				error: error.message,
				code: error.code,
			}),
		};
	}
};
