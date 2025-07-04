async function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value) / 100;

  const piernaDer = document.getElementById("piernaDer").value;
  const piernaIzq = document.getElementById("piernaIzq").value;
  const brazoDer = document.getElementById("brazoDer").value;
  const brazoIzq = document.getElementById("brazoIzq").value;
  const cintura = document.getElementById("cintura").value;
  const pecho = document.getElementById("pecho").value;

  if (!nombre || !edad || !peso || !altura) {
    alert("Por favor completa nombre, edad, peso y altura.");
    return;
  }

  const imc = (peso / (altura * altura)).toFixed(2);
  document.getElementById("resultadoIMC").innerText = `Tu IMC es: ${imc}`;

  doc.setFillColor(255, 215, 0);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("PowerGym - Reporte Corporal", 10, 14);

  doc.setDrawColor(255, 215, 0);
  doc.line(10, 25, 200, 25);

  doc.setFontSize(14);
  doc.setTextColor(255, 215, 0);
  doc.text("Datos Personales", 10, 35);

  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text(`Nombre: ${nombre}`, 10, 45);
  doc.text(`Edad: ${edad} años`, 10, 52);

  doc.setTextColor(255, 215, 0);
  doc.text("Peso y Altura", 10, 65);

  doc.setTextColor(0);
  doc.text(`Peso: ${peso} kg`, 10, 75);
  doc.text(`Altura: ${(altura * 100).toFixed(1)} cm`, 10, 82);
  doc.text(`IMC: ${imc}`, 10, 89);

  doc.setTextColor(255, 215, 0);
  doc.text("Medidas Corporales", 10, 102);
  doc.setTextColor(0);

  let y = 112;
  const datos = [
    [`Pierna derecha`, piernaDer],
    [`Pierna izquierda`, piernaIzq],
    [`Brazo derecho`, brazoDer],
    [`Brazo izquierdo`, brazoIzq],
    [`Cintura`, cintura],
    [`Pecho`, pecho]
  ];

  datos.forEach(([nombre, valor]) => {
    if (valor) {
      doc.text(`${nombre}: ${valor} cm`, 10, y);
      y += 7;
    }
  });

  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Generado por PowerGym © 2025", 10, 285);

  doc.save(`PowerGym_${nombre.replace(" ", "_")}.pdf`);
}

function generarRutina() {
  const { jsPDF } = window.jspdf;

  const nombre = document.getElementById("nombre").value;
  const objetivo = document.getElementById("objetivo").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value) / 100;

  if (!nombre || !peso || !altura || !objetivo) {
    alert("Por favor llena nombre, peso, altura y selecciona un objetivo.");
    return;
  }

  const imc = (peso / (altura * altura)).toFixed(2);
  const doc = new jsPDF();

  // Encabezado
  doc.setFillColor(255, 215, 0);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.text("PowerGym - Rutina Semanal Personalizada", 10, 14);

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Nombre: ${nombre}`, 10, 30);
  doc.text(`IMC: ${imc}`, 10, 38);
  doc.text(`Objetivo: ${objetivo === 'definir' ? 'Definir / Bajar grasa' : 'Subir masa muscular'}`, 10, 46);

  doc.setDrawColor(255, 215, 0);
  doc.line(10, 52, 200, 52);

  // Rutina semanal
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(14);
  doc.text("RUTINA DE LUNES A VIERNES", 10, 60);

  doc.setTextColor(0);
  doc.setFontSize(11);
  let y = 70;

  const rutina = {
    definir: {
      LUNES: [
        "Cardio: 30 min (trote o bicicleta)",
        "Sentadillas con peso corporal - 3x20",
        "Flexiones - 3x15",
        "Plancha - 3x1 min"
      ],
      MARTES: [
        "Entrenamiento HIIT - 20 minutos",
        "Remo con mancuernas - 3x15",
        "Peso muerto ligero - 3x12",
        "Abdominales - 3x20"
      ],
      MIERCOLES: [
        "Cardio suave: 20-30 min",
        "Sentadillas explosivas - 3x15",
        "Burpees - 3x12",
        "Mountain climbers - 3x30 seg"
      ],
      JUEVES: [
        "HIIT enfocado en tren superior",
        "Flexiones abiertas - 3x12",
        "Tríceps fondos en banco - 3x15",
        "Crunch abdominal - 3x25"
      ],
      VIERNES: [
        "Cardio (caminata rápida) - 30 min",
        "Pierna y glúteo con banda elástica - 3x20",
        "Sentadilla con salto - 3x15",
        "Plancha lateral - 3x30 seg por lado"
      ]
    },
    subir: {
      LUNES: [
        "Pecho y tríceps:",
        "- Press banca - 4x10",
        "- Aperturas con mancuernas - 3x12",
        "- Fondos - 3x10",
        "- Tríceps en polea - 3x12"
      ],
      MARTES: [
        "Espalda y bíceps:",
        "- Peso muerto - 4x8",
        "- Jalones al pecho - 3x12",
        "- Remo con barra - 3x10",
        "- Curl bíceps - 3x12"
      ],
      MIERCOLES: [
        "Piernas:",
        "- Sentadilla libre - 4x10",
        "- Prensa - 4x12",
        "- Curl femoral - 3x12",
        "- Elevación de talones - 3x20"
      ],
      JUEVES: [
        "Hombros y abdominales:",
        "- Press militar - 4x10",
        "- Elevaciones laterales - 3x15",
        "- Encogimientos - 3x20",
        "- Plancha - 3x1 min"
      ],
      VIERNES: [
        "Full Body + Técnica:",
        "- Sentadilla frontal - 3x10",
        "- Peso muerto rumano - 3x12",
        "- Remo unilateral - 3x12",
        "- Cardio suave: 15 min"
      ]
    }
  };

  const rutinaElegida = rutina[objetivo];

  for (const dia in rutinaElegida) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(`${dia.charAt(0).toUpperCase() + dia.slice(1)}:`, 10, y);
    doc.setFont(undefined, "normal");
    y += 6;

    rutinaElegida[dia].forEach(ejercicio => {
      doc.text(`- ${ejercicio}`, 12, y);
      y += 6;
    });

    y += 4;

    if (y > 250) {
      doc.addPage();
      y = 20;
    }
  }

  // Recomendaciones generales
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(13);
  doc.text("Recomendaciones Nutricionales", 10, y + 5);
  y += 15;

  doc.setTextColor(0);
  doc.setFontSize(11);
  const recomendaciones =
    objetivo === 'definir'
      ? [
          "Mantén un déficit calórico del 10-20%.",
          "Prioriza alimentos ricos en proteína: pollo, huevos, atún, tofu.",
          "Come vegetales y carbohidratos complejos (avena, arroz integral).",
          "Evita azúcares y fritos.",
          "Toma al menos 2-3 litros de agua al día."
        ]
      : [
          "Mantén un superávit calórico del 10-15%.",
          "Consume proteína de calidad: carnes magras, huevos, whey protein.",
          "Agrega carbohidratos densos: arroz, papas, pasta, avena.",
          "Agrega grasas saludables: aguacate, maní, aceite de oliva.",
          "Hidrátate correctamente: 2.5+ litros diarios."
        ];

  recomendaciones.forEach(rec => {
    doc.text(rec, 10, y);
    y += 7;
  });

  y += 5;
  doc.setFontSize(11);
  doc.text("Dormir mínimo 7-8 horas es vital para recuperación y resultados óptimos.", 10, y);

  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Generado por PowerGym © 2025", 10, 285);

  doc.save(`Rutina_PowerGym_${nombre.replace(" ", "_")}.pdf`);
}
