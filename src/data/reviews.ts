import { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Carlos Andrés Mendoza',
    city: 'Bucaramanga, Santander',
    rating: 5,
    date: 'Hace 2 días',
    comment: 'Excelente servicio. Pedí los audífonos inalámbricos y me llegaron al día siguiente acá mismo en Bucaramanga. Pagué contra entrega en efectivo. Calidad 10/10.',
    productTitle: 'Audífonos Inalámbricos Bluetooth Pro',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Valentina Restrepo',
    city: 'Medellín, Antioquia',
    rating: 5,
    date: 'Hace 5 días',
    comment: 'Las zapatillas urbanas superaron mis expectativas. Son comodísimas para trabajar todo el día de pie y el color es idéntico a las fotos. Muy confiables.',
    productTitle: 'Zapatillas Urbanas Casuales Unisex',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Felipe Jaramillo',
    city: 'Bogotá D.C.',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'El smartwatch funciona perfecto con las notificaciones de WhatsApp y llamadas en Bogotá. La batería me duró 6 días completos. Excelente relación calidad/precio.',
    productTitle: 'Smartwatch Deportivo con GPS Integrado',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Mariana Caicedo',
    city: 'Cali, Valle del Cauca',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'Compré la crema hidratante y el set de brochas. Llegó súper bien empacado con guía de Coordinadora y antes de la fecha estimada. Volveré a comprar seguro.',
    productTitle: 'Crema Hidratante Facial Día y Noche',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Jorge Eliécer Díaz',
    city: 'Barranquilla, Atlántico',
    rating: 5,
    date: 'Hace 2 semanas',
    comment: 'Tenía dudas de comprar por internet pero el pago contra entrega da muchísima tranquilidad. El repartidor fue muy amable y el producto llegó en caja sellada.',
    productTitle: 'Freidora de Aire Digital 4.5 Litros',
    verified: true,
  }
];
