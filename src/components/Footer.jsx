export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-semibold">Apex Real Estate</h2>
              <p className="mt-2 text-gray-400">Your trusted real estate partner.</p>
            </div>
            <div className="flex space-x-6">
              <a href="/" className="hover:text-gray-300">Home</a>
              <a href="/offers" className="hover:text-gray-300">Offers</a>
              <a href="/category/rent" className="hover:text-gray-300">Rent</a>
              <a href="/category/sale" className="hover:text-gray-300">Sale</a>
              <a href="/contact" className="hover:text-gray-300">Contact</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Real Estate. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
