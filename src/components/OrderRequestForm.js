import React, { useState } from 'react';
import PolicyConfirmationModal from './Policy';

import { ArrowLeft, User, MapPin, CreditCard, Package, AlertTriangle } from 'lucide-react';
export default function OrderRequestForm({ cartItems, total, onBack, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    // Información del cliente
    fullName: '',
    document: '',
    email: '',
    phone: '',
    
    // Dirección de envío
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia',
    notes: '',
    
    // Método de pago
    paymentMethod: 'creditCard'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar información del cliente
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!formData.document.trim()) {
      newErrors.document = 'El documento es requerido';
    } else if (formData.document.length < 6) {
      newErrors.document = 'Documento inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono inválido (10 dígitos)';
    }

    // Validar dirección
    if (!formData.street.trim()) {
      newErrors.street = 'La dirección es requerida';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'El departamento es requerido';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'El código postal es requerido';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  
    // Mostrar modal de confirmación de política
    setShowPolicyModal(true);
  };
  
  const handleConfirmOrder = async () => {
    setShowPolicyModal(false);
    setIsSubmitting(true);
  
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = {
        orderNumber: 'ORD-' + Date.now(),
        orderDate: new Date().toLocaleDateString('es-CO'),
        orderTime: new Date().toLocaleTimeString('es-CO'),
        processingDate: new Date().toLocaleDateString('es-CO'),
        processingTime: new Date().toLocaleTimeString('es-CO'),
        items: cartItems,
        total: total,
        customerInfo: {
          fullName: formData.fullName,
          document: formData.document,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          notes: formData.notes
        },
        paymentMethod: formData.paymentMethod === 'creditCard' ? 'Tarjeta de Crédito' : 
                       formData.paymentMethod === 'debitCard' ? 'Tarjeta de Débito' :
                       formData.paymentMethod === 'pse' ? 'PSE' : 'Contraentrega'
      };
  
      onSubmitOrder(order);
    } catch (err) {
      setErrors({ general: 'Error al procesar el pedido. Intenta de nuevo.' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* Modal de confirmación de política */}
      <PolicyConfirmationModal
      isOpen={showPolicyModal}
      onClose={() => setShowPolicyModal(false)}
      onConfirm={handleConfirmOrder}
      orderTotal={total * 1.16}
      />
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver al carrito</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Solicitar Pedido
        </h1>

        {errors.general && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del Cliente */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                Información del Destinatario
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Juan Pérez García"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documento de Identidad *
                  </label>
                  <input
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.document ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="1234567890"
                  />
                  {errors.document && <p className="text-red-500 text-xs mt-1">{errors.document}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="3001234567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Dirección de Envío */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Dirección de Envío
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección Completa *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.street ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Calle 123 #45-67, Apto 890"
                  />
                  {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Bogotá"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Cundinamarca"
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.zipCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="110111"
                  />
                  {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    País *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas de Entrega (Opcional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Ej: Entregar en la portería, llamar antes de llegar, etc."
                  />
                </div>
              </div>
            </div>

            {/* Método de Pago */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                Método de Pago
              </h2>

              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={formData.paymentMethod === 'creditCard'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-800">Tarjeta de Crédito</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debitCard"
                    checked={formData.paymentMethod === 'debitCard'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-800">Tarjeta de Débito</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pse"
                    checked={formData.paymentMethod === 'pse'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-800">PSE (Débito desde cuenta)</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-800">Contraentrega (Pago en efectivo)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Package className="w-6 h-6 mr-2 text-blue-600" />
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-xs text-gray-600">Cantidad: {item.quantity}</p>
                      <p className="text-sm font-bold text-blue-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío:</span>
                  <span className="font-semibold text-green-600">GRATIS</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>IVA (16%):</span>
                  <span className="font-semibold">${(total * 0.16).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-blue-600">${(total * 1.16).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {/* Advertencia de política */}
              <div className="mb-4 bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-orange-900 mb-1">
                      ⚠️ Política de No Devoluciones
                    </p>
                    <p className="text-xs text-orange-800">
                      Al solicitar este pedido, aceptas que <strong>NO SE REALIZAN DEVOLUCIONES NI REEMBOLSOS</strong>. 
                      Por favor, verifica todos los datos antes de continuar.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Procesando...
                  </div>
                ) : (
                  'Solicitar Pedido'
                )}
              </button>

              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <p className="flex items-center">
                  <span className="mr-2">✓</span>
                  Compra 100% segura
                </p>
                <p className="flex items-center">
                  <span className="mr-2">✓</span>
                  Soporte 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}