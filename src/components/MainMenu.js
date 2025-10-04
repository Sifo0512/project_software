import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Laptop, Filter, Star } from 'lucide-react';

export default function LaptopStoreMenu({ currentUser, onLogout, onProductClick, onAddToCart, onGoToCart, cartItemsCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de ejemplo de laptops
  const laptops = [
    {
      id: 1,
      name: 'Dell XPS 15',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
      images: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'
      ],
      category: 'premium',
      rating: 4.8,
      reviews: 124,
      stock: 15,
      specs: 'Intel i7, 16GB RAM, 512GB SSD',
      description: 'La Dell XPS 15 es una laptop premium diseñada para profesionales que buscan potencia y portabilidad.',
      specifications: {
        'Procesador': 'Intel Core i7-13700H',
        'RAM': '16GB DDR5',
        'Almacenamiento': '512GB NVMe SSD',
        'Pantalla': '15.6" FHD+',
        'Tarjeta Gráfica': 'NVIDIA GeForce RTX 3050',
        'Sistema Operativo': 'Windows 11 Pro'
      },
      features: [
        'Diseño premium en aluminio',
        'Teclado retroiluminado',
        'Lector de huellas dactilares',
        'Webcam HD con obturador'
      ]
    },
    {
      id: 2,
      name: 'MacBook Pro 14"',
      price: 1999.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
        'https://images.unsplash.com/photo-1625247959778-4e99d8c02f04?w=800'
      ],
      category: 'premium',
      rating: 4.9,
      reviews: 98,
      stock: 8,
      specs: 'M3 Pro, 18GB RAM, 512GB SSD',
      description: 'MacBook Pro con chip M3 Pro ofrece un rendimiento revolucionario para creativos y profesionales.',
      specifications: {
        'Procesador': 'Apple M3 Pro',
        'RAM': '18GB Unified Memory',
        'Almacenamiento': '512GB SSD',
        'Pantalla': '14.2" Liquid Retina XDR',
        'Tarjeta Gráfica': 'GPU 14 núcleos',
        'Sistema Operativo': 'macOS Sonoma'
      },
      features: [
        'Pantalla Liquid Retina XDR',
        'Batería de hasta 18 horas',
        'Magic Keyboard',
        'Touch ID'
      ]
    },
    {
      id: 3,
      name: 'Lenovo ThinkPad',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
      images: [
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
      ],
      category: 'business',
      rating: 4.6,
      reviews: 156,
      stock: 20,
      specs: 'Intel i5, 8GB RAM, 256GB SSD',
      description: 'ThinkPad diseñada para negocios con durabilidad militar y seguridad empresarial.',
      specifications: {
        'Procesador': 'Intel Core i5-1235U',
        'RAM': '8GB DDR4',
        'Almacenamiento': '256GB SSD',
        'Pantalla': '14" FHD',
        'Tarjeta Gráfica': 'Intel Iris Xe',
        'Sistema Operativo': 'Windows 11 Pro'
      },
      features: [
        'Certificación militar MIL-STD-810H',
        'TrackPoint rojo icónico',
        'Teclado resistente a derrames',
        'Lector de huellas'
      ]
    },
    {
      id: 4,
      name: 'ASUS ROG Strix',
      price: 1599.99,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800'
      ],
      category: 'gaming',
      rating: 4.7,
      reviews: 89,
      stock: 12,
      specs: 'AMD Ryzen 7, 16GB RAM, RTX 3060',
      description: 'Laptop gaming con el poder para dominar cualquier juego AAA con gráficos en alta calidad.',
      specifications: {
        'Procesador': 'AMD Ryzen 7 6800H',
        'RAM': '16GB DDR5',
        'Almacenamiento': '1TB NVMe SSD',
        'Pantalla': '15.6" FHD 144Hz',
        'Tarjeta Gráfica': 'NVIDIA RTX 3060 6GB',
        'Sistema Operativo': 'Windows 11 Home'
      },
      features: [
        'Pantalla 144Hz para gaming',
        'RGB Aura Sync',
        'Sistema de refrigeración avanzado',
        'Audio ROG'
      ]
    },
    {
      id: 5,
      name: 'HP Pavilion',
      price: 649.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'
      ],
      category: 'home',
      rating: 4.3,
      reviews: 203,
      stock: 25,
      specs: 'Intel i3, 8GB RAM, 256GB SSD',
      description: 'Laptop ideal para uso diario, estudios y entretenimiento con excelente relación calidad-precio.',
      specifications: {
        'Procesador': 'Intel Core i3-1215U',
        'RAM': '8GB DDR4',
        'Almacenamiento': '256GB SSD',
        'Pantalla': '15.6" HD',
        'Tarjeta Gráfica': 'Intel UHD Graphics',
        'Sistema Operativo': 'Windows 11 Home'
      },
      features: [
        'Diseño delgado y ligero',
        'Batería de larga duración',
        'Webcam HP TrueVision',
        'Audio B&O'
      ]
    },
    {
      id: 6,
      name: 'Acer Aspire 5',
      price: 549.99,
      image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400',
      images: [
        'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'
      ],
      category: 'home',
      rating: 4.2,
      reviews: 178,
      stock: 30,
      specs: 'Intel i5, 8GB RAM, 512GB SSD',
      description: 'Laptop económica con buen rendimiento para tareas cotidianas y productividad básica.',
      specifications: {
        'Procesador': 'Intel Core i5-1135G7',
        'RAM': '8GB DDR4',
        'Almacenamiento': '512GB SSD',
        'Pantalla': '15.6" FHD',
        'Tarjeta Gráfica': 'Intel Iris Xe',
        'Sistema Operativo': 'Windows 11 Home'
      },
      features: [
        'Pantalla Full HD',
        'Teclado numérico',
        'Puerto USB Type-C',
        'Batería de 8 horas'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'premium', name: 'Premium' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'business', name: 'Negocios' },
    { id: 'home', name: 'Hogar' }
  ];

  const filteredLaptops = laptops.filter(laptop => {
    const matchesCategory = selectedCategory === 'all' || laptop.category === selectedCategory;
    const matchesSearch = laptop.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
                  placeholder="Buscar laptops..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                Productos
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                Ofertas
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                Contacto
              </button>
              
              {/* User Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <User className="w-6 h-6 text-gray-700" />
                  <span className="text-sm text-gray-700 hidden md:block">{currentUser}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{currentUser}</p>
                    <p className="text-xs text-gray-500">Usuario</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
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
                placeholder="Buscar laptops..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                Productos
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                Ofertas
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                Contacto
              </button>
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
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
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
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                  Nuevo
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
                    {laptop.rating} (124 reseñas)
                  </span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      ${laptop.price}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">TechLaptops</h3>
              <p className="text-gray-400 text-sm">
                Tu tienda de confianza para las mejores laptops del mercado.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Gaming</li>
                <li className="hover:text-white cursor-pointer">Negocios</li>
                <li className="hover:text-white cursor-pointer">Hogar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Contacto</li>
                <li className="hover:text-white cursor-pointer">Envíos</li>
                <li className="hover:text-white cursor-pointer">Devoluciones</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Privacidad</li>
                <li className="hover:text-white cursor-pointer">Términos</li>
                <li className="hover:text-white cursor-pointer">Garantía</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 TechLaptops. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}