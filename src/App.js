import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import MainMenu from './components/MainMenu';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Estado del carrito

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
    setCartItems([]); // Limpiar carrito al cerrar sesión
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

  // Función para agregar al carrito
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si ya existe, actualizar la cantidad
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, agregarlo
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

  // Función de checkout
  const handleCheckout = () => {
    alert(`¡Compra realizada con éxito!\nTotal de productos: ${cartItems.length}\nTotal: $${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
    setCartItems([]);
    setCurrentView('menu');
  };

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
        cartItemsCount={cartItems.length}
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
        onCheckout={handleCheckout}
      />
    );
  }

  return null;
}

export default App;