import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import MainMenu from './components/MainMenu';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import OrderRequestForm from './components/OrderRequestForm';
import OrderTracking from './components/OrderTracking';
import OrderHistory from './components/OrderHistory';
import ProductsPage from './components/ProductsPage';
import ContactPage from './components/ContactPage';

function App() {
  const [currentView, setCurrentView] = useState('menu');
  const [currentUser, setCurrentUser] = useState('Invitado');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  // Array de laptops
  const laptops = [
    {
      id: 1,
      name: 'Dell XPS 15',
      brand: 'Dell',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
      images: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'
      ],
      category: 'premium',
      rating: 4.8,
      reviews: 124,
      stock: 15,
      specs: 'Intel i7, 16GB RAM, 512GB SSD',
      description: 'La Dell XPS 15 es una laptop premium diseñada para profesionales que buscan potencia y portabilidad.',
      specifications: {
        'Procesador': 'Intel Core i7-13700H',
        'RAM': '16GB DDR5',
        'Almacenamiento': '512GB NVMe SSD',
        'Pantalla': '15.6" FHD+',
        'Tarjeta Gráfica': 'NVIDIA GeForce RTX 3050',
        'Sistema Operativo': 'Windows 11 Pro'
      },
      features: [
        'Diseño premium en aluminio',
        'Teclado retroiluminado',
        'Lector de huellas dactilares',
        'Webcam HD con obturador'
      ]
    },
    {
      id: 2,
      name: 'MacBook Pro 14"',
      brand: 'Apple',
      price: 1999.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
        'https://images.unsplash.com/photo-1625247959778-4e99d8c02f04?w=800'
      ],
      category: 'premium',
      rating: 4.9,
      reviews: 98,
      stock: 8,
      specs: 'M3 Pro, 18GB RAM, 512GB SSD',
      description: 'MacBook Pro con chip M3 Pro ofrece un rendimiento revolucionario para creativos y profesionales.',
      specifications: {
        'Procesador': 'Apple M3 Pro',
        'RAM': '18GB Unified Memory',
        'Almacenamiento': '512GB SSD',
        'Pantalla': '14.2" Liquid Retina XDR',
        'Tarjeta Gráfica': 'GPU 14 núcleos',
        'Sistema Operativo': 'macOS Sonoma'
      },
      features: [
        'Pantalla Liquid Retina XDR',
        'Batería de hasta 18 horas',
        'Magic Keyboard',
        'Touch ID'
      ]
    },
    {
      id: 3,
      name: 'Lenovo ThinkPad X1',
      brand: 'Lenovo',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
      images: [
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
      ],
      category: 'business',
      rating: 4.6,
      reviews: 156,
      stock: 20,
      specs: 'Intel i5, 8GB RAM, 256GB SSD',
      description: 'ThinkPad diseñada para negocios con durabilidad militar y seguridad empresarial.',
      specifications: {
        'Procesador': 'Intel Core i5-1235U',
        'RAM': '8GB DDR4',
        'Almacenamiento': '256GB SSD',
        'Pantalla': '14" FHD',
        'Tarjeta Gráfica': 'Intel Iris Xe',
        'Sistema Operativo': 'Windows 11 Pro'
      },
      features: [
        'Certificación militar MIL-STD-810H',
        'TrackPoint rojo icónico',
        'Teclado resistente a derrames',
        'Lector de huellas'
      ]
    },
    {
      id: 4,
      name: 'ASUS ROG Strix G15',
      brand: 'ASUS',
      price: 1599.99,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800'
      ],
      category: 'gaming',
      rating: 4.7,
      reviews: 89,
      stock: 12,
      specs: 'AMD Ryzen 7, 16GB RAM, RTX 3060',
      description: 'Laptop gaming con el poder para dominar cualquier juego AAA con gráficos en alta calidad.',
      specifications: {
        'Procesador': 'AMD Ryzen 7 6800H',
        'RAM': '16GB DDR5',
        'Almacenamiento': '1TB NVMe SSD',
        'Pantalla': '15.6" FHD 144Hz',
        'Tarjeta Gráfica': 'NVIDIA RTX 3060 6GB',
        'Sistema Operativo': 'Windows 11 Home'
      },
      features: [
        'Pantalla 144Hz para gaming',
        'RGB Aura Sync',
        'Sistema de refrigeración avanzado',
        'Audio ROG'
      ]
    },
    {
      id: 5,
      name: 'HP Pavilion 15',
      brand: 'HP',
      price: 649.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'
      ],
      category: 'home',
      rating: 4.3,
      reviews: 203,
      stock: 25,
      specs: 'Intel i3, 8GB RAM, 256GB SSD',
      description: 'Laptop ideal para uso diario, estudios y entretenimiento con excelente relación calidad-precio.',
      specifications: {
        'Procesador': 'Intel Core i3-1215U',
        'RAM': '8GB DDR4',
        'Almacenamiento': '256GB SSD',
        'Pantalla': '15.6" HD',
        'Tarjeta Gráfica': 'Intel UHD Graphics',
        'Sistema Operativo': 'Windows 11 Home'
      },
      features: [
        'Diseño delgado y ligero',
        'Batería de larga duración',
        'Webcam HP TrueVision',
        'Audio B&O'
      ]
    },
    {
      id: 6,
      name: 'Acer Aspire 5',
      brand: 'Acer',
      price: 549.99,
      image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400',
      images: [
        'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'
      ],
      category: 'home',
      rating: 4.2,
      reviews: 178,
      stock: 30,
      specs: 'Intel i5, 8GB RAM, 512GB SSD',
      description: 'Laptop económica con buen rendimiento para tareas cotidianas y productividad básica.',
      specifications: {
        'Procesador': 'Intel Core i5-1135G7',
        'RAM': '8GB DDR4',
        'Almacenamiento': '512GB SSD',
        'Pantalla': '15.6" FHD',
        'Tarjeta Gráfica': 'Intel Iris Xe',
        'Sistema Operativo': 'Windows 11 Home'
      },
      features: [
        'Pantalla Full HD',
        'Teclado numérico',
        'Puerto USB Type-C',
        'Batería de 8 horas'
      ]
    }
  ];

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
    setCurrentUser('Invitado');
    setCartItems([]);
    setCurrentOrder(null);
    setCurrentView('menu');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('productDetail');
  };

  const handleBackToMenu = () => {
    setSelectedProduct(null);
    setCurrentView('menu');
  };

  const handleGoToLogin = () => {
    setCurrentView('login');
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

  const handleGoToProducts = () => {
    setCurrentView('products');
  };

  const handleGoToContact = () => {
    setCurrentView('contact');
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
    const orderWithStatus = {
      ...order,
      status: 'processing',
      userName: currentUser
    };
    
    setCurrentOrder(orderWithStatus);
    setOrderHistory(prev => [orderWithStatus, ...prev]);
    setCartItems([]);
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
        onGoToProducts={handleGoToProducts}
        onGoToContact={handleGoToContact}
        onGoToLogin={handleGoToLogin}
        cartItemsCount={cartItems.length}
        orderHistoryCount={orderHistory.length}
        laptops={laptops}
      />
    );
  }

  if (currentView === 'productDetail') {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={handleBackToMenu}
        onAddToCart={handleAddToCart}
        onGoToCart={handleGoToCart}
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

  if (currentView === 'products') {
    return (
      <ProductsPage
        onBack={handleBackToMenu}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
        onGoToCart={handleGoToCart}
        laptops={laptops}
        cartItemsCount={cartItems.length}
      />
    );
  }

  if (currentView === 'contact') {
    return (
      <ContactPage
        onBack={handleBackToMenu}
      />
    );
  }

  return null;
}

export default App;