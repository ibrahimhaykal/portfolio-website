"use client";

import React from "react";
import { Mail, Send } from "lucide-react";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg w-full px-4">
        {/* Enhanced Animated Header */}
        <div className="text-center mb-16">
          <div
            data-aos="fade-down"
            data-aos-duration="800"
            className="relative inline-block"
          >
            <h2 className="flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              <span
                data-aos="zoom-in"
                data-aos-delay="400"
                className="bg-sky-100 rounded-full p-2 mr-3"
              >
                <Mail className="text-sky-500" size={28} />
              </span>
              <span
                data-aos="fade-in"
                data-aos-delay="600"
                className="relative"
              >
                Contact Me
                <span
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-sky-500/20"
                  data-aos="slide-right"
                  data-aos-delay="800"
                />
              </span>
            </h2>
            <p
              className="text-gray-600 mt-4 max-w-lg mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Let&apos;s connect and discuss your next project
            </p>
            {/* Decorative corners */}
            <div
              className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-sky-500/20"
              data-aos="fade-down-right"
              data-aos-delay="1200"
            />
            <div
              className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-sky-500/20"
              data-aos="fade-up-left"
              data-aos-delay="1200"
            />
          </div>
        </div>

        {/* Contact Form */}
        <form
          data-aos="fade-up"
          data-aos-duration="500"
          className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-400"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Write your message here..."
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-400"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-sky-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-sky-600 transition duration-300"
            >
              <Send className="mr-2" size={18} />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
