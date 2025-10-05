import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import MainMenu from './components/MainMenu';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import OrderRequestForm from './components/OrderRequestForm';
import OrderTracking from './components/OrderTracking';
import OrderHistory from './components/OrderHistory';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]); // Historial de pedidos

  // Cargar historial del localStorage al iniciar
  useEffect(() => {
    const savedHistory = localStorage.getItem('orderHistory');
    if (savedHistory) {
      setOrderHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Guardar historial en localStorage cuando cambie
  useEffect(() => {
    if (orderHistory.length > 0) {
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }
  }, [orderHistory]);

  // Solo para pruebas - agregar pedidos de ejemplo
useEffect(() => {
  if (orderHistory.length === 0 && currentUser) {
    const exampleOrders = [
      {
        orderNumber: 'ORD-1704123456789',
        orderDate: '15/01/2025',
        orderTime: '10:30:00',
        status: 'delivered',
        total: 1999.99,
        items: [
          {
            id: 2,
            name: 'MacBook Pro 14"',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
            price: 1999.99,
            quantity: 1,
            specs: 'M3 Pro, 18GB RAM'
          }
        ],
        customerInfo: {
          fullName: 'Juan Ejemplo',
          document: '1234567890',
          email: 'juan@ejemplo.com',
          phone: '3001234567'
        },
        shippingAddress: {
          street: 'Calle 123 #45-67',
          city: 'Bogotá',
          state: 'Cundinamarca',
          zipCode: '110111',
          country: 'Colombia'
        },
        paymentMethod: 'Tarjeta de Crédito'
      }
    ];
    setOrderHistory(exampleOrders);
  }
}, [currentUser]);

  // Funciones de navegación
  const handleLoginSuccess = (username) => {
    setCurrentUser(username);
    setCurrentView('menu');
  };

  const handleRegisterSuccess = (username) => {
    setCurrentUser(username);
    setCurrentView('login');
  };

  const handleGoToRegister = () => {
    setCurrentView('register');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
    setCurrentOrder(null);
    setCurrentView('login');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('productDetail');
  };

  const handleBackToMenu = () => {
    setSelectedProduct(null);
    setCurrentView('menu');
  };

  const handleGoToCart = () => {
    setCurrentView('cart');
  };

  const handleGoToOrderHistory = () => {
    setCurrentView('orderHistory');
  };

  const handleGoToOrderForm = () => {
    setCurrentView('orderForm');
  };

  const handleBackToCart = () => {
    setCurrentView('cart');
  };

  // Función para agregar al carrito
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Función para actualizar cantidad en el carrito
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Función para eliminar del carrito
  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Función para submit del formulario de orden
  const handleSubmitOrder = (order) => {
    // Agregar estado al pedido (por defecto "processing")
    const orderWithStatus = {
      ...order,
      status: 'processing', // processing, shipped, delivered, cancelled
      userName: currentUser
    };
    
    setCurrentOrder(orderWithStatus);
    
    // Agregar al historial
    setOrderHistory(prev => [orderWithStatus, ...prev]);
    
    setCartItems([]); // Limpiar carrito
    setCurrentView('orderTracking');
  };

  // Función para nuevo pedido
  const handleNewOrder = () => {
    setCurrentOrder(null);
    setCurrentView('menu');
  };

  // Función para ver un pedido del historial
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setCurrentView('orderTracking');
  };

  // Calcular totales para el carrito
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  // Renderizar vistas
  if (currentView === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} />;
  }

  if (currentView === 'register') {
    return <Register onRegisterSuccess={handleRegisterSuccess} onBackToLogin={handleBackToLogin} />;
  }

  if (currentView === 'menu') {
    return (
      <MainMenu
        currentUser={currentUser}
        onLogout={handleLogout}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
        onGoToCart={handleGoToCart}
        onGoToOrderHistory={handleGoToOrderHistory}
        cartItemsCount={cartItems.length}
        orderHistoryCount={orderHistory.length}
      />
    );
  }

  if (currentView === 'productDetail') {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={handleBackToMenu}
        onAddToCart={handleAddToCart}
      />
    );
  }

  if (currentView === 'cart') {
    return (
      <ShoppingCart
        cartItems={cartItems}
        onBack={handleBackToMenu}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleGoToOrderForm}
      />
    );
  }

  if (currentView === 'orderForm') {
    return (
      <OrderRequestForm
        cartItems={cartItems}
        total={total}
        onBack={handleBackToCart}
        onSubmitOrder={handleSubmitOrder}
      />
    );
  }

  if (currentView === 'orderTracking') {
    return (
      <OrderTracking
        order={currentOrder}
        onBack={handleBackToMenu}
        onNewOrder={handleNewOrder}
      />
    );
  }

  if (currentView === 'orderHistory') {
    return (
      <OrderHistory
        orders={orderHistory}
        onBack={handleBackToMenu}
        onViewOrder={handleViewOrder}
      />
    );
  }

  return null;
}

export default App;