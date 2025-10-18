import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Check, Truck, Shield, Package } from 'lucide-react';

export default function ProductDetail({ product, onBack, onAddToCart, onGoToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // Si no hay producto, mostrar producto de ejemplo
  const defaultProduct = {
    id: 1,
    name: 'Dell XPS 15',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'
    ],
    rating: 4.8,
    reviews: 124,
    stock: 15,
    category: 'Premium',
    description: 'La Dell XPS 15 es una laptop premium diseñada para profesionales que buscan potencia y portabilidad. Con su pantalla InfinityEdge de 15.6 pulgadas y procesador Intel Core i7 de última generación, esta laptop ofrece un rendimiento excepcional para tareas exigentes.',
    specifications: {
      'Procesador': 'Intel Core i7-13700H (14 núcleos, hasta 5.0 GHz)',
      'RAM': '16GB DDR5 4800MHz (ampliable hasta 64GB)',
      'Almacenamiento': '512GB NVMe SSD PCIe 4.0',
      'Pantalla': '15.6" FHD+ (1920x1200) InfinityEdge, antirreflejos',
      'Tarjeta Gráfica': 'NVIDIA GeForce RTX 3050 4GB GDDR6',
      'Sistema Operativo': 'Windows 11 Pro',
      'Batería': '86Wh, hasta 12 horas de uso',
      'Peso': '1.86 kg',
      'Puertos': '2x Thunderbolt 4, 2x USB-C 3.2, SD Card Reader',
      'Conectividad': 'Wi-Fi 6E, Bluetooth 5.2'
    },
    features: [
      'Diseño premium en aluminio mecanizado',
      'Teclado retroiluminado con teclas grandes',
      'Lector de huellas dactilares integrado',
      'Webcam HD con obturador de privacidad',
      'Audio de alta calidad con tecnología Waves MaxxAudio Pro',
      'Certificación ENERGY STAR'
    ]
  };

  const currentProduct = product || defaultProduct;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= currentProduct.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleQuantityInput = (e) => {
    let value = e.target.value;
    
    // Si está vacío, dejarlo así
    if (value === '') {
      setQuantity('');
      return;
    }
    
    // Convertir a número
    let num = parseInt(value, 10);
    
    // Si no es un número válido, ponerlo en 0
    if (isNaN(num) || num < 0) {
      setQuantity(0);
      return;
    }
    
    // Si es mayor al stock disponible, limitarlo
    if (num > currentProduct.stock) {
      setQuantity(currentProduct.stock);
      return;
    }
    
    setQuantity(num);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(currentProduct, quantity);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con botón de regreso */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver a la tienda</span>
          </button>
                <button 
            onClick={onGoToCart}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

    


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={currentProduct.images[selectedImage]}
                alt={currentProduct.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-3 gap-4">
              {currentProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-600 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${currentProduct.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Categoría y rating */}
            <div className="flex items-center justify-between">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {currentProduct.category}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-800">{currentProduct.rating}</span>
                <span className="text-gray-500 text-sm">({currentProduct.reviews} reseñas)</span>
              </div>
            </div>

            {/* Nombre y precio */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentProduct.name}
              </h1>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-blue-600">
                  ${currentProduct.price.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-xl">
                  ${(currentProduct.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  -20%
                </span>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="flex items-center space-x-2">
              {currentProduct.stock > 0 ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-semibold">
                    En stock ({currentProduct.stock} unidades disponibles)
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-semibold">Agotado</span>
              )}
            </div>

            {/* Descripción */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Selector de cantidad */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityInput}
                min="1"
                max={currentProduct.stock}
                className="w-16 px-2 py-2 text-center font-semibold text-gray-800 border-x border-gray-300 focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= currentProduct.stock}
                className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-gray-600 text-sm">
              Total: <span className="font-bold text-lg text-gray-900">
                ${(currentProduct.price * quantity).toFixed(2)}
              </span>
            </span>
          </div>

            {/* Botones de acción */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={currentProduct.stock === 0}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : currentProduct.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>¡Agregado al carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Agregar al carrito</span>
                  </>
                )}
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Características de envío */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Envío gratis</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Garantía 2 años</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Devolución 30 días</p>
              </div>
            </div>
          </div>
        </div>

        {/* Especificaciones técnicas */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Especificaciones Técnicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(currentProduct.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-1/3">{key}:</span>
                <span className="text-gray-600 w-2/3">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Características destacadas */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Características Destacadas
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProduct.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}