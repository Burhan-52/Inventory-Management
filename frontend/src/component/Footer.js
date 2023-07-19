import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-6 py-4 ">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Inventory Management</p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/privacy"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
