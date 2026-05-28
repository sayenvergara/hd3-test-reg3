const TRANSPORTE = { auto: 0.21, micro: 0.06, metro: 0.03, bici: 0 };
const ALIMENTACION = { "alta-carne": 7.2, moderada: 4.1, vegetariana: 2.5 };
const ELECTRICIDAD_KG_H = 0.35;

function arbolSVG(tipo) {
  const copa = tipo === 'sano' ? '#4caf50' : '#bdbdbd';
  const tronco = tipo === 'sano' ? '#795548' : '#d0d0d0';
  return `<svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="19" cy="17" rx="14" ry="13" fill="${copa}" opacity="0.85"/>
    <ellipse cx="12" cy="21" rx="9" ry="8" fill="${copa}"/>
    <ellipse cx="26" cy="21" rx="9" ry="8" fill="${copa}"/>
    <ellipse cx="19" cy="24" rx="12" ry="9" fill="${copa}"/>
    <rect x="16" y="32" width="6" height="12" rx="2" fill="${tronco}"/>
  </svg>`;
}

document.getElementById('btn-calcular').addEventListener('click', function () {
  const tipo = document.getElementById('tipo-transporte').value;
  const km = parseFloat(document.getElementById('km').value) || 0;
  const ali = document.getElementById('alimentacion').value;
  const elec = parseFloat(document.getElementById('electricidad').value) || 0;

  const co2Transp = km * TRANSPORTE[tipo];
  const co2Ali = ALIMENTACION[ali];
  const co2Elec = elec * ELECTRICIDAD_KG_H;
  const total = co2Transp + co2Ali + co2Elec;
  const totalR = Math.round(total * 10) / 10;

  document.getElementById('co2-total').textContent = totalR;

  let msg = '';
  if (total < 4)
    msg = '<strong>¡Huella baja!</strong> Estás muy por debajo del promedio chileno. Sigue priorizando el transporte público y la alimentación basada en plantas.';
  else if (total < 8)
    msg = '<strong>Huella moderada.</strong> Cercano al promedio nacional. Un ajuste en transporte o alimentación marcaría la diferencia.';
  else if (total < 13)
    msg = '<strong>Huella alta.</strong> Superas el promedio diario de Chile. El auto y la carne roja son los principales factores.';
  else
    msg = '<strong>Huella muy alta.</strong> Tu impacto de hoy equivale a varios días del promedio chileno. Cada cambio que hagas importa.';

  document.getElementById('mensaje-texto').innerHTML = msg;

  const arboles = 10;
  const marchitos = Math.min(Math.round(total), arboles);
  const sanos = arboles - marchitos;
  const bosque = document.getElementById('bosque');
  bosque.innerHTML = '';
  for (let i = 0; i < marchitos; i++) {
    bosque.innerHTML += `<div class="arbol marchito">${arbolSVG('marchito')}<span>Impactado</span></div>`;
  }
  for (let i = 0; i < sanos; i++) {
    bosque.innerHTML += `<div class="arbol sano">${arbolSVG('sano')}<span>Sano</span></div>`;
  }

  const smartphones = Math.round(total * 121);
  const duchas = Math.round(total / 0.08);
  const kmAuto = Math.round(total / 0.21);
  const diasArbol = (total / 22 * 365).toFixed(1);

  document.getElementById('equivalencias').innerHTML = `
    <div class="eq-card">
      <div class="eq-icon">📱</div>
      <div class="eq-val">${smartphones.toLocaleString('es-CL')}</div>
      <div class="eq-desc">smartphones cargados completamente</div>
    </div>
    <div class="eq-card">
      <div class="eq-icon">🚗</div>
      <div class="eq-val">${kmAuto} km</div>
      <div class="eq-desc">equivalente en auto bencinero</div>
    </div>
    <div class="eq-card">
      <div class="eq-icon">🚿</div>
      <div class="eq-val">${duchas} min</div>
      <div class="eq-desc">de ducha caliente (aprox.)</div>
    </div>
    <div class="eq-card">
      <div class="eq-icon">🌳</div>
      <div class="eq-val">${diasArbol} días</div>
      <div class="eq-desc">de trabajo de un árbol maduro</div>
    </div>
  `;

  document.getElementById('resultados').classList.remove('hidden');
  document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
});
