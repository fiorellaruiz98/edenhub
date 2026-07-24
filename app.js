(function(){
"use strict";

/* ============================================================
   MOCK DATA
   ============================================================ */
const GIRO_OPTIONS = ["Consumo masivo","Retail","Financiero","Alimentos y bebidas","Entretenimiento","Salud","Industrial","Servicios","Sector público","Tecnología"];
const EXPENSE_KEYS = [
  {key:"emision",   label:"Emisión"},
  {key:"entrega",    label:"Entrega"},
  {key:"reposicion", label:"Reposición"},
  {key:"mantenimiento", label:"Mantenimiento"},
  {key:"personalizacion", label:"Personalización"},
  {key:"carga", label:"Carga"},
  {key:"renovacion", label:"Renovación"},
  {key:"otros", label:"Otros"}
];

function makeExpenses(vals, exempt){
  const o = {};
  EXPENSE_KEYS.forEach((e,i)=>{ o[e.key] = {monto: vals[i] ?? 0, exonerado: !!(exempt && exempt.includes(e.key))}; });
  return o;
}

/* Presets curados para condiciones comerciales personalizadas — evita texto libre
   sin control, que rompía el mapeo por nombre en la versión anterior. */
const COND_CUSTOM_PRESETS = ["Descuento por volumen","Bono de lanzamiento","Cargo por urgencia","Servicio premium","Penalidad por incumplimiento","Otro personalizado"];

let seq = 1;
function nextId(){ return "p" + (seq++); }

const proposals = [
  {
    id: nextId(), codigo:"COD-2026-001", ruc:"20100070970", razonSocial:"Alicorp S.A.A.",
    giro:"Consumo masivo", esCliente:true, direccion:"Av. Argentina 4793, Carmen de la Legua, Callao",
    representantes:[{tipoDoc:"DNI",numDoc:"09541278",nombres:"Rosa",apellidos:"Vidal Torres",cargo:"General Manager"}],
    solucion:"Food", marca:"Mastercard", sector:"Privado", categoria:"Esencial",
    bvMes:185000, cantTarjetas:1200, cargasAnio:12, tipoProducto:"Físico", valorFacial:154,
    modalidadPago:"Crédito", diasCredito:30,
    rebate:{activo:true,tipo:"porcentaje",valor:1.5},
    comisionCliente:2.5, facturaMinima:1500,
    expenses: makeExpenses([12,8,15,5,10,3,20,0], ["otros"]),
    distribucion:[{destino:"Lima",cantidadPuntos:3},{destino:"Provincia",cantidadPuntos:1}],
    logoEmpresa:true, cartaFianza:true, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Alimentación Esencial", estado:"Aprobada", version:2, fecha:"2026-07-08",
    historial:[
      {version:1, fecha:"2026-05-04", estado:"Creada", usuario:"F. Ruiz", resumen:"Propuesta inicial creada para negociación de portafolio Food."},
      {version:1, fecha:"2026-06-02", estado:"Rechazada", usuario:"J. Salinas (Comercial)", resumen:"El comité comercial solicitó reducir el BV proyectado por estacionalidad.", motivo:"El comité comercial solicitó reducir el BV proyectado por estacionalidad."},
      {version:2, fecha:"2026-06-05", estado:"Creada", usuario:"F. Ruiz", resumen:"Nueva versión generada a partir de la propuesta rechazada, con BV mensual y condiciones comerciales renegociadas."},
      {version:2, fecha:"2026-07-08", estado:"Aprobada", usuario:"F. Ruiz", resumen:"Propuesta aprobada tras la renegociación."}
    ],
    solicitudes:[
      {id:"SOL-0001", tipo:"Línea de Crédito", fechaCreacion:"2026-06-10", estado:"Aprobado", motivo:null},
      {id:"SOL-0002", tipo:"Excepción", fechaCreacion:"2026-06-15", estado:"Anulado", motivo:"Excepción de factura mínima solicitada por error; se anuló al corregir la condición directamente en la propuesta."}
    ]
  },
  {
    id: nextId(), codigo:"COD-2026-002", ruc:"20511358907", razonSocial:"Interbank",
    giro:"Financiero", esCliente:true, direccion:"Av. Carlos Villarán 140, La Victoria, Lima",
    representantes:[{tipoDoc:"DNI",numDoc:"41235690",nombres:"Diego",apellidos:"Cárdenas Luna",cargo:"Apoderado legal"}],
    solucion:"Gift", marca:"Visa", sector:"Privado", categoria:"No aplica",
    bvMes:92000, cantTarjetas:450, cargasAnio:4, tipoProducto:"Virtual", valorFacial:204,
    modalidadPago:"Al contado", diasCredito:0,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:3.2, facturaMinima:900,
    expenses: makeExpenses([9,0,6,0,14,0,0,0], ["entrega","mantenimiento","carga","renovacion","otros"]),
    distribucion:[{destino:"Lima",cantidadPuntos:2}],
    logoEmpresa:false, cartaFianza:false, productoCustom:true, mdrNegociado:2.1,
    producto:"Gift Card Digital", estado:"Creada", version:1, fecha:"2026-07-12",
    historial:[{version:1, fecha:"2026-07-12", estado:"Creada", usuario:"F. Ruiz", resumen:"Propuesta inicial de Gift Card Digital para campaña Q3."}]
  },
  {
    id: nextId(), codigo:"COD-2026-003", ruc:"20100128218", razonSocial:"Backus",
    giro:"Alimentos y bebidas", esCliente:true, direccion:"Av. Nicolás Ayllón 3986, Ate, Lima",
    representantes:[{tipoDoc:"DNI",numDoc:"08774521",nombres:"Manuel",apellidos:"Sotelo Braga",cargo:"General Manager"},{tipoDoc:"CE",numDoc:"00123456",nombres:"Laura",apellidos:"Ibáñez Ruiz",cargo:"Apoderado legal"}],
    solucion:"Food", marca:"Mastercard", sector:"Privado", categoria:"Estándar",
    bvMes:310000, cantTarjetas:2100, cargasAnio:12, tipoProducto:"Físico", valorFacial:147,
    modalidadPago:"Crédito", diasCredito:45,
    rebate:{activo:true,tipo:"monto",valor:5200},
    comisionCliente:2.0, facturaMinima:2200,
    expenses: makeExpenses([14,10,18,6,12,4,22,3], []),
    distribucion:[{destino:"Lima",cantidadPuntos:2},{destino:"Provincia",cantidadPuntos:1}],
    logoEmpresa:true, cartaFianza:true, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Alimentación Estándar", estado:"Rechazada", version:1, fecha:"2026-06-28",
    historial:[
      {version:1, fecha:"2026-05-20", estado:"Creada", usuario:"F. Ruiz", resumen:"Propuesta inicial de migración de portafolio Estándar."},
      {version:1, fecha:"2026-06-28", estado:"Rechazada", usuario:"M. Quiroz (Operaciones)", resumen:"Se revisaron condiciones de factura mínima y comisión cliente.", motivo:"Cliente solicitó comisión cliente menor al 2.0% ofertado; pendiente de reevaluación comercial."}
    ],
    solicitudes:[
      {id:"SOL-0003", tipo:"Línea de Crédito", fechaCreacion:"2026-06-22", estado:"Rechazado", motivo:"El score crediticio del cliente en el sistema de riesgos no sustenta el monto de línea solicitado para 45 días de crédito.", reevaluaciones:[]}
    ]
  },
  {
    id: nextId(), codigo:"COD-2026-004", ruc:"20601234561", razonSocial:"Rappi Perú S.A.C.",
    giro:"Tecnología", esCliente:false, direccion:"Av. Santa Cruz 830, Miraflores, Lima",
    representantes:[{tipoDoc:"CE",numDoc:"00456789",nombres:"Andrés",apellidos:"Gómez Peña",cargo:"General Manager"}],
    solucion:"Mobility", marca:"Visa", sector:"Privado", categoria:"No aplica",
    bvMes:45000, cantTarjetas:300, cargasAnio:6, tipoProducto:"Físico", valorFacial:150,
    modalidadPago:"Al contado", diasCredito:0,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:2.8, facturaMinima:600,
    expenses: makeExpenses([10,7,12,4,9,2,15,0], ["personalizacion","otros"]),
    distribucion:[{destino:"Lima",cantidadPuntos:1}],
    logoEmpresa:false, cartaFianza:false, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Movilidad", estado:"Borrador", version:1, fecha:"2026-07-14",
    historial:[{version:1, fecha:"2026-07-14", estado:"Borrador", usuario:"F. Ruiz", resumen:"Borrador guardado, pendiente de validar cantidad de cargas al año."}],
    solicitudes:[
      {id:"SOL-0004", tipo:"Excepción", fechaCreacion:"2026-07-14", estado:"En Atención", motivo:null}
    ]
  },
  {
    id: nextId(), codigo:"COD-2026-005", ruc:"20345678912", razonSocial:"Falabella Perú S.A.",
    giro:"Retail", esCliente:true, direccion:"Av. Angamos Este 1805, Surquillo, Lima",
    representantes:[{tipoDoc:"DNI",numDoc:"07896541",nombres:"Patricia",apellidos:"León Salazar",cargo:"General Manager"}],
    solucion:"Food", marca:"Mastercard", sector:"Privado", categoria:"Esencial",
    bvMes:210000, cantTarjetas:1500, cargasAnio:12, tipoProducto:"Físico", valorFacial:140,
    modalidadPago:"Crédito", diasCredito:30,
    rebate:{activo:true,tipo:"porcentaje",valor:1.0},
    comisionCliente:2.4, facturaMinima:1800,
    expenses: makeExpenses([12,8,15,5,10,3,20,0], []),
    distribucion:[{destino:"Lima",cantidadPuntos:2},{destino:"Provincia",cantidadPuntos:1}],
    logoEmpresa:true, cartaFianza:false, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Alimentación Esencial", estado:"Aprobada", version:1, fecha:"2026-07-02",
    historial:[{version:1, fecha:"2026-07-02", estado:"Aprobada", usuario:"F. Ruiz", resumen:"Propuesta aprobada directamente en primera versión."}],
    solicitudes:[
      {id:"SOL-0005", tipo:"Línea de Crédito", fechaCreacion:"2026-06-28", estado:"Aprobado", motivo:null}
    ]
  },
  {
    id: nextId(), codigo:"COD-2026-006", ruc:"20512345678", razonSocial:"Sodimac Perú S.A.",
    giro:"Retail", esCliente:true, direccion:"Av. Angamos Este 1805, Surquillo, Lima",
    representantes:[{tipoDoc:"DNI",numDoc:"06541237",nombres:"Jorge",apellidos:"Paredes Ito",cargo:"Apoderado legal"}],
    solucion:"Gift", marca:"Visa", sector:"Privado", categoria:"No aplica",
    bvMes:67000, cantTarjetas:380, cargasAnio:2, tipoProducto:"Físico", valorFacial:176,
    modalidadPago:"Al contado", diasCredito:0,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:3.0, facturaMinima:700,
    expenses: makeExpenses([9,6,11,3,8,2,13,0], ["carga","otros"]),
    distribucion:[{destino:"Lima",cantidadPuntos:1}],
    logoEmpresa:false, cartaFianza:false, productoCustom:false, mdrNegociado:0,
    producto:"Gift Card Física", estado:"Creada", version:1, fecha:"2026-07-11",
    historial:[{version:1, fecha:"2026-07-11", estado:"Creada", usuario:"F. Ruiz", resumen:"Propuesta inicial para campaña Gift de temporada."}]
  },
  {
    id: nextId(), codigo:"COD-2026-007", ruc:"20601987654", razonSocial:"Cineplanet S.A.",
    giro:"Entretenimiento", esCliente:true, direccion:"Av. Óscar R. Benavides 3866, Callao",
    representantes:[{tipoDoc:"DNI",numDoc:"05412369",nombres:"Valeria",apellidos:"Nuñez Campos",cargo:"General Manager"}],
    solucion:"Mobility", marca:"Mastercard", sector:"Privado", categoria:"No aplica",
    bvMes:28000, cantTarjetas:210, cargasAnio:4, tipoProducto:"Virtual", valorFacial:133,
    modalidadPago:"Crédito", diasCredito:15,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:2.6, facturaMinima:400,
    expenses: makeExpenses([8,5,9,3,7,2,11,0], ["mantenimiento"]),
    distribucion:[{destino:"Lima",cantidadPuntos:1}],
    logoEmpresa:false, cartaFianza:false, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Movilidad", estado:"Borrador", version:1, fecha:"2026-07-10",
    historial:[
      {version:1, fecha:"2026-06-18", estado:"Borrador", usuario:"F. Ruiz", resumen:"Borrador inicial con datos preliminares de la oportunidad."},
      {version:1, fecha:"2026-07-10", estado:"Borrador", usuario:"F. Ruiz", resumen:"Actualización de días de crédito y valor facial."}
    ],
    solicitudes:[
      {id:"SOL-0006", tipo:"Línea de Crédito", fechaCreacion:"2026-07-10", estado:"Registrado", motivo:null}
    ]
  },
  {
    id: nextId(), codigo:"COD-2026-008", ruc:"20100456789", razonSocial:"Ransa Comercial S.A.",
    giro:"Servicios", esCliente:true, direccion:"Av. Elmer Faucett 3348, Callao",
    representantes:[{tipoDoc:"DNI",numDoc:"04123698",nombres:"Ricardo",apellidos:"Cabrera Solís",cargo:"Apoderado legal"}],
    solucion:"Food", marca:"Visa", sector:"Privado", categoria:"Estándar",
    bvMes:156000, cantTarjetas:980, cargasAnio:12, tipoProducto:"Físico", valorFacial:159,
    modalidadPago:"Crédito", diasCredito:30,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:2.3, facturaMinima:1200,
    expenses: makeExpenses([11,7,14,5,9,3,18,0], ["personalizacion"]),
    distribucion:[{destino:"Lima",cantidadPuntos:2},{destino:"Provincia",cantidadPuntos:1}],
    logoEmpresa:true, cartaFianza:true, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Alimentación Estándar", estado:"Rechazada", version:1, fecha:"2026-06-20",
    historial:[{version:1, fecha:"2026-06-20", estado:"Rechazada", usuario:"J. Salinas (Comercial)", resumen:"Rechazada en primera versión por condiciones de factura mínima.", motivo:"El BV proyectado no sustenta la factura mínima solicitada por el cliente."}]
  },
  {
    id: nextId(), codigo:"COD-2026-009", ruc:"20601122334", razonSocial:"Nufoods S.A.C.",
    giro:"Alimentos y bebidas", esCliente:true, direccion:"Av. República de Panamá 3055, San Isidro, Lima",
    representantes:[{tipoDoc:"DNI",numDoc:"03698521",nombres:"Camila",apellidos:"Herrera Díaz",cargo:"General Manager"}],
    solucion:"Food", marca:"Mastercard", sector:"Privado", categoria:"Esencial",
    bvMes:74000, cantTarjetas:520, cargasAnio:12, tipoProducto:"Físico", valorFacial:142,
    modalidadPago:"Al contado", diasCredito:0,
    rebate:{activo:true,tipo:"porcentaje",valor:0.8},
    comisionCliente:2.7, facturaMinima:800,
    expenses: makeExpenses([10,6,12,4,8,2,16,0], ["otros"]),
    distribucion:[{destino:"Lima",cantidadPuntos:3}],
    logoEmpresa:true, cartaFianza:false, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Alimentación Esencial", estado:"Aprobada", version:1, fecha:"2026-07-15",
    historial:[
      {version:1, fecha:"2026-06-25", estado:"Creada", usuario:"F. Ruiz", resumen:"Propuesta inicial para plan de e-commerce y beneficios internos."},
      {version:1, fecha:"2026-07-15", estado:"Aprobada", usuario:"F. Ruiz", resumen:"Aprobada tras ajuste de rebate al 0.8% de BV."}
    ]
  },
  {
    id: nextId(), codigo:"COD-2026-010", ruc:"20512000111", razonSocial:"Compartamos Financiera",
    giro:"Financiero", esCliente:false, direccion:"Av. República de Panamá 3591, San Isidro, Lima",
    representantes:[{tipoDoc:"DNI",numDoc:"02147896",nombres:"Hugo",apellidos:"Ferrer Vega",cargo:"Apoderado legal"}],
    solucion:"Gift", marca:"Visa", sector:"Privado", categoria:"No aplica",
    bvMes:39000, cantTarjetas:260, cargasAnio:2, tipoProducto:"Virtual", valorFacial:150,
    modalidadPago:"Crédito", diasCredito:20,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:3.1, facturaMinima:500,
    expenses: makeExpenses([9,0,10,0,13,0,0,0], ["entrega","mantenimiento","carga","renovacion","otros"]),
    distribucion:[{destino:"Lima",cantidadPuntos:2}],
    logoEmpresa:false, cartaFianza:false, productoCustom:true, mdrNegociado:1.8,
    producto:"Gift Card Digital", estado:"Creada", version:1, fecha:"2026-07-13",
    historial:[{version:1, fecha:"2026-07-13", estado:"Creada", usuario:"F. Ruiz", resumen:"Propuesta inicial para beneficios de colaboradores."}]
  },
  {
    id: nextId(), codigo:"COD-2026-011", ruc:"20100998877", razonSocial:"San Fernando S.A.",
    giro:"Alimentos y bebidas", esCliente:true, direccion:"Calle Amador Merino Reyna 267, San Isidro, Lima",
    representantes:[{tipoDoc:"DNI",numDoc:"01236547",nombres:"Elena",apellidos:"Osorio Vargas",cargo:"General Manager"}],
    solucion:"Food", marca:"Mastercard", sector:"Privado", categoria:"Estándar",
    bvMes:198000, cantTarjetas:1340, cargasAnio:12, tipoProducto:"Físico", valorFacial:148,
    modalidadPago:"Crédito", diasCredito:30,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:2.2, facturaMinima:1600,
    expenses: makeExpenses([13,9,16,5,11,3,19,0], []),
    distribucion:[{destino:"Lima",cantidadPuntos:2},{destino:"Provincia",cantidadPuntos:1}],
    logoEmpresa:true, cartaFianza:true, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Alimentación Estándar", estado:"Borrador", version:1, fecha:"2026-07-15",
    historial:[{version:1, fecha:"2026-07-15", estado:"Borrador", usuario:"F. Ruiz", resumen:"Borrador en preparación, a la espera de validación de RRLL."}]
  },
  {
    id: nextId(), codigo:"COD-2026-012", ruc:"20601554433", razonSocial:"Tottus Perú S.A.",
    giro:"Retail", esCliente:true, direccion:"Av. Angamos Este 1803, Surquillo, Lima",
    representantes:[{tipoDoc:"DNI",numDoc:"09638527",nombres:"Sergio",apellidos:"Malpartida Ruiz",cargo:"Apoderado legal"}],
    solucion:"Mobility", marca:"Visa", sector:"Privado", categoria:"No aplica",
    bvMes:52000, cantTarjetas:340, cargasAnio:6, tipoProducto:"Físico", valorFacial:153,
    modalidadPago:"Al contado", diasCredito:0,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:2.9, facturaMinima:650,
    expenses: makeExpenses([10,7,12,4,9,2,15,0], ["otros"]),
    distribucion:[{destino:"Lima",cantidadPuntos:1}],
    logoEmpresa:false, cartaFianza:false, productoCustom:false, mdrNegociado:0,
    producto:"Tarjeta Movilidad", estado:"Aprobada", version:1, fecha:"2026-07-05",
    historial:[{version:1, fecha:"2026-07-05", estado:"Aprobada", usuario:"F. Ruiz", resumen:"Aprobada en primera versión sin observaciones."}]
  }
];

/* ============================================================
   UTILITIES
   ============================================================ */
function money(n){
  n = Number(n)||0;
  return "S/ " + n.toLocaleString("es-PE",{minimumFractionDigits:0, maximumFractionDigits:0});
}
function moneyDec(n){
  n = Number(n)||0;
  return "S/ " + n.toLocaleString("es-PE",{minimumFractionDigits:2, maximumFractionDigits:2});
}
function intFmt(n){ return Number(n||0).toLocaleString("es-PE"); }
function fmtDate(iso){
  const d = new Date(iso+"T00:00:00");
  return d.toLocaleDateString("es-PE",{day:"2-digit",month:"short",year:"numeric"});
}
function badgeClass(estado){
  return {"Creada":"badge-creada","Borrador":"badge-borrador","Aprobada":"badge-aprobada","Rechazada":"badge-rechazada"}[estado] || "badge-creada";
}
function esc(s){
  return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function findProposal(id){ return proposals.find(p=>p.id===id); }

/* ------------------------------------------------------------
   INICIO — dashboard de negocio (mismo contenido para todos los
   perfiles de usuario, calculado en vivo desde `proposals`)
   ------------------------------------------------------------ */
function periodoRange(periodo, today){
  const y = today.getFullYear(), m = today.getMonth();
  if(periodo === 'trimestre'){
    const q = Math.floor(m/3);
    return { start: new Date(y, q*3, 1), end: new Date(y, q*3+3, 1) };
  }
  if(periodo === 'anio') return { start: new Date(y, 0, 1), end: new Date(y+1, 0, 1) };
  return { start: new Date(y, m, 1), end: new Date(y, m+1, 1) };
}
function periodoRangeAnterior(periodo, today){
  const y = today.getFullYear(), m = today.getMonth();
  if(periodo === 'trimestre'){
    const q = Math.floor(m/3);
    return { start: new Date(y, q*3-3, 1), end: new Date(y, q*3, 1) };
  }
  if(periodo === 'anio') return { start: new Date(y-1, 0, 1), end: new Date(y, 0, 1) };
  return { start: new Date(y, m-1, 1), end: new Date(y, m, 1) };
}
function fechaEnRango(fechaStr, rango){
  const d = new Date(fechaStr+"T00:00:00");
  return d >= rango.start && d < rango.end;
}

function renderInicioDashboard(){
  const nombreEl = document.querySelector('.user-chip strong');
  const nombre = nombreEl ? nombreEl.textContent.trim().split(' ')[0] : 'Usuario';
  const fechaTexto = new Date().toLocaleDateString('es-PE', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  document.getElementById('inicioGreeting').textContent = 'Hola, ' + nombre + ' — ' + fechaTexto;

  const select = document.getElementById('inicioPeriodo');
  if(!select.dataset.wired){
    select.addEventListener('change', renderInicioKpis);
    select.dataset.wired = '1';
  }
  renderInicioKpis();
  renderInicioDistribucion();
  renderInicioTopClientes();
}

function renderInicioKpis(){
  const periodo = document.getElementById('inicioPeriodo').value;
  const hoy = new Date();
  const aprobadasActual = proposals.filter(p => p.estado === 'Aprobada' && fechaEnRango(p.fecha, periodoRange(periodo, hoy)));
  const aprobadasAnterior = proposals.filter(p => p.estado === 'Aprobada' && fechaEnRango(p.fecha, periodoRangeAnterior(periodo, hoy)));

  const bvActual = aprobadasActual.reduce((s,p)=>s+p.bvMes, 0);
  const bvAnterior = aprobadasAnterior.reduce((s,p)=>s+p.bvMes, 0);
  document.getElementById('inicioKpiBV').textContent = money(bvActual);
  document.getElementById('inicioKpiBVSub').textContent = bvAnterior > 0
    ? (bvActual>=bvAnterior?'+':'') + (((bvActual-bvAnterior)/bvAnterior)*100).toFixed(1) + '% vs. periodo anterior'
    : aprobadasActual.length + (aprobadasActual.length===1 ? ' propuesta aprobada' : ' propuestas aprobadas');

  const rucsAprobados = new Set(aprobadasActual.map(p=>p.ruc));
  const rucsTotales = new Set(proposals.map(p=>p.ruc));
  document.getElementById('inicioKpiClientes').textContent = intFmt(rucsAprobados.size);
  const tasaConversion = rucsTotales.size ? (rucsAprobados.size/rucsTotales.size*100) : 0;
  document.getElementById('inicioKpiClientesSub').textContent = tasaConversion.toFixed(1) + '% tasa de conversión';

  document.getElementById('inicioKpiTarjetas').textContent = intFmt(aprobadasActual.reduce((s,p)=>s+p.cantTarjetas, 0));
  document.getElementById('inicioKpiTarjetasSub').textContent = aprobadasActual.length + (aprobadasActual.length===1 ? ' propuesta aprobada' : ' propuestas aprobadas');
}

function inicioBarRow(label, pct, color){
  return '<div class="inicio-bar-row"><span class="k">'+esc(label)+'</span>'+
    '<div class="inicio-bar-track"><div class="inicio-bar-fill" style="width:'+pct+'%;background:'+color+';"></div></div>'+
    '<span class="v">'+pct.toFixed(0)+'%</span></div>';
}

function renderInicioDistribucion(){
  // MOCK: campo Canal aún no existe en el modelo de datos de Propuestas — reemplazar cuando se agregue
  const canalMock = [
    {label:'Hunter', pct:35, color:'var(--red-hero)'},
    {label:'Farmer', pct:28, color:'var(--benefits-pink)'},
    {label:'Telesales', pct:22, color:'#2554A6'},
    {label:'Sector Público', pct:15, color:'var(--grey)'}
  ];
  document.getElementById('inicioCanalBars').innerHTML = canalMock.map(c => inicioBarRow(c.label, c.pct, c.color)).join('');

  const aprobadas = proposals.filter(p => p.estado === 'Aprobada');
  const bvTotal = aprobadas.reduce((s,p)=>s+p.bvMes, 0);
  const SOLUCION_COLORS = {Food:'var(--red-hero)', Gift:'var(--benefits-pink)', Mobility:'#2554A6'};
  const bySolucion = {Food:0, Gift:0, Mobility:0};
  aprobadas.forEach(p => { if(bySolucion[p.solucion]!==undefined) bySolucion[p.solucion] += p.bvMes; });
  document.getElementById('inicioSolucionBars').innerHTML = Object.keys(bySolucion).map(sol => {
    const pct = bvTotal > 0 ? (bySolucion[sol]/bvTotal*100) : 0;
    return inicioBarRow(sol, pct, SOLUCION_COLORS[sol]);
  }).join('');
}

function renderInicioTopClientes(){
  const aprobadas = proposals.filter(p => p.estado === 'Aprobada');
  const porCliente = {};
  aprobadas.forEach(p => {
    if(!porCliente[p.ruc]) porCliente[p.ruc] = {razonSocial:p.razonSocial, bv:0, solucionCount:{}};
    porCliente[p.ruc].bv += p.bvMes;
    porCliente[p.ruc].solucionCount[p.solucion] = (porCliente[p.ruc].solucionCount[p.solucion]||0) + 1;
  });
  const top = Object.values(porCliente).sort((a,b)=>b.bv-a.bv).slice(0,5);
  const tbody = document.getElementById('inicioTopClientes');
  if(top.length === 0){
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--grey);padding:20px;">Todavía no hay propuestas aprobadas.</td></tr>';
    return;
  }
  tbody.innerHTML = top.map(c => {
    const solucionPrincipal = Object.keys(c.solucionCount).sort((a,b)=>c.solucionCount[b]-c.solucionCount[a])[0];
    return '<tr><td>'+esc(c.razonSocial)+'</td><td><span class="tag-neutral">'+esc(solucionPrincipal)+'</span></td><td class="num">'+money(c.bv)+'</td></tr>';
  }).join('');
}

/* Campos "No editable" ahora son <div class="locked-value"> en vez de
   inputs/selects deshabilitados — estos helpers leen/escriben su texto. */
function setLockedValue(id, text){
  const el = document.getElementById(id);
  const span = el && el.querySelector(".lv-text");
  if(span) span.textContent = text;
}
function getLockedValue(id){
  const el = document.getElementById(id);
  const span = el && el.querySelector(".lv-text");
  return span ? span.textContent : "";
}

/* ---------- Focus trap (drawer / modales) ----------
   Pila de trampas de foco para soportar anidamiento (p.ej. el modal de
   rentabilidad abierto encima del drawer). Al cerrar, devuelve el foco
   al elemento que lo abrió. */
const focusTrapStack = [];
function getFocusable(container){
  return [...container.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')];
}
function trapFocus(container){
  if(focusTrapStack.some(e=>e.container===container)) return;
  const entry = {container, lastFocused: document.activeElement};
  entry.handler = function(e){
    if(e.key !== "Tab") return;
    const items = getFocusable(container);
    if(!items.length) return;
    const first = items[0], last = items[items.length-1];
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  };
  container.addEventListener("keydown", entry.handler);
  focusTrapStack.push(entry);
  const focusables = getFocusable(container);
  if(focusables.length) focusables[0].focus();
}
function releaseFocusTrap(container){
  const idx = focusTrapStack.findIndex(e=>e.container===container);
  if(idx===-1) return;
  const entry = focusTrapStack[idx];
  container.removeEventListener("keydown", entry.handler);
  focusTrapStack.splice(idx,1);
  if(entry.lastFocused && typeof entry.lastFocused.focus === "function"){
    try{ entry.lastFocused.focus(); }catch(err){ /* element may no longer exist */ }
  }
}

/* ============================================================
   STATE
   ============================================================ */
let currentPage = 1;
const PAGE_SIZE = 5;
let filtered = proposals.slice();

/* ============================================================
   KPIs
   ============================================================ */
function renderKPIs(){
  const activas = proposals.filter(p=>p.estado!=="Rechazada");
  const abiertas = proposals.filter(p=>p.estado==="Creada"||p.estado==="Borrador");
  const cerradasMes = proposals.filter(p=>p.estado==="Aprobada" && p.fecha.slice(0,7)==="2026-07");

  const bvAbiertas = abiertas.reduce((s,p)=>s+Number(p.bvMes||0),0);
  const bvCerradas = cerradasMes.reduce((s,p)=>s+Number(p.bvMes||0),0);

  document.getElementById("kpiTotal").textContent = activas.length;
  document.getElementById("kpiTotalDelta").textContent = "+" + Math.max(1, Math.round(activas.length*0.18));
  document.getElementById("kpiOpenBV").textContent = money(bvAbiertas);
  document.getElementById("kpiClosedBV").textContent = money(bvCerradas);
}

/* ============================================================
   FILTERS
   ============================================================ */
function populateProductoFilter(){
  const sel = document.getElementById("fProducto");
  const productos = [...new Set(proposals.map(p=>p.producto))].sort();
  sel.innerHTML = '<option value="">Todos</option>' + productos.map(p=>`<option value="${esc(p)}">${esc(p)}</option>`).join("");
}

function applyProposalsFilters(){
  const cliente = document.getElementById("fCliente").value.trim().toLowerCase();
  const solucion = document.getElementById("fSolucion").value;
  const producto = document.getElementById("fProducto").value;
  const fIni = document.getElementById("fFechaIni").value;
  const fFin = document.getElementById("fFechaFin").value;
  const estado = document.getElementById("fEstado").value;
  const modalidad = document.getElementById("fModalidad").value;

  filtered = proposals.filter(p=>{
    if(cliente && !(p.razonSocial.toLowerCase().includes(cliente) || p.ruc.includes(cliente))) return false;
    if(solucion && p.solucion!==solucion) return false;
    if(producto && p.producto!==producto) return false;
    if(estado==="__ACTIVAS__"){ if(p.estado==="Rechazada") return false; }
    else if(estado==="__ABIERTAS__"){ if(p.estado!=="Creada" && p.estado!=="Borrador") return false; }
    else if(estado){ if(p.estado!==estado) return false; }
    if(modalidad && p.modalidadPago!==modalidad) return false;
    if(fIni && p.fecha < fIni) return false;
    if(fFin && p.fecha > fFin) return false;
    return true;
  });
  currentPage = 1;
  renderProposalsTable();
}

function clearProposalsFilters(){
  ["fCliente"].forEach(id=>document.getElementById(id).value="");
  ["fSolucion","fProducto","fEstado","fModalidad"].forEach(id=>document.getElementById(id).value="");
  ["fFechaIni","fFechaFin"].forEach(id=>document.getElementById(id).value="");
  filtered = proposals.slice();
  currentPage = 1;
  renderProposalsTable();
}

/* ============================================================
   TABLE
   ============================================================ */
function renderProposalsTable(){
  closeRowMenu();
  renderKPIs();
  const tbody = document.getElementById("tableBody");
  document.getElementById("resultCount").textContent = filtered.length;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if(currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage-1)*PAGE_SIZE;
  const pageItems = filtered.slice(start, start+PAGE_SIZE);

  if(pageItems.length===0){
    tbody.innerHTML = `<tr><td colspan="12"><div class="empty-state">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      <strong>No se encontraron propuestas</strong>
      <p>Ajusta los filtros de búsqueda para ver más resultados.</p>
    </div></td></tr>`;
  } else {
    tbody.innerHTML = pageItems.map(p=>{
      const canReject = p.estado!=="Rechazada" && p.estado!=="Aprobada";
      const isRejected = p.estado==="Rechazada";
      return `
      <tr data-id="${p.id}">
        <td class="cell-codigo">${esc(p.codigo)}</td>
        <td>${esc(p.ruc)}</td>
        <td class="cell-empresa"><strong>${esc(p.razonSocial)}</strong><span>${esc(p.giro)}</span></td>
        <td><span class="tag-neutral">${esc(p.solucion)}</span></td>
        <td>${esc(p.producto)}</td>
        <td>${esc(p.tipoProducto)}</td>
        <td class="num">${money(p.bvMes)}</td>
        <td class="num">${intFmt(p.cantTarjetas)}</td>
        <td>${esc(p.modalidadPago)}</td>
        <td class="center"><span class="version-chip">v${p.version}</span></td>
        <td><span class="badge ${badgeClass(p.estado)}">${esc(p.estado)}</span></td>
        <td class="center">
          <div class="row-actions">
            ${isRejected
              ? `<button class="icon-btn newversion" data-action="newversion" data-id="${p.id}" title="Generar nueva versión">
                   <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
                 </button>`
              : `<button class="icon-btn edit" data-action="edit" data-id="${p.id}" title="Editar">
                   <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 00-3-3L5 17v3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
                 </button>`
            }
            <button class="icon-btn history" data-action="history" data-id="${p.id}" title="Ver histórico">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            ${canReject ? `<button class="icon-btn kebab" data-action="menu" data-id="${p.id}" title="Más acciones" aria-haspopup="true">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/></svg>
            </button>` : ``}
          </div>
        </td>
      </tr>`;
    }).join("");
  }

  document.getElementById("pagFrom").textContent = filtered.length ? start+1 : 0;
  document.getElementById("pagTo").textContent = Math.min(start+PAGE_SIZE, filtered.length);
  document.getElementById("pagTotal").textContent = filtered.length;
  renderPagination(totalPages);
}

function renderPagination(totalPages){
  const wrap = document.getElementById("pagControls");
  let html = `<button class="page-btn" data-page="prev" ${currentPage===1?"disabled":""}>
      <svg viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>`;
  for(let i=1;i<=totalPages;i++){
    html += `<button class="page-btn ${i===currentPage?"active":""}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="page-btn" data-page="next" ${currentPage===totalPages?"disabled":""}>
      <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>`;
  wrap.innerHTML = html;
}

/* ============================================================
   DRAWER — CRUD
   ============================================================ */
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
let drawerMode = "new";      // 'new' | 'edit' | 'newversion'
let drawerTargetId = null;   // id of proposal being edited (edit mode) or source (newversion)
let workingRepresentantes = [];
let workingDistribucion = [];
let workingCondiciones = [];
let originalSnapshot = null; // used to detect field changes that force a new version
let nextVersionForEdit = null; // version number that will be assigned if changes are saved

function condRowsFromProposal(p){
  const rows = [
    {key:"comisionCliente", concepto:"Comisión Cliente", tipo:"porcentual", valor:p.comisionCliente||0, exonerado:false, custom:false},
    {key:"facturaMinima", concepto:"Factura mínima", tipo:"moneda", valor:p.facturaMinima||0, exonerado:false, custom:false}
  ];
  EXPENSE_KEYS.forEach(e=>{
    const v = (p.expenses && p.expenses[e.key]) || {monto:0, exonerado:false};
    rows.push({key:e.key, concepto:e.label, tipo:"moneda", valor:v.monto, exonerado:v.exonerado, custom:false});
  });
  (p.condicionesExtra||[]).forEach(c=>{
    const isKnownPreset = COND_CUSTOM_PRESETS.includes(c.concepto) && c.concepto!=="Otro personalizado";
    rows.push({
      key:null, concepto:c.concepto, tipo:c.tipo, valor:c.valor, exonerado:c.exonerado, custom:true,
      presetValue: isKnownPreset ? c.concepto : "Otro personalizado",
      customText: isKnownPreset ? "" : c.concepto
    });
  });
  return rows;
}

/* Los ítems base se identifican por `key` (estable), no por el texto del
   concepto — así un typo o una traducción del label ya no rompe el mapeo.
   Solo las filas personalizadas (agregadas por el usuario) usan un selector
   de presets con texto libre únicamente para la opción "Otro personalizado". */
function mapCondiciones(){
  let comisionCliente = 0, facturaMinima = 0;
  const expenses = {};
  EXPENSE_KEYS.forEach(e=> expenses[e.key] = {monto:0, exonerado:true});
  const extra = [];
  workingCondiciones.forEach(c=>{
    if(c.key==="comisionCliente"){ comisionCliente = c.exonerado?0:(+c.valor||0); return; }
    if(c.key==="facturaMinima"){ facturaMinima = c.exonerado?0:(+c.valor||0); return; }
    if(c.key){ expenses[c.key] = {monto:+c.valor||0, exonerado:!!c.exonerado}; return; }
    const concepto = (c.customText && c.customText.trim()) ? c.customText.trim() : (c.presetValue || "Condición personalizada");
    extra.push({concepto, tipo:c.tipo, valor:+c.valor||0, exonerado:!!c.exonerado});
  });
  return {comisionCliente, facturaMinima, expenses, condicionesExtra:extra};
}

function renderCondicionesTable(){
  const body = document.getElementById("condicionesBody");
  if(!workingCondiciones.length){
    body.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--grey);font-size:12px;padding:14px;">Sin condiciones registradas</td></tr>`;
    return;
  }
  body.innerHTML = workingCondiciones.map((c,i)=>{
    const conceptoCell = c.custom
      ? `<select class="cond-concepto-preset" data-idx="${i}">
           ${COND_CUSTOM_PRESETS.map(preset=>`<option value="${esc(preset)}" ${c.presetValue===preset?"selected":""}>${esc(preset)}</option>`).join("")}
         </select>
         ${c.presetValue==="Otro personalizado" ? `<input type="text" class="cond-concepto-text" data-idx="${i}" value="${esc(c.customText||"")}" placeholder="Nombre de la condición" style="margin-top:6px;">` : ``}`
      : `<span class="cond-locked" title="Condición estándar — no editable">
           <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" stroke-width="1.8"/></svg>
           ${esc(c.concepto)}
         </span>`;
    const tipoCell = c.custom
      ? `<select class="cond-tipo" data-idx="${i}">
           <option value="moneda" ${c.tipo==="moneda"?"selected":""}>Moneda</option>
           <option value="porcentual" ${c.tipo==="porcentual"?"selected":""}>Porcentual</option>
         </select>`
      : `<span class="tag-neutral">${c.tipo==="moneda"?"Moneda":"Porcentual"}</span>`;
    return `
    <tr data-idx="${i}" class="${c.exonerado ? "cond-row-exempt" : ""}">
      <td>${conceptoCell}</td>
      <td>${tipoCell}</td>
      <td>
        <div class="${c.tipo==="moneda"?"input-currency":"input-percent"}">
          <input type="number" class="cond-valor" data-idx="${i}" min="0" step="0.01" value="${c.valor}" ${c.exonerado?"disabled":""}>
        </div>
      </td>
      <td class="center">
        <div class="exempt-cell">
          <label class="switch sm tone-pink"><input type="checkbox" class="cond-exonerar" data-idx="${i}" ${c.exonerado?"checked":""}><span class="track"></span><span class="thumb"></span></label>
          ${c.exonerado ? `<span class="exempt-badge">Exonerado</span>` : ``}
        </div>
      </td>
      <td class="center">
        <button type="button" class="mini-row-remove cond-remove" data-idx="${i}" title="Eliminar condición">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </td>
    </tr>`;
  }).join("");

  body.querySelectorAll(".cond-concepto-preset").forEach(sel=>{
    sel.addEventListener("change", e=>{
      const idx = +e.target.dataset.idx;
      workingCondiciones[idx].presetValue = e.target.value;
      if(e.target.value !== "Otro personalizado") workingCondiciones[idx].customText = "";
      renderCondicionesTable();
      refreshVersionBanner();
    });
  });
  body.querySelectorAll(".cond-concepto-text").forEach(inp=>{
    inp.addEventListener("input", e=>{ workingCondiciones[+e.target.dataset.idx].customText = e.target.value; });
  });
  body.querySelectorAll(".cond-tipo").forEach(sel=>{
    sel.addEventListener("change", e=>{
      workingCondiciones[+e.target.dataset.idx].tipo = e.target.value;
      renderCondicionesTable();
      refreshVersionBanner();
    });
  });
  body.querySelectorAll(".cond-valor").forEach(inp=>{
    inp.addEventListener("input", e=>{ workingCondiciones[+e.target.dataset.idx].valor = +e.target.value || 0; });
  });
  body.querySelectorAll(".cond-exonerar").forEach(chk=>{
    chk.addEventListener("change", e=>{
      const idx = +e.target.dataset.idx;
      workingCondiciones[idx].exonerado = e.target.checked;
      if(e.target.checked) workingCondiciones[idx].valor = 0;
      renderCondicionesTable();
      refreshVersionBanner();
    });
  });
  body.querySelectorAll(".cond-remove").forEach(btn=>{
    btn.addEventListener("click", e=>{
      workingCondiciones.splice(+e.currentTarget.dataset.idx, 1);
      renderCondicionesTable();
      refreshVersionBanner();
    });
  });
}


function renderRepresentantesTable(){
  const body = document.getElementById("representantesBody");
  if(!workingRepresentantes.length){
    body.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--grey);font-size:12px;padding:14px;">Sin representantes registrados</td></tr>`;
    return;
  }
  body.innerHTML = workingRepresentantes.map(r=>`
    <tr>
      <td>${esc(r.tipoDoc)}</td>
      <td>${esc(r.numDoc)}</td>
      <td>${esc(r.nombres)}</td>
      <td>${esc(r.apellidos)}</td>
      <td>${esc(r.cargo)}</td>
    </tr>`).join("");
}

function renderDistribucionTable(){
  const body = document.getElementById("distribucionBody");
  body.innerHTML = workingDistribucion.map((d,i)=>`
    <tr data-idx="${i}">
      <td>
        <select class="dest-select" data-idx="${i}">
          <option value="Lima" ${d.destino==="Lima"?"selected":""}>Lima</option>
          <option value="Provincia" ${d.destino==="Provincia"?"selected":""}>Provincia</option>
        </select>
      </td>
      <td><input type="number" class="dest-cant" data-idx="${i}" min="0" step="1" placeholder="0" value="${d.cantidadPuntos ?? 0}"></td>
      <td><button type="button" class="mini-row-remove" data-idx="${i}" title="Eliminar">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button></td>
    </tr>`).join("");

  body.querySelectorAll(".dest-select").forEach(sel=>{
    sel.addEventListener("change", e=>{ workingDistribucion[+e.target.dataset.idx].destino = e.target.value; });
  });
  body.querySelectorAll(".dest-cant").forEach(inp=>{
    inp.addEventListener("input", e=>{ workingDistribucion[+e.target.dataset.idx].cantidadPuntos = +e.target.value || 0; });
  });
  body.querySelectorAll(".mini-row-remove").forEach(btn=>{
    btn.addEventListener("click", e=>{
      const idx = +e.currentTarget.dataset.idx;
      workingDistribucion.splice(idx,1);
      renderDistribucionTable();
      refreshVersionBanner();
    });
  });
}

function updateConditionalFields(){
  const modalidad = document.getElementById("f_modalidadPago").value;
  const diasCredito = document.getElementById("f_diasCredito");
  diasCredito.disabled = modalidad !== "Crédito";
  if(diasCredito.disabled) diasCredito.value = "0";

  const rebateOn = document.getElementById("f_rebateToggle").checked;
  document.getElementById("f_rebateTipo").disabled = !rebateOn;
  document.getElementById("f_rebateValor").disabled = !rebateOn;
  const rebateTipo = document.getElementById("f_rebateTipo").value;
  const rebateWrap = document.getElementById("rebateValorWrap");
  rebateWrap.classList.toggle("input-currency", rebateTipo==="monto");
  rebateWrap.classList.toggle("input-percent", rebateTipo==="porcentaje");

  const customOn = document.getElementById("f_productoCustom").checked;
  document.getElementById("f_mdrNegociado").disabled = !customOn;
  if(!customOn) document.getElementById("f_mdrNegociado").value = "0";
}

function fillForm(p){
  setLockedValue("f_ruc", p.ruc || "Pendiente de selección de cliente");
  setLockedValue("f_razonSocial", p.razonSocial);
  setLockedValue("f_giro", p.giro);
  document.getElementById("f_esCliente").checked = !!p.esCliente;
  setLockedValue("f_direccion", p.direccion || "—");
  workingRepresentantes = JSON.parse(JSON.stringify(p.representantes||[]));
  renderRepresentantesTable();

  setLockedValue("f_solucion", p.solucion);
  setLockedValue("f_marca", p.marca);
  setLockedValue("f_sector", p.sector);
  setLockedValue("f_categoria", p.categoria);
  document.getElementById("f_bvMes").value = p.bvMes;
  document.getElementById("f_cantTarjetas").value = p.cantTarjetas;
  document.getElementById("f_cargasAnio").value = p.cargasAnio;
  document.getElementById("f_tipoProducto").value = p.tipoProducto;
  document.getElementById("f_valorFacial").value = p.valorFacial;
  document.getElementById("f_modalidadPago").value = p.modalidadPago;
  document.getElementById("f_diasCredito").value = p.diasCredito;
  document.getElementById("f_rebateToggle").checked = !!p.rebate.activo;
  document.getElementById("f_rebateTipo").value = p.rebate.tipo;
  document.getElementById("f_rebateValor").value = p.rebate.valor;

  workingCondiciones = condRowsFromProposal(p);
  renderCondicionesTable();

  workingDistribucion = JSON.parse(JSON.stringify(p.distribucion||[]));
  renderDistribucionTable();

  document.getElementById("f_logoEmpresa").checked = !!p.logoEmpresa;
  document.getElementById("f_cartaFianza").checked = !!p.cartaFianza;
  document.getElementById("f_productoCustom").checked = !!p.productoCustom;
  document.getElementById("f_mdrNegociado").value = p.mdrNegociado;

  renderApprovalTable(p);

  updateConditionalFields();
}

function deriveProducto(data){
  return data.solucion==="Food" ? "Tarjeta Alimentación " + (data.categoria!=="No aplica"?data.categoria:"Estándar")
    : data.solucion==="Gift" ? "Gift Card " + (data.tipoProducto==="Virtual"?"Digital":"Física")
    : "Tarjeta Movilidad";
}
function nextCodigo(){
  const n = proposals.length + 1;
  return "COD-2026-" + String(n).padStart(3,"0");
}

/* Simula la consulta al maestro de clientes: busca el RUC entre las
   propuestas ya existentes y devuelve sus datos de empresa. */
function lookupClienteByRuc(ruc){
  const match = proposals.find(p => p.ruc === ruc);
  if(!match) return null;
  return {razonSocial: match.razonSocial, giro: match.giro, esCliente: match.esCliente, direccion: match.direccion};
}

function blankTemplate(){
  return {
    ruc:"", razonSocial:"Cliente por definir", giro:GIRO_OPTIONS[0], esCliente:false,
    direccion:"", representantes:[],
    solucion:"Food", marca:"Mastercard", sector:"Privado", categoria:"Esencial",
    bvMes:0, cantTarjetas:0, cargasAnio:0, tipoProducto:"Físico", valorFacial:0,
    modalidadPago:"Crédito", diasCredito:0,
    rebate:{activo:false,tipo:"monto",valor:0},
    comisionCliente:0, facturaMinima:0,
    expenses: makeExpenses([0,0,0,0,0,0,0,0], []),
    condicionesExtra: [],
    distribucion:[{destino:"Lima",cantidadPuntos:0}],
    logoEmpresa:false, cartaFianza:false, productoCustom:false, mdrNegociado:0,
    producto:"Producto por definir", estado:"Borrador", version:1, fecha: new Date().toISOString().slice(0,10),
    solicitudes:[]
  };
}

function collectFormData(){
  const cond = mapCondiciones();
  return {
    ruc: getLockedValue("f_ruc"),
    razonSocial: getLockedValue("f_razonSocial"),
    giro: getLockedValue("f_giro"),
    esCliente: document.getElementById("f_esCliente").checked,
    direccion: getLockedValue("f_direccion"),
    representantes: workingRepresentantes,
    solucion: getLockedValue("f_solucion"),
    marca: getLockedValue("f_marca"),
    sector: getLockedValue("f_sector"),
    categoria: getLockedValue("f_categoria"),
    bvMes: +document.getElementById("f_bvMes").value || 0,
    cantTarjetas: +document.getElementById("f_cantTarjetas").value || 0,
    cargasAnio: +document.getElementById("f_cargasAnio").value || 0,
    tipoProducto: document.getElementById("f_tipoProducto").value,
    valorFacial: +document.getElementById("f_valorFacial").value || 0,
    modalidadPago: document.getElementById("f_modalidadPago").value,
    diasCredito: +document.getElementById("f_diasCredito").value || 0,
    rebate:{
      activo: document.getElementById("f_rebateToggle").checked,
      tipo: document.getElementById("f_rebateTipo").value,
      valor: +document.getElementById("f_rebateValor").value || 0
    },
    comisionCliente: cond.comisionCliente,
    facturaMinima: cond.facturaMinima,
    expenses: cond.expenses,
    condicionesExtra: cond.condicionesExtra,
    distribucion: workingDistribucion,
    logoEmpresa: document.getElementById("f_logoEmpresa").checked,
    cartaFianza: document.getElementById("f_cartaFianza").checked,
    productoCustom: document.getElementById("f_productoCustom").checked,
    mdrNegociado: +document.getElementById("f_mdrNegociado").value || 0
  };
}

function openDrawer(mode, id){
  drawerMode = mode;
  drawerTargetId = id || null;

  let source;
  if(mode==="new"){
    source = blankTemplate();
    document.getElementById("drawerEyebrow").textContent = "Nueva propuesta";
    document.getElementById("drawerCodigo").textContent = "Se genera al guardar";
  } else if(mode==="edit"){
    source = findProposal(id);
    document.getElementById("drawerEyebrow").textContent = "Editar propuesta · v" + source.version;
    document.getElementById("drawerCodigo").textContent = source.codigo;
  } else if(mode==="newversion"){
    const base = findProposal(id);
    source = JSON.parse(JSON.stringify(base));
    document.getElementById("drawerEyebrow").textContent = "Nueva versión desde propuesta rechazada";
    document.getElementById("drawerCodigo").textContent = base.codigo + " · próxima v" + (base.version+1);
  }

  document.getElementById("drawerTitle").textContent = source.razonSocial;
  document.getElementById("drawerRuc").textContent = source.ruc || "RUC por definir";
  fillForm(source);
  originalSnapshot = (mode==="edit") ? JSON.stringify(collectFormData()) : null;
  nextVersionForEdit = (mode==="edit") ? source.version + 1 : null;
  refreshVersionBanner();

  // Reject button only visible when editing an existing, non-terminal proposal
  document.getElementById("btnRejectFromDrawer").style.display =
    (mode==="edit" && source.estado!=="Rechazada" && source.estado!=="Aprobada") ? "inline-flex" : "none";

  document.querySelectorAll(".drawer-nav-item").forEach((b,i)=>b.classList.toggle("active", i===0));
  document.getElementById("drawerForm").scrollTop = 0;

  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
  overlay.classList.add("visible");
  trapFocus(drawer);
}

function closeDrawer(){
  releaseFocusTrap(drawer);
  drawer.classList.remove("open");
  drawer.classList.remove("expanded");
  drawer.setAttribute("aria-hidden","true");
  overlay.classList.remove("visible");
}

/* Único campo cuyo cambio dispara automáticamente una nueva versión.
   El resto de campos comerciales se pueden editar libremente y se
   guardan sobre la MISMA versión — antes cualquier cambio generaba
   versión nueva, lo cual no reflejaba el proceso real. */
const FIELD_LABELS = {
  modalidadPago:"Modalidad de pago"
};
function diffFields(original, updated){
  return Object.keys(FIELD_LABELS).filter(k => JSON.stringify(original[k]) !== JSON.stringify(updated[k])).map(k=>FIELD_LABELS[k]);
}

/* Muestra en tiempo real que el cambio actual generará una nueva versión,
   ANTES de que el usuario guarde (evita sorpresas post-guardado). */
function refreshVersionBanner(){
  const banner = document.getElementById("versionBanner");
  if(drawerMode !== "edit" || !originalSnapshot){
    banner.style.display = "none";
    return;
  }
  const data = collectFormData();
  const changed = diffFields(JSON.parse(originalSnapshot), data);
  if(changed.length){
    banner.style.display = "flex";
    banner.querySelector(".vb-text").innerHTML =
      `Este cambio generará automáticamente la <b>versión v${nextVersionForEdit}</b> al guardar — campos modificados: ${esc(changed.join(", "))}.`;
  } else {
    banner.style.display = "none";
  }
}

function saveProposal(estadoDestino){
  const data = collectFormData();

  if(drawerMode==="edit"){
    const p = findProposal(drawerTargetId);
    const original = originalSnapshot ? JSON.parse(originalSnapshot) : data;
    const changedFields = diffFields(original, data);
    const bumpsVersion = estadoDestino !== "Borrador" && changedFields.length > 0;
    Object.assign(p, data);
    p.estado = estadoDestino;
    p.fecha = new Date().toISOString().slice(0,10);
    if(bumpsVersion) p.version += 1;
    let resumen;
    if(bumpsVersion) resumen = `Nueva versión generada automáticamente por cambios en: ${changedFields.join(", ")}.`;
    else if(estadoDestino==="Borrador") resumen = "Cambios guardados como borrador.";
    else resumen = "Propuesta actualizada sin cambios en campos comerciales clave.";
    p.historial.push({version:p.version, fecha:p.fecha, estado:estadoDestino, usuario:"F. Ruiz", resumen});
    flashRow(p.id);
    showToast(bumpsVersion ? `Nueva versión v${p.version} generada automáticamente (${changedFields.length} cambio${changedFields.length>1?"s":""}).` : resumen, "success");
  } else {
    let baseCodigo, baseVersion=1, producto, historialBase=[], solicitudesBase=[];
    if(drawerMode==="newversion"){
      const base = findProposal(drawerTargetId);
      baseCodigo = base.codigo;
      baseVersion = base.version + 1;
      producto = base.producto;
      historialBase = JSON.parse(JSON.stringify(base.historial));
      solicitudesBase = JSON.parse(JSON.stringify(base.solicitudes||[]));
    } else {
      baseCodigo = nextCodigo();
      producto = deriveProducto(data);
    }
    const fecha = new Date().toISOString().slice(0,10);
    const newP = Object.assign({}, data, {
      id: nextId(), codigo: baseCodigo, producto, estado: estadoDestino, version: baseVersion, fecha,
      solicitudes: solicitudesBase,
      historial: historialBase.concat([{version:baseVersion, fecha, estado:estadoDestino, usuario:"F. Ruiz",
        resumen: drawerMode==="newversion" ? "Nueva versión generada a partir de una propuesta rechazada, con condiciones renegociadas." : "Propuesta inicial creada."}])
    });
    proposals.unshift(newP);
    flashRow(newP.id);
    showToast(drawerMode==="newversion" ? `Versión v${baseVersion} generada para ${baseCodigo}.` : "Nueva propuesta creada correctamente.", "success");
  }

  closeDrawer();
  populateProductoFilter();
  applyProposalsFilters();
}

function flashRow(id){
  setTimeout(()=>{
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if(row) row.classList.add("row-flash");
  }, 60);
}

/* ---------- Row overflow menu (kebab) ---------- */
let rowMenuTargetId = null;
const rowMenuPopover = document.getElementById("rowMenuPopover");

function toggleRowMenu(triggerBtn, id){
  if(rowMenuPopover.classList.contains("open") && rowMenuTargetId===id){
    closeRowMenu();
    return;
  }
  rowMenuTargetId = id;
  const rect = triggerBtn.getBoundingClientRect();
  const popW = 188;
  let left = rect.right - popW;
  left = Math.max(8, Math.min(left, window.innerWidth - popW - 8));
  let top = rect.bottom + 6;
  if(top + 60 > window.innerHeight) top = rect.top - 54; // flip above if near bottom edge
  /* getBoundingClientRect() ya devuelve coordenadas en espacio "zoomeado";
     al escribirlas de vuelta como style.left/top, html{zoom} las vuelve a
     escalar, desplazando el popover. Se compensa dividiendo por el zoom
     vigente (1 en mobile, donde no se aplica zoom). */
  const zoomFactor = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
  rowMenuPopover.style.left = (left / zoomFactor) + "px";
  rowMenuPopover.style.top = (top / zoomFactor) + "px";
  rowMenuPopover.classList.add("open");
  document.querySelectorAll('.icon-btn.kebab[aria-expanded="true"]').forEach(b=>b.setAttribute("aria-expanded","false"));
  triggerBtn.setAttribute("aria-expanded","true");
}
function closeRowMenu(){
  rowMenuPopover.classList.remove("open");
  document.querySelectorAll('.icon-btn.kebab[aria-expanded="true"]').forEach(b=>b.setAttribute("aria-expanded","false"));
  rowMenuTargetId = null;
}

/* ---------- Reject flow ---------- */
const rejectModal = document.getElementById("rejectModal");
let rejectTargetId = null;

function openRejectModal(id){
  rejectTargetId = id;
  const p = findProposal(id);
  document.getElementById("rejectCodigo").textContent = p.codigo;
  document.getElementById("rejectReason").value = "";
  rejectModal.classList.add("open");
  overlay.classList.add("visible");
  trapFocus(rejectModal);
}
function closeModalById(id){
  const modalEl = document.getElementById(id);
  releaseFocusTrap(modalEl);
  modalEl.classList.remove("open");
  if(!drawer.classList.contains("open")) overlay.classList.remove("visible");
}
function closeAllModals(){
  document.querySelectorAll(".modal.open").forEach(m=>{ releaseFocusTrap(m); m.classList.remove("open"); });
}
function confirmReject(){
  const p = findProposal(rejectTargetId);
  const motivo = document.getElementById("rejectReason").value.trim() || "Sin motivo detallado.";
  p.estado = "Rechazada";
  p.fecha = new Date().toISOString().slice(0,10);
  p.historial.push({version:p.version, fecha:p.fecha, estado:"Rechazada", usuario:"F. Ruiz", resumen:"Propuesta rechazada manualmente desde el panel de gestión.", motivo});
  closeModalById("rejectModal");
  closeDrawer();
  flashRow(p.id);
  showToast(`Propuesta ${p.codigo} marcada como Rechazada.`, "danger");
  applyProposalsFilters();
}

/* ---------- History modal ---------- */
function openProposalHistoryModal(id){
  const p = findProposal(id);
  document.getElementById("historyCliente").textContent = p.razonSocial;
  document.getElementById("historyCodigo").textContent = p.codigo;
  const tl = document.getElementById("historyTimeline");
  tl.innerHTML = p.historial.slice().reverse().map((h,idx)=>{
    const isCurrent = idx===0;
    const cls = isCurrent ? "is-current" : (h.estado==="Rechazada" ? "is-rejected" : h.estado==="Aprobada" ? "is-approved" : "");
    return `
    <li class="timeline-item ${cls}">
      <span class="timeline-dot">v${h.version}</span>
      <div class="timeline-card">
        <div class="timeline-card-head">
          <strong>${esc(h.estado)}</strong>
          <span class="badge ${badgeClass(h.estado)}">${isCurrent ? "Versión actual" : "v"+h.version}</span>
        </div>
        <p class="timeline-meta">${fmtDate(h.fecha)} · ${esc(h.usuario)}</p>
        <p class="timeline-summary">${esc(h.resumen)}</p>
        ${h.motivo ? `<div class="timeline-reason">"${esc(h.motivo)}"</div>` : ``}
      </div>
    </li>`;
  }).join("");
  document.getElementById("historyModal").classList.add("open");
  overlay.classList.add("visible");
  trapFocus(document.getElementById("historyModal"));
}

/* ---------- Flujos de aprobación (Línea de crédito / Excepciones) ---------- */
const APPROVAL_STEPS = {
  "Línea de Crédito": ["Registrado","Evaluación de riesgo","Comité de crédito","Resolución"],
  "Excepción": ["Registrado","Revisión comercial","Aprobación gerencial","Resolución"]
};
function approvalBadgeClass(estado){
  return {"Registrado":"badge-req-registrado","En Atención":"badge-req-atencion","Aprobado":"badge-req-aprobado","Rechazado":"badge-req-rechazado","Anulado":"badge-req-anulado"}[estado] || "badge-req-registrado";
}
function renderApprovalTable(p){
  const body = document.getElementById("approvalBody");
  const solicitudes = p.solicitudes || [];
  if(!solicitudes.length){
    body.innerHTML = `<tr><td colspan="5"><div class="empty-approval">Aún no se han registrado solicitudes de línea de crédito o excepciones para esta propuesta.</div></td></tr>`;
    return;
  }
  body.innerHTML = solicitudes.map(s=>{
    const canAnular = s.estado==="Registrado" || s.estado==="En Atención";
    return `
    <tr>
      <td style="font-weight:700;">${esc(s.id)}</td>
      <td>${esc(s.tipo)}</td>
      <td>${fmtDate(s.fechaCreacion)}</td>
      <td><span class="badge ${approvalBadgeClass(s.estado)}">${esc(s.estado)}</span></td>
      <td class="center">
        <div class="row-actions" style="justify-content:center;">
          <button type="button" class="icon-btn history" data-stage-action="ver" data-sol="${esc(s.id)}" title="Ver etapa">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M4 12s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.7"/></svg>
          </button>
          ${canAnular ? `<button type="button" class="icon-btn reject" data-stage-action="anular" data-sol="${esc(s.id)}" title="Anular solicitud">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>` : ``}
        </div>
      </td>
    </tr>`;
  }).join("");
}

let stageTargetSolId = null;
let reevalFiles = [];

function renderReevalFiles(){
  const list = document.getElementById("reevalFileList");
  if(!list) return;
  list.innerHTML = reevalFiles.map((f,i)=>`<span class="file-chip">${esc(f)}<button type="button" data-fileidx="${i}">
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  </button></span>`).join("");
  list.querySelectorAll("button[data-fileidx]").forEach(btn=>{
    btn.addEventListener("click", e=>{
      reevalFiles.splice(+e.currentTarget.dataset.fileidx, 1);
      renderReevalFiles();
    });
  });
}

function openStageModal(solId){
  const p = findProposal(drawerTargetId);
  if(!p) return;
  const s = (p.solicitudes||[]).find(x=>x.id===solId);
  if(!s) return;
  stageTargetSolId = solId;
  reevalFiles = [];

  document.getElementById("stageCodigo").textContent = s.id;
  document.getElementById("stageTipo").textContent = s.tipo;

  const steps = APPROVAL_STEPS[s.tipo] || APPROVAL_STEPS["Línea de Crédito"];
  const stepper = document.getElementById("stageStepper");

  if(s.estado==="Anulado"){
    stepper.innerHTML = `<div style="width:100%;text-align:center;padding:18px 0;color:var(--grey);font-size:12.5px;">
      <strong style="display:block;color:var(--black);font-size:13.5px;margin-bottom:4px;">Solicitud anulada</strong>
      ${esc(s.motivo || "Esta solicitud fue anulada y no continuará su flujo de aprobación.")}
    </div>`;
  } else {
    let currentIdx = 0, rejected = false;
    if(s.estado==="Registrado") currentIdx = 0;
    else if(s.estado==="En Atención") currentIdx = 1;
    else if(s.estado==="Aprobado") currentIdx = steps.length-1;
    else if(s.estado==="Rechazado"){ currentIdx = steps.length-1; rejected = true; }

    stepper.innerHTML = steps.map((label,i)=>{
      let cls = "";
      const isDone = i < currentIdx || (i===currentIdx && s.estado==="Aprobado");
      if(isDone) cls = "st-done";
      else if(i===currentIdx) cls = rejected ? "st-rejected" : "st-current";
      return `<div class="stepper-step ${cls}">
        <span class="st-line"></span>
        <div class="stepper-circle">${isDone ? "✓" : (i===currentIdx && rejected ? "✕" : i+1)}</div>
        <div class="stepper-label">${esc(label)}</div>
        ${i===currentIdx ? `<div class="stepper-date">${fmtDate(s.fechaCreacion)}</div>` : ``}
      </div>`;
    }).join("");
  }

  const reevalSection = document.getElementById("reevalSection");
  const btnSubmit = document.getElementById("btnSubmitReeval");
  if(s.estado==="Rechazado"){
    reevalSection.innerHTML = `
      <div class="reeval-box">
        <h5>Solicitar reevaluación</h5>
        <p class="hint">Indica el motivo y contexto de la reevaluación, y adjunta los documentos que sustenten tu solicitud.</p>
        ${s.motivo ? `<div class="timeline-reason" style="margin-bottom:12px;">Motivo de rechazo: "${esc(s.motivo)}"</div>` : ``}
        <label class="block-label" for="reevalMotivo">Motivo y contexto</label>
        <textarea id="reevalMotivo" placeholder="Describe el motivo y contexto de la reevaluación…"></textarea>
        <div class="file-drop" id="reevalFileDrop" style="margin-top:10px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M12 16V4M7 9l5-5 5 5M5 20h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Haz clic para adjuntar documentos de sustento
        </div>
        <div class="file-chip-list" id="reevalFileList"></div>
      </div>`;
    btnSubmit.style.display = "inline-flex";
    document.getElementById("reevalFileDrop").addEventListener("click", ()=>{
      const n = reevalFiles.length + 1;
      reevalFiles.push(`sustento_${s.id}_0${n}.pdf`);
      renderReevalFiles();
    });
  } else {
    reevalSection.innerHTML = "";
    btnSubmit.style.display = "none";
  }

  document.getElementById("stageModal").classList.add("open");
  overlay.classList.add("visible");
  trapFocus(document.getElementById("stageModal"));
}

function anularSolicitud(solId){
  const p = findProposal(drawerTargetId);
  if(!p) return;
  const s = (p.solicitudes||[]).find(x=>x.id===solId);
  if(!s) return;
  s.estado = "Anulado";
  renderApprovalTable(p);
  showToast(`Solicitud ${s.id} anulada.`, "danger");
}

function submitReevaluacion(){
  const p = findProposal(drawerTargetId);
  if(!p) return;
  const s = (p.solicitudes||[]).find(x=>x.id===stageTargetSolId);
  if(!s) return;
  const motivo = document.getElementById("reevalMotivo").value.trim();
  if(!motivo){
    showToast("Ingresa el motivo y contexto de la reevaluación.", "danger");
    return;
  }
  s.estado = "En Atención";
  s.reevaluaciones = s.reevaluaciones || [];
  s.reevaluaciones.push({fecha: new Date().toISOString().slice(0,10), motivo, documentos: reevalFiles.slice()});
  closeModalById("stageModal");
  renderApprovalTable(p);
  showToast(`Reevaluación solicitada para ${s.id}. Estado actualizado a En Atención.`, "success");
}

/* ---------- Validador de rentabilidad (semáforo) ---------- */
function computeRentabilidad(p){
  const costoServicio = EXPENSE_KEYS.reduce((sum,e)=>{
    const v = p.expenses ? p.expenses[e.key] : null;
    return sum + (v && !v.exonerado ? (+v.monto||0) : 0);
  }, 0) + (p.condicionesExtra||[]).reduce((sum,c)=> sum + (c.tipo==="moneda" && !c.exonerado ? (+c.valor||0) : 0), 0);

  const ingresoComision = (p.bvMes||0) * ((p.comisionCliente||0)/100);
  const costoRebate = p.rebate && p.rebate.activo
    ? (p.rebate.tipo==="porcentaje" ? (p.bvMes||0)*((p.rebate.valor||0)/100) : (p.rebate.valor||0))
    : 0;
  const margenNeto = ingresoComision - costoServicio - costoRebate;
  const margenPct = p.bvMes > 0 ? (margenNeto / p.bvMes) * 100 : 0;

  let nivel, mensaje;
  if(margenPct >= 1.2){
    nivel = "verde";
    mensaje = "El margen cumple con lo esperado. Puedes generar la cotización con confianza.";
  } else if(margenPct >= 0.4){
    nivel = "ambar";
    mensaje = "El margen está justo en el límite aceptable. Te recomendamos ajustar las condiciones comerciales antes de continuar.";
  } else {
    nivel = "rojo";
    mensaje = "Las condiciones actuales no alcanzan el margen mínimo requerido. Ajusta la propuesta antes de continuar.";
  }
  return {nivel, mensaje, margenNeto, margenPct, costoServicio, ingresoComision, costoRebate};
}

const SEMAFORO_ICONS = {
  verde: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ambar: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 16.5h.01" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M10.3 3.9L2.6 18a1.6 1.6 0 001.4 2.4h16a1.6 1.6 0 001.4-2.4L13.7 3.9a1.6 1.6 0 00-2.8 0z" stroke="currentColor" stroke-width="2"/></svg>',
  rojo: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>'
};

function openRentabModal(data, codigoLabel){
  const r = computeRentabilidad(data);

  document.getElementById("rentabCodigo").textContent = codigoLabel;
  ["semRojo","semAmbar","semVerde"].forEach(elId=>document.getElementById(elId).classList.remove("active"));
  const map = {rojo:"semRojo", ambar:"semAmbar", verde:"semVerde"};
  document.getElementById(map[r.nivel]).classList.add("active");

  const resultEl = document.getElementById("semResult");
  resultEl.className = "semaforo-result " + r.nivel;
  document.getElementById("semIcon").innerHTML = SEMAFORO_ICONS[r.nivel];
  document.getElementById("semLabel").textContent = r.nivel==="verde" ? "Rentable" : r.nivel==="ambar" ? "En el límite" : "No rentable";
  document.getElementById("semDesc").textContent = r.mensaje;

  const btnCotizar = document.getElementById("btnGenerarCotizacion");
  btnCotizar.style.display = r.nivel==="verde" ? "inline-flex" : "none";
  btnCotizar.dataset.codigo = codigoLabel;

  document.getElementById("rentabModal").classList.add("open");
  overlay.classList.add("visible");
  trapFocus(document.getElementById("rentabModal"));
}

/* ============================================================
   POPUP — Nueva Oportunidad (solo creación)
   ============================================================ */
let oportunidadDirty = false;

function resetOportunidadForm(){
  oportunidadDirty = false;
  document.getElementById("oportunidadForm").reset();
  document.getElementById("op_ruc").value = "";
  setStaticValue("op_razonSocial", "Se completa al ingresar el RUC", true);
  setStaticValue("op_giro", "—", true);
  setStaticValue("op_esCliente", "—", true);
  setStaticValue("op_direccion", "—", true);
  document.getElementById("rucLookupStatus").textContent = "";
  document.getElementById("rucLookupStatus").className = "ruc-lookup-status";
  updateDiasCreditoVisibility();
  document.querySelectorAll("#oportunidadForm .field-group.field-error").forEach(g=>g.classList.remove("field-error"));
  document.getElementById("oportunidadForm").scrollTop = 0;
}

function setStaticValue(id, text, empty){
  const el = document.getElementById(id);
  el.textContent = text;
  el.classList.toggle("is-empty", !!empty);
}

function handleRucLookup(){
  const ruc = document.getElementById("op_ruc").value.trim();
  const statusEl = document.getElementById("rucLookupStatus");
  if(ruc.length !== 11 || !/^\d{11}$/.test(ruc)){
    setStaticValue("op_razonSocial", "Se completa al ingresar el RUC", true);
    setStaticValue("op_giro", "—", true);
    setStaticValue("op_esCliente", "—", true);
    setStaticValue("op_direccion", "—", true);
    statusEl.textContent = "";
    statusEl.className = "ruc-lookup-status";
    return;
  }
  const cliente = lookupClienteByRuc(ruc);
  if(cliente){
    setStaticValue("op_razonSocial", cliente.razonSocial, false);
    setStaticValue("op_giro", cliente.giro, false);
    setStaticValue("op_esCliente", cliente.esCliente ? "Sí" : "No", false);
    setStaticValue("op_direccion", cliente.direccion, false);
    statusEl.textContent = "Cliente encontrado en el maestro de clientes";
    statusEl.className = "ruc-lookup-status found";
  } else {
    setStaticValue("op_razonSocial", "Cliente nuevo (sin datos previos)", true);
    setStaticValue("op_giro", GIRO_OPTIONS[0], false);
    setStaticValue("op_esCliente", "No", false);
    setStaticValue("op_direccion", "—", true);
    statusEl.textContent = "RUC no registrado — se creará como cliente nuevo";
    statusEl.className = "ruc-lookup-status notfound";
  }
}

function updateDiasCreditoVisibility(){
  const modalidad = document.getElementById("op_modalidadPago").value;
  document.getElementById("op_diasCreditoGroup").style.display = modalidad==="Crédito" ? "" : "none";
}

function openOportunidadModal(){
  resetOportunidadForm();
  document.getElementById("oportunidadModal").classList.add("open");
  overlay.classList.add("visible");
  trapFocus(document.getElementById("oportunidadModal"));
}

function closeOportunidadModal(force){
  if(!force && oportunidadDirty){
    if(!confirm("Tienes datos sin guardar en esta oportunidad. ¿Deseas cerrar sin guardar?")) return;
  }
  closeModalById("oportunidadModal");
}

function validateOportunidadForm(){
  const errors = [];
  const markError = (id) => { document.getElementById(id).closest(".field-group").classList.add("field-error"); };
  document.querySelectorAll("#oportunidadForm .field-group.field-error").forEach(g=>g.classList.remove("field-error"));

  const ruc = document.getElementById("op_ruc").value.trim();
  if(!/^\d{11}$/.test(ruc)){ errors.push("El RUC debe tener 11 dígitos numéricos."); markError("op_ruc"); }

  const bvMes = document.getElementById("op_bvMes").value;
  if(bvMes === "" || +bvMes <= 0){ errors.push("Ingresa un BV por mes válido."); markError("op_bvMes"); }

  const valorFacial = document.getElementById("op_valorFacial").value;
  if(valorFacial === "" || +valorFacial <= 0){ errors.push("Ingresa un valor facial válido."); markError("op_valorFacial"); }

  const cantTarjetas = document.getElementById("op_cantTarjetas").value;
  if(cantTarjetas === "" || +cantTarjetas <= 0 || !Number.isInteger(+cantTarjetas)){ errors.push("Ingresa una cantidad de tarjetas válida."); markError("op_cantTarjetas"); }

  const cargasAnio = document.getElementById("op_cargasAnio").value;
  if(cargasAnio === "" || +cargasAnio <= 0 || !Number.isInteger(+cargasAnio)){ errors.push("Ingresa una cantidad de cargas al año válida."); markError("op_cargasAnio"); }

  const modalidad = document.getElementById("op_modalidadPago").value;
  if(modalidad==="Crédito"){
    const dias = document.getElementById("op_diasCredito").value;
    if(dias === "" || +dias <= 0){ errors.push("Ingresa los días de crédito."); markError("op_diasCredito"); }
  }

  return errors;
}

let lastCreatedFromOportunidadId = null;

function saveOportunidad(){
  const errors = validateOportunidadForm();
  if(errors.length){
    showToast(errors[0], "danger");
    return;
  }

  const ruc = document.getElementById("op_ruc").value.trim();
  const cliente = lookupClienteByRuc(ruc);
  const data = {
    ruc,
    razonSocial: cliente ? cliente.razonSocial : "Cliente nuevo (sin datos previos)",
    giro: cliente ? cliente.giro : GIRO_OPTIONS[0],
    esCliente: cliente ? !!cliente.esCliente : false,
    direccion: cliente ? cliente.direccion : "",
    representantes: [],
    solucion: document.getElementById("op_solucion").value,
    marca: document.getElementById("op_marca").value,
    sector: document.getElementById("op_sector").value,
    categoria: document.getElementById("op_categoria").value,
    bvMes: +document.getElementById("op_bvMes").value || 0,
    cantTarjetas: +document.getElementById("op_cantTarjetas").value || 0,
    cargasAnio: +document.getElementById("op_cargasAnio").value || 0,
    tipoProducto: document.getElementById("op_tipoProducto").value,
    valorFacial: +document.getElementById("op_valorFacial").value || 0,
    modalidadPago: document.getElementById("op_modalidadPago").value,
    diasCredito: document.getElementById("op_modalidadPago").value==="Crédito" ? (+document.getElementById("op_diasCredito").value || 0) : 0,
    rebate:{activo:false, tipo:"monto", valor:0},
    comisionCliente:0, facturaMinima:0,
    expenses: makeExpenses([0,0,0,0,0,0,0,0], []),
    condicionesExtra: [],
    distribucion:[{destino:"Lima", cantidadPuntos:0}],
    logoEmpresa:false, cartaFianza:false, productoCustom:false, mdrNegociado:0
  };

  const codigo = nextCodigo();
  const producto = deriveProducto(data);
  const fecha = new Date().toISOString().slice(0,10);
  const newP = Object.assign({}, data, {
    id: nextId(), codigo, producto, estado:"Creada", version:1, fecha,
    solicitudes: [],
    historial:[{version:1, fecha, estado:"Creada", usuario:"F. Ruiz", resumen:"Propuesta generada automáticamente desde el registro de una nueva oportunidad."}]
  });
  proposals.unshift(newP);
  lastCreatedFromOportunidadId = newP.id;

  oportunidadDirty = false;
  closeModalById("oportunidadModal");
  populateProductoFilter();
  applyProposalsFilters();
  flashRow(newP.id);

  document.getElementById("oportSuccessCodigo").textContent = newP.codigo;
  document.getElementById("oportunidadSuccessModal").classList.add("open");
  overlay.classList.add("visible");
  trapFocus(document.getElementById("oportunidadSuccessModal"));
  showToast(`Oportunidad registrada. Propuesta ${newP.codigo} creada en estado Creada.`, "success");
}

/* ---------- Toasts ---------- */
function showToast(message, type){
  type = type || "info";
  const stack = document.getElementById("toastStack");
  const icoMap = {
    success: '<path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    danger: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    info: '<path d="M12 8v.01M12 11v5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'
  };
  const el = document.createElement("div");
  el.className = "toast " + type;
  el.innerHTML = `<span class="toast-ico"><svg viewBox="0 0 24 24">${icoMap[type]||icoMap.info}</svg></span><span>${esc(message)}</span>`;
  stack.appendChild(el);
  requestAnimationFrame(()=>el.classList.add("show"));
  setTimeout(()=>{
    el.classList.remove("show");
    setTimeout(()=>el.remove(), 350);
  }, 3800);
}

/* ============================================================
   EVENT WIRING
   ============================================================ */
document.addEventListener("DOMContentLoaded", function(){
  populateProductoFilter();
  renderKPIs();
  renderProposalsTable();
  initSidebarNav();

  // Filters
  ["fCliente"].forEach(id=>document.getElementById(id).addEventListener("input", applyProposalsFilters));
  ["fSolucion","fProducto","fEstado","fModalidad","fFechaIni","fFechaFin"].forEach(id=>{
    document.getElementById(id).addEventListener("change", applyProposalsFilters);
  });
  document.getElementById("btnClearFilters").addEventListener("click", clearProposalsFilters);

  // KPIs clicables — cada uno aplica el filtro correspondiente y hace scroll a la tabla
  function applyKpiFilter(estadoValue, extra){
    clearProposalsFilters();
    document.getElementById("fEstado").value = estadoValue;
    if(extra && extra.fIni) document.getElementById("fFechaIni").value = extra.fIni;
    if(extra && extra.fFin) document.getElementById("fFechaFin").value = extra.fFin;
    applyProposalsFilters();
    document.querySelector(".table-panel").scrollIntoView({behavior:"smooth", block:"start"});
  }
  const kpiMap = [
    ["kpiCardTotal", ()=>applyKpiFilter("__ACTIVAS__")],
    ["kpiCardOpen", ()=>applyKpiFilter("__ABIERTAS__")],
    ["kpiCardClosed", ()=>applyKpiFilter("Aprobada", {fIni:"2026-07-01", fFin:"2026-07-31"})]
  ];
  kpiMap.forEach(([id, handler])=>{
    const el = document.getElementById(id);
    el.addEventListener("click", handler);
    el.addEventListener("keydown", e=>{
      if(e.key==="Enter" || e.key===" "){ e.preventDefault(); handler(); }
    });
  });

  // Table delegated actions
  document.getElementById("tableBody").addEventListener("click", function(e){
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if(action==="edit") openDrawer("edit", id);
    else if(action==="history") openProposalHistoryModal(id);
    else if(action==="newversion") openDrawer("newversion", id);
    else if(action==="menu") toggleRowMenu(btn, id);
  });

  // Pagination
  document.getElementById("pagControls").addEventListener("click", function(e){
    const btn = e.target.closest("button[data-page]");
    if(!btn || btn.disabled) return;
    const p = btn.dataset.page;
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if(p==="prev") currentPage = Math.max(1, currentPage-1);
    else if(p==="next") currentPage = Math.min(totalPages, currentPage+1);
    else currentPage = +p;
    renderProposalsTable();
    document.querySelector(".table-panel").scrollIntoView({behavior:"smooth", block:"nearest"});
  });

  // New proposal button
  document.getElementById("btnNewProposal").addEventListener("click", ()=>openDrawer("new"));

  // New oportunidad popup
  document.getElementById("btnNewOportunidad").addEventListener("click", openOportunidadModal);
  document.getElementById("btnCloseOportunidad").addEventListener("click", ()=>closeOportunidadModal(false));
  document.getElementById("btnCancelOportunidad").addEventListener("click", ()=>closeOportunidadModal(false));
  document.getElementById("btnSaveOportunidad").addEventListener("click", saveOportunidad);
  document.getElementById("op_ruc").addEventListener("input", ()=>{ oportunidadDirty = true; handleRucLookup(); });
  document.getElementById("op_modalidadPago").addEventListener("change", ()=>{ oportunidadDirty = true; updateDiasCreditoVisibility(); });
  document.getElementById("oportunidadForm").addEventListener("input", ()=>{ oportunidadDirty = true; });
  document.getElementById("oportunidadForm").addEventListener("change", ()=>{ oportunidadDirty = true; });
  document.getElementById("btnGoToPropuesta").addEventListener("click", ()=>{
    closeModalById("oportunidadSuccessModal");
    if(lastCreatedFromOportunidadId) openDrawer("edit", lastCreatedFromOportunidadId);
  });

  // Drawer chrome
  document.getElementById("btnCloseDrawer").addEventListener("click", closeDrawer);
  document.getElementById("btnCancelDrawer").addEventListener("click", closeDrawer);
  document.getElementById("btnExpandDrawer").addEventListener("click", ()=>drawer.classList.toggle("expanded"));
  overlay.addEventListener("click", ()=>{
    closeDrawer();
    closeAllModals();
  });

  // Drawer nav scroll-spy (click)
  document.querySelectorAll(".drawer-nav-item").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.getElementById(btn.dataset.target).scrollIntoView({behavior:"smooth", block:"start"});
      document.querySelectorAll(".drawer-nav-item").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  document.getElementById("drawerForm").addEventListener("scroll", function(){
    const sections = [...document.querySelectorAll(".form-section")];
    const scrollTop = this.scrollTop;
    let activeIdx = 0;
    sections.forEach((s,i)=>{ if(s.offsetTop - 80 <= scrollTop) activeIdx = i; });
    document.querySelectorAll(".drawer-nav-item").forEach((b,i)=>b.classList.toggle("active", i===activeIdx));
  });

  // Live "esto generará una nueva versión" banner — se actualiza con cualquier
  // edición del formulario, antes de guardar
  document.getElementById("drawerForm").addEventListener("input", refreshVersionBanner);
  document.getElementById("drawerForm").addEventListener("change", refreshVersionBanner);

  // Conditional field listeners
  document.getElementById("f_modalidadPago").addEventListener("change", updateConditionalFields);
  document.getElementById("f_rebateToggle").addEventListener("change", updateConditionalFields);
  document.getElementById("f_rebateTipo").addEventListener("change", updateConditionalFields);
  document.getElementById("f_productoCustom").addEventListener("change", updateConditionalFields);

  // Distribución add row
  document.getElementById("btnAddDestino").addEventListener("click", ()=>{
    workingDistribucion.push({destino:"Lima", cantidadPuntos:0});
    renderDistribucionTable();
    refreshVersionBanner();
  });

  // Condiciones comerciales — agregar fila
  document.getElementById("btnAddCondicion").addEventListener("click", ()=>{
    workingCondiciones.push({key:null, concepto:"", tipo:"moneda", valor:0, exonerado:false, custom:true, presetValue:COND_CUSTOM_PRESETS[0], customText:""});
    renderCondicionesTable();
    refreshVersionBanner();
  });

  // Flujos de aprobación — Ver etapa / Anular (delegado)
  document.getElementById("approvalBody").addEventListener("click", function(e){
    const btn = e.target.closest("button[data-stage-action]");
    if(!btn) return;
    const solId = btn.dataset.sol;
    if(btn.dataset.stageAction==="ver") openStageModal(solId);
    else if(btn.dataset.stageAction==="anular"){
      if(confirm("¿Confirmas anular esta solicitud? Esta acción no se puede deshacer.")) anularSolicitud(solId);
    }
  });
  document.getElementById("btnSubmitReeval").addEventListener("click", submitReevaluacion);

  // Validador de rentabilidad — ahora vive dentro del drawer de edición, usando los
  // valores actuales del formulario (no requiere guardar primero)
  document.getElementById("btnValidarRentabDrawer").addEventListener("click", function(){
    const data = collectFormData();
    const codigoLabel = document.getElementById("drawerCodigo").textContent || "Nueva propuesta";
    openRentabModal(data, codigoLabel);
  });

  // Validador de rentabilidad — Generar Cotización (visible solo si semáforo verde)
  document.getElementById("btnGenerarCotizacion").addEventListener("click", function(){
    const codigoLabel = this.dataset.codigo;
    closeModalById("rentabModal");
    showToast(`Cotización generada a partir de ${codigoLabel}. Revísala en el módulo de Cotizaciones.`, "success");
  });

  // Save / reject actions
  document.getElementById("btnSaveDraft").addEventListener("click", ()=>saveProposal("Borrador"));
  document.getElementById("btnSaveVersion").addEventListener("click", ()=>saveProposal("Creada"));
  document.getElementById("btnRejectFromDrawer").addEventListener("click", ()=>openRejectModal(drawerTargetId));
  document.getElementById("btnConfirmReject").addEventListener("click", confirmReject);

  // Row overflow menu (kebab)
  document.getElementById("rowMenuReject").addEventListener("click", ()=>{
    const id = rowMenuTargetId;
    closeRowMenu();
    if(id) openRejectModal(id);
  });
  document.addEventListener("click", function(e){
    if(!rowMenuPopover.classList.contains("open")) return;
    if(e.target.closest("#rowMenuPopover") || e.target.closest('button[data-action="menu"]')) return;
    closeRowMenu();
  });
  window.addEventListener("scroll", closeRowMenu, true);
  window.addEventListener("resize", closeRowMenu);

  // Generic modal close
  document.querySelectorAll("[data-close-modal]").forEach(btn=>{
    btn.addEventListener("click", ()=>closeModalById(btn.dataset.closeModal));
  });

  // Escape key closes topmost overlay
  document.addEventListener("keydown", function(e){
    if(e.key==="Escape"){
      closeAllModals();
      if(drawer.classList.contains("open")) closeDrawer();
      closeSidebar();
      closeRowMenu();
    }
  });
});

/* ============================================================
   NAVEGACIÓN LATERAL (Sidebar) — cambio de vista y responsive
   ============================================================ */
const PLACEHOLDER_COPY = {
  "cotizaciones": {crumb:"Gestión comercial › Cotizaciones", title:"Cotizaciones", heading:"Cotizaciones", body:"Próximamente podrás dar seguimiento a las cotizaciones generadas a partir de propuestas rentables."},
  "orden-comercial": {crumb:"Gestión comercial › Orden Comercial", title:"Orden Comercial", heading:"Orden Comercial", body:"Próximamente podrás gestionar la orden comercial generada a partir de una propuesta o cotización aprobada."},
  "linea-credito": {crumb:"Flujos de Aprobación › Línea de Crédito", title:"Línea de Crédito", heading:"Línea de Crédito", body:"Próximamente podrás revisar de forma consolidada las solicitudes de línea de crédito de todas las propuestas."},
  "excepciones": {crumb:"Flujos de Aprobación › Excepciones", title:"Excepciones", heading:"Excepciones", body:"Próximamente podrás revisar de forma consolidada las solicitudes de excepción de todas las propuestas."},
  "usuarios": {crumb:"Usuarios › Usuarios", title:"Usuarios", heading:"Usuarios", body:"Próximamente podrás crear, editar y desactivar usuarios del sistema."},
  "permisos": {crumb:"Usuarios › Permisos y Roles", title:"Permisos y Roles", heading:"Permisos y Roles", body:"Próximamente podrás configurar roles y permisos granulares por módulo."}
};

function closeSidebar(){
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("visible");
}

function initSidebarNav(){
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  document.getElementById("btnHamburger").addEventListener("click", ()=>{
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("visible");
  });
  document.getElementById("btnSidebarClose").addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  document.getElementById("btnCollapseSidebar").addEventListener("click", ()=>{
    sidebar.classList.toggle("collapsed");
    const collapsed = sidebar.classList.contains("collapsed");
    document.getElementById("btnCollapseSidebar").setAttribute("aria-label", collapsed ? "Expandir menú" : "Colapsar menú");
    document.getElementById("btnCollapseSidebar").setAttribute("title", collapsed ? "Expandir menú" : "Colapsar menú");
  });

  /* Registro de vistas "reales" (con interfaz propia). El resto de
     entradas del sidebar siguen usando el placeholder de siempre.
     Cada vista real declara su copy de topbar y un hook opcional onShow. */
  const REAL_VIEW_META = {
    "inicio": {
      crumb: 'Inicio',
      title: "Inicio",
      onShow: function(){ renderInicioDashboard(); }
    },
    "propuestas": {
      crumb: 'Gestión comercial <b>›</b> Propuestas',
      title: "Propuestas comerciales"
    },
    "pricebook": {
      crumb: 'Pricebook <b>›</b> Servicios y Tarifas',
      title: "Servicios y Tarifas",
      onShow: function(){ if(window.PricebookModule) window.PricebookModule.ensureRendered(); }
    },
    "motor-variables": {
      crumb: 'Pricebook <b>›</b> Motor de Variables y Fórmulas',
      title: "Motor de Variables y Fórmulas",
      onShow: function(){ if(window.MotorVariablesModule) window.MotorVariablesModule.ensureRendered(); }
    }
  };

  function activateView(view){
    const meta = REAL_VIEW_META[view];
    document.querySelectorAll(".app-view").forEach(v=>v.classList.remove("active"));
    if(meta){
      const el = document.getElementById("view-" + view);
      if(el) el.classList.add("active");
      document.getElementById("topbarCrumb").innerHTML = meta.crumb;
      document.getElementById("topbarTitle").textContent = meta.title;
      if(meta.onShow) meta.onShow();
    } else {
      document.getElementById("view-placeholder").classList.add("active");
      const copy = PLACEHOLDER_COPY[view] || {crumb:"—", title:"Módulo", heading:"Módulo en construcción", body:"Este módulo todavía no está disponible."};
      document.getElementById("topbarCrumb").innerHTML = copy.crumb.replace("›","<b>›</b>");
      document.getElementById("topbarTitle").textContent = copy.title;
      document.getElementById("placeholderHeading").textContent = copy.heading;
      document.getElementById("placeholderBody").textContent = copy.body;
    }
    window.scrollTo({top:0, behavior:"smooth"});
  }

  document.querySelectorAll(".nav-link").forEach(link=>{
    link.addEventListener("click", ()=>{
      const view = link.dataset.view;
      document.querySelectorAll(".nav-link").forEach(l=>l.classList.remove("active"));
      link.classList.add("active");
      closeSidebar();
      activateView(view);
    });
  });

  /* Expuesto para que el flujo de login (IIFE aparte) pueda devolver a
     Inicio la vista activa al autenticarse, sin duplicar esta lógica. */
  window.goToInicio = function(){
    document.querySelectorAll(".nav-link").forEach(l=>l.classList.remove("active"));
    const inicioLink = document.querySelector('.nav-link[data-view="inicio"]');
    if(inicioLink) inicioLink.classList.add("active");
    activateView("inicio");
  };
}

})();


  /* ============================================================
     DATOS MOCK — Fuente de verdad en memoria (demo de flujo SPA)
     Modelo: Servicios (1) -> Tarifario (N)
     ============================================================ */
  const MONEDA_SYMBOLS = { PEN: 'S/', USD: '$', EUR: '€' };
  const UNIDAD_LABELS  = { UNI: 'Unidad', HOR: 'Hora', DIA: 'Día', MES: 'Mes', PRY: 'Proyecto' };
  const TIPO_LABELS    = { fisico: 'Físico', virtual: 'Virtual', otros: 'Otros' };
  const MARCA_LABELS   = { visa: 'Visa', mastercard: 'Mastercard' };
  const TECNOLOGIA_LABELS = { banda: 'Banda', chip_contactless: 'Chip Contactless' };
  const PRODUCTO_LABELS = {
    'uid-prod-01': 'Alimentación', 'uid-prod-02': 'Regalo', 'uid-prod-03': 'Incentivo',
    'uid-prod-04': 'Navidad', 'uid-prod-05': 'Movilidad', 'uid-prod-06': 'Comedor'
  };

  let SERVICIOS = {
    /* PLACEHOLDER: tarifa inventada — sin información real de costo de plástico aún */
    'S001': { nombre:'Costo del plástico', descripcion:'Costo del plástico de tarjetas a emitir', solucion:'Gift', productoId:'uid-prod-02', estado:true,
      marca:'visa', tecnologia:'chip_contactless', esCondicionComercial:false,
      creadoPor:'Fio · Product Manager', fechaCreacion:'14/07/2026 09:00', modificadoPor:'Fio · Product Manager', fechaModificacion:'14/07/2026 09:00',
      tarifas:[
        {id:'T-801', nombre:'Tarifa Costo de Plástico Estándar', tipo:'fisico', moneda:'PEN', unidad:'UNI', precio:5.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]},
      ]},
    'S028': { nombre:'Entrega de tarjetas', descripcion:'Distribución y despacho de tarjetas físicas al domicilio o centro de trabajo del titular.', solucion:'Food', productoId:'uid-prod-01', estado:true,
      marca:'visa', tecnologia:'banda', esCondicionComercial:false,
      creadoPor:'sistema.migracion', fechaCreacion:'15/03/2026 08:00', modificadoPor:'Fio · Product Manager', fechaModificacion:'01/07/2026 09:30',
      tarifas:[
        {id:'T-301', nombre:'Tarifa Entrega Estándar', tipo:'fisico', moneda:'PEN', unidad:'UNI', precio:8.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]},
        {id:'T-302', nombre:'Tarifa Entrega Express', tipo:'fisico', moneda:'PEN', unidad:'UNI', precio:15.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]},
      ]},
    'S055': { nombre:'Reposición de tarjetas', descripcion:'Emisión de tarjeta de reemplazo ante robo, pérdida o deterioro.', solucion:'Gift', productoId:'uid-prod-03', estado:true,
      marca:'visa', tecnologia:'chip_contactless', esCondicionComercial:false,
      creadoPor:'sistema.migracion', fechaCreacion:'22/03/2026 15:40', modificadoPor:'Fio · Product Manager', fechaModificacion:'09/07/2026 12:15',
      tarifas:[ {id:'T-501', nombre:'Tarifa Reposición Estándar', tipo:'fisico', moneda:'PEN', unidad:'UNI', precio:25.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]} ]},
    'S082': { nombre:'Mantenimiento de tarjetas', descripcion:'Soporte técnico y mantenimiento preventivo sobre tarjetas activas y su vinculación en app.', solucion:'Mobility', productoId:'uid-prod-05', estado:true,
      marca:'visa', tecnologia:'banda', esCondicionComercial:false,
      creadoPor:'sistema.migracion', fechaCreacion:'28/03/2026 11:30', modificadoPor:'Operaciones', fechaModificacion:'15/06/2026 17:20',
      tarifas:[ {id:'T-701', nombre:'Tarifa Soporte N2', tipo:'otros', moneda:'PEN', unidad:'HOR', precio:0.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]} ]},
    'S113': { nombre:'Personalización de tarjetas', descripcion:'Diseño y grabado personalizado de tarjeta física para campañas o clientes corporativos.', solucion:'Food', productoId:'uid-prod-01', estado:true,
      marca:'mastercard', tecnologia:'chip_contactless', esCondicionComercial:true,
      creadoPor:'sistema.migracion', fechaCreacion:'25/03/2026 09:05', modificadoPor:'Fio · Product Manager', fechaModificacion:'30/06/2026 10:50',
      tarifas:[
        {id:'T-601', nombre:'Tarifa Personalización Básica', tipo:'fisico', moneda:'PEN', unidad:'PRY', precio:18.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]},
        {id:'T-602', nombre:'Tarifa Personalización Corporativa', tipo:'fisico', moneda:'USD', unidad:'PRY', precio:45.00, vigenciaInicio:'2026-08-01', vigenciaFin:'', historial:[]},
      ]},
    'S140': { nombre:'Carga de saldo', descripcion:'Recarga de saldo sobre el beneficio contratado, programada o bajo demanda.', solucion:'Food', productoId:'uid-prod-01', estado:false,
      marca:'mastercard', tecnologia:'banda', esCondicionComercial:true,
      creadoPor:'sistema.migracion', fechaCreacion:'02/03/2026 09:20', modificadoPor:'Fio · Product Manager', fechaModificacion:'05/07/2026 11:05',
      tarifas:[
        {id:'T-201', nombre:'Tarifa Recarga Mensual (2026 H1)', tipo:'otros', moneda:'PEN', unidad:'MES', precio:3.00, vigenciaInicio:'2026-01-01', vigenciaFin:'2026-06-30', historial:[]},
        {id:'T-202', nombre:'Tarifa Recarga Mensual', tipo:'otros', moneda:'PEN', unidad:'MES', precio:3.50, vigenciaInicio:'2026-07-01', vigenciaFin:'',
          historial:[{precioAnterior:3.00, precioNuevo:3.50, vigenciaInicio:'2026-07-01', vigenciaFin:'', usuario:'Fio · Product Manager', fecha:'01/07/2026 09:00'}]},
        {id:'T-203', nombre:'Tarifa Recarga Mensual EU', tipo:'otros', moneda:'EUR', unidad:'MES', precio:1.20, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]},
      ]},
    /* PLACEHOLDER: tarifa inventada — categoría "otros servicios" sin tarifario real aún */
    'S171': { nombre:'Otros servicios', descripcion:'Otros servicios relacionados', solucion:'Food', productoId:'uid-prod-01', estado:true,
      marca:'mastercard', tecnologia:'banda', esCondicionComercial:false,
      creadoPor:'Fio · Product Manager', fechaCreacion:'14/07/2026 09:00', modificadoPor:'Fio · Product Manager', fechaModificacion:'14/07/2026 09:00',
      tarifas:[
        {id:'T-802', nombre:'Tarifa Servicio Adicional', tipo:'otros', moneda:'PEN', unidad:'UNI', precio:10.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]},
      ]},
    'S202': { nombre:'Renovación de tarjetas', descripcion:'Renovación de tarjeta próxima a vencer.', solucion:'Mobility', productoId:'uid-prod-05', estado:true,
      marca:'mastercard', tecnologia:'chip_contactless', esCondicionComercial:false,
      creadoPor:'sistema.migracion', fechaCreacion:'20/03/2026 10:12', modificadoPor:'Operaciones', fechaModificacion:'28/06/2026 14:00',
      tarifas:[ {id:'T-401', nombre:'Tarifa Renovación Estándar', tipo:'fisico', moneda:'PEN', unidad:'UNI', precio:10.00, vigenciaInicio:'2026-01-01', vigenciaFin:'',
        historial:[{precioAnterior:8.00, precioNuevo:10.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', usuario:'Operaciones', fecha:'28/06/2026 14:00'}]} ]},
    'S217': { nombre:'Emisión de tarjetas', descripcion:'Alta y personalización inicial de la tarjeta, incluye habilitación en el sistema.', solucion:'Gift', productoId:'uid-prod-03', estado:true,
      marca:'visa', tecnologia:'chip_contactless', esCondicionComercial:false,
      creadoPor:'sistema.migracion', fechaCreacion:'02/03/2026 09:14', modificadoPor:'Fio · Product Manager', fechaModificacion:'10/07/2026 16:40',
      tarifas:[
        {id:'T-101', nombre:'Tarifa Estándar Nacional', tipo:'fisico', moneda:'PEN', unidad:'UNI', precio:12.00, vigenciaInicio:'2026-01-01', vigenciaFin:'',
          historial:[{precioAnterior:10.00, precioNuevo:12.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', usuario:'Fio · Product Manager', fecha:'10/07/2026 16:40'}]},
        {id:'T-102', nombre:'Tarifa Premium Same-Day', tipo:'fisico', moneda:'PEN', unidad:'UNI', precio:22.00, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]},
        {id:'T-103', nombre:'Tarifa Corporate', tipo:'fisico', moneda:'USD', unidad:'UNI', precio:6.50, vigenciaInicio:'2026-09-01', vigenciaFin:'', historial:[]},
      ]},
    /* PLACEHOLDER: tarifa inventada — Interchange Fee sin dato real aún */
    'S248': { nombre:'Interchange Fee', descripcion:'Interchange Fee', solucion:'Gift', productoId:'uid-prod-04', estado:true,
      marca:'visa', tecnologia:'banda', esCondicionComercial:false,
      creadoPor:'Fio · Product Manager', fechaCreacion:'14/07/2026 09:00', modificadoPor:'Fio · Product Manager', fechaModificacion:'14/07/2026 09:00',
      tarifas:[
        {id:'T-803', nombre:'Tarifa Interchange Estándar', tipo:'otros', moneda:'USD', unidad:'UNI', precio:0.15, vigenciaInicio:'2026-01-01', vigenciaFin:'', historial:[]},
      ]},
  };

  const TODAY = new Date('2026-07-14T00:00:00');

  let tarifaSeq = 900;

  /* ------------------------------------------------------------
     Estado de UI
     ------------------------------------------------------------ */
  const overlay = document.getElementById('pb-overlay');
  const drawer  = document.getElementById('pb-drawer');
  const deleteModal = document.getElementById('delete-modal');
  const tarifaModal = document.getElementById('tarifa-modal');
  const unsavedModal = document.getElementById('unsaved-modal');
  const detalleModal = document.getElementById('detalle-modal');
  const toast   = document.getElementById('toast');

  let currentServiceId = null;   // null = nuevo servicio
  let currentTarifas = [];       // copia de trabajo de las tarifas del servicio abierto
  let tarifaEditId = null;       // id de tarifa en edición dentro del modal, null = nueva
  let pendingDelete = null;      // {type:'servicio', id} | {type:'tarifa', id}
  let pendingUndo = null;        // {undoFn, timerId} — ventana de deshacer tras eliminar
  let expandedHistory = new Set(); // índices de tarifa con historial expandido en la grid actual
  let searchDebounceTimer = null;
  const UNDO_WINDOW_MS = 5000;
  let serviceFormSnapshot = null; // estado inicial del formulario de servicio, para detectar cambios sin guardar
  let tarifaFormSnapshot = null;  // estado inicial del formulario de tarifa
  let pendingUnsavedContext = null; // 'drawer' | 'tarifa' — qué capa está pendiente de cierre

  /* ------------------------------------------------------------
     Utilidades de fecha / vigencia
     ------------------------------------------------------------ */
  function parseDate(str){ return str ? new Date(str + 'T00:00:00') : null; }
  function formatDateDisplay(str){
    if(!str) return null;
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
  }
  function vigenciaStatus(t){
    const inicio = parseDate(t.vigenciaInicio);
    const fin = parseDate(t.vigenciaFin);
    if(inicio && inicio > TODAY) return 'programada';
    if(fin && fin < TODAY) return 'vencida';
    return 'actual';
  }
  const VIGENCIA_LABELS = { actual: 'Vigente', programada: 'Programada', vencida: 'Vencida' };

  /* ------------------------------------------------------------
     Filtros — búsqueda, producto, estado
     ------------------------------------------------------------ */
  function handleSearchInput(){
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(applyPricebookFilters, 250);
  }

  function clearPricebookFilters(){
    document.getElementById('f-search').value = '';
    document.getElementById('f-producto').value = '';
    document.getElementById('f-marca').value = '';
    document.getElementById('f-tecnologia').value = '';
    document.getElementById('f-status').value = '';
    applyPricebookFilters();
  }

  function applyPricebookFilters(){
    const q = document.getElementById('f-search').value.trim().toLowerCase();
    const prod = document.getElementById('f-producto').value;
    const marca = document.getElementById('f-marca').value;
    const tecnologia = document.getElementById('f-tecnologia').value;
    const status = document.getElementById('f-status').value;

    const ids = Object.keys(SERVICIOS).filter(id => {
      const s = SERVICIOS[id];
      const matchesQ = !q || id.toLowerCase().includes(q) || s.nombre.toLowerCase().includes(q) || s.descripcion.toLowerCase().includes(q);
      const matchesProd = !prod || PRODUCTO_LABELS[s.productoId] === prod;
      const matchesMarca = !marca || s.marca === marca;
      const matchesTecnologia = !tecnologia || s.tecnologia === tecnologia;
      const matchesStatus = !status || (status === 'Activo' && s.estado) || (status === 'Inactivo' && !s.estado);
      return matchesQ && matchesProd && matchesMarca && matchesTecnologia && matchesStatus;
    });
    renderMainTable(sortIds(ids));
  }

  /* ------------------------------------------------------------
     Ordenamiento por columna en la tabla principal
     ------------------------------------------------------------ */
  let sortState = { field: null, direction: 'asc' };

  function sortIds(ids){
    if(!sortState.field) return ids;
    const dir = sortState.direction === 'asc' ? 1 : -1;
    return [...ids].sort((idA, idB) => {
      const sa = SERVICIOS[idA], sb = SERVICIOS[idB];
      let va, vb;
      switch(sortState.field){
        case 'id': va = idA; vb = idB; break;
        case 'nombre': va = sa.nombre; vb = sb.nombre; break;
        case 'solucion': va = sa.solucion || ''; vb = sb.solucion || ''; break;
        case 'producto': va = PRODUCTO_LABELS[sa.productoId]; vb = PRODUCTO_LABELS[sb.productoId]; break;
        case 'tarifas': va = sa.tarifas.length; vb = sb.tarifas.length; break;
        case 'estado': va = sa.estado ? 1 : 0; vb = sb.estado ? 1 : 0; break;
        default: va = 0; vb = 0;
      }
      if(typeof va === 'string'){ va = va.toLowerCase(); vb = vb.toLowerCase(); }
      if(va < vb) return -1 * dir;
      if(va > vb) return 1 * dir;
      return 0;
    });
  }

  function toggleSort(field){
    if(sortState.field === field){
      sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sortState.field = field;
      sortState.direction = 'asc';
    }
    updateSortIndicators();
    applyPricebookFilters();
  }

  function updateSortIndicators(){
    document.querySelectorAll('#main-table thead th.sortable').forEach(th => {
      const icon = th.querySelector('.sort-icon');
      const isActive = th.dataset.field === sortState.field;
      th.classList.toggle('sort-active', isActive);
      icon.textContent = isActive ? (sortState.direction === 'asc' ? '▲' : '▼') : '';
    });
  }

  /* ------------------------------------------------------------
     Render de la tabla principal
     ------------------------------------------------------------ */
  function renderMainTable(ids){
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    const total = Object.keys(SERVICIOS).length;
    ids = ids || Object.keys(SERVICIOS);

    document.getElementById('row-count').textContent = ids.length + ' resultados';
    document.getElementById('pagination-text').textContent = `Mostrando ${ids.length} de ${total} servicios`;

    if(ids.length === 0){
      tbody.innerHTML = `<tr><td colspan="7">
        <div class="table-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <p>No se encontraron servicios con estos filtros.</p>
          <button type="button" class="btn-ribbon-neutral btn-sm" onclick="clearPricebookFilters()">Limpiar filtros</button>
        </div>
      </td></tr>`;
      return;
    }

    ids.forEach(id => {
      const s = SERVICIOS[id];
      const tr = document.createElement('tr');
      tr.dataset.id = id;
      tr.innerHTML = `
        <td class="cell-code">#${id}</td>
        <td class="cell-name">${s.nombre}<span class="desc">${s.descripcion}</span></td>
        <td><span class="tag-neutral">${s.solucion || '—'}</span></td>
        <td><span class="tag-product"><i class="dot"></i>${PRODUCTO_LABELS[s.productoId]}</span></td>
        <td>
          <div class="tarifario-summary">
            <span class="tarifario-count"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>${s.tarifas.length} ${s.tarifas.length === 1 ? 'tarifa' : 'tarifas'}</span>
          </div>
        </td>
        <td>${s.estado ? '<span class="pb-badge status-activo"><i class="dot"></i>Activo</span>' : '<span class="pb-badge status-inactivo"><i class="dot"></i>Inactivo</span>'}</td>
        <td>
          <div class="pb-row-actions">
            <button class="pb-icon-btn" title="Ver detalle" onclick="openDetalleServicio('${id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v.01M12 11v5"/></svg></button>
            <button class="pb-icon-btn edit" title="Editar" onclick="openServiceDrawer('${id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg></button>
            <button class="pb-icon-btn danger" title="Eliminar" onclick="openDeleteServicio('${id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
          </div>
        </td>`;
      tbody.appendChild(tr);
    });
  }

  /* ------------------------------------------------------------
     Grid anidada de Tarifario dentro del drawer
     ------------------------------------------------------------ */
  function renderTarifasGrid(){
    const wrap = document.getElementById('tarifas-grid-wrap');
    document.getElementById('tarifas-count-label').textContent = `· ${currentTarifas.length} ${currentTarifas.length === 1 ? 'tarifa' : 'tarifas'}`;

    if(currentTarifas.length === 0){
      wrap.innerHTML = `<div class="tarifas-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 15h6"/></svg>
        <div>Aún no hay tarifas para este servicio.<br>Agrega la primera con "Agregar tarifa".</div>
      </div>`;
      return;
    }

    let rows = currentTarifas.map((t, idx) => {
      const status = vigenciaStatus(t);
      const rango = `${formatDateDisplay(t.vigenciaInicio)} – ${t.vigenciaFin ? formatDateDisplay(t.vigenciaFin) : 'indefinida'}`;
      const isOpen = expandedHistory.has(idx);
      const hCount = (t.historial || []).length;

      let mainRow = `
      <tr data-idx="${idx}">
        <td>${t.nombre}</td>
        <td><span class="mini-tag">${TIPO_LABELS[t.tipo]}</span></td>
        <td>${t.moneda}</td>
        <td>${UNIDAD_LABELS[t.unidad]}</td>
        <td class="num mini-price"><span class="cur">${MONEDA_SYMBOLS[t.moneda]}</span>${t.precio.toFixed(2)}</td>
        <td>
          <div class="vigencia-cell">
            <span class="vig-badge vig-${status}"><i class="dot"></i>${VIGENCIA_LABELS[status]}</span>
            <span class="vigencia-range">${rango}</span>
          </div>
        </td>
        <td class="num">
          <div class="pb-row-actions">
            <button type="button" class="icon-btn${isOpen ?' active' : ''}" title="Historial de precios (${hCount})" onclick="toggleHistoryRow(${idx})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg></button>
            <button type="button" class="pb-icon-btn" title="Editar tarifa" onclick="openTarifaModal(${idx})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg></button>
            <button type="button" class="pb-icon-btn dup" title="Duplicar tarifa" onclick="duplicateTarifa(${idx})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
            <button type="button" class="pb-icon-btn danger" title="Eliminar tarifa" onclick="openDeleteTarifa(${idx})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
          </div>
        </td>
      </tr>`;

      if(!isOpen) return mainRow;

      const entries = (t.historial || []).length
        ? t.historial.map(h => `
            <div class="history-entry">
              <div class="history-entry-main">
                <span>${MONEDA_SYMBOLS[t.moneda]} ${h.precioAnterior.toFixed(2)}</span>
                <span class="arrow">→</span>
                <span>${MONEDA_SYMBOLS[t.moneda]} ${h.precioNuevo.toFixed(2)}</span>
                <span class="who">${h.usuario} · ${h.fecha}</span>
              </div>
              <div class="history-entry-vigencia">Vigencia: ${formatDateDisplay(h.vigenciaInicio) || '—'} – ${h.vigenciaFin ? formatDateDisplay(h.vigenciaFin) : 'indefinida'}</div>
            </div>`).join('')
        : `<div class="history-empty-note">Sin cambios de precio registrados todavía.</div>`;

      const historyRow = `
      <tr class="history-row">
        <td colspan="7">
          <div class="history-row-inner">
            <div class="h-title">Historial de precios</div>
            ${entries}
          </div>
        </td>
      </tr>`;

      return mainRow + historyRow;
    }).join('');

    wrap.innerHTML = `
      <div class="table-scroll">
        <table class="tarifas-table">
          <thead>
            <tr><th>Nombre tarifa</th><th>Tipo de producto</th><th>Moneda</th><th>Unidad</th><th class="num">Precio base</th><th>Vigencia</th><th class="num">Acciones</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  function toggleHistoryRow(idx){
    if(expandedHistory.has(idx)) expandedHistory.delete(idx); else expandedHistory.add(idx);
    renderTarifasGrid();
  }

  /* ------------------------------------------------------------
     Drawer de Servicio
     ------------------------------------------------------------ */
  /* ------------------------------------------------------------
     Ampliar / contraer el panel del Servicio
     ------------------------------------------------------------ */
  let drawerExpanded = false;
  /* ------------------------------------------------------------
     Sidebar colapsable
     ------------------------------------------------------------ */
  /* ------------------------------------------------------------
     Exportar (solo maqueta visual — no genera archivos)
     ------------------------------------------------------------ */
  function toggleExportMenu(e){
    if(e) e.stopPropagation();
    document.getElementById('export-menu').hidden = !document.getElementById('export-menu').hidden;
  }
  function handleExport(format){
    document.getElementById('export-menu').hidden = true;
    pbShowToast(format === 'csv' ? 'Exportando listado a CSV…' : 'Exportando listado a Excel…');
  }
  document.addEventListener('click', (e) => {
    if(!document.getElementById('view-pricebook').classList.contains('active')) return;
    const dropdown = document.getElementById('export-dropdown');
    const menu = document.getElementById('export-menu');
    if(menu && !menu.hidden && dropdown && !dropdown.contains(e.target)) menu.hidden = true;
  });

  function toggleDrawerExpand(){
    drawerExpanded = !drawerExpanded;
    drawer.classList.toggle('expanded', drawerExpanded);
    const btn = document.getElementById('drawer-expand-btn');
    btn.classList.toggle('active', drawerExpanded);
    const label = drawerExpanded ? 'Contraer panel' : 'Ampliar panel';
    btn.setAttribute('title', label);
    btn.setAttribute('aria-label', label);
  }

  /* ------------------------------------------------------------
     Sincroniza el texto de estado (Activo/Inactivo, Sí/No) junto al toggle
     ------------------------------------------------------------ */
  function syncToggleState(inputId, onLabel, offLabel){
    const input = document.getElementById(inputId);
    const stateEl = document.getElementById(inputId + '-state');
    if(input && stateEl) stateEl.textContent = input.checked ? onLabel : offLabel;
  }

  /* ------------------------------------------------------------
     Detección de cambios sin guardar
     ------------------------------------------------------------ */
  function getServiceFormSnapshot(){
    return JSON.stringify({
      nombre: document.getElementById('f-nombre').value,
      descripcion: document.getElementById('f-desc').value,
      productoId: document.getElementById('f-producto-fk').value,
      estado: document.getElementById('f-activo').checked,
      marca: document.getElementById('sf-marca').value,
      tecnologia: document.getElementById('sf-tecnologia').value,
      esCondicionComercial: document.getElementById('f-condicion-comercial').checked,
      tarifas: currentTarifas,
    });
  }
  function isServiceFormDirty(){
    return serviceFormSnapshot !== null && serviceFormSnapshot !== getServiceFormSnapshot();
  }

  function getTarifaFormSnapshot(){
    return JSON.stringify({
      nombre: document.getElementById('t-nombre').value,
      tipo: document.getElementById('t-tipoproducto').value,
      moneda: document.getElementById('t-moneda').value,
      unidad: document.getElementById('t-unidad').value,
      precio: document.getElementById('t-precio').value,
      vigenciaInicio: document.getElementById('t-vigencia-inicio').value,
      vigenciaFin: document.getElementById('t-vigencia-fin').value,
    });
  }
  function isTarifaFormDirty(){
    return tarifaFormSnapshot !== null && tarifaFormSnapshot !== getTarifaFormSnapshot();
  }

  function requestCloseWithDirtyCheck(context){
    pendingUnsavedContext = context;
    if(context === 'tarifa') tarifaModal.classList.remove('show');
    if(context === 'drawer') drawer.classList.remove('show');
    unsavedModal.classList.add('show');
    unsavedModal.setAttribute('aria-hidden', 'false');
  }

  function keepEditing(){
    unsavedModal.classList.remove('show');
    unsavedModal.setAttribute('aria-hidden', 'true');
    if(pendingUnsavedContext === 'tarifa') tarifaModal.classList.add('show');
    if(pendingUnsavedContext === 'drawer') drawer.classList.add('show');
    pendingUnsavedContext = null;
  }

  function discardChanges(){
    unsavedModal.classList.remove('show');
    unsavedModal.setAttribute('aria-hidden', 'true');
    const ctx = pendingUnsavedContext;
    pendingUnsavedContext = null;
    if(ctx === 'tarifa'){
      tarifaModal.setAttribute('aria-hidden', 'true');
      tarifaFormSnapshot = null;
      if(!drawer.classList.contains('show')) overlay.classList.remove('show');
    } else if(ctx === 'drawer'){
      drawer.setAttribute('aria-hidden', 'true');
      serviceFormSnapshot = null;
      overlay.classList.remove('show');
    }
  }

  function openServiceDrawer(id){
    currentServiceId = id || null;
    expandedHistory = new Set();
    document.getElementById('service-form').reset();

    if(currentServiceId){
      const s = SERVICIOS[currentServiceId];
      document.getElementById('drawer-title').textContent = 'Editar servicio';
      document.getElementById('f-nombre').value = s.nombre;
      document.getElementById('f-desc').value = s.descripcion;
      document.getElementById('f-producto-fk').value = s.productoId;
      document.getElementById('f-activo').checked = s.estado;
      document.getElementById('sf-marca').value = s.marca;
      document.getElementById('sf-tecnologia').value = s.tecnologia;
      document.getElementById('f-condicion-comercial').checked = !!s.esCondicionComercial;
      document.getElementById('audit-creado-por').textContent = s.creadoPor;
      document.getElementById('audit-fecha-creacion').textContent = s.fechaCreacion;
      document.getElementById('audit-modificado-por').textContent = s.modificadoPor;
      document.getElementById('audit-fecha-modificacion').textContent = s.fechaModificacion;
      currentTarifas = JSON.parse(JSON.stringify(s.tarifas));
    } else {
      document.getElementById('drawer-title').textContent = 'Nuevo servicio';
      document.getElementById('f-activo').checked = true;
      document.getElementById('f-condicion-comercial').checked = false;
      document.getElementById('audit-creado-por').textContent = 'Fio · Product Manager';
      document.getElementById('audit-fecha-creacion').textContent = 'Se generará al guardar';
      document.getElementById('audit-modificado-por').textContent = '—';
      document.getElementById('audit-fecha-modificacion').textContent = '—';
      currentTarifas = [];
    }

    syncToggleState('f-activo', 'Activo', 'Inactivo');
    syncToggleState('f-condicion-comercial', 'Sí', 'No');

    serviceFormSnapshot = getServiceFormSnapshot();

    renderTarifasGrid();
    overlay.classList.add('show');
    drawer.classList.add('show');
    drawer.setAttribute('aria-hidden', 'false');
  }

  let isSavingService = false;
  let isSavingTarifa = false;

  function setButtonLoading(btn, loadingLabel){
    btn.dataset.originalHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="btn-spinner"></span> ${loadingLabel}`;
  }
  function restoreButton(btn){
    btn.disabled = false;
    if(btn.dataset.originalHtml){ btn.innerHTML = btn.dataset.originalHtml; delete btn.dataset.originalHtml; }
  }

  function handleServiceSubmit(e){
    e.preventDefault();
    const data = {
      nombre: document.getElementById('f-nombre').value.trim(),
      descripcion: document.getElementById('f-desc').value.trim(),
      productoId: document.getElementById('f-producto-fk').value,
      estado: document.getElementById('f-activo').checked,
      marca: document.getElementById('sf-marca').value,
      tecnologia: document.getElementById('sf-tecnologia').value,
      esCondicionComercial: document.getElementById('f-condicion-comercial').checked,
      tarifas: currentTarifas,
    };

    const submitBtn = document.getElementById('service-submit-btn');
    setButtonLoading(submitBtn, 'Guardando…');
    isSavingService = true;

    setTimeout(() => {
      if(currentServiceId){
        const prev = SERVICIOS[currentServiceId];
        SERVICIOS[currentServiceId] = { ...prev, ...data, modificadoPor: 'Fio · Product Manager', fechaModificacion: 'Recién actualizado' };
      } else {
        const newId = 'SRV' + (Math.floor(Math.random()*9000)+1000);
        SERVICIOS[newId] = { ...data, creadoPor: 'Fio · Product Manager', fechaCreacion: 'Recién creado', modificadoPor: 'Fio · Product Manager', fechaModificacion: 'Recién creado' };
      }

      applyPricebookFilters();
      restoreButton(submitBtn);
      isSavingService = false;
      closeTopLayer(true);
      pbShowToast('Servicio y tarifario guardados correctamente');
    }, 550);

    return false;
  }

  /* ------------------------------------------------------------
     Modal de Tarifa (crear / editar dentro del servicio abierto)
     ------------------------------------------------------------ */
  function openTarifaModal(idx){
    tarifaEditId = idx;
    document.getElementById('tarifa-form').reset();
    clearTarifaVigenciaError();
    const historialBox = document.getElementById('historial-box');
    const historialList = document.getElementById('historial-list');
    const historialToggle = document.querySelector('.historial-toggle');
    historialList.classList.remove('open');
    if(historialToggle) historialToggle.classList.remove('open');

    if(idx !== null){
      const t = currentTarifas[idx];
      document.getElementById('tarifa-modal-title').textContent = 'Editar tarifa';
      document.getElementById('t-nombre').value = t.nombre;
      document.getElementById('t-tipoproducto').value = t.tipo;
      document.getElementById('t-moneda').value = t.moneda;
      document.getElementById('t-unidad').value = t.unidad;
      document.getElementById('t-precio').value = t.precio;
      document.getElementById('t-vigencia-inicio').value = t.vigenciaInicio || '';
      document.getElementById('t-vigencia-fin').value = t.vigenciaFin || '';

      const hist = t.historial || [];
      document.getElementById('historial-toggle-label').textContent = `Ver historial de precios (${hist.length})`;
      historialList.innerHTML = hist.length
        ? hist.map(h => `
            <div class="history-entry">
              <div class="history-entry-main">
                <span>${MONEDA_SYMBOLS[t.moneda]} ${h.precioAnterior.toFixed(2)}</span>
                <span class="arrow">→</span>
                <span>${MONEDA_SYMBOLS[t.moneda]} ${h.precioNuevo.toFixed(2)}</span>
                <span class="who">${h.usuario} · ${h.fecha}</span>
              </div>
              <div class="history-entry-vigencia">Vigencia: ${formatDateDisplay(h.vigenciaInicio) || '—'} – ${h.vigenciaFin ? formatDateDisplay(h.vigenciaFin) : 'indefinida'}</div>
            </div>`).join('')
        : `<div class="history-entry"><span class="history-empty-note">Sin cambios de precio registrados todavía.</span></div>`;
      historialBox.hidden = false;
    } else {
      document.getElementById('tarifa-modal-title').textContent = 'Nueva tarifa';
      document.getElementById('t-moneda').value = 'PEN';
      document.getElementById('t-unidad').value = 'UNI';
      document.getElementById('t-vigencia-inicio').value = TODAY.toISOString().slice(0, 10);
      document.getElementById('t-vigencia-fin').value = '';
      historialBox.hidden = true;
    }
    syncTarifaCurrencyPrefix();
    tarifaFormSnapshot = getTarifaFormSnapshot();

    overlay.classList.add('show');
    tarifaModal.classList.add('show');
    tarifaModal.setAttribute('aria-hidden', 'false');
  }

  function toggleHistorial(){
    document.getElementById('historial-list').classList.toggle('open');
    const btn = document.querySelector('.historial-toggle');
    const isOpen = btn.classList.toggle('open');
    const count = (document.getElementById('historial-toggle-label').textContent.match(/\((\d+)\)/) || [])[1] || '0';
    document.getElementById('historial-toggle-label').textContent = `${isOpen ? 'Ocultar' : 'Ver'} historial de precios (${count})`;
  }

  function clearTarifaVigenciaError(){
    document.getElementById('tarifa-vigencia-error').hidden = true;
    document.getElementById('t-vigencia-inicio').classList.remove('has-error');
    document.getElementById('t-vigencia-fin').classList.remove('has-error');
  }

  function handleTarifaSubmit(e){
    e.preventDefault();
    const vigenciaInicio = document.getElementById('t-vigencia-inicio').value;
    const vigenciaFin = document.getElementById('t-vigencia-fin').value;
    if(vigenciaFin && vigenciaFin < vigenciaInicio){
      document.getElementById('tarifa-vigencia-error').hidden = false;
      document.getElementById('t-vigencia-inicio').classList.add('has-error');
      document.getElementById('t-vigencia-fin').classList.add('has-error');
      document.getElementById('t-vigencia-fin').focus();
      return false;
    }
    clearTarifaVigenciaError();

    const data = {
      nombre: document.getElementById('t-nombre').value.trim(),
      tipo: document.getElementById('t-tipoproducto').value,
      moneda: document.getElementById('t-moneda').value,
      unidad: document.getElementById('t-unidad').value,
      precio: Number(document.getElementById('t-precio').value || 0),
      vigenciaInicio, vigenciaFin,
    };

    const submitBtn = document.getElementById('tarifa-submit-btn');
    setButtonLoading(submitBtn, 'Guardando…');
    isSavingTarifa = true;

    setTimeout(() => {
      if(tarifaEditId !== null){
        const prev = currentTarifas[tarifaEditId];
        const historial = prev.historial ? [...prev.historial] : [];
        if(prev.precio !== data.precio){
          historial.push({ precioAnterior: prev.precio, precioNuevo: data.precio, vigenciaInicio: data.vigenciaInicio, vigenciaFin: data.vigenciaFin, usuario: 'Fio · Product Manager', fecha: 'Recién actualizado' });
        }
        currentTarifas[tarifaEditId] = { ...prev, ...data, historial };
      } else {
        currentTarifas.push({ id: 'T-' + (tarifaSeq++), ...data, historial: [] });
      }

      renderTarifasGrid();
      restoreButton(submitBtn);
      isSavingTarifa = false;
      closeTopLayer(true);
      pbShowToast('Tarifa guardada en el servicio');
    }, 450);
    return false;
  }

  function duplicateTarifa(idx){
    const original = currentTarifas[idx];
    const copy = { ...original, id: 'T-' + (tarifaSeq++), nombre: original.nombre + ' (copia)', historial: [] };
    currentTarifas.splice(idx + 1, 0, copy);
    renderTarifasGrid();
    pbShowToast('Tarifa duplicada');
  }

  function syncTarifaCurrencyPrefix(){
    const moneda = document.getElementById('t-moneda').value;
    document.getElementById('tarifa-price-prefix').textContent = MONEDA_SYMBOLS[moneda] || 'S/';
  }

  /* ------------------------------------------------------------
     Ver detalle — snapshot de auditoría (no es histórico de versiones)
     ------------------------------------------------------------ */
  function openDetalleServicio(id){
    const s = SERVICIOS[id];
    document.getElementById('detalle-modal-sub').textContent = `#${id} · ${s.nombre}`;
    document.getElementById('detalle-creado-por').textContent = s.creadoPor;
    document.getElementById('detalle-fecha-creacion').textContent = s.fechaCreacion;
    document.getElementById('detalle-modificado-por').textContent = s.modificadoPor;
    document.getElementById('detalle-fecha-modificacion').textContent = s.fechaModificacion;
    overlay.classList.add('show');
    detalleModal.classList.add('show');
    detalleModal.setAttribute('aria-hidden', 'false');
  }

  /* ------------------------------------------------------------
     Eliminación (servicio o tarifa) — modal compartido
     ------------------------------------------------------------ */
  function openDeleteServicio(id){
    pendingDelete = { type: 'servicio', id };
    document.getElementById('delete-modal-title').textContent = 'Eliminar servicio';
    document.getElementById('delete-modal-text').innerHTML = `El servicio <b>#${id}</b> y sus ${SERVICIOS[id].tarifas.length} tarifa(s) asociada(s) se eliminarán del catálogo. Podrás deshacerlo durante los siguientes segundos.`;
    overlay.classList.add('show');
    deleteModal.classList.add('show');
    deleteModal.setAttribute('aria-hidden', 'false');
  }

  function openDeleteTarifa(idx){
    pendingDelete = { type: 'tarifa', idx };
    const t = currentTarifas[idx];
    document.getElementById('delete-modal-title').textContent = 'Eliminar tarifa';
    document.getElementById('delete-modal-text').innerHTML = `La tarifa <b>${t.nombre}</b> (${TIPO_LABELS[t.tipo]} · ${t.moneda}) se eliminará del tarifario de este servicio. Podrás deshacerlo durante los siguientes segundos.`;
    overlay.classList.add('show');
    deleteModal.classList.add('show');
    deleteModal.setAttribute('aria-hidden', 'false');
  }

  function confirmPricebookDelete(){
    if(!pendingDelete) return closeTopLayer();

    if(pendingDelete.type === 'servicio'){
      const id = pendingDelete.id;
      const snapshot = SERVICIOS[id];
      delete SERVICIOS[id];
      applyPricebookFilters();
      closeTopLayer(true);
      pbShowUndoToast('Servicio eliminado', () => {
        SERVICIOS[id] = snapshot;
        applyPricebookFilters();
      });
    } else if(pendingDelete.type === 'tarifa'){
      const idx = pendingDelete.idx;
      const snapshot = currentTarifas[idx];
      currentTarifas.splice(idx, 1);
      expandedHistory.delete(idx);
      renderTarifasGrid();
      deleteModal.classList.remove('show');
      deleteModal.setAttribute('aria-hidden', 'true');
      if(!drawer.classList.contains('show')) overlay.classList.remove('show');
      pbShowUndoToast('Tarifa eliminada', () => {
        currentTarifas.splice(idx, 0, snapshot);
        renderTarifasGrid();
      });
    }
    pendingDelete = null;
  }

  /* ------------------------------------------------------------
     Cierre de capas (overlay / Escape) — respeta apilamiento
     ------------------------------------------------------------ */
  function closeTopLayer(skipDirtyCheck){
    if(isSavingService || isSavingTarifa) return;
    if(detalleModal.classList.contains('show')){
      detalleModal.classList.remove('show'); detalleModal.setAttribute('aria-hidden', 'true');
      if(!drawer.classList.contains('show')) overlay.classList.remove('show');
      return;
    }
    if(deleteModal.classList.contains('show')){
      deleteModal.classList.remove('show'); deleteModal.setAttribute('aria-hidden', 'true');
      if(!drawer.classList.contains('show')) overlay.classList.remove('show');
      pendingDelete = null;
      return;
    }
    if(unsavedModal.classList.contains('show')){
      // Escape/overlay sobre el modal de confirmación equivale a "seguir editando"
      keepEditing();
      return;
    }
    if(tarifaModal.classList.contains('show')){
      if(!skipDirtyCheck && isTarifaFormDirty()){ requestCloseWithDirtyCheck('tarifa'); return; }
      tarifaModal.classList.remove('show'); tarifaModal.setAttribute('aria-hidden', 'true');
      tarifaFormSnapshot = null;
      if(!drawer.classList.contains('show')) overlay.classList.remove('show');
      return;
    }
    if(drawer.classList.contains('show')){
      if(!skipDirtyCheck && isServiceFormDirty()){ requestCloseWithDirtyCheck('drawer'); return; }
      drawer.classList.remove('show'); drawer.setAttribute('aria-hidden', 'true');
      serviceFormSnapshot = null;
      overlay.classList.remove('show');
      return;
    }
    overlay.classList.remove('show');
  }
  function handleOverlayClick(){ closeTopLayer(); }

  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && document.getElementById('view-pricebook').classList.contains('active')) closeTopLayer(); });

  function pbShowToast(msg){
    if(pendingUndo){ clearTimeout(pendingUndo.timerId); pendingUndo = null; }
    document.getElementById('toast-undo').hidden = true;
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(pbShowToast._t);
    pbShowToast._t = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  function pbShowUndoToast(msg, undoFn){
    if(pendingUndo){ clearTimeout(pendingUndo.timerId); pendingUndo = null; }
    clearTimeout(pbShowToast._t);
    document.getElementById('toast-msg').textContent = msg;
    const undoBtn = document.getElementById('toast-undo');
    undoBtn.hidden = false;
    toast.classList.add('show');
    const timerId = setTimeout(() => { toast.classList.remove('show'); pendingUndo = null; }, UNDO_WINDOW_MS);
    pendingUndo = { undoFn, timerId };
  }

  function handleUndo(){
    if(!pendingUndo) return;
    clearTimeout(pendingUndo.timerId);
    pendingUndo.undoFn();
    pendingUndo = null;
    toast.classList.remove('show');
    setTimeout(() => pbShowToast('Acción deshecha'), 350);
  }

  document.getElementById('pbBtnClearFilters').addEventListener('click', clearPricebookFilters);

  document.querySelector('#main-table thead').addEventListener('click', (e) => {
    const th = e.target.closest('th.sortable');
    if(th) toggleSort(th.dataset.field);
  });

  /* Init del módulo Pricebook — expuesto al router del host.
     El router llama ensureRendered() al entrar a la vista. */
  var __pbRendered = false;
  window.PricebookModule = {
    ensureRendered: function(){ applyPricebookFilters(); __pbRendered = true; }
  };
  applyPricebookFilters();  /* primera pintura (la vista está oculta hasta navegar) */


(function(){
"use strict";
/* Credenciales de demostración. En producción esto se valida contra un
   backend con hash + sesión; aquí el objetivo es demostrar el flujo UX. */
var LOGIN_USER = "fiorellaruiz";
var LOGIN_PASS = "12345";

var screen = document.getElementById("loginScreen");
var card   = document.getElementById("loginCard");
var form   = document.getElementById("loginForm");
var userIn = document.getElementById("loginUser");
var passIn = document.getElementById("loginPass");
var errBox = document.getElementById("loginError");

/* El logo del login reutiliza el asset del sidebar (evita hardcodear la ruta dos veces) */
document.addEventListener("DOMContentLoaded", function(){
  var sidebarLogo = document.querySelector(".sidebar-logo .logo-full");
  var loginLogo = document.getElementById("loginLogoImg");
  if(sidebarLogo && loginLogo) loginLogo.src = sidebarLogo.src;
  document.body.style.overflow = "hidden";           /* bloquea scroll del fondo */
  document.querySelector(".app-shell").setAttribute("aria-hidden","true");
  setTimeout(function(){ userIn.focus(); }, 60);
});

function showLogin(){
  screen.classList.remove("closing");
  document.body.style.overflow = "hidden";
  document.querySelector(".app-shell").setAttribute("aria-hidden","true");
  userIn.value = ""; passIn.value = ""; errBox.hidden = true;
  setTimeout(function(){ userIn.focus(); }, 60);
}
function hideLogin(){
  screen.classList.add("closing");
  document.body.style.overflow = "";
  document.querySelector(".app-shell").removeAttribute("aria-hidden");
  if(window.goToInicio) window.goToInicio();
}

var userGroup = userIn.closest(".field-group");
var passGroup = passIn.closest(".field-group");

form.addEventListener("submit", function(e){
  e.preventDefault();
  var okUser = userIn.value.trim().toLowerCase() === LOGIN_USER;
  var okPass = passIn.value === LOGIN_PASS;
  if(okUser && okPass){
    errBox.hidden = true;
    userGroup.classList.remove("field-error");
    passGroup.classList.remove("field-error");
    hideLogin();
    return;
  }
  errBox.hidden = false;
  passIn.value = "";
  userGroup.classList.toggle("field-error", !okUser);
  passGroup.classList.add("field-error");
  card.classList.remove("shake");
  void card.offsetWidth;                              /* reinicia la animación */
  card.classList.add("shake");
  (okUser ? passIn : userIn).focus();
});

/* Quita el borde de error apenas el usuario retoma el campo */
userIn.addEventListener("input", function(){ userGroup.classList.remove("field-error"); });
passIn.addEventListener("input", function(){ passGroup.classList.remove("field-error"); });

/* "¿Olvidaste tu contraseña?" — entorno de demo, sin flujo real */
document.getElementById("loginForgotBtn").addEventListener("click", function(){
  document.getElementById("loginForgotText").hidden = false;
});

/* SSO simulado — mismo flujo de éxito que usuario/contraseña */
document.getElementById("loginSsoBtn").addEventListener("click", function(){
  errBox.hidden = true;
  userGroup.classList.remove("field-error");
  passGroup.classList.remove("field-error");
  hideLogin();
});

/* Mostrar / ocultar contraseña */
document.getElementById("loginTogglePass").addEventListener("click", function(){
  var showing = passIn.type === "text";
  passIn.type = showing ? "password" : "text";
  this.setAttribute("aria-pressed", String(!showing));
  this.setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
  passIn.focus();
});

/* Cerrar sesión desde el sidebar */
document.addEventListener("DOMContentLoaded", function(){
  var btn = document.getElementById("btnLogout");
  if(btn) btn.addEventListener("click", showLogin);
});
})();

/* ============================================================
   MÓDULO MOTOR DE VARIABLES Y FÓRMULAS
   Refactor del JS de HTML 3 dentro de un IIFE aislado. La única
   superficie pública es window.MotorVariablesModule.ensureRendered(),
   invocada por el hook onShow de REAL_VIEW_META (mismo contrato que
   PricebookModule). Los 8 DOMContentLoaded originales se consolidan
   en una única inicialización perezosa; toda la delegación de eventos
   se registra sobre el propio contenedor de la vista (root), nunca
   sobre document, salvo Escape y el cierre del menú de exportación,
   que verifican estado del módulo antes de actuar.
   ============================================================ */
(function(){
"use strict";

/* -------------------------------------------------------------------------
   1) DATASET — Catálogo de conceptos (fuente: assets/motor-variables-final_1.json)
   nominal:null + esSupuesto:true → valor no confirmado (sin cifra real
   provista por la fuente); se muestra "Valor supuesto" en vez de un
   número inventado. `nombre` se genera desde `label` con la misma
   normalización que usa el formulario de "Agregar variable" (ver
   handleEditSubmit) para poder detectar dependencias en `formula`.
   `rent` guarda el campo "clase" del JSON fuente (Ingreso/Costo/Gasto/
   Resultante/Computada/Insumo de cálculo — X); se muestra como columna
   "Clase" en la tabla. El campo `clase` interno (INPUT/OUTPUT) queda
   sin usar — esa dimensión no viene en este dataset y no se renderiza.
   ------------------------------------------------------------------------- */
const RAW_DATA = [
{id:'C001',idc:'C001',nombre:'PERSONALIZACION_ADHOC',label:'Personalización adhoc',categoria:'Tarjetas y emisión',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.ADICIONAL_ADHOC !=NO && PROPUESTA.ADICIONAL_ADHOC=!EXONERADO ENTONCES (VALOR NOMINAL) SINO 0',estado:'Activo',driver:'Hora',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C002',idc:'C002',nombre:'WELCOME_KIT',label:'Welcome kit',categoria:'Tarjetas y emisión',nominal:0.18,esSupuesto:false,formula:'(VALOR NOMINAL*PROPUESTA.QTARJETA)',estado:'Activo',driver:'Tarjeta',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C003',idc:'C003',nombre:'EMBOZADO',label:'Embozado',categoria:'Tarjetas y emisión',nominal:null,esSupuesto:true,formula:'(VALOR NOMINAL*PROPUESTA.QTARJETA)',estado:'Activo',driver:'Tarjeta',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C004',idc:'C004',nombre:'EMISION_TARJETAS_CON_AFINIDAD',label:'Emisión de tarjetas con afinidad',categoria:'Tarjetas y emisión',nominal:0.1,esSupuesto:false,formula:'(VALOR NOMINAL*PROPUESTA.QTARJETA)',estado:'Activo',driver:'Tarjeta',moneda:'EURO',rent:'Computada',history:[]},
{id:'C005',idc:'C005',nombre:'COSTO_PLASTICO_TARJETAS',label:'Costo del plástico de tarjetas',categoria:'Tarjetas y emisión',nominal:null,esSupuesto:true,formula:'(PROPUESTA.COSTO_PLASTICO_DE_TARJETAS)',estado:'Activo',driver:'Tarjeta',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C006',idc:'C006',nombre:'ENVIO_TARJETAS_A_PROVINCIA',label:'Envío de tarjetas a provincia',categoria:'Logística y entrega',nominal:18,esSupuesto:false,formula:'(VALOR NOMINAL * PROPUESTA.CONDCOMERCIAL.QDESTINOS_PROVINCIA)',estado:'Activo',driver:'Punto de entrega',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C007',idc:'C007',nombre:'ENVIO_TARJETAS_A_LIMA',label:'Envío de tarjetas a Lima',categoria:'Logística y entrega',nominal:10,esSupuesto:false,formula:'(VALOR NOMINAL * PROPUESTA.CONDCOMERCIAL.QDESTINOS_LIMA)',estado:'Activo',driver:'Punto de entrega',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C008',idc:'C008',nombre:'REPOSICION_POR_PERDIDA_O_ROBO',label:'Reposición por pérdida o robo',categoria:'Tarjetas y emisión',nominal:16.95,esSupuesto:false,formula:'SI PROPUESTA.REPOSICION!= EXONERADO ENTONCES (VALOR NOMINAL*RATIO_REPOSICION)',estado:'Activo',driver:'Tarjeta',moneda:'SOLES',rent:'Ingreso',history:[]},
{id:'C009',idc:'C009',nombre:'TRANSACCIONES_APROBADAS',label:'Transacciones aprobadas',categoria:'Transaccional y procesamiento',nominal:0.06,esSupuesto:false,formula:'(VALOR NOMINAL* NUMERO_TRANSACCIONES_PROMEDIO)',estado:'Activo',driver:'Transacción',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C010',idc:'C010',nombre:'CUENTA_ACTIVA',label:'Cuenta activa',categoria:'Transaccional y procesamiento',nominal:0.12,esSupuesto:false,formula:'(VALOR NOMINAL*PROPUESTA.QTARJETAS* PROPUESTA.NUMERO_PEDIDOS_AL_ANIO)',estado:'Activo',driver:'Transacción',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C011',idc:'C011',nombre:'PROCESAMIENTO_OTROS_COSTOS',label:'Procesamiento (otros costos)',categoria:'Transaccional y procesamiento',nominal:0.105,esSupuesto:false,formula:'(VALOR NOMINAL* PROPUESTA.QTARJETAS)*PROPUESTA.NUMERO_PEDIDOS_AL_ANIO)',estado:'Activo',driver:'Transacción',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C012',idc:'C012',nombre:'PROCESAMIENTO_TRANSACCION_MARCA',label:'Procesamiento de transacción de marca',categoria:'Transaccional y procesamiento',nominal:null,esSupuesto:true,formula:'(PROPUESTA.PROCESAMIENTO_TX_MARCA.VALOR NOMINAL)',estado:'Activo',driver:'Business Volume',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C013',idc:'C013',nombre:'INTERCHANGE_FEE',label:'Interchange fee',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'(PROPUESTA.INTERCHANGE_FEE.VALOR NOMINAL)',estado:'Activo',driver:'Business Volume',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C014',idc:'C014',nombre:'MDR_ADICIONAL',label:'MDR adicional',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'(PROPUESTA.MDR_ADICIONAL.VALOR NOMINAL)',estado:'Activo',driver:'Business Volume',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C015',idc:'C015',nombre:'RATIO_CONSUMO_SOBRE_LA_CARGA',label:'Ratio de consumo sobre la carga',categoria:'Transaccional y procesamiento',nominal:98,esSupuesto:false,formula:'(VALOR NOMINAL)',estado:'Activo',driver:'Business Volume',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C016',idc:'C016',nombre:'LOGISTICA_Y_ENVIOS_L_E',label:'Logística y envíos (L&E)',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'(PROPUESTA.L&E.VALOR NOMINAL)',estado:'Activo',driver:'Business Volume',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C017',idc:'C017',nombre:'COSTO_PROMEDIO_MANTENIMIENTO',label:'Costo promedio de mantenimiento',categoria:'Comisiones e ingresos',nominal:0.5,esSupuesto:false,formula:'(VALOR NOMINAL)',estado:'Activo',driver:'Business Volume',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C018',idc:'C018',nombre:'CARTA_FIANZA_TASA',label:'Carta fianza (tasa)',categoria:'Carta fianza y garantías',nominal:5.2,esSupuesto:false,formula:'SI PROPUESTA.CARTA_FIANZA= SI (VALOR NOMINAL)',estado:'Activo',driver:'Business Volume',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C019',idc:'C019',nombre:'COMISION_AL_CLIENTE',label:'Comisión al cliente',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'(PROPUESTA.COMISION_CLIENTE_EJECUTIVO* PROPUESTA.BV_ANUAL )- CALCULO_REBATE',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Ingreso',history:[]},
{id:'C020',idc:'C020',nombre:'TASA_UNITARIA_COMISION_CLIENTE',label:'Tasa unitaria — comisión cliente',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'(COMISION_CLIENTE /PROPUESTA.BV_ANUAL)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C021',idc:'C021',nombre:'COMISION_MERCHANT',label:'Comisión merchant',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'(TUR_COMISION_MERCHANT* REEMBOLSO)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Ingreso',history:[]},
{id:'C022',idc:'C022',nombre:'TASA_UNITARIA_COMISION_MERCHANT',label:'Tasa unitaria — comisión merchant',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.PRODUCTO_CUSTOM !=SI, ENTONCES:(INTERCHANGE_FEE + MDR_ADICIONAL) SINO: (INTERCHANGE_FEE + PROPUESTA.MDR_NEGOCIADO)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C023',idc:'C023',nombre:'OTROS_INGRESOS_CALCULADO',label:'Otros ingresos (calculado)',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'L&E_CALCULADO+MANTENIMIENTO+PERSONALIZACION_ADHOC+DISTRIBUCION',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Ingreso',history:[]},
{id:'C024',idc:'C024',nombre:'TASA_UNITARIA_OTROS_INGRESOS',label:'Tasa unitaria — otros ingresos',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'OTROS_INGRESOS(CALCULADO) /PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C025',idc:'C025',nombre:'LOGISTICA_Y_ENVIOS_CALCULADO',label:'Logística y envíos (calculado)',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'L&E * PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C026',idc:'C026',nombre:'MANTENIMIENTO',label:'Mantenimiento',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.SOLUCION!=FOOD ENTONCES PROPUESTA.Q_TARJETAS_NUEVAS * COSTO_PROMEDIO_DE_MANTENIMIENTO * PESO%_MES_SUMATORIA SINO 0',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C027',idc:'C027',nombre:'TASA_UNITARIA_MANTENIMIENTO',label:'Tasa unitaria — mantenimiento',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'MANTENIMIENTO / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C028',idc:'C028',nombre:'TASA_UNITARIA_PERSONALIZACION_ADHOC',label:'Tasa unitaria — personalización adhoc',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'PERSONALIZACION_ADHOC / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C029',idc:'C029',nombre:'DISTRIBUCION_COSTO',label:'Distribución (costo)',categoria:'Logística y entrega',nominal:null,esSupuesto:true,formula:'((ENVIO_TARJETAS_LIMA )+ ENVIO_TARJETAS_PROVINCIA)*1.1',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C030',idc:'C030',nombre:'TASA_UNITARIA_DISTRIBUCION',label:'Tasa unitaria — distribución',categoria:'Logística y entrega',nominal:null,esSupuesto:true,formula:'DISTRIBUCION / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C031',idc:'C031',nombre:'COSTO_VENTA',label:'Costo de venta',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'INSUMOS_PERSONALIZACION_Y_ENSOBRADO+PROCESAMIENTO+MARCA_CALCULADO+DISTRIBUCION_COSTO',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Costo',history:[]},
{id:'C032',idc:'C032',nombre:'TASA_UNITARIA_COSTO_VENTA',label:'Tasa unitaria — costo de venta',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'COSTO_VENTA / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C033',idc:'C033',nombre:'INSUMOS_PERSONALIZACION_Y_ENSOBRADO',label:'Insumos, personalización y ensobrado',categoria:'Tarjetas y emisión',nominal:null,esSupuesto:true,formula:'(WELCOME_KIT)+(EMBOZADO)+(COSTO_PLASTICO_DE_TARJETAS) SI PROPUESTA.ADICIONAL_ADHOC =SI y PROPUESTA.ADICIONAL_ADHOC=EXONERADO, ENTONCES: (WELCOME_KIT)+(EMBOZADO)+(COSTO_PLASTICO_DE_TARJETAS)+EMISION_TARJETAS_CON_AFINIDAD+COSTO_PERSONALIZACION_ADHOC',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C034',idc:'C034',nombre:'TASA_UNITARIA_INSUMOS_Y_ENSOBRADO',label:'Tasa unitaria — insumos y ensobrado',categoria:'Tarjetas y emisión',nominal:null,esSupuesto:true,formula:'INSUMOS_PERSONALIZACION_Y_ENSOBRADO / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C035',idc:'C035',nombre:'PROCESAMIENTO',label:'Procesamiento',categoria:'Transaccional y procesamiento',nominal:null,esSupuesto:true,formula:'(TRANSACCIONES_APROBADAS)+(CUENTA_ACTIVA)+(PROCESAMIENTO (OTROS COSTOS))',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C036',idc:'C036',nombre:'TASA_UNITARIA_PROCESAMIENTO',label:'Tasa unitaria — procesamiento',categoria:'Transaccional y procesamiento',nominal:null,esSupuesto:true,formula:'PROCESAMIENTO / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C037',idc:'C037',nombre:'OTROS_GASTOS',label:'Otros gastos',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'GASTOS_FINANCIEROS+ CARTA_FIANZA+PAYROLL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Gasto',history:[]},
{id:'C038',idc:'C038',nombre:'TASA_UNITARIA_OTROS_GASTOS',label:'Tasa unitaria — otros gastos',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'OTROS_GASTOS / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C039',idc:'C039',nombre:'PAYROLL_COMERCIAL',label:'Payroll comercial',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'COMISION_VARIABLE_EJECUTIVO + BONO_LARGE_DEAL * -1',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C040',idc:'C040',nombre:'TASA_UNITARIA_PAYROLL',label:'Tasa unitaria — payroll',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'PAYROLL / PROPUESTA.BV_MENSUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C041',idc:'C041',nombre:'COMISION_VARIABLE_EJECUTIVO',label:'Comisión variable del ejecutivo',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'(PROPUESTA.BV_MENSUAL ÷ 1000) × FACTOR CORRESPONDIENTE (NAVIDAD=3.8, RECURRENTE=12, ÚNICO=1.3)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C042',idc:'C042',nombre:'BONO_POR_LARGE_DEAL',label:'Bono por large deal',categoria:'Costos y gastos',nominal:3500,esSupuesto:false,formula:'SI PROPUESTA.RECURRENCIA = RECURRENTE && PROPUESTA.BV_MENSUAL > S/200,000. ENTONCES: 3500',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C043',idc:'C043',nombre:'CARTA_FIANZA',label:'Carta fianza',categoria:'Carta fianza y garantías',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.SECTOR = PUBLICO && PROPUESTA.CARTA_FIANZA =SI ENTONCES: CARTA_FIANZA(TASA)* MONTO_CARTA_FIANZA',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C044',idc:'C044',nombre:'TASA_UNITARIA_CARTA_FIANZA',label:'Tasa unitaria — carta fianza',categoria:'Carta fianza y garantías',nominal:null,esSupuesto:true,formula:'(+)CARTA_FIANZA / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C045',idc:'C045',nombre:'GASTOS_FINANCIEROS',label:'Gastos financieros',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.MODALIDAD_DE_PAGO =CREDITO ENTONCES: ((1 + 5.2%)^(1/360) − 1) × PROPUESTA.BV_MENSUAL × (PROPUESTA.DIAS_CRÉDITO + 5)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C046',idc:'C046',nombre:'TASA_UNITARIA_GASTOS_FINANCIEROS',label:'Tasa unitaria — gastos financieros',categoria:'Costos y gastos',nominal:null,esSupuesto:true,formula:'GASTOS_FINANCIEROS / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C047',idc:'C047',nombre:'RENTABILIDAD',label:'Rentabilidad',categoria:'Rentabilidad total',nominal:null,esSupuesto:true,formula:'SI (TOTAL_RESTA_INGRESOS_GASTOS) && TOTAL_INGRESOS > 0, ENTONCES: - TOTAL_RESTA_INGRESOS_GASTOS/ TOTAL_INGRESOS SINO: +TOTAL_RESTA_INGRESOS_GASTOS/ TOTAL_INGRESOS',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Resultante',history:[]},
{id:'C048',idc:'C048',nombre:'NUMERO_TRANSACCIONES_PROMEDIO',label:'Número de transacciones promedio',categoria:'Transaccional y procesamiento',nominal:null,esSupuesto:true,formula:'REEMBOLSO / TICKET_PROMEDIO',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C049',idc:'C049',nombre:'TICKET_PROMEDIO',label:'Ticket promedio',categoria:'Transaccional y procesamiento',nominal:null,esSupuesto:true,formula:'(PROPUESTA.TICKET_PROMEDIO.VALOR NOMINAL)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C050',idc:'C050',nombre:'REEMBOLSO',label:'Reembolso',categoria:'Transaccional y procesamiento',nominal:null,esSupuesto:true,formula:'RATIO_DE_CONSUMO_SOBRE_LA_CARGA* PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C051',idc:'C051',nombre:'MONTO_CARTA_FIANZA',label:'Monto de carta fianza',categoria:'Carta fianza y garantías',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.CARTA_FIANZA =SI 10%*PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — gasto',history:[]},
{id:'C052',idc:'C052',nombre:'COSTO_MARCA_CALCULADO',label:'Costo de marca (calculado)',categoria:'Transaccional y procesamiento',nominal:null,esSupuesto:true,formula:'(-)(PROCESAMIENTO_TX_MARCA)*REEMBOLSO',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C053',idc:'C053',nombre:'TOTAL_INGRESOS',label:'Total de ingresos',categoria:'Rentabilidad total',nominal:null,esSupuesto:true,formula:'COMISION_CLIENTE + COMISION_MERCHANT + OTROS_INGRESOS(CALCULADO)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Resultante',history:[]},
{id:'C054',idc:'C054',nombre:'TOTAL_GASTOS',label:'Total de gastos',categoria:'Rentabilidad total',nominal:null,esSupuesto:true,formula:'COSTO_VENTA + OTROS_GASTOS',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Resultante',history:[]},
{id:'C055',idc:'C055',nombre:'INGRESOS_MENOS_GASTOS',label:'Ingresos menos gastos',categoria:'Rentabilidad total',nominal:null,esSupuesto:true,formula:'TOTAL_INGRESOS - TOTAL_GASTOS',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Resultante',history:[]},
{id:'C056',idc:'C056',nombre:'TASA_UNITARIA_MARGEN',label:'Tasa unitaria — margen',categoria:'Rentabilidad total',nominal:null,esSupuesto:true,formula:'TOTAL_RESTA_INGRESOS_GASTOS / PROPUESTA.BV_ANUAL',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Resultante',history:[]},
{id:'C057',idc:'C057',nombre:'COSTO_PERSONALIZACION_ADHOC',label:'Costo de personalización adhoc',categoria:'Tarjetas y emisión',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.COSTO_PERSONALIZACION_ADHOC=SI ENTONCES: (VALOR NOMINAL)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — costo',history:[]},
{id:'C058',idc:'C058',nombre:'PESO_MENSUAL_SUMATORIA',label:'Peso % mensual (sumatoria)',categoria:'Parámetros de tiempo',nominal:null,esSupuesto:true,formula:'(MES%_1+MES%_2+MES%_3+MES%_4+MES%_5+MES%_6+MES%_7+MES%_8+MES%_9+MES%_10+MES%_11+MES%_12)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C059',idc:'C059',nombre:'EMISION_TARJETAS',label:'Emisión de tarjetas',categoria:'Tarjetas y emisión',nominal:null,esSupuesto:true,formula:'(PROPUESTA.EMISION_TARJETAS.VALOR NOMINAL* PROPUESTA.QTARJETAS)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Ingreso',history:[]},
{id:'C060',idc:'C060',nombre:'TIPO_REBATE',label:'Tipo de rebate',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'(PROPUESTA.TIPO_REBATE)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C061',idc:'C061',nombre:'CALCULO_REBATE',label:'Cálculo de rebate',categoria:'Comisiones e ingresos',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.TIPO_REBATE=MONTO_FIJO_REBATE ENTONCES: (PROPUESTA.MONTO_FIJO_REBATE) SINO (PROPUESTA.%BV_REBATE * PROPUESTA.BV_ANUAL)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C062',idc:'C062',nombre:'RATIO_REPOSICION',label:'Ratio de reposición',categoria:'Tarjetas y emisión',nominal:null,esSupuesto:true,formula:'(VALOR NOMINAL)',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C063',idc:'C063',nombre:'DISTRIBUCION',label:'Distribución',categoria:'Logística y entrega',nominal:null,esSupuesto:true,formula:'SI PROPUESTA.DISTRIBUCION!= EXONERADO ENTONCES: (DISTRIBUCION_LIMA + DISTRIBUCION_PROVINCIA) SINO 0',estado:'Activo',driver:'—',moneda:'SOLES',rent:'Insumo de cálculo — ingreso',history:[]},
{id:'C064',idc:'C064',nombre:'DISTRIBUCION_LIMA',label:'Distribución — Lima',categoria:'Logística y entrega',nominal:null,esSupuesto:true,formula:'(VALOR NOMINAL * PROPUESTA.CONDCOMERCIAL.QDESTINOS_PROVINCIA)',estado:'Activo',driver:'Punto de entrega',moneda:'SOLES',rent:'Computada',history:[]},
{id:'C065',idc:'C065',nombre:'DISTRIBUCION_PROVINCIA',label:'Distribución — provincia',categoria:'Logística y entrega',nominal:null,esSupuesto:true,formula:'(VALOR NOMINAL * PROPUESTA.CONDCOMERCIAL.QDESTINOS_LIMA)',estado:'Activo',driver:'Punto de entrega',moneda:'SOLES',rent:'Computada',history:[]},
];

/* Clon profundo hacia el estado de trabajo: las ediciones/eliminaciones
   no mutan la constante fuente. */
let DATA = JSON.parse(JSON.stringify(RAW_DATA));
let editingId  = null;   // id abierto en el modal de edición (null = creando)
let deletingId = null;   // id pendiente de confirmación de eliminado
let editDirty  = false;  // cambios sin guardar en el modal de edición
const MV_COLLAPSED_CATS_KEY = 'mv_collapsed_cats';
function loadCollapsedCats(){
  try{
    const raw = localStorage.getItem(MV_COLLAPSED_CATS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  }catch(e){ return new Set(); }
}
function persistCollapsedCats(){
  try{ localStorage.setItem(MV_COLLAPSED_CATS_KEY, JSON.stringify(Array.from(collapsedCrudCats))); }catch(e){}
}
const collapsedCrudCats = loadCollapsedCats();
const collapsedSimCats  = {intermediate:new Set(), output:new Set()};
let wired = false, rendered = false, activeTab = 'crud';
let mvLastFocus = null, simInputTimer = null;

/* -------------------------------------------------------------------------
   2) HELPERS (con scope en la vista del módulo)
   ------------------------------------------------------------------------- */
const root = document.getElementById('view-motor-variables');
const $  = (sel)=>root.querySelector(sel);
const $$ = (sel,ctx)=>Array.from((ctx||root).querySelectorAll(sel));

const CATEGORY_ORDER = ['Tarjetas y emisión','Logística y entrega','Transaccional y procesamiento','Comisiones e ingresos','Costos y gastos','Carta fianza y garantías','Rentabilidad total','Parámetros de tiempo'];

function byId(id){ return DATA.find(d=>d.id===id); }

function fmtMoney(v,moneda){
  if(v===null||v===undefined||Number.isNaN(v)) return '—';
  const sym = monedaSymbol(moneda);
  const neg = v<0;
  const out = sym+' '+Math.abs(v).toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2});
  return neg ? '−'+out : out;
}
function fmtNum(v,decimals){
  if(v===null||v===undefined||Number.isNaN(v)) return '—';
  if(decimals===undefined) decimals = 2;
  return v.toLocaleString('es-PE',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});
}
function fmtPct(v){
  if(v===null||v===undefined||Number.isNaN(v)) return '—';
  return (v*100).toLocaleString('es-PE',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';
}
function esc(s){
  return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function monedaSymbol(m){ return m==='EURO' ? '€' : (m==='DOLARES' ? '$' : 'S/'); }
function monedaName(m){ return m==='EURO' ? 'Euro' : (m==='DOLARES' ? 'Dólar' : 'Soles'); }

/* Toast: reutiliza el toast-stack nativo del host (misma anatomía visual). */
function mvToast(message, type){
  type = type || 'info';
  const stack = document.getElementById('toastStack');
  if(!stack) return;
  const icoMap = {
    success: '<path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    danger:  '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    info:    '<path d="M12 8v.01M12 11v5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'
  };
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = '<span class="toast-ico"><svg viewBox="0 0 24 24">'+(icoMap[type]||icoMap.info)+'</svg></span><span>'+esc(message)+'</span>';
  stack.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('show'));
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(),350); }, 3800);
}

/* Mapa nombre técnico -> registro, para detectar referencias cruzadas
   dentro de las fórmulas ("depende de" / "usado por"). */
function nameMap(){
  const map = {};
  DATA.forEach(d=>{ map[d.nombre.toUpperCase()] = d; });
  return map;
}
function findDependencies(record){
  if(!record.formula) return [];
  const map = nameMap();
  const found = new Set();
  Object.keys(map).forEach(name=>{
    if(name===record.nombre.toUpperCase()) return;
    const re = new RegExp('\\b'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i');
    if(re.test(record.formula)) found.add(map[name].id);
  });
  return Array.from(found);
}
function findDependents(record){
  return DATA.filter(d=>findDependencies(d).includes(record.id)).map(d=>d.id);
}

/* Badges (heredan .badge del host; colores semánticos mv-).
   `rent` guarda el campo "clase" del catálogo fuente (Ingreso/Costo/
   Gasto/Resultante/Computada/Insumo de cálculo — X); se muestra en la
   columna "Clase". Las 3 variantes "Insumo de cálculo — X" heredan el
   color de su X. */
const RENT_LABELS = {
  'Ingreso':'Ingreso', 'Costo':'Costo', 'Gasto':'Gasto', 'Resultante':'Resultante', 'Computada':'Computada',
  'Insumo de cálculo — ingreso':'Insumo de cálculo — ingreso',
  'Insumo de cálculo — costo':'Insumo de cálculo — costo',
  'Insumo de cálculo — gasto':'Insumo de cálculo — gasto'
};
const RENT_CLASS = {
  'Ingreso':'mv-rent-ingresos', 'Costo':'mv-rent-costos', 'Gasto':'mv-rent-gastos', 'Resultante':'mv-rent-resultado', 'Computada':'mv-rent-parametro',
  'Insumo de cálculo — ingreso':'mv-rent-ingresos',
  'Insumo de cálculo — costo':'mv-rent-costos',
  'Insumo de cálculo — gasto':'mv-rent-gastos'
};
function rentBadge(rent){
  return '<span class="badge '+(RENT_CLASS[rent]||'mv-rent-parametro')+'">'+esc(RENT_LABELS[rent]||rent)+'</span>';
}
function estadoBadge(estado){
  const map = {Activo:'mv-estado-activo',Inactivo:'mv-estado-inactivo',Pendiente:'mv-estado-pendiente'};
  const label = estado==='Pendiente' ? 'Pendiente' : estado;
  return '<span class="badge '+(map[estado]||'mv-estado-inactivo')+'">'+esc(label)+'</span>';
}
function claseLabel(clase){ return clase==='INPUT' ? 'Valor manual' : 'Resultado calculado'; }

/* -------------------------------------------------------------------------
   3) GESTIÓN DE VARIABLES — filtros y tabla
   ------------------------------------------------------------------------- */
function populateDriverFilter(){
  const sel = $('#mv-filter-driver');
  const current = sel.value;
  const drivers = Array.from(new Set(DATA.map(d=>d.driver).filter(d=>d && d!=='—'))).sort();
  sel.innerHTML = '<option value="">Todas</option>' + drivers.map(d=>'<option value="'+esc(d)+'">'+esc(d)+'</option>').join('');
  sel.value = current;
}
function populateCategoriaFilter(){
  const sel = $('#mv-filter-categoria');
  const current = sel.value;
  sel.innerHTML = '<option value="">Todas</option>' + CATEGORY_ORDER.map(c=>'<option value="'+esc(c)+'">'+esc(c)+'</option>').join('');
  sel.value = current;
}

function getFilteredData(){
  const q = $('#mv-crud-search').value.trim().toLowerCase();
  const categoria = $('#mv-filter-categoria').value;
  const rent = $('#mv-filter-rent').value;
  const estado = $('#mv-filter-estado').value;
  const driver = $('#mv-filter-driver').value;
  const moneda = $('#mv-filter-moneda').value;
  return DATA.filter(d=>{
    if(q && !(d.id.toLowerCase().includes(q) || d.idc.toLowerCase().includes(q) || d.nombre.toLowerCase().includes(q) || (d.label||'').toLowerCase().includes(q) || (d.resumen||'').toLowerCase().includes(q) || (d.formula||'').toLowerCase().includes(q))) return false;
    if(categoria && d.categoria!==categoria) return false;
    if(rent && d.rent!==rent) return false;
    if(estado && d.estado!==estado) return false;
    if(driver && d.driver!==driver) return false;
    if(moneda && d.moneda!==moneda) return false;
    return true;
  });
}

const ICONS = {
  clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  pencil:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"/></svg>',
  chevron:'<svg class="mv-cat-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  warning:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></svg>',
  locate:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>'
};

function renderConceptosTable(){
  const rows = getFilteredData();
  const tbody = $('#mv-crud-tbody');
  $('#mv-crud-count').innerHTML = '<strong>'+rows.length+'</strong> de '+DATA.length+' conceptos';

  const scrollWrap = $('#mv-crud-table').closest('.table-scroll');
  if(rows.length===0){
    tbody.innerHTML = '';
    scrollWrap.classList.add('hidden');
    $('#mv-crud-empty').classList.remove('hidden');
    return;
  }
  scrollWrap.classList.remove('hidden');
  $('#mv-crud-empty').classList.add('hidden');

  const colCount = 8;

  /* Con filtros activos se fuerza todo expandido para que ninguna
     coincidencia quede oculta bajo una categoría colapsada. El estado
     de colapso se conserva y se restituye al limpiar filtros. */
  const filtersActive = !!($('#mv-crud-search').value.trim() || $('#mv-filter-categoria').value || $('#mv-filter-rent').value || $('#mv-filter-estado').value || $('#mv-filter-driver').value || $('#mv-filter-moneda').value);
  /* Si se filtró exactamente por una categoría, su cabecera es redundante
     (solo queda un grupo): se muestran las filas directamente. */
  const categoriaFilterActive = !!$('#mv-filter-categoria').value;

  const groups = {};
  rows.forEach(d=>{ (groups[d.categoria||'Otros'] = groups[d.categoria||'Otros']||[]).push(d); });
  const orderedCats = CATEGORY_ORDER.filter(c=>groups[c]).concat(Object.keys(groups).filter(c=>!CATEGORY_ORDER.includes(c)));

  tbody.innerHTML = orderedCats.map(cat=>{
    const groupRows = groups[cat];
    const isCollapsed = !filtersActive && collapsedCrudCats.has(cat);
    const pendingCount = groupRows.filter(d=>d.estado==='Pendiente').length;
    const groupHeader = categoriaFilterActive ? '' : (
      '<tr class="mv-cat-row"><td colspan="'+colCount+'">'+
        '<button type="button" class="mv-cat-toggle '+(isCollapsed?'is-collapsed':'')+'" data-mv-cat="'+esc(cat)+'" aria-expanded="'+(!isCollapsed)+'">'+
          ICONS.chevron+
          '<span class="mv-cat-label">'+esc(cat)+'</span>'+
          '<span class="mv-cat-count">'+groupRows.length+' concepto'+(groupRows.length===1?'':'s')+'</span>'+
          (pendingCount>0 ? '<span class="mv-cat-pending">· '+pendingCount+' pendiente'+(pendingCount===1?'':'s')+'</span>' : '')+
        '</button>'+
      '</td></tr>');
    if(isCollapsed) return groupHeader;

    const dataRows = groupRows.map(d=>{
      let nominalCell;
      if(d.nominal!==null){
        nominalCell = '<span>'+fmtNum(d.nominal, Number.isInteger(d.nominal)?0:2)+'</span>';
      } else if(d.esSupuesto){
        nominalCell = '<span>—</span><span class="mv-assumed"><span class="mv-assumed-warn" data-tooltip="Este valor es un supuesto, no está confirmado">'+ICONS.warning+'</span>Valor supuesto</span>';
      } else if(d.clase==='OUTPUT'){
        nominalCell = '<span class="mv-nominal-calc">calculado</span>';
      } else {
        nominalCell = '<span class="mv-nominal-calc">sin definir</span>';
      }
      const conceptMain = d.formula
        ? '<button type="button" class="mv-concept-btn" data-mv-view="'+d.id+'" title="Ver cómo se calcula"><span class="mv-f-badge">ƒ</span>'+esc(d.label||d.nombre)+'</button>'
        : '<span class="mv-concept-plain">'+esc(d.label||d.nombre)+'</span>';
      const conceptSub = d.resumen ? '<span class="mv-concept-sub" title="'+esc(d.resumen)+'">'+esc(d.resumen)+'</span>' : '';
      return (
      '<tr id="mv-row-'+esc(d.id)+'">'+
        '<td><span class="mv-cell-id">'+esc(d.id)+'</span></td>'+
        '<td style="white-space:normal;">'+conceptMain+conceptSub+'</td>'+
        '<td>'+rentBadge(d.rent)+'</td>'+
        '<td class="num mv-cell-nominal">'+nominalCell+'</td>'+
        '<td>'+(d.driver && d.driver!=='—' ? esc(d.driver) : '<span style="color:var(--grey);">—</span>')+'</td>'+
        '<td>'+monedaName(d.moneda)+'</td>'+
        '<td>'+estadoBadge(d.estado)+'</td>'+
        '<td class="center"><div class="row-actions" style="justify-content:center;">'+
          '<button type="button" class="icon-btn history" data-mv-history="'+d.id+'" data-tooltip="Ver histórico" aria-label="Ver historial de '+esc(d.label||d.nombre)+'">'+ICONS.clock+'</button>'+
          '<button type="button" class="icon-btn edit" data-mv-edit="'+d.id+'" data-tooltip="Editar" aria-label="Editar '+esc(d.label||d.nombre)+'">'+ICONS.pencil+'</button>'+
          '<button type="button" class="icon-btn reject" data-mv-delete="'+d.id+'" data-tooltip="Eliminar" aria-label="Eliminar '+esc(d.label||d.nombre)+'">'+ICONS.trash+'</button>'+
        '</div></td>'+
      '</tr>');
    }).join('');
    return groupHeader + dataRows;
  }).join('');
}

function refreshCrudView(){
  populateDriverFilter();
  populateCategoriaFilter();
  renderConceptosTable();
}

function clearCrudFilters(){
  $('#mv-crud-search').value='';
  $('#mv-filter-categoria').value='';
  $('#mv-filter-rent').value='';
  $('#mv-filter-estado').value='';
  $('#mv-filter-driver').value='';
  $('#mv-filter-moneda').value='';
  renderConceptosTable();
}

/* -------------------------------------------------------------------------
   4) EXPORTACIÓN — CSV (con BOM UTF-8) y Excel (.xls vía tabla HTML)
   ------------------------------------------------------------------------- */
function exportRows(){
  return DATA.map(d=>({
    id:d.id, idc:d.idc, label:d.label||d.nombre, tecnico:d.nombre, categoria:d.categoria||'',
    nominal:(d.nominal===null||d.nominal===undefined)?'':d.nominal, formula:d.formula||'', estado:d.estado, driver:d.driver,
    rent:RENT_LABELS[d.rent]||d.rent, moneda:d.moneda
  }));
}
const EXPORT_HEADERS = ['ID','Idconcepto','Nombre (negocio)','Nombre técnico','Categoría','Valor nominal','Fórmula','Estado','Unidad de medida','Clase','Moneda'];

function triggerDownload(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
function downloadCsv(){
  const rows = exportRows();
  const lines = [EXPORT_HEADERS.join(';')].concat(rows.map(r=>[r.id,r.idc,r.label,r.tecnico,r.categoria,r.nominal,String(r.formula).replace(/;/g,','),r.estado,r.driver,r.rent,r.moneda].join(';')));
  triggerDownload(new Blob(['\uFEFF'+lines.join('\n')],{type:'text/csv;charset=utf-8;'}), 'edenred_variables_formulas.csv');
  mvToast('CSV exportado','success');
}
function downloadXls(){
  const rows = exportRows();
  const th = EXPORT_HEADERS.map(h=>'<th>'+esc(h)+'</th>').join('');
  const trs = rows.map(r=>'<tr>'+
    '<td>'+esc(r.id)+'</td><td>'+esc(r.idc)+'</td><td>'+esc(r.label)+'</td>'+
    '<td>'+esc(r.tecnico)+'</td><td>'+esc(r.categoria)+'</td><td>'+r.nominal+'</td>'+
    '<td>'+esc(r.formula)+'</td><td>'+esc(r.estado)+'</td><td>'+esc(r.driver)+'</td>'+
    '<td>'+esc(r.rent)+'</td><td>'+esc(r.moneda)+'</td>'+
  '</tr>').join('');
  const html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'+
    '<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'+
    '<x:Name>Variables y fórmulas</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>'+
    '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>'+
    '<body><table border="1"><thead><tr>'+th+'</tr></thead><tbody>'+trs+'</tbody></table></body></html>';
  triggerDownload(new Blob(['\uFEFF'+html],{type:'application/vnd.ms-excel;charset=utf-8;'}), 'edenred_variables_formulas.xls');
  mvToast('Excel exportado','success');
}
function closeExportMenu(){
  const menu = $('#mv-export-menu');
  if(menu && !menu.hidden){ menu.hidden = true; $('#mv-btn-export').setAttribute('aria-expanded','false'); }
}

/* -------------------------------------------------------------------------
   5) GESTIÓN DE MODALES DEL MÓDULO (ciclo de vida propio, foco gestionado)
   ------------------------------------------------------------------------- */
function anyMvModalOpen(){ return !!root.querySelector('.mv-modal.open'); }
function openModal(id){
  const m = $('#'+id);
  if(!m) return;
  mvLastFocus = document.activeElement;
  m.classList.add('open');
  const target = m.querySelector('input:not([type=hidden]):not([readonly]), select, textarea, button:not(.close-x)') || m.querySelector('.close-x');
  if(target) setTimeout(()=>{ try{ target.focus(); }catch(e){} }, 30);
}
function closeModal(id){
  const m = $('#'+id);
  if(!m) return;
  m.classList.remove('open');
  if(mvLastFocus && typeof mvLastFocus.focus==='function'){ try{ mvLastFocus.focus(); }catch(e){} }
  mvLastFocus = null;
}

/* Cierra el modal de fórmula y lleva al usuario a la fila del concepto
   en la tabla del catálogo: expande su categoría si estaba colapsada,
   hace scroll y la resalta con la misma animación que usa Propuestas. */
function locateConceptRow(id){
  const d = byId(id);
  if(!d) return;
  closeModal('mvFormulaModal');
  switchTab('crud');
  /* Cualquier filtro/búsqueda activo podría estar ocultando este
     concepto — se limpia para garantizar que la fila exista en el DOM. */
  clearCrudFilters();
  const cat = d.categoria || 'Otros';
  if(collapsedCrudCats.has(cat)){
    collapsedCrudCats.delete(cat);
    persistCollapsedCats();
    refreshCrudView();
  }
  setTimeout(()=>{
    const row = document.getElementById('mv-row-'+id);
    if(!row) return;
    row.scrollIntoView({behavior:'smooth', block:'center'});
    row.classList.add('row-flash');
    setTimeout(()=>row.classList.remove('row-flash'), 1600);
  }, 50);
}

/* -------------------------------------------------------------------------
   6) MODAL DE DETALLE DE FÓRMULA (compartido catálogo/simulador)
   ------------------------------------------------------------------------- */
function openFormulaModal(id){
  const d = byId(id);
  if(!d) return;
  $('#mv-formula-eyebrow').textContent = d.categoria || (d.id+' · '+d.idc);
  $('#mv-formula-title').textContent = d.label || d.nombre;
  const deps = findDependencies(d);
  const usedBy = findDependents(d);
  const nominalLine = d.nominal!==null ? fmtNum(d.nominal,2) : (d.esSupuesto ? 'Valor supuesto (sin confirmar)' : 'Sin definir');
  const depChips = (list)=>list.map(depId=>{
    const dd = byId(depId);
    return '<span class="mv-dep-item">'+
      '<button type="button" class="mv-dep-chip" data-mv-view="'+depId+'">'+esc(dd.label||dd.nombre)+'</button>'+
      '<button type="button" class="mv-dep-locate" data-mv-locate="'+depId+'" data-tooltip="Ver en la tabla">'+ICONS.locate+'</button>'+
    '</span>';
  }).join('');
  $('#mv-formula-body').innerHTML =
    '<div class="mv-tech-line"><span class="mv-mono-chip">'+esc(d.id)+' · '+esc(d.idc)+'</span><span class="mv-tech-name">'+esc(d.nombre)+'</span></div>'+
    '<div class="mv-meta-grid">'+
      '<div class="mv-meta-item"><div class="mv-m-label">Clase</div><div class="mv-m-value">'+esc(RENT_LABELS[d.rent]||d.rent)+'</div></div>'+
      '<div class="mv-meta-item"><div class="mv-m-label">Origen del valor</div><div class="mv-m-value">'+claseLabel(d.clase)+'</div></div>'+
      '<div class="mv-meta-item"><div class="mv-m-label">Valor nominal</div><div class="mv-m-value">'+nominalLine+'</div></div>'+
      '<div class="mv-meta-item"><div class="mv-m-label">Moneda</div><div class="mv-m-value">'+(d.moneda==='EURO'?'Euro (€)':d.moneda==='DOLARES'?'Dólares ($)':'Soles (S/)')+'</div></div>'+
      '<div class="mv-meta-item"><div class="mv-m-label">Unidad de medida</div><div class="mv-m-value">'+(d.driver&&d.driver!=='—'?esc(d.driver):'—')+'</div></div>'+
      '<div class="mv-meta-item"><div class="mv-m-label">Estado</div><div class="mv-m-value">'+esc(d.estado)+'</div></div>'+
    '</div>'+
    '<p class="mv-dep-title">Fórmula técnica</p>'+
    '<div class="mv-formula-block">'+(d.formula?esc(d.formula):'Este concepto no tiene una fórmula asociada; su valor se ingresa directamente.')+'</div>'+
    '<p class="mv-dep-title">Depende de ('+deps.length+')</p>'+
    '<div class="mv-dep-list">'+(deps.length ? depChips(deps) : '<span class="mv-dep-empty">No referencia otras variables del catálogo (dato base).</span>')+'</div>'+
    '<p class="mv-dep-title">Usado por ('+usedBy.length+')</p>'+
    '<div class="mv-dep-list">'+(usedBy.length ? depChips(usedBy) : '<span class="mv-dep-empty">Ningún otro concepto lo referencia todavía.</span>')+'</div>';
  openModal('mvFormulaModal');
}

/* -------------------------------------------------------------------------
   7) MODAL DE HISTORIAL — reutiliza el timeline nativo del host
   ------------------------------------------------------------------------- */
function fmtHistDate(iso){
  const d = new Date(iso);
  if(isNaN(d)) return iso;
  const date = d.toLocaleDateString('es-PE',{day:'2-digit',month:'short',year:'numeric'});
  const time = d.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'});
  return date+' · '+time;
}
function openConceptHistoryModal(id){
  const d = byId(id);
  if(!d) return;
  $('#mv-history-eyebrow').textContent = d.id+' · '+d.idc;
  $('#mv-history-title').textContent = d.label || d.nombre;
  const entries = (d.history||[]).slice().reverse();
  $('#mv-history-timeline').innerHTML = entries.length ? entries.map((h,idx)=>{
    const cls = h.action==='Creado' ? 'is-approved' : (h.action==='Editado' ? 'is-current' : '');
    const dotCls = (h.action!=='Creado' && h.action!=='Editado') ? 'mv-hist-dot-base' : '';
    const dotTxt = h.action==='Creado' ? 'C' : (h.action==='Editado' ? 'E' : '•');
    return (
    '<li class="timeline-item '+cls+'">'+
      '<span class="timeline-dot '+dotCls+'">'+dotTxt+'</span>'+
      '<div class="timeline-card">'+
        '<div class="timeline-card-head"><strong>'+esc(h.action)+'</strong></div>'+
        '<p class="timeline-meta">'+esc(fmtHistDate(h.ts))+'</p>'+
        '<p class="timeline-summary">'+esc(h.detail)+'</p>'+
        '<p class="mv-hist-user">Por '+esc(h.user)+'</p>'+
      '</div>'+
    '</li>');
  }).join('') : '<span class="mv-dep-empty">Sin historial registrado para este concepto.</span>';
  openModal('mvHistoryModal');
}

/* Diff legible entre el registro previo y el editado, para la entrada
   "Editado" del historial. */
function buildHistoryDiff(oldRec, newVals){
  const fields = [
    ['label','Nombre'],['categoria','Categoría'],['nominal','Valor nominal'],['formula','Fórmula'],
    ['estado','Estado'],['driver','Unidad de medida'],['rent','Clase'],['moneda','Moneda'],['resumen','Resumen'],
  ];
  const changes = [];
  fields.forEach(pair=>{
    const key = pair[0], label = pair[1];
    const ov = oldRec[key]; const nv = newVals[key];
    const ovStr = (ov===null||ov===undefined||ov==='') ? '—' : String(ov);
    const nvStr = (nv===null||nv===undefined||nv==='') ? '—' : String(nv);
    if(ovStr!==nvStr) changes.push(label+': "'+ovStr+'" → "'+nvStr+'"');
  });
  return changes.length ? changes.join('; ') : 'Guardado sin cambios de contenido';
}

/* -------------------------------------------------------------------------
   8) MODAL CREAR / EDITAR — form-grid nativo, validación con mensajes
   ------------------------------------------------------------------------- */
const DRIVER_OPTIONS = ['Hora','Tarjeta','Punto de entrega','Transacción','%','—'];

function editFormTemplate(d){
  return (
  '<div class="form-grid">'+
    '<div class="field-group">'+
      '<label>ID técnico <span class="req">*</span></label>'+
      '<input type="text" name="id" value="'+(d?esc(d.id):'')+'" '+(d?'readonly':'')+' placeholder="Ej. MC062">'+
      '<span class="field-hint">Identificador único del registro (no editable tras crearse).</span>'+
      '<span class="mv-field-msg" data-msg-for="id">Ingresa un ID único, ej. MC062.</span>'+
    '</div>'+
    '<div class="field-group">'+
      '<label>Idconcepto <span class="req">*</span></label>'+
      '<input type="text" name="idc" value="'+(d?esc(d.idc):'')+'" placeholder="Ej. C062">'+
      '<span class="mv-field-msg" data-msg-for="idc">Ingresa el código de concepto.</span>'+
    '</div>'+
    '<div class="field-group field-full">'+
      '<label>Nombre del concepto <span class="req">*</span></label>'+
      '<input type="text" name="label" value="'+(d?esc(d.label||d.nombre):'')+'" placeholder="Ej. Costo promedio de envío">'+
      '<span class="field-hint">Nombre en lenguaje de negocio, tal como lo verá el usuario. El código técnico ('+(d?esc(d.nombre):'ej. COSTO_PROMEDIO_DE_ENVIO')+') se genera automáticamente.</span>'+
      '<span class="mv-field-msg" data-msg-for="label">El nombre del concepto es obligatorio.</span>'+
    '</div>'+
    '<div class="field-group">'+
      '<label>Categoría</label>'+
      '<select name="categoria">'+CATEGORY_ORDER.map(c=>'<option value="'+esc(c)+'" '+(d&&d.categoria===c?'selected':'')+'>'+esc(c)+'</option>').join('')+'</select>'+
    '</div>'+
    '<div class="field-group">'+
      '<label>Valor nominal</label>'+
      '<input type="number" step="0.01" name="nominal" value="'+(d&&d.nominal!==null?d.nominal:'')+'" placeholder="Dejar vacío si es calculado">'+
      '<span class="field-hint">Solo aplica a variables de ingreso manual con valor fijo.</span>'+
    '</div>'+
    '<div class="field-group">'+
      '<label>Moneda</label>'+
      '<select name="moneda">'+
        '<option value="SOLES" '+((!d||d.moneda==='SOLES')?'selected':'')+'>Soles (S/)</option>'+
        '<option value="DOLARES" '+(d&&d.moneda==='DOLARES'?'selected':'')+'>Dólares ($)</option>'+
        '<option value="EURO" '+(d&&d.moneda==='EURO'?'selected':'')+'>Euro (€)</option>'+
      '</select>'+
    '</div>'+
    '<div class="field-group field-full">'+
      '<label>Resumen en lenguaje simple</label>'+
      '<input type="text" name="resumen" value="'+(d?esc(d.resumen||''):'')+'" placeholder="Ej. Aplica si el destino de entrega es Lima">'+
      '<span class="field-hint">Frase corta que se muestra en la tabla en lugar de la fórmula técnica.</span>'+
    '</div>'+
    '<div class="field-group field-full">'+
      '<label>Fórmula técnica</label>'+
      '<textarea name="formula" placeholder="Ej. PROPUESTA.DESTINO_DE_ENTREGA = LIMA">'+(d?esc(d.formula||''):'')+'</textarea>'+
      '<span class="field-hint">Puedes referenciar otros nombres técnicos de concepto o variables PROPUESTA.*</span>'+
    '</div>'+
    '<div class="field-group">'+
      '<label>Estado</label>'+
      '<select name="estado">'+
        '<option value="Activo" '+((!d||d.estado==='Activo')?'selected':'')+'>Activo</option>'+
        '<option value="Inactivo" '+(d&&d.estado==='Inactivo'?'selected':'')+'>Inactivo</option>'+
      '</select>'+
    '</div>'+
    '<div class="field-group">'+
      '<label>Unidad de medida</label>'+
      '<select name="driver">'+DRIVER_OPTIONS.map(o=>'<option value="'+esc(o)+'" '+(d&&d.driver===o?'selected':'')+'>'+esc(o)+'</option>').join('')+'</select>'+
    '</div>'+
    '<div class="field-group">'+
      '<label>Clase <span class="req">*</span></label>'+
      '<select name="rent">'+
        '<option value="Ingreso" '+((!d||d.rent==='Ingreso')?'selected':'')+'>Ingreso</option>'+
        '<option value="Costo" '+(d&&d.rent==='Costo'?'selected':'')+'>Costo</option>'+
        '<option value="Gasto" '+(d&&d.rent==='Gasto'?'selected':'')+'>Gasto</option>'+
        '<option value="Resultante" '+(d&&d.rent==='Resultante'?'selected':'')+'>Resultante</option>'+
        '<option value="Computada" '+(d&&d.rent==='Computada'?'selected':'')+'>Computada</option>'+
        '<option value="Insumo de cálculo — ingreso" '+(d&&d.rent==='Insumo de cálculo — ingreso'?'selected':'')+'>Insumo de cálculo — ingreso</option>'+
        '<option value="Insumo de cálculo — costo" '+(d&&d.rent==='Insumo de cálculo — costo'?'selected':'')+'>Insumo de cálculo — costo</option>'+
        '<option value="Insumo de cálculo — gasto" '+(d&&d.rent==='Insumo de cálculo — gasto'?'selected':'')+'>Insumo de cálculo — gasto</option>'+
      '</select>'+
      '<span class="field-hint">A qué grupo del estado de resultados pertenece este concepto.</span>'+
    '</div>'+
    '<div class="field-group field-full">'+
      '<label>¿Cómo se obtiene el valor? <span class="req">*</span></label>'+
      '<div class="mv-class-toggle" id="mv-class-toggle">'+
        '<button type="button" class="sel-input '+((!d||d.clase==='INPUT')?'active':'')+'" data-clase="INPUT">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'+
          'Se ingresa manualmente'+
        '</button>'+
        '<button type="button" class="sel-output '+(d&&d.clase==='OUTPUT'?'active':'')+'" data-clase="OUTPUT">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17 10 11 14 15 20 7"/></svg>'+
          'Se calcula con una fórmula'+
        '</button>'+
      '</div>'+
      '<input type="hidden" name="clase" value="'+(d?d.clase:'INPUT')+'">'+
    '</div>'+
  '</div>');
}

function setDirty(v){
  editDirty = v;
  if(!v) $('#mv-discard-bar').classList.remove('visible');
}

function openEditModal(id){
  editingId = id || null;
  const d = id ? byId(id) : null;
  $('#mv-edit-eyebrow').textContent = d ? 'Editar concepto' : 'Nueva variable';
  $('#mv-edit-title').textContent = d ? (d.label||d.nombre) : 'Agregar concepto';
  $('#mv-edit-save').textContent = d ? 'Guardar cambios' : 'Crear variable';
  $('#mv-edit-form').innerHTML = editFormTemplate(d);
  $$('.field-group', $('#mv-edit-form')).forEach(f=>f.classList.remove('field-error'));
  setDirty(false);
  openModal('mvEditModal');
}
function closeEditModal(){
  setDirty(false);
  editingId = null;
  closeModal('mvEditModal');
}
function attemptCloseEdit(){
  if(!editDirty){ closeEditModal(); return; }
  const bar = $('#mv-discard-bar');
  bar.classList.add('visible');
  const btn = $('#mv-discard-confirm');
  if(btn) btn.focus();
}

function handleEditSubmit(e){
  e.preventDefault();
  const form = e.target;
  const fd = new FormData(form);
  const vals = Object.fromEntries(fd.entries());
  let hasError = false;
  $$('.field-group', form).forEach(f=>f.classList.remove('field-error'));

  function markError(fieldName, msg){
    hasError = true;
    const input = form.querySelector('[name="'+fieldName+'"]');
    if(!input) return;
    const group = input.closest('.field-group');
    group.classList.add('field-error');
    if(msg){
      const msgEl = group.querySelector('[data-msg-for="'+fieldName+'"]');
      if(msgEl) msgEl.textContent = msg;
    }
  }
  if(!vals.id || !vals.id.trim()) markError('id');
  else if(!editingId && byId(vals.id.trim())) markError('id','Este ID ya existe en el catálogo. Usa uno distinto.');
  if(!vals.idc || !vals.idc.trim()) markError('idc');
  if(!vals.label || !vals.label.trim()) markError('label');
  if(hasError){
    mvToast('Revisa los campos marcados en rojo','danger');
    const firstErr = form.querySelector('.field-group.field-error input, .field-group.field-error select, .field-group.field-error textarea');
    if(firstErr) firstErr.focus();
    return;
  }

  /* Mismo generador usado para los 65 conceptos cargados en RAW_DATA \u2014
     se quitan "DE"/"DEL" porque las f\u00f3rmulas del cat\u00e1logo fuente suelen
     omitirlos en sus referencias cruzadas (ver findDependencies). */
  const technicalName = vals.label.trim().toUpperCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/\bDEL\b/g,' ').replace(/\bDE\b/g,' ')
    .replace(/[^A-Z0-9]+/g,'_').replace(/^_+|_+$/g,'');

  const record = {
    id: vals.id.trim(),
    idc: vals.idc.trim(),
    label: vals.label.trim(),
    nombre: technicalName,
    categoria: vals.categoria,
    resumen: (vals.resumen||'').trim(),
    nominal: vals.nominal!=='' ? parseFloat(vals.nominal) : null,
    formula: (vals.formula||'').trim(),
    estado: vals.estado,
    driver: vals.driver,
    clase: vals.clase,
    rent: vals.rent,
    moneda: vals.moneda,
  };

  if(editingId){
    const idx = DATA.findIndex(d=>d.id===editingId);
    const oldRec = DATA[idx];
    const diffDetail = buildHistoryDiff(oldRec, record);
    const newRec = Object.assign({}, oldRec, record, {id: editingId});
    newRec.history = (oldRec.history||[]).concat([{ts:new Date().toISOString(), action:'Editado', user:'Fio · Product Manager', detail:diffDetail}]);
    DATA[idx] = newRec;
    mvToast('Concepto actualizado','success');
  } else {
    record.history = [{ts:new Date().toISOString(), action:'Creado', user:'Fio · Product Manager', detail:'Variable creada desde el catálogo'}];
    DATA.push(record);
    mvToast('Variable creada correctamente','success');
  }
  setDirty(false);
  closeEditModal();
  refreshCrudView();
  runSimulation(); /* coherencia catálogo ↔ simulador */
}

/* -------------------------------------------------------------------------
   9) MODAL DE ELIMINACIÓN — con análisis de dependencias
   ------------------------------------------------------------------------- */
function openDeleteModal(id){
  deletingId = id;
  const d = byId(id);
  if(!d) return;
  $('#mv-delete-body').innerHTML = '<b>'+esc(d.label||d.nombre)+'</b> ('+esc(d.id)+') se eliminará del catálogo. Esta acción no se puede deshacer.';
  const deps = findDependents(d);
  const depsWrap = $('#mv-delete-deps');
  const confirmBtn = $('#mv-delete-confirm');
  if(deps.length){
    $('#mv-delete-deps-msg').textContent = deps.length===1
      ? '1 concepto depende de esta variable y su fórmula quedaría rota:'
      : deps.length+' conceptos dependen de esta variable y sus fórmulas quedarían rotas:';
    $('#mv-delete-deps-list').innerHTML = deps.map(depId=>{
      const dd = byId(depId);
      return '<span class="mv-dep-chip">'+esc(dd.label||dd.nombre)+'</span>';
    }).join('');
    depsWrap.classList.remove('hidden');
    confirmBtn.textContent = 'Eliminar de todos modos';
  } else {
    depsWrap.classList.add('hidden');
    confirmBtn.textContent = 'Sí, eliminar';
  }
  openModal('mvDeleteModal');
}
function closeDeleteModal(){ deletingId = null; closeModal('mvDeleteModal'); }
function confirmConceptDelete(){
  const d = byId(deletingId);
  DATA = DATA.filter(x=>x.id!==deletingId);
  mvToast('Concepto '+(d?('«'+(d.label||d.nombre)+'» '):'')+'eliminado','danger');
  closeDeleteModal();
  refreshCrudView();
  runSimulation(); /* coherencia catálogo ↔ simulador */
}

/* =========================================================================
   10) SIMULADOR DE VALIDACIÓN DE CÁLCULO
   ========================================================================= */

/* Lookup de conceptos que la fuente marca como "de acuerdo a PRODUCTO_ELEGIDO"
   (L&E, costo de mantenimiento, tx de marca, interchange, MDR, ticket promedio).
   Valores SUPUESTOS de referencia para la demo — en producción vendrían del
   catálogo de tarifas por producto. */
const PRODUCT_LOOKUP = {
  'Ticket Restaurant Clásico': {le:0.05, costoMantenimiento:2.50, procesamientoTxMarca:0.0120, interchangeFee:0.0140, mdrAdicional:0.0060, ticketPromedio:35},
  'Ticket Móvil Digital':      {le:0.03, costoMantenimiento:1.20, procesamientoTxMarca:0.0100, interchangeFee:0.0120, mdrAdicional:0.0040, ticketPromedio:28},
  'Edenred Combustible':       {le:0.04, costoMantenimiento:2.00, procesamientoTxMarca:0.0110, interchangeFee:0.0130, mdrAdicional:0.0050, ticketPromedio:60},
};

const SIM_DEFAULTS = {
  tipoProducto:'FISICO', productoElegido:'Ticket Restaurant Clásico', recurrencia:'RECURRENTE',
  servicioLogoEmpresa:'SI', personalizacionFlyer:'NO',
  destinoEntrega:'LIMA', destinoReposicion:'LIMA', reposicion:'AFECTO', renovacion:'EXONERADO',
  bvAnual:600000, bvMensual:50000, cantidadTarjetas:500, qTarjetasNuevas:120,
  numeroPedidosAlAnio:4, puntosLima:3, puntosProvincia:2, cantidadDeRepartos:12,
  sector:'PRIVADO', cartaFianza:'NO', emitioCartaFianza:'NO',
  modalidadPago:'CREDITO', diasCredito:30,
  productoCustom:'NO', mdrNegociado:0,
  comisionClienteEjecutivo:3, rebate:0,
};
let SIM = Object.assign({}, SIM_DEFAULTS);

function getVal(id){
  const d = byId(id);
  if(!d) return 0;
  return d.nominal!==null ? d.nominal : 0; /* esSupuesto sin cifra confirmada -> 0 hasta que se defina */
}

function computeAll(){
  const P = SIM;
  const lookup = PRODUCT_LOOKUP[P.productoElegido] || Object.values(PRODUCT_LOOKUP)[0];
  const v = {}; // id -> valor numérico

  // ---- Conceptos intermedios derivados de INPUTs ----
  v.MC001 = P.servicioLogoEmpresa==='SI' ? getVal('MC001')*2 : 0;                 // CONFIGURACION_DE_AFINIDAD
  v.MC002 = P.tipoProducto==='FISICO' ? getVal('MC002') : 0;                      // WELCOME_KIT
  v.MC003 = P.tipoProducto==='FISICO' ? getVal('MC003') : 0;                      // PERSONALIZACION
  v.MC004 = P.servicioLogoEmpresa==='SI' ? getVal('MC004') : 0;                   // EMISION_TARJETAS_CON_AFINIDAD
  v.MC005 = P.tipoProducto==='FISICO' ? getVal('MC005') : 0;                      // EMISION_DE_TARJETAS
  v.MC006 = P.destinoEntrega==='PROVINCIA' ? getVal('MC006') : 0;                 // ENVIO_TARJETAS_PROVINCIA
  v.MC007 = P.destinoEntrega==='LIMA' ? getVal('MC007') : 0;                      // ENVIO_TARJETAS_LIMA
  v.MC008 = P.reposicion==='AFECTO' ? getVal('MC008') : 0;                        // REPOSICION_POR_PERDIDA_ROBO
  v.MC009 = P.destinoReposicion==='PROVINCIA' ? getVal('MC009') : 0;              // ENVIO_DE_REPOSICION_PROVINCIA
  v.MC010 = P.destinoReposicion==='LIMA' ? getVal('MC010') : 0;                   // ENVIO_DE_REPOSICION_LIMA
  v.MC011 = P.renovacion==='AFECTO' ? getVal('MC011') : 0;                        // RENOVACION_TARJETA
  v.MC012 = getVal('MC012');                                                      // TRANSACCIONES_APROBADAS
  v.MC013 = getVal('MC013');                                                      // CUENTA_ACTIVA
  v.MC014 = getVal('MC014');                                                      // PROCESAMIENTO_BINES...
  v.MC015 = lookup.procesamientoTxMarca;                                          // PROCESAMIENTO_TX_MARCA
  v.MC016 = lookup.interchangeFee;                                                // INTERCHANGE_FEE
  v.MC017 = lookup.mdrAdicional;                                                  // MDR_ADICIONAL
  v.MC018 = getVal('MC018')/100;                                                  // RATIO_DE_CONSUMO_SOBRE_LA_CARGA
  v.MC019 = lookup.le;                                                            // L&E
  v.MC020 = lookup.costoMantenimiento;                                            // COSTO_PROMEDIO_DE_MANTENIMIENTO
  v.MC060 = P.personalizacionFlyer==='SI' ? 5 : 0;                                // PERSONALIZACION_FLYER_SOBRE_OTROS
  v.C061  = 1;                                                                    // PESO%_MES_SUMATORIA (100%)

  // ---- Cadena de OUTPUTs ----
  v.MC053 = v.MC018 * P.bvAnual;                                                  // REEMBOLSO
  v.MC051 = lookup.ticketPromedio ? v.MC053 / lookup.ticketPromedio : null;       // NUMERO_TRANSACCIONES_PROMEDIO
  v.MC052 = lookup.ticketPromedio;                                                // TICKET_PROMEDIO

  v.MC025 = v.MC016 + v.MC017 + (P.productoCustom==='SI' ? P.mdrNegociado : 0);   // TUR_COMISION_MERCHANT
  v.MC024 = v.MC025 * v.MC053;                                                    // COMISION_MERCHANT

  v.MC022 = (P.comisionClienteEjecutivo/100) * P.bvAnual - P.rebate;              // COMISION_CLIENTE
  v.MC023 = P.bvAnual ? v.MC022 / P.bvAnual : null;                               // TUR_COMISION_CLIENTE

  v.MC028 = v.MC019 * P.bvAnual;                                                  // L&E_CALCULADO
  v.MC029 = P.qTarjetasNuevas * v.MC020 * v.C061;                                 // MANTENIMIENTO
  v.MC030 = P.bvAnual ? v.MC029 / P.bvAnual : null;                               // TUR_MANTENIMIENTO
  v.MC031 = P.bvAnual ? v.MC001 / P.bvAnual : null;                               // TUR_CONFIGURACION_DE_AFINIDAD
  v.MC032 = ((P.puntosLima*v.MC007)+(P.puntosProvincia*v.MC006)) * P.cantidadDeRepartos * 1.1; // DISTRIBUCION
  v.MC033 = P.bvAnual ? v.MC032 / P.bvAnual : null;                               // TUR_DISTRIBUCION
  v.MC026 = v.MC028 + v.MC029 + v.MC001 + v.MC032;                                // OTROS_INGRESOS_CALCULADO
  v.MC027 = P.bvAnual ? v.MC026 / P.bvAnual : null;                               // TUR_OTROS_INGRESOS
  v.MC056 = v.MC022 + v.MC024 + v.MC026;                                          // TOTAL_INGRESOS

  v.MC036 = (v.MC002+v.MC003+v.MC005) * P.cantidadTarjetas + v.MC060
            + (P.servicioLogoEmpresa==='SI' ? (v.MC004*P.cantidadTarjetas)+v.MC001 : 0); // INSUMOS_PERSONALIZACION_Y_ENSOBRADO
  v.MC037 = P.bvAnual ? v.MC036 / P.bvAnual : null;                               // TUR_INSUMOS_PERSONALIZACION_Y_ENSOBRADO
  v.MC038 = (v.MC012*v.MC051) + (v.MC013*P.cantidadTarjetas*P.numeroPedidosAlAnio) + (v.MC014*P.cantidadTarjetas*P.numeroPedidosAlAnio); // PROCESAMIENTO
  v.MC039 = P.bvAnual ? v.MC038 / P.bvAnual : null;                               // TUR_PROCESAMIENTO
  v.MC055 = -(v.MC015 * v.MC053);                                                 // MARCA_CALCULADO
  v.MC034 = v.MC036 + v.MC038 + v.MC055;                                          // COSTO_VENTA
  v.MC035 = P.bvAnual ? v.MC034 / P.bvAnual : null;                               // TUR_COSTO_VENTA

  v.MC054 = P.cartaFianza==='SI' ? 0.10 * P.bvAnual : 0;                          // MONTO_CARTA_FIANZA
  v.MC046 = (P.sector==='PUBLICO' && P.cartaFianza==='SI') ? (getVal('MC021')/100) * v.MC054 : 0; // CARTA_FIANZA
  v.MC047 = P.bvAnual ? v.MC046 / P.bvAnual : null;                               // TUR_CARTA_FIANZA
  v.MC048 = P.modalidadPago==='CREDITO' ? (Math.pow(1+0.052,1/360)-1) * P.bvMensual * (P.diasCredito+5) : 0; // GASTOS_FINANCIEROS
  v.MC049 = P.bvAnual ? v.MC048 / P.bvAnual : null;                               // TUR_GASTOS_FINANCIEROS

  const FACTOR = {NAVIDAD:3.8,RECURRENTE:12,UNICO:1.3};
  v.MC044 = (P.bvMensual/1000) * (FACTOR[P.recurrencia]||0);                      // COMISION_VARIABLE_EJECUTIVO
  v.MC045 = (P.recurrencia==='RECURRENTE' && P.bvMensual>200000) ? 3500 : 0;      // BONO_LARGE_DEAL
  v.MC042 = v.MC044 + (v.MC045 * -1);                                             // PAYROLL
  v.MC043 = P.bvMensual ? v.MC042 / P.bvMensual : null;                           // TUR_PAYROLL

  v.MC040 = v.MC048 + v.MC046 + v.MC042;                                          // OTROS_GASTOS
  v.MC041 = P.bvAnual ? v.MC040 / P.bvAnual : null;                               // TUR_OTROS_GASTOS
  v.MC057 = v.MC034 + v.MC040;                                                    // TOTAL_GASTOS
  v.MC058 = v.MC056 - v.MC057;                                                    // TOTAL_RESTA_INGRESOS_GASTOS
  v.MC059 = P.bvAnual ? v.MC058 / P.bvAnual : null;                               // TUR_TOTAL_RESTA_INGRESOS_GASTOS

  let rent = v.MC056 ? v.MC058 / v.MC056 : null;
  if(rent!==null && v.MC058<0 && v.MC056<0) rent = -Math.abs(rent);
  v.MC050 = rent;                                                                 // RENTABILIDAD
  v.MC021 = getVal('MC021')/100;                                                  // CARTA_FIANZA_TASA (se muestra como %)

  return v;
}

/* ---------- Columna 1: formulario PROPUESTA ---------- */
function simFormTemplate(){
  const P = SIM;
  const productos = Object.keys(PRODUCT_LOOKUP);
  function toggle(field, options){
    return '<div class="mv-toggle-row" data-toggle="'+field+'">'+options.map(o=>
      '<button type="button" data-v="'+o.v+'" class="'+(P[field]===o.v?'active':'')+'" aria-pressed="'+(P[field]===o.v)+'">'+o.t+'</button>'
    ).join('')+'</div>';
  }
  return (
  '<fieldset>'+
    '<legend>Producto &amp; recurrencia</legend>'+
    '<div class="mv-sim-field"><label>Tipo de producto</label>'+toggle('tipoProducto',[{v:'FISICO',t:'Físico'},{v:'VIRTUAL',t:'Virtual'}])+'</div>'+
    '<div class="mv-sim-field"><label>Producto elegido</label><select data-field="productoElegido">'+productos.map(p=>'<option value="'+esc(p)+'" '+(P.productoElegido===p?'selected':'')+'>'+esc(p)+'</option>').join('')+'</select></div>'+
    '<div class="mv-sim-field"><label>Recurrencia</label><select data-field="recurrencia">'+
      '<option value="RECURRENTE" '+(P.recurrencia==='RECURRENTE'?'selected':'')+'>Recurrente</option>'+
      '<option value="NAVIDAD" '+(P.recurrencia==='NAVIDAD'?'selected':'')+'>Navidad</option>'+
      '<option value="UNICO" '+(P.recurrencia==='UNICO'?'selected':'')+'>Único</option>'+
    '</select></div>'+
    '<div class="mv-sim-field"><label>¿Incluye logo de la empresa?</label>'+toggle('servicioLogoEmpresa',[{v:'SI',t:'Sí'},{v:'NO',t:'No'}])+'</div>'+
    '<div class="mv-sim-field"><label>Personalización flyer sobre otros</label>'+toggle('personalizacionFlyer',[{v:'SI',t:'Sí'},{v:'NO',t:'No'}])+'</div>'+
  '</fieldset>'+
  '<fieldset>'+
    '<legend>Logística &amp; entrega</legend>'+
    '<div class="mv-sim-field"><label>Destino de entrega</label><select data-field="destinoEntrega">'+
      '<option value="LIMA" '+(P.destinoEntrega==='LIMA'?'selected':'')+'>Lima</option>'+
      '<option value="PROVINCIA" '+(P.destinoEntrega==='PROVINCIA'?'selected':'')+'>Provincia</option>'+
    '</select></div>'+
    '<div class="mv-sim-field"><label>Destino de reposición</label><select data-field="destinoReposicion">'+
      '<option value="LIMA" '+(P.destinoReposicion==='LIMA'?'selected':'')+'>Lima</option>'+
      '<option value="PROVINCIA" '+(P.destinoReposicion==='PROVINCIA'?'selected':'')+'>Provincia</option>'+
    '</select></div>'+
    '<div class="mv-sim-field"><label>Reposición por pérdida/robo</label><select data-field="reposicion">'+
      '<option value="AFECTO" '+(P.reposicion==='AFECTO'?'selected':'')+'>Afecto a cobro</option>'+
      '<option value="EXONERADO" '+(P.reposicion==='EXONERADO'?'selected':'')+'>Exonerado</option>'+
    '</select></div>'+
    '<div class="mv-sim-field"><label>Renovación de tarjeta</label><select data-field="renovacion">'+
      '<option value="EXONERADO" '+(P.renovacion==='EXONERADO'?'selected':'')+'>Exonerado</option>'+
      '<option value="AFECTO" '+(P.renovacion==='AFECTO'?'selected':'')+'>Afecto a cobro</option>'+
    '</select></div>'+
    '<div class="mv-sim-field"><label>Puntos de entrega — Lima</label><input type="number" min="0" data-field="puntosLima" value="'+P.puntosLima+'"></div>'+
    '<div class="mv-sim-field"><label>Puntos de entrega — Provincia</label><input type="number" min="0" data-field="puntosProvincia" value="'+P.puntosProvincia+'"></div>'+
    '<div class="mv-sim-field"><label>Cantidad de repartos / año</label><input type="number" min="0" data-field="cantidadDeRepartos" value="'+P.cantidadDeRepartos+'"></div>'+
  '</fieldset>'+
  '<fieldset>'+
    '<legend>Volumen comercial (BV)</legend>'+
    '<div class="mv-sim-field"><label>BV anual (S/)</label><input type="number" min="0" step="1000" data-field="bvAnual" value="'+P.bvAnual+'"></div>'+
    '<div class="mv-sim-field"><label>BV mensual (S/)</label><input type="number" min="0" step="500" data-field="bvMensual" value="'+P.bvMensual+'"></div>'+
    '<div class="mv-sim-field"><label>Cantidad de tarjetas activas</label><input type="number" min="0" data-field="cantidadTarjetas" value="'+P.cantidadTarjetas+'"></div>'+
    '<div class="mv-sim-field"><label>Tarjetas nuevas (Q)</label><input type="number" min="0" data-field="qTarjetasNuevas" value="'+P.qTarjetasNuevas+'"></div>'+
    '<div class="mv-sim-field"><label>N.º pedidos al año</label><input type="number" min="0" data-field="numeroPedidosAlAnio" value="'+P.numeroPedidosAlAnio+'"></div>'+
    '<div class="mv-sim-field"><label>Comisión cliente ejecutivo (%)</label><input type="number" min="0" step="0.1" data-field="comisionClienteEjecutivo" value="'+P.comisionClienteEjecutivo+'"></div>'+
    '<div class="mv-sim-field"><label>Rebate (S/)</label><input type="number" min="0" data-field="rebate" value="'+P.rebate+'"></div>'+
  '</fieldset>'+
  '<fieldset>'+
    '<legend>Financiero &amp; legal</legend>'+
    '<div class="mv-sim-field"><label>Sector</label><select data-field="sector">'+
      '<option value="PRIVADO" '+(P.sector==='PRIVADO'?'selected':'')+'>Privado</option>'+
      '<option value="PUBLICO" '+(P.sector==='PUBLICO'?'selected':'')+'>Público</option>'+
    '</select></div>'+
    '<div class="mv-sim-field"><label>¿Requiere carta fianza?</label>'+toggle('cartaFianza',[{v:'SI',t:'Sí'},{v:'NO',t:'No'}])+'</div>'+
    '<div class="mv-sim-field"><label>Modalidad de pago</label><select data-field="modalidadPago">'+
      '<option value="CREDITO" '+(P.modalidadPago==='CREDITO'?'selected':'')+'>Crédito</option>'+
      '<option value="CONTADO" '+(P.modalidadPago==='CONTADO'?'selected':'')+'>Contado</option>'+
    '</select></div>'+
    '<div class="mv-sim-field"><label>Días de crédito</label><input type="number" min="0" data-field="diasCredito" value="'+P.diasCredito+'"></div>'+
    '<div class="mv-sim-field"><label>¿Producto custom (MDR negociado)?</label>'+toggle('productoCustom',[{v:'SI',t:'Sí'},{v:'NO',t:'No'}])+'</div>'+
    '<div class="mv-sim-field"><label>MDR negociado (%)</label><input type="number" min="0" step="0.1" data-field="mdrNegociado" value="'+P.mdrNegociado+'"></div>'+
  '</fieldset>');
}

function wireSimForm(){
  const form = $('#mv-sim-form');
  if(!form) return; /* Simulador deshabilitado temporalmente (ver mv-sub-sim) */
  form.innerHTML = simFormTemplate();
}
function handleSimChange(e){
  const t = e.target.closest('[data-field]');
  if(!t) return;
  const raw = t.value;
  SIM[t.dataset.field] = t.type==='number' ? parseFloat(raw||0) : raw;
  runSimulation();
}
function handleSimInput(e){
  const t = e.target.closest('input[data-field]');
  if(!t || t.type!=='number') return;
  SIM[t.dataset.field] = parseFloat(t.value||0);
  clearTimeout(simInputTimer);
  simInputTimer = setTimeout(runSimulation, 250); /* recálculo en vivo */
}
function handleSimToggleClick(e){
  const btn = e.target.closest('.mv-toggle-row button');
  if(!btn) return;
  const group = btn.closest('[data-toggle]');
  SIM[group.dataset.toggle] = btn.dataset.v;
  $$('button', group).forEach(b=>{
    const on = b===btn;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  runSimulation();
}

/* ---------- Columnas 2 y 3: listas agrupadas ---------- */
function calcRowHtml(d, value, opts){
  opts = opts || {};
  const isPct = d.driver==='%';
  let display;
  if(value===null||value===undefined||Number.isNaN(value)){
    display = '<span class="mv-cr-value pending">pendiente</span>';
  } else {
    const formatted = isPct ? fmtPct(value) : fmtMoney(value,d.moneda);
    display = '<span class="mv-cr-value '+(value<0?'neg':'')+'">'+formatted+'</span>';
  }
  const flag = d.estado==='Pendiente'
    ? '<span class="mv-cr-flag" title="Variable pendiente de definir: el cálculo usa un valor supuesto de referencia."></span>'
    : '';
  return (
  '<div class="mv-calc-row" data-mv-view="'+d.id+'" role="button" tabindex="0" title="Ver cómo se calcula">'+
    '<div class="mv-cr-left">'+
      '<span class="mv-cr-name">'+flag+esc(d.label||d.nombre)+'</span>'+
      '<span class="mv-cr-formula">'+(d.resumen?esc(d.resumen):esc(d.id))+'</span>'+
    '</div>'+
    '<div class="mv-cr-right">'+display+'</div>'+
  '</div>');
}

function groupHeaderHtml(cat, count, colKey){
  const collapsed = collapsedSimCats[colKey].has(cat);
  return '<button type="button" class="mv-group-head '+(collapsed?'is-collapsed':'')+'" data-mv-simcat="'+esc(cat)+'" data-mv-simcol="'+colKey+'" aria-expanded="'+(!collapsed)+'">'+
    ICONS.chevron+
    '<span>'+esc(cat)+'</span><span class="mv-gh-count">'+count+'</span>'+
  '</button>';
}

function renderGroupedList(rows, valueMap, colKey){
  const groups = {};
  rows.forEach(d=>{ (groups[d.categoria||'Otros'] = groups[d.categoria||'Otros']||[]).push(d); });
  const orderedCats = CATEGORY_ORDER.filter(c=>groups[c]).concat(Object.keys(groups).filter(c=>!CATEGORY_ORDER.includes(c)));
  return orderedCats.map(cat=>{
    const groupRows = groups[cat];
    const header = groupHeaderHtml(cat, groupRows.length, colKey);
    if(collapsedSimCats[colKey].has(cat)) return header;
    return header + groupRows.map(d=>calcRowHtml(d, valueMap[d.id])).join('');
  }).join('');
}

function heroTone(id, value){
  /* Rentabilidad (C047) e Ingresos menos gastos (C055): color según signo.
     Total de ingresos (C053) / Total de gastos (C054): tono informativo.
     IDs remapeados al catálogo nuevo (antes MC050/MC058/MC056/MC057). */
  if(id==='C047' || id==='C055'){
    if(value===null||Number.isNaN(value)) return 'tone-neutral';
    return value>=0 ? 'tone-pos' : 'tone-neg';
  }
  if(id==='C053') return 'tone-income';
  if(id==='C054') return 'tone-expense';
  return 'tone-neutral';
}

function runSimulation(){
  if(!rendered) return;
  if(!$('#mv-sim-form')) return; /* Simulador deshabilitado temporalmente (ver mv-sub-sim) */
  const v = computeAll();

  /* Columna 2 — conceptos INPUT (derivados de la PROPUESTA), agrupados */
  const inputRows = DATA.filter(d=>d.clase==='INPUT');
  const pendingCount = DATA.filter(d=>d.estado==='Pendiente').length;
  $('#mv-sim-intermediate').innerHTML =
    '<div class="mv-note">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>'+
      '<span>'+(pendingCount
        ? '<strong>'+pendingCount+' variable'+(pendingCount===1?'':'s')+' pendiente'+(pendingCount===1?'':'s')+' de definir</strong> (marcadas con un punto ámbar) usan valores supuestos de un catálogo de referencia por producto, aún sin parametrización real.'
        : 'Los valores marcados como <strong>supuesto</strong> provienen de un catálogo de referencia por producto (pendiente de parametrización real).')+
      '</span>'+
    '</div>'+
    renderGroupedList(inputRows, v, 'intermediate');

  /* Columna 3 — métricas hero + resto de OUTPUTs agrupados */
  const heroIds = ['C047','C053','C054','C055'];
  const heroHtml = heroIds.map(id=>{
    const d = byId(id);
    if(!d) return '';
    const val = v[id];
    const formatted = (val===null||val===undefined||Number.isNaN(val)) ? 'pendiente' : (d.driver==='%' ? fmtPct(val) : fmtMoney(val,d.moneda));
    const tone = heroTone(id,val);
    return '<div class="mv-hero '+tone+'" data-mv-view="'+id+'" role="button" tabindex="0">'+
      '<div class="mv-hm-label">'+esc(d.label||d.nombre)+'</div>'+
      '<div class="mv-hm-value">'+formatted+'</div>'+
      '<div class="mv-hm-sub">'+esc(d.id)+' · clic para ver la fórmula</div>'+
    '</div>';
  }).join('');

  const outputRows = DATA.filter(d=>d.clase==='OUTPUT' && !heroIds.includes(d.id));
  $('#mv-sim-output').innerHTML = '<div class="mv-hero-grid">'+heroHtml+'</div>' + renderGroupedList(outputRows, v, 'output');
}

/* -------------------------------------------------------------------------
   11) TABS INTERNAS — sub-navegación del módulo (sin recarga, sin pérdida
       de estado del Application Shell ni de los formularios)
   ------------------------------------------------------------------------- */
function switchTab(key){
  if(key!=='crud' && key!=='sim') return;
  activeTab = key;
  $$('.mv-tab').forEach(t=>{
    const on = t.dataset.mvTab===key;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on?'true':'false');
    t.tabIndex = on ? 0 : -1;
  });
  $('#mv-sub-crud').classList.toggle('active', key==='crud');
  $('#mv-sub-sim').classList.toggle('active', key==='sim');
  $('#mv-actions-crud').classList.toggle('hidden', key!=='crud');
  $('#mv-actions-sim').classList.add('hidden'); /* Simulador deshabilitado temporalmente — sin acciones */
  closeExportMenu();
  if(key==='sim') runSimulation(); /* refleja al instante ediciones del catálogo */
}
function handleTabsKeydown(e){
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
  const tabs = $$('.mv-tab');
  const idx = tabs.findIndex(t=>t.classList.contains('active'));
  let next = idx;
  if(e.key==='ArrowLeft') next = (idx-1+tabs.length)%tabs.length;
  if(e.key==='ArrowRight') next = (idx+1)%tabs.length;
  if(e.key==='Home') next = 0;
  if(e.key==='End') next = tabs.length-1;
  e.preventDefault();
  switchTab(tabs[next].dataset.mvTab);
  tabs[next].focus();
}

/* -------------------------------------------------------------------------
   12) WIRING ÚNICO (consolidación de los DOMContentLoaded de HTML 3)
   ------------------------------------------------------------------------- */
function wireStatic(){
  /* Tabs */
  $$('.mv-tab').forEach(t=>t.addEventListener('click', ()=>switchTab(t.dataset.mvTab)));
  root.querySelector('.mv-tabs').addEventListener('keydown', handleTabsKeydown);
  const simBackBtn = $('#mv-sim-back-btn');
  if(simBackBtn) simBackBtn.addEventListener('click', ()=>switchTab('crud'));

  /* Filtros del catálogo */
  $('#mv-crud-search').addEventListener('input', renderConceptosTable);
  ['mv-filter-categoria','mv-filter-rent','mv-filter-estado','mv-filter-driver','mv-filter-moneda'].forEach(id=>{
    $('#'+id).addEventListener('change', renderConceptosTable);
  });
  $('#mv-btn-clear-filters').addEventListener('click', clearCrudFilters);
  $('#mv-btn-empty-clear').addEventListener('click', clearCrudFilters);
  $('#mv-btn-expand-all').addEventListener('click', ()=>{ collapsedCrudCats.clear(); persistCollapsedCats(); renderConceptosTable(); });
  $('#mv-btn-collapse-all').addEventListener('click', ()=>{ CATEGORY_ORDER.forEach(c=>collapsedCrudCats.add(c)); persistCollapsedCats(); renderConceptosTable(); });

  /* Cabecera: alta y exportación */
  $('#mv-btn-new').addEventListener('click', ()=>openEditModal(null));
  $('#mv-btn-export').addEventListener('click', (e)=>{
    e.stopPropagation();
    const menu = $('#mv-export-menu');
    menu.hidden = !menu.hidden;
    $('#mv-btn-export').setAttribute('aria-expanded', String(!menu.hidden));
  });
  $('#mv-export-menu').addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-mv-export]');
    if(!btn) return;
    if(btn.dataset.mvExport==='csv') downloadCsv(); else downloadXls();
    closeExportMenu();
  });

  /* Cabecera: simulador */
  $('#mv-btn-run').addEventListener('click', ()=>{ runSimulation(); mvToast('Cálculo actualizado','success'); });
  $('#mv-btn-reset').addEventListener('click', ()=>{
    SIM = Object.assign({}, SIM_DEFAULTS);
    wireSimForm();
    runSimulation();
    mvToast('Valores restaurados','info');
  });

  /* Formulario del simulador (delegado: sobrevive a re-render de wireSimForm) */
  const simForm = $('#mv-sim-form');
  if(simForm){
    simForm.addEventListener('change', handleSimChange);
    simForm.addEventListener('input', handleSimInput);
    simForm.addEventListener('click', handleSimToggleClick);
    simForm.addEventListener('submit', e=>e.preventDefault());
  } /* Simulador deshabilitado temporalmente (ver mv-sub-sim) */

  /* Delegación de clics del módulo (acotada a la vista, no a document) */
  root.addEventListener('click', (e)=>{
    const catBtn = e.target.closest('[data-mv-cat]');
    if(catBtn){
      const cat = catBtn.dataset.mvCat;
      if(collapsedCrudCats.has(cat)) collapsedCrudCats.delete(cat); else collapsedCrudCats.add(cat);
      persistCollapsedCats();
      renderConceptosTable();
      return;
    }
    const simCatBtn = e.target.closest('[data-mv-simcat]');
    if(simCatBtn){
      const set = collapsedSimCats[simCatBtn.dataset.mvSimcol];
      const cat = simCatBtn.dataset.mvSimcat;
      if(set.has(cat)) set.delete(cat); else set.add(cat);
      runSimulation();
      return;
    }
    const editBtn = e.target.closest('[data-mv-edit]');
    if(editBtn){ openEditModal(editBtn.dataset.mvEdit); return; }
    const histBtn = e.target.closest('[data-mv-history]');
    if(histBtn){ openConceptHistoryModal(histBtn.dataset.mvHistory); return; }
    const delBtn = e.target.closest('[data-mv-delete]');
    if(delBtn){ openDeleteModal(delBtn.dataset.mvDelete); return; }
    const locateBtn = e.target.closest('[data-mv-locate]');
    if(locateBtn){ locateConceptRow(locateBtn.dataset.mvLocate); return; }
    const viewBtn = e.target.closest('[data-mv-view]');
    if(viewBtn){ openFormulaModal(viewBtn.dataset.mvView); return; }
    const closeBtn = e.target.closest('[data-mv-close]');
    if(closeBtn){
      const id = closeBtn.dataset.mvClose;
      if(id==='mvEditModal') attemptCloseEdit(); else closeModal(id);
      return;
    }
  });
  /* Filas de cálculo accesibles con teclado */
  root.addEventListener('keydown', (e)=>{
    if(e.key!=='Enter' && e.key!==' ') return;
    const row = e.target.closest('.mv-calc-row[data-mv-view], .mv-hero[data-mv-view]');
    if(row){ e.preventDefault(); openFormulaModal(row.dataset.mvView); }
  });

  /* Modal de edición */
  $('#mv-edit-form').addEventListener('submit', handleEditSubmit);
  $('#mv-edit-form').addEventListener('input', ()=>{ editDirty = true; $('#mv-discard-bar').classList.remove('visible'); });
  $('#mv-edit-form').addEventListener('click', (e)=>{
    const btn = e.target.closest('#mv-class-toggle button[data-clase]');
    if(!btn) return;
    $$('#mv-class-toggle button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    $('#mv-edit-form [name="clase"]').value = btn.dataset.clase;
    editDirty = true;
  });
  $('#mv-edit-cancel').addEventListener('click', attemptCloseEdit);
  $('#mv-discard-confirm').addEventListener('click', closeEditModal);

  /* Modal de eliminación */
  $('#mv-delete-cancel').addEventListener('click', closeDeleteModal);
  $('#mv-delete-confirm').addEventListener('click', confirmConceptDelete);

  /* Clic en el backdrop de cada modal del módulo */
  $$('.mv-modal').forEach(m=>{
    m.addEventListener('click', (e)=>{
      if(e.target!==m) return;
      if(m.id==='mvEditModal') attemptCloseEdit();
      else if(m.id==='mvDeleteModal') closeDeleteModal();
      else closeModal(m.id);
    });
  });

  /* Listeners a nivel de documento (únicos, con verificación de estado
     del módulo para no interferir con el resto de la plataforma) */
  document.addEventListener('keydown', (e)=>{
    if(e.key!=='Escape') return;
    if(!anyMvModalOpen()){ closeExportMenu(); return; }
    const open = root.querySelector('.mv-modal.open');
    if(open.id==='mvEditModal') attemptCloseEdit();
    else if(open.id==='mvDeleteModal') closeDeleteModal();
    else closeModal(open.id);
  });
  document.addEventListener('click', (e)=>{
    const menu = $('#mv-export-menu');
    if(menu && !menu.hidden && !e.target.closest('.mv-export-wrap')) closeExportMenu();
  });
}

/* -------------------------------------------------------------------------
   13) API PÚBLICA — contrato idéntico a PricebookModule
   ------------------------------------------------------------------------- */
function ensureRendered(){
  if(!root) return;
  if(!wired){ wireStatic(); wired = true; }
  if(!rendered){
    rendered = true;
    refreshCrudView();
    wireSimForm();
    runSimulation();
  }
}

window.MotorVariablesModule = { ensureRendered: ensureRendered };

})();
