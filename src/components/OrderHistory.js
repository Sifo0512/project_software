import React, { useState } from 'react';
import { ArrowLeft, Package, Eye, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

export default function OrderHistory({ orders, onBack, onViewOrder }) {
  const [filterStatus, setFilterStatus] = useState('all');

  // Filtrar pedidos por estado
  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusInfo = (status) => {
    switch(status) {
      case 'processing':
        return {
          text: 'Procesando',
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          iconColor: 'text-yellow-600'
        };
      case 'shipped':
        return {
          text: 'En Camino',
          color: 'bg-blue-100 text-blue-800',
          icon: Truck,
          iconColor: 'text-blue-600'
        };
      case 'delivered':
        return {
          text: 'Entregado',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'cancelled':
        return {
          text: 'Cancelado',
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      default:
        return {
          text: 'Pendiente',
          color: 'bg-gray-100 text-gray-800',
          icon: Package,
          iconColor: 'text-gray-600'
        };
    }
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
            <span className="font-medium">Volver al menú</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Historial de Pedidos
          </h1>
          <p className="text-gray-600">
            Aquí puedes ver todos tus pedidos y su estado actual
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Filtrar por estado</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'processing'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Procesando ({orders.filter(o => o.status === 'processing').length})
            </button>
            <button
              onClick={() => setFilterStatus('shipped')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'shipped'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En Camino ({orders.filter(o => o.status === 'shipped').length})
            </button>
            <button
              onClick={() => setFilterStatus('delivered')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'delivered'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Entregados ({orders.filter(o => o.status === 'delivered').length})
            </button>
          </div>
        </div>

        {/* Lista de pedidos */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No hay pedidos
            </h2>
            <p className="text-gray-600">
              {filterStatus === 'all' 
                ? 'Aún no has realizado ningún pedido'
                : `No tienes pedidos con el estado "${getStatusInfo(filterStatus).text}"`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={order.orderNumber}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Header del pedido */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            Pedido #{order.orderNumber}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Realizado el {order.orderDate} a las {order.orderTime}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-2xl font-bold text-blue-600">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Productos del pedido */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Productos ({order.items.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                Cant: {item.quantity}
                              </p>
                              <p className="text-sm font-bold text-blue-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">
                              +{order.items.length - 3} productos más
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Estado y dirección */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            Estado del pedido
                          </p>
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-5 h-5 ${statusInfo.iconColor}`} />
                            <span className="font-semibold text-gray-800">
                              {statusInfo.text}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            Dirección de entrega
                          </p>
                          <p className="text-sm text-gray-700">
                            {order.shippingAddress.street}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => onViewOrder(order)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                        <span>Ver Detalles</span>
                      </button>
                      
                      {order.status === 'delivered' && (
                        <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                          Volver a Comprar
                        </button>
                      )}
                      
                      {(order.status === 'processing' || order.status === 'shipped') && (
                        <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                          Rastrear Pedido
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Estadísticas */}
        {orders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Package className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-sm text-gray-600">Total de Pedidos</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'processing').length}
              </p>
              <p className="text-sm text-gray-600">En Proceso</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'shipped').length}
              </p>
              <p className="text-sm text-gray-600">En Camino</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
              <p className="text-sm text-gray-600">Entregados</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}