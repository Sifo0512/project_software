import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';

export default function ShoppingCart({ cartItems, onBack, onUpdateQuantity, onRemoveItem, onCheckout }) {
  // Calcular totales
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50; // Envío gratis si es mayor a $1000
  const tax = subtotal * 0.16; // IVA 16%
  const total = subtotal + shipping + tax;

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4"
                >
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
                    <p className="text-xl font-bold text-blue-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 font-semibold text-gray-800 border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal del producto */}
                    <p className="text-sm text-gray-600">
                      Subtotal: <span className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Eliminar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de la orden */}
            <div className="lg:col-span-1">
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