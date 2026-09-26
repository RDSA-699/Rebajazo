import { Product } from '../types';

import audifonosImg from '../assets/images/product_audifonos_pro_1790447505604.jpg';
import smartwatchImg from '../assets/images/product_smartwatch_gps_1790447494737.jpg';
import zapatillasImg from '../assets/images/product_zapatillas_urbanas_1790447484106.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Audífonos Inalámbricos Bluetooth Pro',
    category: 'tecnologia',
    categoryLabel: 'Tecnología & Audio',
    price: 59900,
    oldPrice: 85000,
    badge: '-30%',
    image: audifonosImg,
    rating: 4.8,
    reviewCount: 142,
    shortDesc: 'Sonido estéreo envolvente con cancelación de ruido pasiva y batería de 14 horas continuas.',
    fullDesc: 'Disfruta de tu música y llamadas con la máxima nitidez. Los Audífonos Bluetooth Pro cuentan con almohadillas ergonómicas acolchadas que aíslan el ruido exterior, conectividad Bluetooth 5.3 de baja latencia y micrófono HD incorporado para conferencias y videollamadas.',
    stock: 18,
    features: [
      'Bluetooth 5.3 con alcance de 12 metros',
      'Batería recargable de 14 horas de reproducción continua',
      'Micrófono de alta definición para manos libres',
      'Diseño plegable portátil fácil de transportar',
      'Compatible con Android, iPhone, Windows y Mac'
    ],
    specs: {
      'Conectividad': 'Bluetooth 5.3 + Aux 3.5mm',
      'Autonomía': 'Hasta 14 horas de uso',
      'Tiempo de carga': '1.5 horas (Tipo C)',
      'Impedancia': '32 Ohm',
      'Garantía': '3 meses directa'
    },
    colors: ['Negro/Rojo', 'Negro Mate', 'Blanco Perla']
  },
  {
    id: 2,
    title: 'Smartwatch Deportivo con GPS Integrado',
    category: 'tecnologia',
    categoryLabel: 'Tecnología & Wearables',
    price: 129900,
    oldPrice: 150000,
    badge: 'Nuevo',
    image: smartwatchImg,
    rating: 4.9,
    reviewCount: 98,
    shortDesc: 'Monitoreo de frecuencia cardíaca, más de 20 modos deportivos y pantalla AMOLED de alta definición.',
    fullDesc: 'El compañero perfecto para tus entrenamientos y vida diaria. Resistente a salpicaduras (IP68), monitor de sueño profundo, contador de pasos, calorías, notificaciones de WhatsApp y llamadas entrantes directamente en tu muñeca.',
    stock: 12,
    features: [
      'Pantalla táctil HD a todo color de 1.75 pulgadas',
      'Sensor óptico 24/7 de ritmo cardíaco y oxígeno SpO2',
      'Notificaciones en tiempo real de WhatsApp, llamadas y SMS',
      'Batería de larga duración (hasta 7 días de uso típico)',
      'Resistencia al agua IP68'
    ],
    specs: {
      'Pantalla': '1.75" IPS Touch Full Color',
      'Compatibilidad': 'iOS 10.0+ / Android 6.0+',
      'Batería': '280 mAh (5 a 7 días)',
      'Conexión': 'Bluetooth 5.2 BLE',
      'Garantía': '6 meses directa'
    },
    colors: ['Negro Carbón', 'Gris Grafito', 'Verde Militar']
  },
  {
    id: 3,
    title: 'Set Organizadores para Closet x 6 Pzs',
    category: 'hogar',
    categoryLabel: 'Hogar & Organización',
    price: 38500,
    oldPrice: 45000,
    badge: '-15%',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80',
    rating: 4.7,
    reviewCount: 64,
    shortDesc: 'Maximiza el espacio en tus cajones y armarios. Tela Oxford transpirable y lavable.',
    fullDesc: 'Mantén tu ropa interior, medias, accesorios y camisetas perfectamente clasificados y visibles. Fabricados en tela no tejida de alta resistencia con costuras reforzadas y divisiones internas flexibles.',
    stock: 25,
    features: [
      'Pack de 6 organizadores modulares multiuso',
      'Plegables para guardar cuando no se usen',
      'Tela ecológica impermeable y libre de olores',
      'Cremallera inferior para armado en segundos'
    ],
    specs: {
      'Piezas': '6 organizadores surtidos',
      'Material': 'Tela Oxford + Malla transpirable',
      'Dimensiones': '32x32x10cm, 32x16x10cm',
      'Color': 'Gris neutro con ribete blanco'
    },
    colors: ['Gris Oxford', 'Beige Lino']
  },
  {
    id: 4,
    title: 'Juego de Sábanas Algodón 4 Piezas',
    category: 'hogar',
    categoryLabel: 'Hogar & Dormitorio',
    price: 52900,
    oldPrice: 60000,
    badge: '-10%',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80',
    rating: 4.8,
    reviewCount: 110,
    shortDesc: 'Frescura, suavidad y resistencia. 300 hilos tacto pluma apto para cama doble y semidoble.',
    fullDesc: 'Duerme plácidamente con sábanas confeccionadas con microfibra de algodón cepillado. No hacen motas, no pierden color con el lavado y cuentan con resorte completo para ajuste perfecto al colchón sin soltarse.',
    stock: 30,
    features: [
      'Incluye 1 sábana plana, 1 sábana ajustable y 2 fundas',
      'Ajuste para colchones de hasta 30 cm de alto',
      'Tejido térmico y transpirable para clima frío y cálido',
      'Hipoalergénico y fácil de planchar'
    ],
    specs: {
      'Composición': 'Algodón microcepillado 300 hilos',
      'Piezas': '4 unidades',
      'Tamaño': 'Doble (140x190cm) / Semidoble (120x190cm)',
      'Lavado': 'Apto para lavadora a temperatura normal'
    },
    sizes: ['Semidoble (1.20m)', 'Doble (1.40m)', 'Queen (1.60m)'],
    colors: ['Azul Petróleo', 'Rosa Pastel', 'Terracota Cálido', 'Gris Perla']
  },
  {
    id: 5,
    title: 'Chaqueta Impermeable Unisex Ligera',
    category: 'moda',
    categoryLabel: 'Moda & Prendas de Vestir',
    price: 79900,
    oldPrice: 95000,
    badge: 'Nuevo',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80',
    rating: 4.6,
    reviewCount: 88,
    shortDesc: 'Protección contra lluvia y viento. Forro térmico acolchado ultra ligero con capucha desmontable.',
    fullDesc: 'La prenda ideal para el clima variable de Colombia. Tejido técnico repelente al agua con sellado de costuras, bolsillos exteriores con cremallera segura y ajuste elástico en puños y cintura.',
    stock: 15,
    features: [
      '100% repelente al agua y cortavientos',
      'Peso liviano (menos de 350 gramos)',
      '2 bolsillos laterales con cremallera y 1 bolsillo interior',
      'Capucha ajustable para días lluviosos'
    ],
    specs: {
      'Material': 'Poliéster ripstop impermeable',
      'Forro': 'Microfibra transpirable',
      'Cierre': 'Cremallera frontal reforzada',
      'Cuidado': 'Lavado a mano o ciclo delicado'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro Mate', 'Azul Marino', 'Verde Militar']
  },
  {
    id: 6,
    title: 'Zapatillas Urbanas Casuales Unisex',
    category: 'moda',
    categoryLabel: 'Moda & Calzado',
    price: 95900,
    oldPrice: 120000,
    badge: '-20%',
    image: zapatillasImg,
    rating: 4.9,
    reviewCount: 175,
    shortDesc: 'Comodidad para todo el día. Suela amortiguada ergonómica con diseño moderno y minimalista.',
    fullDesc: 'Diseñadas para caminar distancias largas por la ciudad con total descanso. Plantilla viscoelástica de memoria, parte superior en cuero sintético de fácil limpieza y suela de caucho antideslizante con agarre superior.',
    stock: 22,
    features: [
      'Plantilla ergonómica Memory Foam ultra cómoda',
      'Suela de goma vulcanizada resistente al desgaste',
      'Acabado estilizado fácil de combinar con jeans o jogger',
      'Costuras reforzadas para alta durabilidad'
    ],
    specs: {
      'Capellada': 'Cuero sintético premium y textil transpirable',
      'Suela': 'Goma antideslizante flexible',
      'Tipo de ajuste': 'Cordones planos de algodón',
      'Origen': 'Fabricación colombiana'
    },
    sizes: ['37', '38', '39', '40', '41', '42'],
    colors: ['Blanco/Rojo', 'Total White', 'Negro/Gris']
  },
  {
    id: 7,
    title: 'Set de Brochas Profesionales de Maquillaje',
    category: 'belleza',
    categoryLabel: 'Belleza & Cuidado Personal',
    price: 24900,
    oldPrice: 31000,
    badge: '-20%',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    rating: 4.9,
    reviewCount: 210,
    shortDesc: '12 brochas esenciales con estuche de viaje. Cerdas sintéticas ultra suaves hipoalergénicas.',
    fullDesc: 'Logra acabados profesionales en tus looks diarios. Incluye brochas para base, polvos, contorno, iluminador y ojos con difuminadores precisos. Las cerdas no se desprenden y no absorben producto en exceso.',
    stock: 40,
    features: [
      '12 piezas especializadas para rostro y ojos',
      'Mango ergonómico de madera con virola de aluminio',
      'Cerdas sintéticas cruelty-free no irritantes',
      'Incluye estuche organizador para llevar a cualquier parte'
    ],
    specs: {
      'Cerdas': 'Fibra sintética densa y sedosa',
      'Mango': 'Madera esmaltada de alta durabilidad',
      'Incluye': '12 brochas + Estuche cilíndrico',
      'Limpieza': 'Fácil lavado con jabón suave'
    },
    colors: ['Oro Rosa', 'Negro Clásico', 'Menta Suave']
  },
  {
    id: 8,
    title: 'Crema Hidratante Facial Día y Noche',
    category: 'belleza',
    categoryLabel: 'Belleza & Skincare',
    price: 29900,
    oldPrice: 38000,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
    rating: 4.8,
    reviewCount: 164,
    shortDesc: 'Fórmula ligera enriquecida con Ácido Hialurónico y Vitamina E. Rápida absorción sin brillo.',
    fullDesc: 'Hidrata profundamente la piel sin sensación grasosa. Apta para todo tipo de piel (seca, mixta o grasa). Ayuda a restaurar la barrera cutánea contra la polución y el cansancio diario, dejando el cutis luminoso y suave.',
    stock: 35,
    features: [
      'Con Ácido Hialurónico puro y extracto de Aloe Vera',
      'Textura en gel-crema de absorción inmediata',
      'No comedogénica (no obstruye los poros)',
      'Libre de parabenos, sulfatos y fragancias artificiales'
    ],
    specs: {
      'Contenido': '50 ml / 1.7 fl. oz.',
      'Tipo de piel': 'Todo tipo de piel (sensible incluida)',
      'Uso': 'Mañana y noche sobre piel limpia',
      'Registro': 'Notificación Sanitaria Invima'
    }
  },
  {
    id: 9,
    title: 'Mini Proyector LED Portátil Full HD',
    category: 'tecnologia',
    categoryLabel: 'Tecnología & Entretenimiento',
    price: 189900,
    oldPrice: 240000,
    badge: '-21%',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80',
    rating: 4.7,
    reviewCount: 76,
    shortDesc: 'Cine en casa donde quieras. Conecta tu celular, computador o consola por HDMI y WiFi.',
    fullDesc: 'Convierte cualquier pared en una pantalla de hasta 120 pulgadas. Equipado con altavoz estéreo integrado, puertos HDMI, USB y conector para auriculares, ideal para películas familiares o videojuegos.',
    stock: 8,
    features: [
      'Proyección nítida de hasta 120 pulgadas',
      'Altavoz estéreo integrado de alta fidelidad',
      'Conexión fácil a celular vía adaptador o HDMI',
      'Tamaño de bolsillo ultra portátil (pesa solo 480g)'
    ],
    specs: {
      'Resolución': 'Soporta 1080p Full HD',
      'Brillo': '3200 Lúmenes LED',
      'Puertos': 'HDMI, USB, AV, Salida 3.5mm',
      'Vida útil': '30.000 horas de lámpara'
    },
    colors: ['Blanco/Amarillo', 'Negro Mate']
  },
  {
    id: 10,
    title: 'Freidora de Aire Digital 4.5 Litros',
    category: 'hogar',
    categoryLabel: 'Hogar & Electrodomésticos',
    price: 169900,
    oldPrice: 220000,
    badge: '-23%',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80',
    rating: 4.9,
    reviewCount: 189,
    shortDesc: 'Cocina saludable con 85% menos grasa. 8 programas preestablecidos y panel táctil.',
    fullDesc: 'Prepara papas crujientes, pollo asado, pasteles y vegetales en minutos sin ensuciar la cocina. Cesta con recubrimiento antiadherente libre de BPA y PFOA fácil de lavar a mano o en lavavajillas.',
    stock: 14,
    features: [
      'Tecnología de circulación de aire caliente a 360°',
      'Cesta antiadherente desmontable de 4.5L',
      'Control de temperatura digital de 80°C a 200°C',
      'Temporizador programable con apagado automático'
    ],
    specs: {
      'Capacidad': '4.5 Litros (para 3-5 porciones)',
      'Potencia': '1400W / 110V estándar Colombia',
      'Programas': '8 modos inteligentes de cocción',
      'Garantía': '12 meses con centro de servicio'
    },
    colors: ['Negro Brillante', 'Blanco Marfil']
  }
];

export const CATEGORIES = [
  { id: 'todos', name: 'Todos los Productos', icon: 'LayoutGrid' },
  { id: 'tecnologia', name: 'Tecnología', icon: 'Laptop' },
  { id: 'hogar', name: 'Hogar', icon: 'Home' },
  { id: 'moda', name: 'Moda', icon: 'Shirt' },
  { id: 'belleza', name: 'Belleza', icon: 'Sparkles' },
];
