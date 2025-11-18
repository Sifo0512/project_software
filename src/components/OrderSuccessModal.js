import React, { useEffect } from 'react';
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';

export default function OrderSuccessModal({ isOpen, orderNumber, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Auto-cerrar después de 5 segundos
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50"> 
<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in my-8">        
    {/* Icono de éxito animado */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
          ¡Pedido Realizado con Éxito!
        </h2>

        {/* Número de pedido */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 text-center">Número de pedido</p>
          <p className="text-2xl font-bold text-blue-600 text-center">
            #{orderNumber}
          </p>
        </div>

        {/* Mensaje */}
        <p className="text-gray-600 text-center mb-6">
          Hemos recibido tu pedido correctamente. Te enviaremos un correo de confirmación con todos los detalles.
        </p>

        {/* Pasos siguientes */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Procesando pedido</p>
              <p className="text-xs text-gray-600">Preparando tu pedido para envío</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">En camino</p>
              <p className="text-xs text-gray-600">Te notificaremos cuando se envíe</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Tiempo estimado</p>
              <p className="text-xs text-gray-600">3-5 días hábiles</p>
            </div>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Ver Seguimiento del Pedido
        </button>

        {/* Auto-close indicator */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Esta ventana se cerrará automáticamente en 5 segundos
        </p>
      </div>
    </div>
  );
}