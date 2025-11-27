import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Laptop, Filter, Star } from 'lucide-react';

export default function LaptopStoreMenu({ currentUser, onLogout, onProductClick, onAddToCart, onGoToCart, onGoToOrderHistory, onGoToProducts, onGoToContact, onGoToLogin, cartItemsCount, orderHistoryCount, laptops }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'Dell', name: 'Dell' },
    { id: 'Apple', name: 'Apple' },
    { id: 'Lenovo', name: 'Lenovo' },
    { id: 'ASUS', name: 'ASUS' },
    { id: 'HP', name: 'HP' },
    { id: 'Acer', name: 'Acer' }
  ];

  const filteredLaptops = laptops.filter(laptop => {
    const matchesBrand = selectedBrand === 'all' || laptop.brand === selectedBrand;
    const matchesSearch = 
      laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laptop.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Laptop className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">TechLaptops</span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por marca o modelo..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={onGoToProducts}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Productos
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                Ofertas
              </button>
              <button 
                onClick={onGoToContact}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contacto
              </button>
              
              {/* User Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <User className="w-6 h-6 text-gray-700" />
                  <span className="text-sm text-gray-700 hidden lg:block">{currentUser}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{currentUser}</p>
                    <p className="text-xs text-gray-500">Usuario</p>
                  </div>
                  
                  {currentUser === 'Invitado' ? (
                    <button
                      onClick={onGoToLogin}
                      className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Iniciar Sesión 
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={onGoToOrderHistory}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span>Mis Pedidos</span>
                        {orderHistoryCount > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {orderHistoryCount}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Cart Icon */}
              <button 
                onClick={onGoToCart}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por marca o modelo..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={onGoToProducts}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                Productos
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                Ofertas
              </button>
              <button 
                onClick={onGoToContact}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                Contacto
              </button>
              <button 
                onClick={onGoToCart}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Ver Carrito ({cartItemsCount})</span>
              </button>
              {currentUser === 'Invitado' ? (
                <button
                  onClick={onGoToLogin}
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  Iniciar Sesión
                </button>
              ) : (
                <>
                  <button
                    onClick={onGoToOrderHistory}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
                  >
                    <span>Mis Pedidos ({orderHistoryCount})</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Las Mejores Laptops del Mercado
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Encuentra la laptop perfecta para ti con los mejores precios
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Ver Ofertas
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedBrand(category.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedBrand === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredLaptops.length} Productos Encontrados
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaptops.map(laptop => (
            <div
              key={laptop.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => onProductClick(laptop)}
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={laptop.image}
                  alt={laptop.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {laptop.brand}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {laptop.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {laptop.specs}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">
                    {laptop.rating} ({laptop.reviews} reseñas)
                  </span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      COP${laptop.price}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(laptop, 1);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 TechLaptops. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}