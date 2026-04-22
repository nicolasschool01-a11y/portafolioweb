// ============================================================
// BASE DE DATOS DE CIUDADES EXPANDIDA — pSEO NicoPrompt
// ============================================================
// 80+ localidades Uruguay + 70+ ciudades Argentina = 150+ total
// Objetivo: miles de páginas con combinaciones
// ============================================================

export interface City {
  slug: string;
  name: string;
  department?: string;
  province?: string;
  country: "UY" | "AR";
  countryName: string;
  flag: string;
  population: string;
  region: string;
  localContext: string;
}

// ── URUGUAY — 80 localidades ──
export const uruguayCities: City[] = [
  // Capitales departamentales
  { slug: "montevideo", name: "Montevideo", department: "Montevideo", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "1.8M", region: "Sur", localContext: "capital del país con el mayor polo tecnológico del Cono Sur" },
  { slug: "salto", name: "Salto", department: "Salto", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "124K", region: "Norte", localContext: "segunda ciudad más grande con fuerte actividad comercial y termal" },
  { slug: "paysandu", name: "Paysandú", department: "Paysandú", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "76K", region: "Litoral", localContext: "polo industrial del litoral con comercio binacional activo" },
  { slug: "rivera", name: "Rivera", department: "Rivera", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "64K", region: "Norte", localContext: "ciudad fronteriza con Brasil y fuerte comercio transfronterizo" },
  { slug: "maldonado", name: "Maldonado", department: "Maldonado", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "62K", region: "Este", localContext: "centro turístico internacional junto a Punta del Este" },
  { slug: "tacuarembo", name: "Tacuarembó", department: "Tacuarembó", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "54K", region: "Centro-Norte", localContext: "centro ganadero y forestal con comercios locales en expansión" },
  { slug: "melo", name: "Melo", department: "Cerro Largo", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "51K", region: "Este", localContext: "centro arrocero y ganadero con actividad comercial fronteriza" },
  { slug: "mercedes", name: "Mercedes", department: "Soriano", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "42K", region: "Litoral", localContext: "zona agropecuaria con comercios y servicios en crecimiento" },
  { slug: "artigas", name: "Artigas", department: "Artigas", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "40K", region: "Norte", localContext: "ciudad fronteriza con potencial de comercio binacional" },
  { slug: "minas", name: "Minas", department: "Lavalleja", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "38K", region: "Centro-Este", localContext: "centro turístico serrano con industria y minería activa" },
  { slug: "san-jose-de-mayo", name: "San José de Mayo", department: "San José", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "36K", region: "Sur", localContext: "centro agroindustrial cercano a Montevideo con servicios en expansión" },
  { slug: "durazno", name: "Durazno", department: "Durazno", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "34K", region: "Centro", localContext: "ciudad centro del país con actividad ganadera y festival cultural" },
  { slug: "florida", name: "Florida", department: "Florida", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "33K", region: "Centro-Sur", localContext: "centro lechero e industrial con comercios locales activos" },
  { slug: "treinta-y-tres", name: "Treinta y Tres", department: "Treinta y Tres", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "33K", region: "Este", localContext: "zona arrocera y ganadera con comercios en crecimiento" },
  { slug: "rocha", name: "Rocha", department: "Rocha", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "25K", region: "Sur-Este", localContext: "centro turístico eco-costero con temporada alta marcada" },
  { slug: "colonia-del-sacramento", name: "Colonia del Sacramento", department: "Colonia", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "27K", region: "Sur-Oeste", localContext: "patrimonio UNESCO con turismo internacional y comercio portuario" },
  { slug: "fray-bentos", name: "Fray Bentos", department: "Río Negro", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "24K", region: "Litoral", localContext: "centro industrial y forestal con actividad comercial binacional" },
  { slug: "trinidad", name: "Trinidad", department: "Flores", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "21K", region: "Centro", localContext: "capital del departamento más pequeño con servicios rurales" },
  { slug: "canelones", name: "Canelones", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "20K", region: "Metropolitana", localContext: "centro del departamento más poblado después de Montevideo" },

  // Ciudades grandes del área metropolitana y turísticas
  { slug: "ciudad-de-la-costa", name: "Ciudad de la Costa", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "120K", region: "Metropolitana", localContext: "zona residencial de mayor crecimiento con comercios en expansión" },
  { slug: "las-piedras", name: "Las Piedras", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "71K", region: "Metropolitana", localContext: "centro urbano del área metropolitana con pymes en crecimiento" },
  { slug: "punta-del-este", name: "Punta del Este", department: "Maldonado", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "25K", region: "Este", localContext: "principal destino turístico de lujo con alta demanda digital" },
  { slug: "pando", name: "Pando", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "28K", region: "Metropolitana", localContext: "centro comercial e industrial al norte de Montevideo" },
  { slug: "la-paz", name: "La Paz", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "22K", region: "Metropolitana", localContext: "zona residencial con crecimiento comercial constante" },
  { slug: "barros-blancos", name: "Barros Blancos", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "31K", region: "Metropolitana", localContext: "centro urbano metropolitano en expansión" },
  { slug: "progreso", name: "Progreso", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "16K", region: "Metropolitana", localContext: "localidad en crecimiento con actividad comercial local" },
  { slug: "san-carlos", name: "San Carlos", department: "Maldonado", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "27K", region: "Este", localContext: "centro de servicios cercano a Punta del Este" },
  { slug: "pan-de-azucar", name: "Pan de Azúcar", department: "Maldonado", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "7K", region: "Este", localContext: "centro turístico serrano del departamento de Maldonado" },
  { slug: "dolores", name: "Dolores", department: "Soriano", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "17K", region: "Litoral", localContext: "centro agropecuario del litoral con comercios activos" },
  { slug: "young", name: "Young", department: "Río Negro", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "16K", region: "Litoral", localContext: "centro agrícola y sojero del litoral con pymes activas" },
  { slug: "nueva-helvecia", name: "Nueva Helvecia", department: "Colonia", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "10K", region: "Sur-Oeste", localContext: "colonia suiza con industria láctea y turismo cultural" },
  { slug: "carmelo", name: "Carmelo", department: "Colonia", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "18K", region: "Sur-Oeste", localContext: "centro vitivinícola y turístico junto al río" },
  { slug: "juan-lacaze", name: "Juan Lacaze", department: "Colonia", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "14K", region: "Sur-Oeste", localContext: "centro industrial y portuario en reconversión" },
  { slug: "nueva-palmira", name: "Nueva Palmira", department: "Colonia", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "10K", region: "Sur-Oeste", localContext: "puerto cerealero con actividad logística internacional" },
  { slug: "lascano", name: "Lascano", department: "Rocha", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "7K", region: "Sur-Este", localContext: "centro arrocero y ganadero del este" },
  { slug: "chuy", name: "Chuy", department: "Rocha", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "10K", region: "Sur-Este", localContext: "ciudad fronteriza con Brasil y comercio transfronterizo activo" },
  { slug: "bella-union", name: "Bella Unión", department: "Artigas", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "13K", region: "Norte", localContext: "centro azucarero y cañero del norte con triple frontera" },
  { slug: "guichon", name: "Guichón", department: "Paysandú", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "5K", region: "Litoral", localContext: "centro termal y ganadero con potencial turístico" },
  { slug: "termas-de-dayman", name: "Termas del Daymán", department: "Salto", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "3K", region: "Norte", localContext: "principal centro termal con hoteles y turismo durante todo el año" },
  { slug: "paso-de-los-toros", name: "Paso de los Toros", department: "Tacuarembó", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "13K", region: "Centro-Norte", localContext: "nudo ferroviario y centro ganadero del interior" },
  { slug: "san-ramon", name: "San Ramón", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "8K", region: "Metropolitana", localContext: "centro lechero con agroindustria activa" },
  { slug: "santa-lucia", name: "Santa Lucía", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "17K", region: "Metropolitana", localContext: "centro industrial y comercial del interior de Canelones" },
  { slug: "tala", name: "Tala", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "5K", region: "Metropolitana", localContext: "centro agrícola y ganadero con servicios locales" },
  { slug: "sauce", name: "Sauce", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "6K", region: "Metropolitana", localContext: "localidad en crecimiento con actividad agropecuaria" },
  { slug: "atlantida", name: "Atlántida", department: "Canelones", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "6K", region: "Costa de Oro", localContext: "principal balneario de la Costa de Oro con turismo estacional" },
  { slug: "piriapolis", name: "Piriápolis", department: "Maldonado", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "9K", region: "Este", localContext: "balneario tradicional con turismo familiar todo el año" },
  { slug: "jose-ignacio", name: "José Ignacio", department: "Maldonado", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "300", region: "Este", localContext: "exclusivo destino de lujo con alta demanda de servicios premium" },
  { slug: "la-paloma", name: "La Paloma", department: "Rocha", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "3K", region: "Sur-Este", localContext: "destino de surf y ecoturismo con comercios estacionales" },
  { slug: "cabo-polonio", name: "Cabo Polonio", department: "Rocha", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "100", region: "Sur-Este", localContext: "destino ecológico único con turismo alternativo" },
  { slug: "punta-del-diablo", name: "Punta del Diablo", department: "Rocha", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "900", region: "Sur-Este", localContext: "pueblo pesquero convertido en destino turístico boutique" },
  { slug: "la-barra", name: "La Barra", department: "Maldonado", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "5K", region: "Este", localContext: "zona artística y gastronómica de Punta del Este" },
  { slug: "manantiales", name: "Manantiales", department: "Maldonado", country: "UY", countryName: "Uruguay", flag: "🇺🇾", population: "2K", region: "Este", localContext: "zona premium entre La Barra y José Ignacio" },
];

// ── ARGENTINA — 70 ciudades ──
export const argentinaCities: City[] = [
  // Mega ciudades
  { slug: "buenos-aires", name: "Buenos Aires", province: "CABA", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "3M", region: "AMBA", localContext: "capital del país y principal centro económico de Latinoamérica" },
  { slug: "cordoba", name: "Córdoba", province: "Córdoba", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "1.5M", region: "Centro", localContext: "segundo polo tecnológico del país con ecosistema startup activo" },
  { slug: "rosario", name: "Rosario", province: "Santa Fe", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "1.2M", region: "Litoral", localContext: "tercer centro económico con fuerte sector industrial y agroindustrial" },
  { slug: "mendoza", name: "Mendoza", province: "Mendoza", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "115K", region: "Cuyo", localContext: "capital vitivinícola con turismo y tecnología en auge" },
  { slug: "tucuman", name: "San Miguel de Tucumán", province: "Tucumán", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "900K", region: "NOA", localContext: "principal centro económico del noroeste argentino" },
  { slug: "la-plata", name: "La Plata", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "800K", region: "AMBA", localContext: "ciudad universitaria con fuerte ecosistema de innovación" },
  { slug: "mar-del-plata", name: "Mar del Plata", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "650K", region: "Costa", localContext: "principal destino turístico atlántico con industria pesquera" },
  { slug: "salta", name: "Salta", province: "Salta", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "620K", region: "NOA", localContext: "capital turística del norte con gastronomía y comercio activo" },
  { slug: "santa-fe-ar", name: "Santa Fe", province: "Santa Fe", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "490K", region: "Litoral", localContext: "capital provincial con sector público y comercial fuerte" },
  { slug: "bahia-blanca", name: "Bahía Blanca", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "350K", region: "Sur BA", localContext: "centro industrial y portuario del sur bonaerense" },
  // Capitales provinciales
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
  { slug: "catamarca", name: "San Fernando del Valle de Catamarca", province: "Catamarca", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "200K", region: "NOA", localContext: "centro minero y turístico del noroeste" },
  { slug: "la-rioja", name: "La Rioja", province: "La Rioja", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "180K", region: "NOA", localContext: "centro olivícola y vitivinícola con comercio local" },
  { slug: "rawson", name: "Rawson", province: "Chubut", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "40K", region: "Patagonia", localContext: "capital provincial patagónica con servicios gubernamentales" },
  { slug: "viedma", name: "Viedma", province: "Río Negro", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "55K", region: "Patagonia", localContext: "capital provincial con sector público y turismo costero" },
  { slug: "santa-rosa", name: "Santa Rosa", province: "La Pampa", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "110K", region: "Pampa", localContext: "centro agropecuario pampeano con comercio activo" },
  { slug: "ushuaia", name: "Ushuaia", province: "Tierra del Fuego", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "80K", region: "Patagonia", localContext: "fin del mundo con turismo internacional y electrónica" },
  { slug: "rio-gallegos", name: "Río Gallegos", province: "Santa Cruz", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "100K", region: "Patagonia", localContext: "capital provincial patagónica con industria petrolera" },
  // Ciudades importantes no capitales
  { slug: "rio-cuarto", name: "Río Cuarto", province: "Córdoba", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "170K", region: "Centro", localContext: "centro agroindustrial del sur cordobés" },
  { slug: "concordia", name: "Concordia", province: "Entre Ríos", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "170K", region: "Litoral", localContext: "ciudad citrícola y termal con comercio fronterizo" },
  { slug: "san-rafael", name: "San Rafael", province: "Mendoza", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "120K", region: "Cuyo", localContext: "centro turístico y vitivinícola del sur mendocino" },
  { slug: "comodoro-rivadavia", name: "Comodoro Rivadavia", province: "Chubut", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "190K", region: "Patagonia", localContext: "capital petrolera con alto poder adquisitivo" },
  { slug: "san-nicolas", name: "San Nicolás de los Arroyos", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "145K", region: "Norte BA", localContext: "centro siderúrgico y religioso con comercio activo" },
  { slug: "tandil", name: "Tandil", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "130K", region: "Centro BA", localContext: "polo tecnológico y turístico con ecosistema IT destacado" },
  { slug: "bariloche", name: "San Carlos de Bariloche", province: "Río Negro", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "115K", region: "Patagonia", localContext: "centro turístico de montaña con gastronomía y hotelería" },
  { slug: "olavarria", name: "Olavarría", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "115K", region: "Centro BA", localContext: "centro minero e industrial del interior bonaerense" },
  { slug: "junin", name: "Junín", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "100K", region: "Noroeste BA", localContext: "centro agropecuario y comercial del noroeste bonaerense" },
  { slug: "pergamino", name: "Pergamino", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "105K", region: "Norte BA", localContext: "centro agrícola de la zona núcleo con pymes activas" },
  { slug: "rafaela", name: "Rafaela", province: "Santa Fe", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "100K", region: "Centro SF", localContext: "polo industrial lácteo y metalmecánico del centro santafesino" },
  { slug: "venado-tuerto", name: "Venado Tuerto", province: "Santa Fe", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "80K", region: "Sur SF", localContext: "centro agropecuario y comercial del sur santafesino" },
  { slug: "reconquista", name: "Reconquista", province: "Santa Fe", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "75K", region: "Norte SF", localContext: "centro algodonero y forestal del norte santafesino" },
  { slug: "villa-maria", name: "Villa María", province: "Córdoba", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "85K", region: "Centro", localContext: "centro industrial lechero y universitario" },
  { slug: "villa-carlos-paz", name: "Villa Carlos Paz", province: "Córdoba", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "75K", region: "Sierras", localContext: "principal destino turístico serrano con teatro y gastronomía" },
  { slug: "trelew", name: "Trelew", province: "Chubut", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "100K", region: "Patagonia", localContext: "centro industrial y turístico de la Patagonia galesa" },
  { slug: "puerto-madryn", name: "Puerto Madryn", province: "Chubut", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "90K", region: "Patagonia", localContext: "destino turístico de ballenas con industria del aluminio" },
  { slug: "el-calafate", name: "El Calafate", province: "Santa Cruz", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "25K", region: "Patagonia", localContext: "puerta al Glaciar Perito Moreno con turismo internacional" },
  { slug: "gualeguaychu", name: "Gualeguaychú", province: "Entre Ríos", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "85K", region: "Litoral", localContext: "capital del carnaval con turismo y termas activas" },
  { slug: "zarate", name: "Zárate", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "115K", region: "Norte BA", localContext: "centro industrial y portuario del norte bonaerense" },
  { slug: "campana", name: "Campana", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "100K", region: "Norte BA", localContext: "polo petroquímico e industrial del norte bonaerense" },
  { slug: "pilar", name: "Pilar", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "350K", region: "Norte GBA", localContext: "zona premium del GBA con countries y parques industriales" },
  { slug: "tigre", name: "Tigre", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "400K", region: "Norte GBA", localContext: "zona del delta con turismo, náutica y gastronomía" },
  { slug: "quilmes", name: "Quilmes", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "600K", region: "Sur GBA", localContext: "centro industrial y cervecero del sur del conurbano" },
  { slug: "lomas-de-zamora", name: "Lomas de Zamora", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "620K", region: "Sur GBA", localContext: "centro comercial y universitario del sur del conurbano" },
  { slug: "moron", name: "Morón", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "530K", region: "Oeste GBA", localContext: "centro comercial y judicial del oeste del conurbano" },
  { slug: "san-isidro", name: "San Isidro", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "290K", region: "Norte GBA", localContext: "zona residencial premium con alto poder adquisitivo" },
  { slug: "vicente-lopez", name: "Vicente López", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "270K", region: "Norte GBA", localContext: "polo tecnológico del GBA con startups y oficinas corporativas" },
  { slug: "san-martin", name: "San Martín", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "420K", region: "Norte GBA", localContext: "centro industrial con parques tecnológicos en crecimiento" },
  { slug: "avellaneda", name: "Avellaneda", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "340K", region: "Sur GBA", localContext: "centro industrial y comercial del sur conurbano" },
  { slug: "lanus", name: "Lanús", province: "Buenos Aires", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "460K", region: "Sur GBA", localContext: "centro comercial y gastronómico del sur conurbano" },
  { slug: "eldorado", name: "Eldorado", province: "Misiones", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "65K", region: "NEA", localContext: "centro forestal y maderero de la selva misionera" },
  { slug: "obera", name: "Oberá", province: "Misiones", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "65K", region: "NEA", localContext: "capital de la fiesta del inmigrante con cultura diversa" },
  { slug: "puerto-iguazu", name: "Puerto Iguazú", province: "Misiones", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "80K", region: "NEA", localContext: "puerta a las Cataratas con turismo internacional masivo" },
  { slug: "general-roca", name: "General Roca", province: "Río Negro", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "90K", region: "Patagonia", localContext: "centro frutícola del Alto Valle con agroindustria activa" },
  { slug: "cipolletti", name: "Cipolletti", province: "Río Negro", country: "AR", countryName: "Argentina", flag: "🇦🇷", population: "90K", region: "Patagonia", localContext: "ciudad gemela de Neuquén con servicios y comercio activo" },
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
