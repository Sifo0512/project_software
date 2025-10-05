import React, { useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, User, Phone, Mail, CreditCard, Calendar, Clock } from 'lucide-react';

export default function OrderTracking({ order, onBack, onNewOrder }) {
  const [orderStatus] = useState({
    currentStep: 2, // 0: Solicitado, 1: Procesando, 2: En camino, 3: Entregado
    steps: [
      {
        id: 0,
        name: 'Pedido Solicitado',
        description: 'Hemos recibido tu pedido',
        date: order?.orderDate || new Date().toLocaleDateString(),
        time: order?.orderTime || new Date().toLocaleTimeString(),
        icon: Package,
        completed: true
      },
      {
        id: 1,
        name: 'Procesando',
        description: 'Preparando tu pedido',
        date: order?.processingDate || new Date().toLocaleDateString(),
        time: order?.processingTime || new Date().toLocaleTimeString(),
        icon: Package,
        completed: true
      },
      {
        id: 2,
        name: 'En Camino',
        description: 'Tu pedido está en ruta',
        date: order?.shippingDate || 'Estimado: ' + new Date(Date.now() + 86400000).toLocaleDateString(),
        time: 'Estimado: Mañana',
        icon: Truck,
        completed: false
      },
      {
        id: 3,
        name: 'Entregado',
        description: 'Pedido completado',
        date: 'Pendiente',
        time: '',
        icon: CheckCircle,
        completed: false
      }
    ]
  });

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
            <span className="font-medium">Volver al menú</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header del pedido */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Seguimiento del Pedido
              </h1>
              <p className="text-blue-100 text-lg">
                Número de pedido: <span className="font-semibold">#{order?.orderNumber}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-sm text-blue-100">Estado actual</p>
              <p className="text-xl font-bold">
                {orderStatus.steps[orderStatus.currentStep].name}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline de seguimiento */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Estado del Pedido
              </h2>

              <div className="relative">
                {orderStatus.steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === orderStatus.currentStep;
                  const isCompleted = step.completed;
                  
                  return (
                    <div key={step.id} className="relative pb-8 last:pb-0">
                      {/* Línea vertical */}
                      {index !== orderStatus.steps.length - 1 && (
                        <div
                          className={`absolute left-6 top-12 w-0.5 h-full ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                      )}

                      {/* Contenido del paso */}
                      <div className="flex items-start space-x-4">
                        {/* Icono */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : isActive
                              ? 'bg-blue-600 text-white animate-pulse'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Información */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3
                              className={`text-lg font-bold ${
                                isActive ? 'text-blue-600' : 'text-gray-900'
                              }`}
                            >
                              {step.name}
                            </h3>
                            {isCompleted && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                                Completado
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{step.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{step.date}</span>
                            </span>
                            {step.time && (
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{step.time}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Productos del pedido */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Productos del Pedido
              </h2>
              <div className="space-y-4">
                {order?.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.specs}</p>
                      <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t-2 border-gray-300">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total del Pedido:</span>
                  <span className="text-blue-600">${order?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral - Información */}
          <div className="lg:col-span-1 space-y-6">
            {/* Información del cliente */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Información del Cliente
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Nombre completo</p>
                  <p className="font-semibold text-gray-900">{order?.customerInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Documento</p>
                  <p className="font-semibold text-gray-900">{order?.customerInfo.document}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{order?.customerInfo.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Teléfono</p>
                  <p className="font-semibold text-gray-900">{order?.customerInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Dirección de Envío
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-semibold">{order?.shippingAddress.street}</p>
                <p>{order?.shippingAddress.city}, {order?.shippingAddress.state}</p>
                <p>{order?.shippingAddress.zipCode}</p>
                <p>{order?.shippingAddress.country}</p>
                {order?.shippingAddress.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-gray-500">Notas de entrega:</p>
                    <p className="text-gray-700">{order?.shippingAddress.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Información de pago */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Método de Pago
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Método:</span>
                  <span className="font-semibold text-gray-900">{order?.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estado:</span>
                  <span className="text-green-600 font-semibold">Confirmado</span>
                </div>
              </div>
            </div>

            {/* Soporte */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                ¿Necesitas ayuda?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Nuestro equipo está disponible 24/7 para asistirte
              </p>
              <div className="space-y-2 text-sm">
                <a href="tel:+573001234567" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Phone className="w-4 h-4 mr-2" />
                  +57 300 123 4567
                </a>
                <a href="mailto:soporte@techstore.com" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Mail className="w-4 h-4 mr-2" />
                  soporte@techstore.com
                </a>
              </div>
            </div>

            {/* Botón de nuevo pedido */}
            <button
              onClick={onNewOrder}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Realizar Nuevo Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}