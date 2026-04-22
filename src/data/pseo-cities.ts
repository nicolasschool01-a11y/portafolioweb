// ============================================================
// BASE DE DATOS DE CIUDADES — pSEO NicoPrompt
// ============================================================
// Fase 1: Uruguay (19 departamentos/ciudades principales)
// Fase 2: Argentina (50+ ciudades)
// ============================================================

export interface City {
  slug: string;
  name: string;
  department?: string; // For Uruguay
  province?: string;   // For Argentina
  country: "UY" | "AR";
  countryName: string;
  flag: string;
  population: string;
  region: string;
  localContext: string; // Dato local para personalizar contenido
}

// ── URUGUAY (19 ciudades) ──
export const uruguayCities: City[] = [
  {
    slug: "montevideo",
    name: "Montevideo",
    department: "Montevideo",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "1.8M",
    region: "Sur",
    localContext: "capital del país con el mayor polo tecnológico del Cono Sur",
  },
  {
    slug: "salto",
    name: "Salto",
    department: "Salto",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "124K",
    region: "Norte",
    localContext: "segunda ciudad más grande con fuerte actividad comercial y termal",
  },
  {
    slug: "paysandu",
    name: "Paysandú",
    department: "Paysandú",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "76K",
    region: "Litoral",
    localContext: "polo industrial del litoral con comercio binacional activo",
  },
  {
    slug: "las-piedras",
    name: "Las Piedras",
    department: "Canelones",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "71K",
    region: "Metropolitana",
    localContext: "centro urbano del área metropolitana con pymes en crecimiento",
  },
  {
    slug: "rivera",
    name: "Rivera",
    department: "Rivera",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "64K",
    region: "Norte",
    localContext: "ciudad fronteriza con Brasil y fuerte comercio transfronterizo",
  },
  {
    slug: "maldonado",
    name: "Maldonado",
    department: "Maldonado",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "62K",
    region: "Este",
    localContext: "centro turístico internacional junto a Punta del Este",
  },
  {
    slug: "punta-del-este",
    name: "Punta del Este",
    department: "Maldonado",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "25K",
    region: "Este",
    localContext: "principal destino turístico de lujo con alta demanda de servicios digitales",
  },
  {
    slug: "tacuarembo",
    name: "Tacuarembó",
    department: "Tacuarembó",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "54K",
    region: "Centro-Norte",
    localContext: "centro ganadero y forestal con comercios locales en expansión",
  },
  {
    slug: "melo",
    name: "Melo",
    department: "Cerro Largo",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "51K",
    region: "Este",
    localContext: "centro arrocero y ganadero con actividad comercial fronteriza",
  },
  {
    slug: "mercedes",
    name: "Mercedes",
    department: "Soriano",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "42K",
    region: "Litoral",
    localContext: "zona agropecuaria con comercios y servicios en crecimiento",
  },
  {
    slug: "artigas",
    name: "Artigas",
    department: "Artigas",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "40K",
    region: "Norte",
    localContext: "ciudad fronteriza con potencial de comercio binacional",
  },
  {
    slug: "minas",
    name: "Minas",
    department: "Lavalleja",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "38K",
    region: "Centro-Este",
    localContext: "centro turístico serrano con industria y minería activa",
  },
  {
    slug: "san-jose-de-mayo",
    name: "San José de Mayo",
    department: "San José",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "36K",
    region: "Sur",
    localContext: "centro agroindustrial cercano a Montevideo con servicios en expansión",
  },
  {
    slug: "durazno",
    name: "Durazno",
    department: "Durazno",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "34K",
    region: "Centro",
    localContext: "ciudad centro del país con actividad ganadera y festival cultural",
  },
  {
    slug: "florida",
    name: "Florida",
    department: "Florida",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "33K",
    region: "Centro-Sur",
    localContext: "centro lechero e industrial con comercios locales activos",
  },
  {
    slug: "treinta-y-tres",
    name: "Treinta y Tres",
    department: "Treinta y Tres",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "33K",
    region: "Este",
    localContext: "zona arrocera y ganadera con comercios en crecimiento",
  },
  {
    slug: "rocha",
    name: "Rocha",
    department: "Rocha",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "25K",
    region: "Sur-Este",
    localContext: "centro turístico eco-costero con temporada alta marcada",
  },
  {
    slug: "colonia-del-sacramento",
    name: "Colonia del Sacramento",
    department: "Colonia",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "27K",
    region: "Sur-Oeste",
    localContext: "patrimonio UNESCO con turismo internacional y comercio portuario",
  },
  {
    slug: "fray-bentos",
    name: "Fray Bentos",
    department: "Río Negro",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "24K",
    region: "Litoral",
    localContext: "centro industrial y forestal con actividad comercial binacional",
  },
  {
    slug: "canelones",
    name: "Canelones",
    department: "Canelones",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "20K",
    region: "Metropolitana",
    localContext: "centro del departamento más poblado después de Montevideo",
  },
  {
    slug: "ciudad-de-la-costa",
    name: "Ciudad de la Costa",
    department: "Canelones",
    country: "UY",
    countryName: "Uruguay",
    flag: "🇺🇾",
    population: "120K",
    region: "Metropolitana",
    localContext: "zona residencial de mayor crecimiento con comercios en expansión",
  },
];

// ── ARGENTINA (50 ciudades principales) ──
export const argentinaCities: City[] = [
  { slug: "buenos-aires", name: "Buenos Aires", province: "CABA", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "3M", region: "AMBA", localContext: "capital del país y principal centro económico de Latinoamérica" },
  { slug: "cordoba", name: "Córdoba", province: "Córdoba", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "1.5M", region: "Centro", localContext: "segundo polo tecnológico del país con ecosistema startup activo" },
  { slug: "rosario", name: "Rosario", province: "Santa Fe", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "1.2M", region: "Litoral", localContext: "tercer centro económico con fuerte sector industrial y agroindustrial" },
  { slug: "mendoza", name: "Mendoza", province: "Mendoza", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "115K", region: "Cuyo", localContext: "capital vitivinícola con turismo y tecnología en auge" },
  { slug: "tucuman", name: "San Miguel de Tucumán", province: "Tucumán", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "900K", region: "NOA", localContext: "principal centro económico del noroeste argentino" },
  { slug: "la-plata", name: "La Plata", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "800K", region: "AMBA", localContext: "ciudad universitaria con fuerte ecosistema de innovación" },
  { slug: "mar-del-plata", name: "Mar del Plata", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "650K", region: "Costa", localContext: "principal destino turístico atlántico con industria pesquera" },
  { slug: "salta", name: "Salta", province: "Salta", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "620K", region: "NOA", localContext: "capital turística del norte con gastronomía y comercio activo" },
  { slug: "santa-fe", name: "Santa Fe", province: "Santa Fe", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "490K", region: "Litoral", localContext: "capital provincial con sector público y comercial fuerte" },
  { slug: "bahia-blanca", name: "Bahía Blanca", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "350K", region: "Sur", localContext: "centro industrial y portuario del sur bonaerense" },
  { slug: "corrientes", name: "Corrientes", province: "Corrientes", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "380K", region: "NEA", localContext: "centro turístico y comercial del nordeste" },
  { slug: "resistencia", name: "Resistencia", province: "Chaco", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "390K", region: "NEA", localContext: "capital cultural del nordeste con comercio activo" },
  { slug: "posadas", name: "Posadas", province: "Misiones", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "380K", region: "NEA", localContext: "ciudad fronteriza con comercio binacional y turismo" },
  { slug: "san-juan", name: "San Juan", province: "San Juan", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "500K", region: "Cuyo", localContext: "centro vitivinícola y minero con crecimiento tecnológico" },
  { slug: "neuquen", name: "Neuquén", province: "Neuquén", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "350K", region: "Patagonia", localContext: "capital energética con Vaca Muerta y alto poder adquisitivo" },
  { slug: "formosa", name: "Formosa", province: "Formosa", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "270K", region: "NEA", localContext: "ciudad fronteriza con comercio y servicios en expansión" },
  { slug: "santiago-del-estero", name: "Santiago del Estero", province: "Santiago del Estero", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "280K", region: "NOA", localContext: "ciudad histórica con comercio local activo" },
  { slug: "san-luis", name: "San Luis", province: "San Luis", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "200K", region: "Cuyo", localContext: "polo industrial con beneficios fiscales y tech en crecimiento" },
  { slug: "parana", name: "Paraná", province: "Entre Ríos", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "250K", region: "Litoral", localContext: "capital provincial con sector público y pymes activas" },
  { slug: "jujuy", name: "San Salvador de Jujuy", province: "Jujuy", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "310K", region: "NOA", localContext: "centro turístico del norte con minería y comercio" },
  { slug: "rio-cuarto", name: "Río Cuarto", province: "Córdoba", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "170K", region: "Centro", localContext: "centro agroindustrial del sur cordobés" },
  { slug: "concordia", name: "Concordia", province: "Entre Ríos", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "170K", region: "Litoral", localContext: "ciudad citrícola y termal con comercio fronterizo" },
  { slug: "san-rafael", name: "San Rafael", province: "Mendoza", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "120K", region: "Cuyo", localContext: "centro turístico y vitivinícola del sur mendocino" },
  { slug: "comodoro-rivadavia", name: "Comodoro Rivadavia", province: "Chubut", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "190K", region: "Patagonia", localContext: "capital petrolera con alto poder adquisitivo" },
  { slug: "catamarca", name: "San Fernando del Valle de Catamarca", province: "Catamarca", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "200K", region: "NOA", localContext: "centro minero y turístico del noroeste" },
  { slug: "la-rioja", name: "La Rioja", province: "La Rioja", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "180K", region: "NOA", localContext: "centro olivícola y vitivinícola con comercio local" },
  { slug: "san-nicolas", name: "San Nicolás de los Arroyos", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "145K", region: "Norte BA", localContext: "centro siderúrgico y religioso con comercio activo" },
  { slug: "tandil", name: "Tandil", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "130K", region: "Centro BA", localContext: "polo tecnológico y turístico con ecosistema IT destacado" },
  { slug: "ushuaia", name: "Ushuaia", province: "Tierra del Fuego", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "80K", region: "Patagonia", localContext: "fin del mundo con turismo internacional y electrónica" },
  { slug: "bariloche", name: "San Carlos de Bariloche", province: "Río Negro", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "115K", region: "Patagonia", localContext: "centro turístico de montaña con gastronomía y hotelería" },
];

// ── Helpers ──
export function getAllCities(): City[] {
  return [...uruguayCities, ...argentinaCities];
}

export function getCitiesByCountry(country: "UY" | "AR"): City[] {
  return country === "UY" ? uruguayCities : argentinaCities;
}

export function getCityBySlug(slug: string): City | undefined {
  return getAllCities().find((c) => c.slug === slug);
}
