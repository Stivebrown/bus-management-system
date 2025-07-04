import React from "react";

const faqs = [
	{
		question: "How do I book a bus ticket?",
		answer: "Click on 'Book Bus' in the menu, fill in your trip details, and follow the prompts to complete your booking.",
	},
	{
		question: "How do I ship goods?",
		answer: "Go to 'Ship Goods' and fill out the shipping request form. You will receive a confirmation and tracking number.",
	},
	{
		question: "How can I track my shipment?",
		answer: "Use the 'Shipment Tracking' page and enter your tracking number to see real-time updates.",
	},
	{
		question: "How do I contact support?",
		answer: "Use the live chat widget or email us at support@bueabus.com for assistance.",
	},
];

const FAQSection = () => (
	<section className="max-w-3xl mx-auto my-12 p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg">
		<h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">
			Frequently Asked Questions
		</h2>
		<div className="space-y-6">
			{faqs.map((faq, idx) => (
				<div
					key={idx}
					className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex items-start gap-4 hover:shadow-xl transition-shadow"
				>
					<div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold text-xl">
						Q
					</div>
					<div>
						<h3 className="font-semibold text-lg text-blue-700 mb-1">
							{faq.question}
						</h3>
						<p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
							{faq.answer}
						</p>
					</div>
				</div>
			))}
		</div>
	</section>
);

export default FAQSection;
