import { Zone, BankPoint } from '../types/catalog';

export const BANK_POINTS: BankPoint[] = [
  {
    id: 'banco-1',
    name: 'Banco #1 - Informática',
    location: '💻 Sala de Informática',
    description: 'Punto principal de compra y recarga de fichos institucionales.',
  },
  {
    id: 'banco-2',
    name: 'Banco #2 - Secretaría',
    location: '📞 Secretaría Institucional',
    description: 'Punto auxiliar de atención para compra de fichos.',
  },
];

export const ZONES_DATA: Zone[] = [
  {
    id: 'oriente',
    name: 'Subregión Oriente',
    description: 'Municipios del Oriente Antioqueño: Rionegro y El Retiro',
    colorBadge: 'bg-amber-100 text-amber-800 border-amber-300',
    municipios: [
      {
        id: 'rionegro',
        name: 'Rionegro',
        zoneId: 'oriente',
        zoneName: 'Oriente',
        responsibleGrades: '5° y 9°',
        location: 'Hall de Bachillerato',
        categories: [
          {
            id: 'rio-postres',
            name: 'Postres Artesanales',
            description: 'Deliciosos postres caseros preparados por la comunidad',
            products: [
              { id: 'p-limon', name: 'Postre de Limón', price: 7000, description: 'Cremoso postre de limón con galleta', popular: true },
              { id: 'p-maracuya', name: 'Postre de Maracuyá', price: 7000, description: 'Refrescante sabor a maracuyá natural' },
              { id: 'p-lecheasada', name: 'Leche Asada', price: 7000, description: 'Receta tradicional antioqueña' },
              { id: 'p-arrozleche', name: 'Arroz con Leche', price: 7000, description: 'Con canela y leche condensada' },
              { id: 'p-klim', name: 'Postre Leche Klim', price: 7000, description: 'Especialidad cremosa para amantes del dulce' },
            ],
          },
          {
            id: 'rio-frias',
            name: 'Bebidas Frías',
            description: 'Refrescos e hidratación para la jornada',
            products: [
              { id: 'bf-agua', name: 'Agua Embotellada 350ml', price: 2000, description: 'Agua purificada' },
              { id: 'bf-avena', name: 'Avena Casera Fría', price: 2500, description: 'Bebida nutricia y cremosa' },
              { id: 'bf-granizado', name: 'Granizado Tamarindo & Bon Bon Bum', price: 12000, description: 'Combinación especial granizada', popular: true },
            ],
          },
          {
            id: 'rio-calientes',
            name: 'Bebidas Calientes',
            description: 'Bebidas tradicionales reconfortantes',
            products: [
              { id: 'bc-tinto', name: 'Tinto Cafetero', price: 2000, description: 'Café 100% antioqueño recién colado' },
              { id: 'bc-aromatica', name: 'Aromática de Frutas', price: 2000, description: 'Infusión natural con frutas' },
              { id: 'bc-cafe-klim', name: 'Café + Instacrem', price: 2500, description: 'Café suave con cremosidad extra' },
            ],
          },
          {
            id: 'rio-panaderia',
            name: 'Productos de Panadería & Mecatos',
            description: 'Aperitivos salados y horneados',
            products: [
              { id: 'pan-crispetas', name: 'Crispetas', price: 3000 },
              { id: 'pan-aritos', name: 'Aritos de Limón', price: 3000 },
              { id: 'pan-churros', name: 'Churros de Arequipe', price: 2500, popular: true },
              { id: 'pan-bunuelos', name: 'Buñuelos Tradicionales', price: 2000 },
              { id: 'pan-palito', name: 'Palito Hojaldrado de Queso', price: 3500 },
              { id: 'pan-hawai', name: 'Pastel Hawaiano', price: 4500 },
              { id: 'pan-jamon', name: 'Pastel de Jamón y Queso', price: 4500 },
              { id: 'pan-arequipe', name: 'Pastel de Arequipe', price: 3500 },
              { id: 'pan-guayaba', name: 'Pastel de Guayaba', price: 3500 },
              { id: 'pan-pollo', name: 'Pastel de Pollo Frito', price: 3500 },
            ],
          },
          {
            id: 'rio-dulces',
            name: 'Confitería y Dulces',
            description: 'Variedad de golosinas y dulces populares',
            products: [
              { id: 'd-oka', name: 'Oka Loka', price: 4000 },
              { id: 'd-barrilete-nanos', name: 'Barrilete con Nanos', price: 600 },
              { id: 'd-fini', name: 'Fini Roller', price: 2500 },
              { id: 'd-bombon-barrilete', name: 'Bombón Barrilete', price: 800 },
              { id: 'd-bonbonbum', name: 'Bon Bon Bum Fresa / Surtido', price: 800 },
              { id: 'd-quipitos', name: 'Quipitos', price: 1000 },
              { id: 'd-trululu-fresas', name: 'Trululu Fresasitas', price: 3500 },
              { id: 'd-trululu-oro', name: 'Trululu Oro', price: 3500 },
              { id: 'd-trululu-nanos', name: 'Trululu con Nanos', price: 3500 },
              { id: 'd-candyring', name: 'Candy Ring', price: 3000 },
              { id: 'd-maramango', name: 'Mara Mango', price: 1000 },
              { id: 'd-barrilete-revolcon', name: 'Barrilete Revolcón', price: 600 },
              { id: 'd-chocodisk', name: 'Choco Disk', price: 2000 },
              { id: 'd-trolli', name: 'Trolli Gusanos', price: 3500 },
              { id: 'd-nikolo', name: 'Chocolatina Nikolo', price: 2500 },
              { id: 'd-candyranch', name: 'Candyranch Mango Biggie', price: 2000 },
              { id: 'd-marasandia', name: 'Mara Sandía', price: 1000 },
              { id: 'd-trululu-morisco', name: 'Trululu Moriscos', price: 3500 },
              { id: 'd-toystory', name: 'Gomitas Toy Story', price: 3500 },
              { id: 'd-chocomuu', name: 'Chocolatina Muu', price: 1500 },
              { id: 'd-revolucion', name: 'Revolución Chique', price: 500 },
            ],
          },
        ],
      },
      {
        id: 'el-retiro',
        name: 'El Retiro',
        zoneId: 'oriente',
        zoneName: 'Oriente',
        responsibleGrades: '2° y 7°A',
        location: 'Pasillo de Empleados',
        categories: [
          {
            id: 'retiro-comidas',
            name: 'Comidas Típicas del Retiro',
            description: 'Platos crujientes y refrescos tradicionales',
            products: [
              { id: 'ret-patacon', name: 'Patacón con Hogao o Queso', price: 16000, description: 'Patacón de plátano verde grande con ahogado casero', popular: true },
              { id: 'ret-arepa', name: 'Arepa de Choclo / Queso', price: 16000, description: 'Arepa de maíz petacón rellena de abundante queso' },
              { id: 'ret-colapola', name: 'Refresco Cola & Pola', price: 5000, description: 'Bebida refrescante tipo refajo' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'occidente',
    name: 'Subregión Occidente',
    description: 'Capital histórica y gastronómica: Santa Fe de Antioquia',
    colorBadge: 'bg-red-100 text-red-800 border-red-300',
    municipios: [
      {
        id: 'santa-fe',
        name: 'Santa Fe de Antioquia',
        zoneId: 'occidente',
        zoneName: 'Occidente',
        responsibleGrades: '1° - 11° y 10° - Pre°',
        location: 'Tienda Escolar & Hall de Bachillerato',
        categories: [
          {
            id: 'santafe-platos',
            name: 'Platos Típicos & Cazuelas',
            description: 'Comida fuerte tradicional con sabor autóctono',
            products: [
              {
                id: 'sf-cazuela',
                name: 'Cazuela de Frijoles con Guandolo',
                price: 22000,
                description: 'Acompañado de chicharrón, plátano, carne molida y guandolo frío',
                popular: true,
              },
              {
                id: 'sf-fiambre',
                name: 'Fiambre Antioqueño Tradicional',
                price: 22000,
                description: 'En hoja de bijao. Incluye delicioso y refrescante jugo de tamarindo',
                popular: true,
              },
              {
                id: 'sf-tamal',
                name: 'Tamal Antioqueño Especial',
                price: 18000,
                description: 'Especial con tres carnes. Incluye delicioso jugo de tamarindo',
              },
              {
                id: 'sf-colapola',
                name: 'Refresco Cola & Pola',
                price: 5000,
                description: 'Bebida fría ideal para acompañar tus alimentos',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'uraba',
    name: 'Subregión Urabá',
    description: 'Aromas y sazón de la costa antioqueña',
    colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    municipios: [
      {
        id: 'uraba-mun',
        name: 'Urabá',
        zoneId: 'uraba',
        zoneName: 'Urabá',
        responsibleGrades: '3° y 7°B',
        location: 'Cuarto de Deportes',
        categories: [
          {
            id: 'uraba-fastfood',
            name: 'Comidas Rápidas & Granizados',
            description: 'Opciones tradicionales y vegetarianas llenas de sabor',
            products: [
              { id: 'u-perrovegano', name: 'Perro Caliente Vegano', price: 10000, description: 'Con salchicha vegetal y salsas especiales' },
              { id: 'u-perrotrad', name: 'Perro Caliente Tradicional', price: 14000, description: 'Salchicha de res/cerdo, ripio de papa y salsas' },
              { id: 'u-choriperro', name: 'Choriperro Especial', price: 16000, description: 'Chorizo santarrosano, queso fundido y ripio', popular: true },
              { id: 'u-hamburguesa', name: 'Hamburguesa (Vegana o Tradicional)', price: 18000, description: 'Carne artesanal o medallón vegetal con queso y vegetales' },
              { id: 'u-pincho', name: 'Pincho de Chorizo de Ternera + Arepa', price: 10000, description: 'Chorizo jugoso a la parrilla con arepa con mantequilla' },
              { id: 'u-salchimed', name: 'Salchipapa Mediana + Gaseosa', price: 14000, description: 'Papa a la francesa con salchicha y gaseosa fría' },
              { id: 'u-salchigrand', name: 'Salchipapa Grande + Gaseosa', price: 20000, description: 'Porción familiar con salsas y gaseosa' },
              { id: 'u-granizados', name: 'Granizados de Café y Coco', price: 12000, description: 'Refrescantes frappés caribeños', popular: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'norte',
    name: 'Subregión Norte',
    description: 'Tierras altas y tradiciones lecheras: San Pedro de los Milagros',
    colorBadge: 'bg-blue-100 text-blue-800 border-blue-300',
    municipios: [
      {
        id: 'san-pedro',
        name: 'San Pedro de los Milagros',
        zoneId: 'norte',
        zoneName: 'Norte',
        responsibleGrades: 'Comunidad Educativa',
        location: 'Kiosco de la Comunidad',
        categories: [
          {
            id: 'sp-sancocho',
            name: 'Sancochos & Platos de Olla',
            description: 'Gastronomía montañera de cocción lenta',
            products: [
              {
                id: 'sp-sancochotrif',
                name: 'Sancocho Trifásico en Leña',
                price: 25000,
                description: 'Carne de res, cerdo y pollo con plátano, yuca, papa, mazorca, arepa y aguacate',
                popular: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'suroeste',
    name: 'Subregión Suroeste',
    description: 'Tierra cafetera por excelencia: Jardín',
    colorBadge: 'bg-orange-100 text-orange-800 border-orange-300',
    municipios: [
      {
        id: 'jardin',
        name: 'Jardín',
        zoneId: 'suroeste',
        zoneName: 'Suroeste',
        responsibleGrades: '5°B y 8°',
        location: 'Plaza Principal Escolar',
        categories: [
          {
            id: 'jardin-cafe',
            name: 'Café & Dulces Típicos',
            description: 'Especialidades de la capital cafetera antioqueña',
            products: [
              { id: 'j-cafe', name: 'Café Especial de Origen Jardín', price: 3500, description: 'Café tostado artesanalmente de ladera', popular: true },
              { id: 'j-dulce-mora', name: 'Dulce de Mora Casero', price: 5000, description: 'Fruta fresca conservada en almíbar tradicional' },
              { id: 'j-galletas', name: 'Galletas de Mantequilla Artesanales', price: 3000, description: 'Ideales para acompañar el café' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'especiales',
    name: 'Atracciones e Independientes',
    description: 'Puntos de juegos, bebidas especiales y recreación',
    colorBadge: 'bg-purple-100 text-purple-800 border-purple-300',
    municipios: [
      {
        id: 'independientes',
        name: 'Independientes y Recreación',
        zoneId: 'especiales',
        zoneName: 'Especiales',
        responsibleGrades: 'Toda la Comunidad',
        location: 'Zonas Recreativas y Patios',
        categories: [
          {
            id: 'indep-actividades',
            name: 'Atracciones & Bebidas Especiales',
            description: 'Diversión para niños y jóvenes durante el evento',
            products: [
              { id: 'ind-soda', name: 'Soda Saborizada de Frutas', price: 10000, description: 'Con perlas explosivas y almíbar de frutas', popular: true },
              { id: 'ind-inflables', name: 'Tique Inflables Recreativos', price: 6000, description: 'Turno de diversión en castillos inflables' },
              { id: 'ind-pintacaritas', name: 'Pintacaritas Artístico', price: 6000, description: 'Diseño temático al gusto del estudiante' },
              { id: 'ind-pintura', name: 'Estación de Pintura Creativa', price: 6000, description: 'Incluye lienzo, pinceles y lienzos de arcilla' },
            ],
          },
        ],
      },
    ],
  },
];
