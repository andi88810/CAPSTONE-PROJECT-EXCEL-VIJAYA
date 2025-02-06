import React, { useState } from "react";

const AboutView = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Create a WhatsApp message
    const whatsappMessage = `Name: ${name} Email: ${email} Message: ${message}`;
    const whatsappNumber = '+62895371969966'; // Your WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Optionally reset the form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 bg-base-300">
      <div className="container m-auto px-6 text-white-800 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:w-5/12 lg:w-5/12">
            <img 
              src="https://lh5.googleusercontent.com/p/AF1QipPzSAlxiiRV_SgRdt4BgA0DgqLRezXUduzHTpxE=w426-h240-k-no" 
              alt="Excel Vijaya Pontianak" 
              loading="lazy" 
              width="500" 
              height="300" 
              className="rounded-md"
            />
          </div>
          <div className="md:w-7/12 lg:w-6/12">
            <h2 className="text-2xl font-bold text-white-900 md:text-4xl">
             Excel Vijaya Fotocopy & Print
            </h2>
            <p className="mt-6">
  Selamat datang di Toko Fotocopy Excel Vijaya, tempat terpercaya untuk layanan fotocopy berkualitas dan kebutuhan cetak Anda. Kami berkomitmen memberikan layanan terbaik dengan hasil cetak yang jelas dan rapi.
</p>
<p className="mt-4">
  Dengan dukungan teknologi modern dan tim profesional, kami memastikan setiap kebutuhan dokumen Anda terpenuhi dengan cepat dan efisien. Temukan solusi terbaik untuk layanan fotocopy, cetak, dan kebutuhan dokumen lainnya di Toko Fotocopy Excel Vijaya.
</p>

          </div>
        </div>


        {/* Contact Us Form */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold  mb-6">Contact Us</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                placeholder="Your Name" 
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                placeholder="you@example.com" 
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                placeholder="Your message here..." 
                required
              ></textarea>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white p-3 rounded-md shadow-sm hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Data FAQ
const faqData = [
  {
    question: "1. What is Kratom?",
    answer: "Kratom is a tropical tree native to Southeast Asia, particularly found in Indonesia, Thailand, and Malaysia. The leaves have been used traditionally for their medicinal properties, such as pain relief and energy boosting."
  },
  {
    question: "2. How is Kratom harvested?",
    answer: "Our kratom is harvested by hand from mature trees in the lush forests of Indonesia. We ensure that only the best leaves are picked to provide high-quality kratom for our customers."
  },
  {
    question: "3. Is your Kratom organic?",
    answer: "Yes, we follow sustainable and organic farming practices to ensure that our kratom is free from harmful pesticides and chemicals. We prioritize environmental sustainability in our farming methods."
  },
  {
    question: "4. How can I order Kratom products?",
    answer: "You can browse our selection of kratom products on our website and place an order directly through our secure online store. We offer various payment options and ship to many countries worldwide."
  },
  {
    question: "5. What are the benefits of using Kratom?",
    answer: "Kratom has been used for a variety of purposes, including pain relief, boosting energy, enhancing mood, and improving focus. However, it is important to use it responsibly and consult a healthcare professional if needed."
  }
];

export default AboutView;
