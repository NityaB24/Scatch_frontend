import React from 'react';

const Home = () => {
    const featuredProducts = [
        {
            id: 1,
            name: 'Product 1',
            price: 49.99,
            imageUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 59.99,
            imageUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 3,
            name: 'Product 3',
            price: 69.99,
            imageUrl: 'https://via.placeholder.com/300',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <header className="relative bg-gray-800 text-white">
                <img
                    src="/path/to/your/image.jpg"  // Replace with the actual path to your image
                    alt="Hero Image"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="container mx-auto px-6 py-16 relative z-10 text-center">
                    <h1 className="text-4xl font-bold mb-2">Bakers Village</h1>
                    <h2 className="text-4xl font-bold mb-2">Baking Begins from here.</h2>
                    <a href="/shop" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded mt-4 inline-block">
                        Shop Now
                    </a>
                </div>
            </header>

            {/* Featured Products Section */}
            <section className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {featuredProducts.map(product => (
                        <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
                                <a href={`/product/${product.id}`} className="block mt-4 bg-indigo-500 hover:bg-indigo-600 text-white text-center font-semibold py-2 px-4 rounded">
                                    View Product
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex justify-between">
                        <div>
                            <h5 className="font-bold">Our Store</h5>
                            <p className="mt-2">1234 Main St, Anytown, USA</p>
                            <p className="mt-2">Email: info@ourstore.com</p>
                            <p className="mt-2">Phone: (123) 456-7890</p>
                        </div>
                        <div>
                            <h5 className="font-bold">Follow Us</h5>
                            <div className="flex mt-2">
                                <a href="#" className="text-gray-400 hover:text-white mr-4">Facebook</a>
                                <a href="#" className="text-gray-400 hover:text-white mr-4">Twitter</a>
                                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-400">
                        &copy; 2024 Our Store. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
