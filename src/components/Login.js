import React, { useState } from 'react';

function Login({ onLoginSuccess, onGoToRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.username || !formData.password) {
      setError('Por favor, completa todos los campos');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.username === 'admin' && formData.password === '123456') {
        onLoginSuccess(formData.username);
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">Accede a tu cuenta</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>

        <div className="mt-6 text-center space-y-2">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            ¿Olvidaste tu contraseña?
          </a>
          <div className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button 
              onClick={onGoToRegister} 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;