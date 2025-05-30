'use client';

import Image from "next/image";

export default function Home() {
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Logo"
                width={100}
                height={24}
                priority
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Our App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the power of modern web development with smooth scrolling and interactive buttons.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => scrollToSection('features')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Amazing Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((feature) => (
              <div key={feature} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{feature}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Feature {feature}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This is an amazing feature that will help you achieve your goals faster and more efficiently.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            We are a team of passionate developers creating amazing web experiences. Our mission is to build
            intuitive and powerful applications that help businesses and individuals succeed in the digital world.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To create innovative solutions that transform the way people interact with technology.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To deliver exceptional digital experiences that drive growth and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Have questions or want to work with us? We'd love to hear from you.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2025 Your Company. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}