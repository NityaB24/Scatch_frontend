import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat aliquam velit.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="hover:text-gray-400">Home</a></li>
                            <li><a href="/shop" className="hover:text-gray-400">Products</a></li>
                            <li><a href="#about" className="hover:text-gray-400">About</a></li>
                            <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm">123 Street, City, Country</p>
                        <p className="text-sm">info@example.com</p>
                        <p className="text-sm">+1234567890</p>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-lg hover:text-gray-400">
                                <i className="fab fa-facebook-square"></i>
                            </a>
                            <a href="#" className="text-lg hover:text-gray-400">
                                <i className="fab fa-twitter-square"></i>
                            </a>
                            <a href="#" className="text-lg hover:text-gray-400">
                                <i className="fab fa-instagram-square"></i>
                            </a>
                            <a href="#" className="text-lg hover:text-gray-400">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm mt-5">
                    &copy; 2024 Scatch. All rights reserved.
                </div>
            </div>

            {/* Bottom Section */}

        </footer>
    );
};

export default Footer;
