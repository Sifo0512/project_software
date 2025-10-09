import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Tag, X } from 'lucide-react';

export default function ShoppingCart({ cartItems, onBack, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const [expandedProduct, setExpandedProduct] = useState(null);

  // Calcular totales
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  const getSelectedProduct = () => {
    if (expandedProduct) {
      return cartItems.find(item => item.id === expandedProduct.id);
    }
    return null;
  };

  const selectedProduct = getSelectedProduct();

  const handleQuantityInput = (e) => {
    let value = e.target.value;
    
    if (value === '') {
      setExpandedProduct(prev => ({ ...prev, quantity: '' }));
      return;
    }
    
    let num = parseInt(value, 10);
    
    if (isNaN(num) || num < 0) {
      setExpandedProduct(prev => ({ ...prev, quantity: 0 }));
      return;
    }
    
    if (num > selectedProduct.stock) {
      setExpandedProduct(prev => ({ ...prev, quantity: selectedProduct.stock }));
      onUpdateQuantity(selectedProduct.id, selectedProduct.stock);
      return;
    }
    
    setExpandedProduct(prev => ({ ...prev, quantity: num }));
    onUpdateQuantity(selectedProduct.id, num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Continuar comprando</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Carrito de Compras ({cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'})
        </h1>

        {cartItems.length === 0 ? (
          // Carrito vacío
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Agrega productos para comenzar tu compra!
            </p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ir a la tienda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Lista de productos - 3 columnas */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all ${
                    selectedProduct?.id === item.id
                      ? 'ring-2 ring-blue-600 shadow-lg'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setExpandedProduct(item)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Imagen */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    {/* Información del producto */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.specs}
                      </p>
                      <p className="text-xl font-bold text-blue-600 mb-3">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Controles de cantidad */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateQuantity(item.id, item.quantity - 1);
                            }}
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 font-semibold text-gray-800 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateQuantity(item.id, item.quantity + 1);
                            }}
                            disabled={item.quantity >= item.stock}
                            className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Botón eliminar */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveItem(item.id);
                            if (selectedProduct?.id === item.id) {
                              setExpandedProduct(null);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm">Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-3 pt-3 border-t border-gray-200 text-right">
                    <p className="text-sm text-gray-600">
                      Subtotal: <span className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Panel derecho - Resumen + Detalles del producto */}
            <div className="lg:col-span-2 space-y-6">
              {/* Detalles del producto expandido */}
              {selectedProduct && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Detalles del Producto
                    </h2>
                    <button
                      onClick={() => setExpandedProduct(null)}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Imagen grande */}
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />

                  {/* Información */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Nombre</p>
                      <p className="text-lg font-bold text-gray-900">
                        {selectedProduct.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Especificaciones</p>
                      <p className="text-gray-700">{selectedProduct.specs}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Precio Unitario</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${selectedProduct.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Cantidad en carrito</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(selectedProduct.id, selectedProduct.quantity - 1)}
                            disabled={selectedProduct.quantity <= 1}
                            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={selectedProduct.quantity}
                            onChange={handleQuantityInput}
                            min="1"
                            max={selectedProduct.stock}
                            className="w-16 px-2 py-2 text-center font-semibold text-gray-800 border-x border-gray-300 focus:outline-none"
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          ({selectedProduct.stock} disponibles)
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Subtotal de este producto</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${(selectedProduct.price * selectedProduct.quantity).toFixed(2)}
                      </p>
                    </div>

                    {selectedProduct.description && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Descripción</p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>
                    )}

                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Características</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {selectedProduct.features.slice(0, 4).map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-600 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveItem(selectedProduct.id)}
                    className="w-full mt-4 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar del carrito</span>
                  </button>
                </div>
              )}

              {/* Resumen de la orden */}
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Resumen de la Orden
                </h2>

                {/* Desglose de precios */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Envío:</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">¡GRATIS!</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>IVA (16%):</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-blue-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Cupón de descuento */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Tienes un cupón?
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Código de cupón"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                      Aplicar
                    </button>
                  </div>
                </div>

                {/* Nota de envío gratis */}
                {shipping > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                    <div className="flex items-start space-x-2">
                      <Tag className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        Agrega <strong>${(1000 - subtotal).toFixed(2)}</strong> más para obtener envío gratis
                      </p>
                    </div>
                  </div>
                )}

                {/* Botón de checkout */}
                <button
                  onClick={onCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
                >
                  Solicitar Pedido
                </button>

                <button
                  onClick={onBack}
                  className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Seguir comprando
                </button>

                {/* Métodos de pago aceptados */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center mb-3">
                    Métodos de pago aceptados:
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                      VISA
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                      MC
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                      AMEX
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                      PP
                    </div>
                  </div>
                </div>

                {/* Garantías */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>✓</span>
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>✓</span>
                    <span>Garantía de devolución</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>✓</span>
                    <span>Soporte 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}