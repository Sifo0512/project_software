import React from 'react';
import { X, Lock } from 'lucide-react';

export default function LoginRequiredModal({ isOpen, onClose, onGoToLogin, onGoToRegister }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icono */}
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-blue-600" />
        </div>

        {/* Contenido */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Inicia Sesión para Continuar
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Para solicitar un pedido necesitas tener una cuenta. Inicia sesión o regístrate para continuar con tu compra.
        </p>

        {/* Botones */}
        <div className="space-y-3">
          <button
            onClick={onGoToLogin}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={onGoToRegister}
            className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Crear Cuenta Nueva
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors text-sm"
          >
            Seguir como invitado
          </button>
        </div>

        {/* Beneficios */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">Beneficios de crear una cuenta:</p>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Realizar y seguir tus pedidos
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Ver historial de compras
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Guardar direcciones de envío
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Recibir ofertas exclusivas
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}