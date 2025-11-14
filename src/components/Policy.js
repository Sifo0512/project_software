import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function PolicyConfirmationModal({ isOpen, onClose, onConfirm, orderTotal }) {
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (acceptedPolicy) {
      onConfirm();
    }
  };

  const handleClose = () => {
    setAcceptedPolicy(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 relative animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">Confirmación de Pedido</h2>
              <p className="text-orange-100 text-sm">Por favor, lee atentamente antes de continuar</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Resumen del pedido */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800 font-semibold">Total de tu pedido:</p>
                <p className="text-3xl font-bold text-blue-600">${orderTotal.toFixed(2)}</p>
              </div>
              <Info className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          {/* Política principal */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">
                  Política de Ventas - IMPORTANTE
                </h3>
                <p className="text-red-800 font-semibold mb-3">
                  Una vez confirmado el pedido, NO SE ACEPTAN:
                </p>
                <ul className="space-y-2 text-sm text-red-900">
                  <li className="flex items-start">
                    <span className="font-bold mr-2 text-red-600">✗</span>
                    <span>Devoluciones de productos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2 text-red-600">✗</span>
                    <span>Reembolsos de dinero</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2 text-red-600">✗</span>
                    <span>Cancelaciones después de confirmar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2 text-red-600">✗</span>
                    <span>Cambios de productos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              Lo que SÍ garantizamos:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Productos nuevos y en perfectas condiciones</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Garantía del fabricante de 2 años</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Soporte técnico especializado</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Envío seguro y protegido</span>
              </li>
            </ul>
          </div>

          {/* Checkbox de aceptación */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedPolicy}
                onChange={(e) => setAcceptedPolicy(e.target.checked)}
                className="w-6 h-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-base">
                  He leído y acepto la política de no devoluciones
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Confirmo que entiendo que esta compra es <span className="font-semibold">FINAL Y NO REEMBOLSABLE</span>. 
                  He revisado los productos, especificaciones y cantidades antes de continuar.
                </p>
              </div>
            </label>
          </div>

          {/* Recordatorio */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">💡 Consejo:</span> Asegúrate de revisar todos los detalles de tu pedido 
              (productos, cantidades, dirección de envío) antes de confirmar. Esta será tu última oportunidad para realizar cambios.
            </p>
          </div>
        </div>

        {/* Footer con botones */}
        <div className="bg-gray-50 p-6 rounded-b-2xl flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Revisar mi Pedido
          </button>
          <button
            onClick={handleConfirm}
            disabled={!acceptedPolicy}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              acceptedPolicy
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {acceptedPolicy ? '✓ Confirmar Pedido' : '✗ Debes Aceptar la Política'}
          </button>
        </div>
      </div>
    </div>
  );
}