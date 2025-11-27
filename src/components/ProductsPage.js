import React, { useState } from 'react';
import { ArrowLeft, Filter, Star, Search, ShoppingCart } from 'lucide-react';

export default function ProductsPage({ onBack, onProductClick, onAddToCart, onGoToCart, laptops, cartItemsCount }) {  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filtrar y ordenar productos
  let filteredProducts = laptops.filter(laptop => {
    const matchesBrand = selectedBrand === 'all' || laptop.brand === selectedBrand;
    const matchesSearch = 
      laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laptop.specs.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesBrand && matchesSearch;
  });

  // Ordenar
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  // Obtener marcas únicas
  const brands = ['all', ...new Set(laptops.map(l => l.brand))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver al menú</span>
          </button>

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
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Catálogo Completo de Laptops</h1>
          <p className="text-xl text-blue-100">
            Explora nuestro amplio catálogo de laptops de todas las marcas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Buscador */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busca por marca, modelo o especificaciones..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                Filtros
              </h2>

              {/* Filtro por marca */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">Marca</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedBrand === brand
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {brand === 'all' ? 'Todas las Marcas' : brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ordenar */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">Ordenar Por</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Calificados</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Información de resultados */}
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando <span className="font-bold">{filteredProducts.length}</span> productos
                {selectedBrand !== 'all' && ` de ${selectedBrand}`}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  No se encontraron productos
                </p>
                <p className="text-gray-600">
                  Intenta con otros filtros o términos de búsqueda
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(laptop => (
                  <div
                    key={laptop.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => onProductClick(laptop)}
                  >
                    {/* Imagen */}
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

                    {/* Contenido */}
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

                      {/* Disponibilidad */}
                      <div className="mb-3">
                        {laptop.stock > 0 ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                            En stock ({laptop.stock})
                          </span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">
                            Agotado
                          </span>
                        )}
                      </div>

                      {/* Precio y botón */}
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
                          disabled={laptop.stock === 0}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            laptop.stock === 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}