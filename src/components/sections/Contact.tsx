"use client";

import React, { useRef, useState } from "react";
import { Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Ganti dengan YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, dan YOUR_PUBLIC_KEY dari EmailJS
      const result = await emailjs.sendForm(
        'service_60xj2t9',
        'template_xd336cs',
        form.current!,
        'caPrhHLs2TdNqsSCr'
      );

      if (result.text === 'OK') {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        if (form.current) {
          form.current.reset();
        }
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const slideIn = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-lg w-full px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative inline-block">
            <motion.h2 
              variants={fadeIn}
              className="flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-3"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-sky-100 dark:bg-sky-900 rounded-full p-2 mr-3"
              >
                <Mail className="text-sky-500" size={28} />
              </motion.span>
              <span className="relative">
                Contact Me
                <motion.span
                  variants={slideIn}
                  className="absolute -bottom-2 left-0 h-0.5 bg-sky-500/20"
                />
              </span>
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-300 mt-4 max-w-lg mx-auto"
            >
              Let&apos;s connect and discuss your next project
            </motion.p>
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-sky-500/20"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-sky-500/20"
            />
          </div>
        </motion.div>

        {submitStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-4 rounded-lg ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {submitStatus.message}
          </motion.div>
        )}

        <motion.form
          ref={form}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          {[
            { id: "user_name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { id: "user_email", label: "Email Address", type: "email", placeholder: "example@mail.com" },
            { id: "message", label: "Your Message", type: "textarea", placeholder: "Write your message here..." }
          ].map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  rows={4}
                  placeholder={field.placeholder}
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 transition-all duration-300 hover:border-sky-400"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 transition-all duration-300 hover:border-sky-400"
                />
              )}
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-3 rounded-lg transition duration-300 disabled:opacity-70"
            >
              <Send className="mr-2" size={18} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}