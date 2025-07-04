import React from "react";

const Footer = () => (
  <footer className="bg-blue-900 text-white py-8 mt-12">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-bold text-lg mb-2">Buea Bus & Shipping</h3>
        <p className="text-sm">Fast, reliable bus booking and shipping service for the Buea community and beyond.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Quick Links</h4>
        <ul className="space-y-1 text-sm">
          <li><a href="/book" className="hover:underline">Book a Bus</a></li>
          <li><a href="/ship" className="hover:underline">Ship Goods</a></li>
          <li><a href="/dashboard" className="hover:underline">Admin Dashboard</a></li>
          <li><a href="/login" className="hover:underline">Login</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Contact</h4>
        <p className="text-sm">Buea, Cameroon<br/>Email: support@bueabus.com<br/>Phone: +237 6XX XXX XXX</p>
        <div className="flex space-x-3 mt-2">
          <a href="#" aria-label="Facebook" className="hover:text-blue-300"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg></a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-300"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0016.616 3c-2.717 0-4.92 2.206-4.92 4.924 0 .386.045.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/></svg></a>
        </div>
      </div>
    </div>
    <div className="text-center text-xs text-blue-200 mt-8">&copy; {new Date().getFullYear()} Buea Bus & Shipping. All rights reserved.</div>
  </footer>
);

export default Footer;
