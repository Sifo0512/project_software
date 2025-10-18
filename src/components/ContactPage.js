import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, Users } from 'lucide-react';

export default function ContactPage({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setErrors({ general: 'Error al enviar el mensaje. Intenta de nuevo.' });
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      details: ['+57 (1) 3001234567', '+57 (1) 3009876543'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['soporte@techstore.com', 'ventas@techstore.com'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      details: ['Calle 123 #45-67, Bogotá', 'Cundinamarca, Colombia'],
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Clock,
      title: 'Horarios de Atención',
      details: ['Lunes a Viernes: 8:00 AM - 6:00 PM', 'Sábados: 9:00 AM - 1:00 PM'],
      color: 'bg-green-100 text-green-600'
    }
  ];

  const team = [
    {
      name: 'Ing. Naranjon',
      role: 'Gerente de Ventas',
      email: 'naranjitasistematica@techstore.com',
      phone: '3001234567',
      image: '👨‍💼'
    },
    {
      name: 'Sisifi Di Paggini',
      role: 'Soporte Técnico',
      email: 'finodijockeckland@techstore.com',
      phone: '3002345678',
      image: '👩‍💻'
    },
    {
      name: 'Cañon de guerra',
      role: 'Atención al Cliente',
      email: 'pailasmiperri@techstore.com',
      phone: '3003456789',
      image: '👨‍💼'
    }
  ];

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
            <span className="font-medium">Volver</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">¿Cómo podemos ayudarte?</h1>
          <p className="text-xl text-blue-100">
            Estamos aquí para responder tus preguntas y resolver tus problemas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Información de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contenedor principal con formulario y equipo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Formulario de contacto */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>

            {submitted && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                ✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
              </div>
            )}

            {errors.general && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Consulta
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">Consulta General</option>
                  <option value="support">Soporte Técnico</option>
                  <option value="sales">Información de Ventas</option>
                  <option value="complaint">Reclamo</option>
                  <option value="suggestion">Sugerencia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Asunto de tu consulta"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold text-gray-900">¿Cuál es el tiempo de envío?</p>
                  <p className="text-sm text-gray-600 mt-1">El envío toma de 3 a 5 días hábiles</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold text-gray-900">¿Tiene garantía?</p>
                  <p className="text-sm text-gray-600 mt-1">Todos nuestros productos tienen 2 años de garantía</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold text-gray-900">¿Aceptan devoluciones?</p>
                  <p className="text-sm text-gray-600 mt-1">Sí, aceptamos devoluciones dentro de 30 días</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold text-gray-900">¿Tienen atención 24/7?</p>
                  <p className="text-sm text-gray-600 mt-1">Sí, nuestro equipo está disponible en todo momento</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold mb-4">Chat en Vivo</h3>
              <p className="mb-4">¿Necesitas ayuda inmediata? Nuestro equipo de soporte está disponible ahora mismo.</p>
              <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Iniciar Chat
              </button>
            </div>
          </div>
        </div>

        {/* Equipo de soporte */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            Nuestro Equipo de Soporte
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-3">{member.image}</div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">{member.role}</p>
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-blue-600 flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {member.email}
                  </a>
                  <a href={`tel:+57${member.phone}`} className="text-gray-600 hover:text-blue-600 flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-1" />
                    +57 {member.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}