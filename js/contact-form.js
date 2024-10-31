document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("contact-form");
	const successMessage = document.getElementById("success-message");
	const errorMessage = document.getElementById("error-message");

	if (form) {
		form.addEventListener("submit", async function (e) {
			e.preventDefault();

			try {
				// Hide any existing messages
				successMessage.classList.add("hidden");
				errorMessage.classList.add("hidden");

				// Get form data
				const formData = new FormData(form);
				const data = {};
				formData.forEach((value, key) => {
					data[key] = value;
				});

				// Submit the form to our serverless function
				const response = await fetch(
					"/.netlify/functions/submit-contact-form",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					}
				);

				const result = await response.json();

				if (response.ok) {
					// Show success message
					successMessage.classList.remove("hidden");
					// Reset form
					form.reset();
				} else {
					throw new Error(result.message || "Error submitting form");
				}
			} catch (error) {
				console.error("Error:", error);
				// Show error message
				errorMessage.classList.remove("hidden");
				errorMessage.textContent =
					error.message ||
					"There was an error sending your message. Please try again.";
			}
		});
	}
});
