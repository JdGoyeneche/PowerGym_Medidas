async function generarPDF() {
  const jsPDF = window.jspdf.jsPDF;
  const doc = new jsPDF();

  // Cargar imagen con opacidad
  const logoImg = document.getElementById("marcaAgua");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = logoImg.width;
  canvas.height = logoImg.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.15; // Controla la opacidad
  ctx.drawImage(logoImg, 0, 0);
  const logoData = canvas.toDataURL("image/png");

  // Marca de agua
  doc.addImage(logoData, 'PNG', 30, 50, 150, 150); // Más grande

  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value) / 100;

  const piernaDer = document.getElementById("piernaDer").value;
  const piernaIzq = document.getElementById("piernaIzq").value;
  const gluteo = document.getElementById("gluteo").value;
  const cintura = document.getElementById("cintura").value;
  const brazoDer = document.getElementById("brazoDer").value;
  const brazoIzq = document.getElementById("brazoIzq").value;
  const muñeca = document.getElementById("muñeca").value;
  const pecho = document.getElementById("pecho").value;
  const cuello = document.getElementById("cuello").value;

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
  doc.setFont("helvetica", "bold");
  doc.text("PowerGym - REPORTE CORPORAL", 10, 14);
  doc.setFont("helvetica", "normal");

  doc.setDrawColor(255, 215, 0);
  doc.line(10, 25, 200, 25);

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold"); // ✅ Negrita
  doc.text("DATOS PERSONALES", 10, 35);
  doc.setFont("helvetica", "normal"); // ✅ Regresa a texto normal después


  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text(`NOMBRE: ${nombre}`, 10, 45);
  doc.text(`EDAD: ${edad} años`, 10, 52);

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PESO-ALTURA-INDICE DE MASA CORPORAL", 10, 65);
  doc.setFont("helvetica", "normal");


  doc.setTextColor(0);
  doc.text(`PESO: ${peso} kg`, 10, 75);
  doc.text(`ALTURA: ${(altura * 100).toFixed(1)} cm`, 10, 82);
  doc.text(`IMC: ${imc}`, 10, 89);

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("MEDIDAS CORPORALES", 10, 102);
  doc.setFont("helvetica", "normal");


  // Crear tabla de medidas
  const medidas = [
    ["Zona Corporal", "Medida (cm)"]
  ];

  if (piernaDer) medidas.push(["Pierna derecha", piernaDer]);
  if (piernaIzq) medidas.push(["Pierna izquierda", piernaIzq]);
  if (gluteo) medidas.push(["Glúteo", gluteo]);
  if (cintura) medidas.push(["Cintura", cintura]);
  if (brazoDer) medidas.push(["Brazo derecho", brazoDer]);
  if (brazoIzq) medidas.push(["Brazo izquierdo", brazoIzq]);
  if (muñeca) medidas.push(["Muñeca", muñeca]);
  if (pecho) medidas.push(["Pecho", pecho]);
  if (cuello) medidas.push(["Cuello", cuello]);

  doc.autoTable({
    head: [medidas[0]],
    body: medidas.slice(1),
    startY: 108,
    styles: {
      halign: 'center',
      fontSize: 13,
      fillColor: false,        // ✅ Sin fondo
      textColor: [30, 30, 30], // ✅ Gris oscuro suave
      lineColor: [200, 200, 200],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [255, 215, 0], // ✅ Encabezado dorado
      textColor: [0, 0, 0]
    },
    alternateRowStyles: {
      fillColor: false // ✅ Alternar también sin fondo
    },
    tableLineColor: [220, 220, 220],
    tableLineWidth: 0.1
  });




  let finalY = doc.lastAutoTable.finalY + 10;


  if (finalY > 270) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text(
    "Si presenta alguna lesión, condición médica o complicación física, por favor comuníquese con su instructor.",
    13,
    finalY
  );



  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Generado por JuanGoyeneche © 2025", 10, 285);

  doc.save(`Valoracion_PowerGym_${nombre.replace(" ", "_")}.pdf`);
}

async function convertirImagenABase64(url) {
  const respuesta = await fetch(url);
  const blob = await respuesta.blob();
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onloadend = () => resolve(lector.result);
    lector.onerror = reject;
    lector.readAsDataURL(blob);
  });
}

async function generarRutina() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const imgPressPechopln = await convertirImagenABase64("pecho_press_plano_mancuerna.png");
  const imgPressPechoinc = await convertirImagenABase64("press_inclinado_mancuerna.png");
  const imgAptInc = await convertirImagenABase64("apertura_inclinado_mancuerna.png");
  const imgFonTri = await convertirImagenABase64("fondos_triceps_maquina.png");
  const imgExtTriCue = await convertirImagenABase64("extension_triceps_cuerda.png");
  const imgExtTriTum = await convertirImagenABase64("extension_triceps_tumbado.png");
  const imgHack = await convertirImagenABase64("prensa_hacka.png");
  const imgPreInc45 = await convertirImagenABase64("prensa_inclinada_45.png");
  const imgExtCua = await convertirImagenABase64("extension_piernas.png");
  const imgHipTru = await convertirImagenABase64("hip_trust.png");
  const imgAbd = await convertirImagenABase64("abduccion_maquina.png");
  const imgCruAbd = await convertirImagenABase64("crunch_abdominal.png");
  const imgPla = await convertirImagenABase64("plancha.png");
  const imgJalPec = await convertirImagenABase64("jalon-al-pecho.png");
  const imgRemCer = await convertirImagenABase64("remo-bajo-cerrado.png");
  const imgRemMan = await convertirImagenABase64("remo con mancuerna.png");
  const imgCurBic = await convertirImagenABase64("curl-biceps-mancuerna.png");
  const imgPesMue = await convertirImagenABase64("peso-muerto-rumano.png");
  const imgCurFem = await convertirImagenABase64("curl-de-femoral.png");
  const imgSteUp = await convertirImagenABase64("step-up.png");
  const imgEleTal = await convertirImagenABase64("elevacion-de-talon-sentado.png");
  const imgPreMil = await convertirImagenABase64("press militar sentado.png");
  const imgEleLat = await convertirImagenABase64("elevacion lateral.png");
  const imgEleFron = await convertirImagenABase64("elevacion frontal.png");
  const imgFacPull = await convertirImagenABase64("face pull.png");
  const imgAbdCadBan = await convertirImagenABase64("abduccion de cadera con banda.png");
  const imgCruObli = await convertirImagenABase64("crunch oblicuo.png");
  const imgSumKet = await convertirImagenABase64("sentadilla sumo bola.png");
  const imgPatCol = await convertirImagenABase64("patada gluteo colchoneta.png");
  const imgMarchaRapida = await convertirImagenABase64("caminata en el sitio.png");
  const imgElevacionFrontalDosManos = await convertirImagenABase64("elevacion a dos manos.png");
  const imgPlanchaConToquesDeHombro = await convertirImagenABase64("plancha al hombro.png");
  const imgEstiramientoGuiado = await convertirImagenABase64("estiramiento guiado.png");
  const imgPressBancaConBarra = await convertirImagenABase64("press banca con barra.png");
  const imgDominadasAsistidas = await convertirImagenABase64("dominada asistida.png");
  const imgSentadillaLibreConBarra = await convertirImagenABase64("sentadilla libre con barra.png");
  const imgZancadasConMancuernas = await convertirImagenABase64("zancadas con mancuerna.png");
  const imgSubidaMontaña = await convertirImagenABase64("subida montaña.png");
  const imgBurpess = await convertirImagenABase64("burpess.png");
  const imgRemoConBarra = await convertirImagenABase64("remo con barra.png");
  const imgPressArnold = await convertirImagenABase64("press arnold.png");
  const imgPesoMuertoConBarra = await convertirImagenABase64("peso muerto con barra.png");
  const imgBulgaraConPeso = await convertirImagenABase64("bulgara con peso.png");
  const imgPredicadorEnBanco = await convertirImagenABase64("predicador banco.png");
  const imgCurlMartillo = await convertirImagenABase64("curl martillo.png");
  const imgTrapecio = await convertirImagenABase64("trapecio.png");
  const imgPressHombroAgarreDiagonal = await convertirImagenABase64("press hombro agarre diagonal.png");
  const imgPeckDeck = await convertirImagenABase64("peck deck.png");
  const imgPressDeclinado = await convertirImagenABase64("press declinado.png");
  const imgPatadaEnPolea = await convertirImagenABase64("patada en polea.png");
  const imgElevacionDeGemelosDePie = await convertirImagenABase64("elevacion de gemelos de pie.png");
  const imgCurlInclinadoConMancuerna = await convertirImagenABase64("curl inclinado con mancuerna.png");
  const imgPullOver = await convertirImagenABase64("pull-over.png");
  const imgFlexiones = await convertirImagenABase64("flexiones.png");
  const imgCopa = await convertirImagenABase64("copa.png");


  const imagenesEjercicios = {
    "press de pecho con mancuernas en banco plano": imgPressPechopln,
    "press de pecho con mancuernas en banco inclinado": imgPressPechoinc,
    "aperturas en banco inclinado": imgAptInc,
    "fondos asistidos": imgFonTri,
    "extensión de tríceps con cuerda": imgExtTriCue,
    "extensión de tríceps tumbado": imgExtTriTum,
    "hack squat": imgHack,
    "prensa inclinada": imgPreInc45,
    "extensión de cuádriceps": imgExtCua,
    "hip trust": imgHipTru,
    "abducción de cadera en máquina": imgAbd,
    "crunch abdominal": imgCruAbd,
    "plancha": imgPla,
    "jalón al pecho": imgJalPec,
    "remo bajo": imgRemCer,
    "remo con mancuerna": imgRemMan,
    "curl de bíceps": imgCurBic,
    "peso muerto": imgPesMue,
    "curl femoral": imgCurFem,
    "step up": imgSteUp,
    "elevación de talones": imgEleTal,
    "press militar": imgPreMil,
    "elevaciones laterales": imgEleLat,
    "elevaciones frontales": imgEleFron,
    "face pull": imgFacPull,
    "abducción de cadera con banda": imgAbdCadBan,
    "crunch oblicuo": imgCruObli,
    "sentadilla sumo": imgSumKet,
    "patada de glúteo en cuadrupedia": imgPatCol,
    "marcha en el sitio": imgMarchaRapida,
    "elevacion frontal a dos manos": imgElevacionFrontalDosManos,
    "plancha con toques de hombro": imgPlanchaConToquesDeHombro,
    "estiramientos guiados": imgEstiramientoGuiado,
    "press banca con barra": imgPressBancaConBarra,
    "dominadas asistidas": imgDominadasAsistidas,
    "sentadilla libre con barra": imgSentadillaLibreConBarra,
    "zancadas con mancuernas": imgZancadasConMancuernas,
    "mountain climbers": imgSubidaMontaña,
    "burpees": imgBurpess,
    "remo con barra": imgRemoConBarra,
    "press arnold": imgPressArnold,
    "peso muerto con barra": imgPesoMuertoConBarra,
    "sentadilla búlgara con peso": imgBulgaraConPeso,
    "curl predicador": imgPredicadorEnBanco,
    "curl martillo": imgCurlMartillo,
    "trapecios": imgTrapecio,
    "press hombro en agarre diagonal": imgPressHombroAgarreDiagonal,
    "aperturas en peck deck": imgPeckDeck,
    "press declinado": imgPressDeclinado,
    "patada en polea": imgPatadaEnPolea,
    "elevacion de gemelos": imgElevacionDeGemelosDePie,
    "curl inclinado con mancuerna": imgCurlInclinadoConMancuerna,
    "peck deck": imgPeckDeck,
    "pull over": imgPullOver,
    "Flexiones de pecho": imgFlexiones,
    "Copa": imgCopa,
    
    

  };

  const logoImg = document.getElementById("marcaAgua");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = logoImg.width;
  canvas.height = logoImg.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.15;
  ctx.drawImage(logoImg, 0, 0);
  const logoData = canvas.toDataURL("image/png");

  const nombre = document.getElementById("nombre").value;
  const genero = document.getElementById("genero").value;
  const objetivo = document.getElementById("objetivo").value;
  const nivel = document.getElementById("nivel").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value) / 100;

  if (!nombre || !genero || !objetivo || !nivel || !peso || !altura) {
    alert("Por favor completa todos los campos (nombre, género, objetivo, nivel, peso y altura).");
    return;
  }

  const imc = peso / (altura * altura);

  let categoriaPeso = "";
  if (imc < 18.5) {
    categoriaPeso = "bajo_peso";
  } else if (imc >= 18.5 && imc <= 24.9) {
    categoriaPeso = "peso_medio";
  } else {
    categoriaPeso = "sobrepeso";
  }

  const key = `${genero}_${objetivo}_${nivel}_${categoriaPeso}`;

  const rutinas = {
    "hombre_definir_principiante_bajo_peso": {
      "Lunes": [
        "Press de pecho con mancuernas en banco plano 3x12",
        "Press de pecho con mancuernas en banco inclinado 3x12",
        "Aperturas en banco inclinado (mancuernas o máquina) 3x15",
        "Fondos asistidos (máquina o banco) 3x10",
        "Extension de tríceps con cuerda 3x15",
        "Extensión de tríceps tumbado 3x15"
      ],
      "Martes": [
        "Jalón al pecho en polea 3x12",
        "Remo en polea 3x15",
        "Remo unilateral en maquina 3x12(con cada brazo)",
        "Curl de bíceps con mancuernas 3x12",
        "Curl martillo con mancuerna 3x12",
        "Curl predicador en maquina 3x12",
        "Plancha frontal 3x30 seg",
        "Crunch abdominal 3x20"
      ],
      "MIERCOLES": [
        "Sentadillas al aire 3x15",
        "Peso muerto con barra 3x12",
        "Hip Trust 3x15",
        "Elevación de talones (gemelos) 3x20",
        "Respiraciones diafragmáticas 3x1 min"
      ],
      "JUEVES": [
        "Press militar con mancuernas 3x12",
        "Elevaciones laterales 3x15",
        "Remo al mentón con mancuerna 3x12",
        "Face pull (polea o banda) 3x15",
        "Plancha lateral asistida 3x30 seg"
      ],
      "Viernes": [
        "Circuito funcional 3 rondas (baja intensidad)",
        "Burpees asistidos 3x10",
        "Mountain climbers suaves 3x15",
        "Flexiones de pecho con rodillas apoyadas 3x12",
        "Plancha con toques de hombro 3x20",
        "Estiramiento completo guiado"
      ]
    },

    "hombre_definir_principiante_peso_medio": {
      "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Press militar sentado - 4x10",
        "Press Arnold - 4x10",
        "Elevaciones laterales - 4x10",
        "Elevaciones frontales - 4x10",
        "trapecios - 6x15"
        "Mountain climbers - 4x40 segundos",
        "Crunch abdominal - 4x20",
        "Estiramientos guiados - 4x30 segundos"
      ],
      "jueves": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "hombre_definir_principiante_sobrepeso": {
      "Lunes: Pierna completa": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x15",
        "Prensa inclinada - 4x15",
        "Curl femoral - 4x15",
        "extensión de cuádriceps 4x15",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
      ],
      "Martes: Espalda y Biceps": [
        "Jalón al pecho - 4x15",
        "Remo con mancuerna o hammer bajo - 4x15 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x15",
        "curl predicador - 4x15",
        "curl martillo - 4x15",
        "Crunch abdominal - 4x15",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles: Hombros y trapecios": [
        "Press militar sentado - 4x15",
        "Press Arnold - 4x15",
        "Elevaciones laterales - 4x15",
        "Elevaciones frontales - 4x15",
        "Trapecios - 6x15"
        "Mountain climbers - 4x40 segundos",
        "Crunch abdominal - 4x20",
        "Estiramientos guiados - 4x30 segundos"
      ],
      "jueves: Pecho y Triceps": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes: Pierna": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x15"
        "Prensa inclinada - 4x15"
        "Curl femoral 4x15",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x15",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    }
    ,


    "hombre_definir_intermedio_bajo_peso": {
      "Lunes": [
        "Press de pecho con mancuernas en banco plano - 4x12",
        "Press banca con barra - 4x10",
        "Aperturas en banco inclinado - 3x15",
        "Fondos asistidos - 3x10",
        "Extensión de tríceps con cuerda - 3x12",
        "Burpees - 3x20 segundos"
      ],
      "Martes": [
        "Jalón al pecho - 4x12",
        "Remo con mancuerna - 4x10 c/u",
        "Dominadas asistidas - 3x8–10",
        "Curl de bíceps - 3x15",
        "Face pull - 3x15",
        "Crunch abdominal - 3x25",
        "Plancha - 3x30 segundos"
      ],
      "Miercoles": [
        "Sentadilla libre con barra - 4x10",
        "Prensa inclinada - 3x12",
        "Curl femoral - 3x12",
        "Elevaciones de talones sentado - 4x20",
        "Hip trust - 4x10",
        "Crunch oblicuo - 3x25",
        "Plancha con toques de hombro - 3x30 segundos"
      ],
      "jueves": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Zancadas con mancuernas - 3x12 c/u",
        "Peso muerto con barra - 3x10",
        "Remo con barra - 3x10",
        "Patada de glúteo en cuadrupedia - 3x15",
        "Marcha en el sitio - 3x1 minuto",
        "Plancha - 3x40 segundos",
        "Estiramientos guiados - 3x30 segundos"
      ]
    },


    "hombre_definir_intermedio_peso_medio": {
     "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Press militar sentado - 4x10",
        "Press Arnold - 4x10",
        "Elevaciones laterales - 4x10",
        "Elevaciones frontales - 4x10",
        "trapecios - 6x15"
        "Mountain climbers - 4x40 segundos",
        "Crunch abdominal - 4x20",
        "Estiramientos guiados - 4x30 segundos"
      ],
      "jueves": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },

    "hombre_definir_intermedio_sobrepeso": {
       "Lunes: Pierna completa": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x15",
        "Prensa inclinada - 4x15",
        "Curl femoral - 4x15",
        "extensión de cuádriceps 4x15",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
      ],
      "Martes: Espalda y Biceps": [
        "Jalón al pecho - 4x15",
        "Remo con mancuerna o hammer bajo - 4x15 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x15",
        "curl predicador - 4x15",
        "curl martillo - 4x15",
        "Crunch abdominal - 4x15",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles: Hombros y trapecios": [
        "Press militar sentado - 4x15",
        "Press Arnold - 4x15",
        "Elevaciones laterales - 4x15",
        "Elevaciones frontales - 4x15",
        "Trapecios - 6x15"
        "Mountain climbers - 4x40 segundos",
        "Crunch abdominal - 4x20",
        "Estiramientos guiados - 4x30 segundos"
      ],
      "jueves: Pecho y Triceps": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes: Pierna": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x15"
        "Prensa inclinada - 4x15"
        "Curl femoral 4x15",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x15",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    //HOMBRE SUBIR

    "hombre_subir_principiante_bajo_peso": {
      "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Press militar sentado - 4x10",
        "Press Arnold - 4x10",
        "Elevaciones laterales - 4x10",
        "Elevaciones frontales - 4x10",
        "trapecios - 6x15"
        "Mountain climbers - 4x40 segundos",
        "Crunch abdominal - 4x20",
        "Estiramientos guiados - 4x30 segundos"
      ],
      "jueves": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "hombre_subir_principiante_peso_medio": {
      "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Press militar sentado - 4x10",
        "Press Arnold - 4x10",
        "Elevaciones laterales - 4x10",
        "Elevaciones frontales - 4x10",
        "trapecios - 6x15"
        "Mountain climbers - 4x40 segundos",
        "Crunch abdominal - 4x20",
        "Estiramientos guiados - 4x30 segundos"
      ],
      "jueves": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "hombre_subir_principiante_sobrepeso": {
      "Lunes": [
        "Press de pecho con mancuernas en banco plano - 3x12",
        "Press banca con barra - 3x10",
        "Aperturas en banco inclinado - 3x12",
        "Fondos asistidos - 3x10",
        "Extensión de tríceps con cuerda - 3x12",
        "Marcha en el sitio - 3x30 segundos"
      ],
      "Martes": [
        "Jalón al pecho - 3x12",
        "Remo con mancuerna - 3x10 c/u",
        "Dominadas asistidas - 3x6–8",
        "Curl de bíceps - 3x12",
        "Face pull - 3x15",
        "Crunch abdominal - 3x20",
        "Plancha - 3x30 segundos"
      ],
      "Miercoles": [
        "Sentadilla libre con barra - 3x10",
        "Prensa inclinada - 3x12",
        "Curl femoral - 3x12",
        "Elevaciones de talones sentado - 4x20",
        "Hip trust - 3x10",
        "Crunch oblicuo - 3x20",
        "Plancha con toques de hombro - 3x30 segundos"
      ],
      "jueves": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Zancadas con mancuernas - 3x10 c/u",
        "Peso muerto con barra - 3x10",
        "Remo con barra - 3x10",
        "Patada de glúteo en cuadrupedia - 3x15",
        "Marcha en el sitio - 3x1 minuto",
        "Plancha - 3x40 segundos",
        "Estiramientos guiados - 3x30 segundos"
      ]
    },


    "hombre_subir_intermedio_bajo_peso": {
      "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Press militar sentado - 4x10",
        "Press Arnold - 4x10",
        "Elevaciones laterales - 4x10",
        "Elevaciones frontales - 4x10",
        "trapecios - 6x15"
        "Mountain climbers - 4x40 segundos",
        "Crunch abdominal - 4x20",
        "Estiramientos guiados - 4x30 segundos"
      ],
      "jueves": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "hombre_subir_intermedio_peso_medio": {
     "Lunes: Pierna completa": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x15",
        "Prensa inclinada - 4x15",
        "Curl femoral - 4x15",
        "extensión de cuádriceps 4x15",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
      ],
      "Martes: Espalda y Biceps": [
        "Jalón al pecho - 4x15",
        "Remo con mancuerna o hammer bajo - 4x15 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x15",
        "curl predicador - 4x15",
        "curl martillo - 4x15",
        "Crunch abdominal - 4x15",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles: Hombros y trapecios": [
        "Press militar sentado - 4x15",
        "Press Arnold - 4x15",
        "Elevaciones laterales - 4x15",
        "Elevaciones frontales - 4x15",
        "Trapecios - 6x15"
        "Mountain climbers - 4x40 segundos",
        "Crunch abdominal - 4x20",
        "Estiramientos guiados - 4x30 segundos"
      ],
      "jueves: Pecho y Triceps": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes: Pierna": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x15"
        "Prensa inclinada - 4x15"
        "Curl femoral 4x15",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x15",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "hombre_subir_intermedio_sobrepeso": {
      "Lunes": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press banca con barra - 4x8",
        "Aperturas en banco inclinado - 3x12",
        "Fondos asistidos - 3x10",
        "Extensión de tríceps con cuerda - 3x12",
        "Marcha en el sitio - 3x45 segundos"
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna - 3x10 c/u",
        "Dominadas asistidas - 3x6–8",
        "Curl de bíceps - 3x12",
        "Face pull - 3x15",
        "Crunch abdominal - 3x20",
        "Plancha - 3x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla libre con barra - 4x10",
        "Prensa inclinada - 3x12",
        "Curl femoral - 3x12",
        "Elevaciones de talones sentado - 4x20",
        "Hip trust - 3x12",
        "Crunch oblicuo - 3x20",
        "Plancha con toques de hombro - 3x30 segundos"
      ],
      "jueves": [
        "Press de pecho con mancuernas en banco plano - 4x10",
        "Press de pecho con mancuernas en banco inclinado o mancuerna - 4x10",
        "Peck deck - 4x10",
        "Pull over - 4x10",
        "Flexiones de pecho al fallo - 4 series",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
        "plancha con toques de hombro - 4x20"
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Zancadas con mancuernas - 3x10 c/u",
        "Peso muerto con barra - 4x8",
        "Remo con barra - 3x10",
        "Patada de glúteo en cuadrupedia - 3x15",
        "Marcha en el sitio - 3x1 minuto",
        "Plancha - 3x40 segundos",
        "Estiramientos guiados - 3x30 segundos"
      ]
    },




    //MUJERES RUTINA

    "mujer_definir_principiante_bajo_peso": {
     "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "mujer_definir_principiante_peso_medio": {
     "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "mujer_definir_principiante_sobrepeso": {
      "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "mujer_definir_intermedio_bajo_peso": {
      Lunes: ["Cardio suave 20 min", "Sentadillas con peso ligero", "Plancha frontal 3x30 seg"],
      Martes: ["Core básico", "Glúteo puente con banda", "Abducciones"],
      MIERCOLES: ["Marcha rápida", "Bandas para tren superior", "Postura y equilibrio"],
      JUEVES: ["Flexiones de rodillas", "Elevaciones laterales con botella", "Crunch 3x15"],
      Viernes: ["Yoga activo", "Estiramiento profundo"]
    },

    "mujer_definir_intermedio_peso_medio": {
      "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },

    "mujer_definir_intermedio_sobrepeso": {
      "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },


    "mujer_subir_principiante_bajo_peso": {
     "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },

    "mujer_subir_principiante_peso_medio": {
     "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    }
    ,

    "mujer_subir_principiante_sobrepeso": {
      Lunes: ["Sentadillas en silla", "Elevaciones talón", "Glúteo puente"],
      Martes: ["Espalda: remo con banda", "Curl bíceps sentado"],
      MIERCOLES: ["Piernas asistidas + caminata ligera"],
      JUEVES: ["Core adaptado", "Plancha rodillas", "Marcha en el lugar"],
      Viernes: ["Yoga suave", "Respiración guiada", "Estiramientos"]
    },

    "mujer_subir_intermedio_bajo_peso": {
     "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },

    "mujer_subir_intermedio_peso_medio": {
     "Lunes": [
        "Sentadilla libre con barra o variacion zumo(principiantes) - 4x10",
        "Prensa inclinada - 4x10",
        "Curl femoral - 4x10",
        "extensión de cuádriceps 4x10",
        "zancadas con mancuernas 4x20 pasos",
        "Elevaciones de talones sentado - 6x20",
        
      ],
      "Martes": [
        "Jalón al pecho - 4x10",
        "Remo con mancuerna o hammer bajo - 4x10 c/u",
        "Dominadas asistidas - 4 al fallo",
        "Curl de bíceps - 4x10",
        "curl predicador - 4x10",
        "curl martillo - 4x10",
        "Crunch abdominal - 4x10",
        "Plancha - 4x40 segundos"
      ],
      "Miercoles": [
        "Sentadilla sumo - 4x10",
        "Sentadilla búlgara con peso - 4x10",
        "Abducción de cadera en máquina - 4x10",
        "Hip trust maquina o libre - 4x15",
        "Patada en polea o en maquina - 4x12",
        "Peso muerto con barra o mancuerna - 6x15"
      ],
      "jueves": [
        "Peck deck - 4x10",
        "Press banca con mancuerna - 4x10",
        "Press declinado - 4x10",
        "Pull over - 4x10",
        "Extensión de tríceps con cuerda - 4x15",
        "plancha - 4x40"
        "crunch abdominal - 4x20"
      ],
      "Viernes": [
        "Sentadilla libre con barra variacion zumo(principiantes) 4x10"
        "Prensa inclinada - 4x10"
        "Curl femoral 4x10",
        "Hip trust 4x15",
        "Peso muerto con barra - 4x10",
        "Elevacion de gemelos prensa ,mancuerna o smith 6x15"
      ]
    },

    "mujer_subir_intermedio_sobrepeso": {
      Lunes: ["Sentadillas asistidas con peso", "Glúteo en banco", "Extensión con banda"],
      Martes: ["Remo en máquina o liga", "Curl bíceps con mancuernas sentado"],
      MIERCOLES: ["Zancadas cortas", "Elevaciones talón", "Marcha con resistencia"],
      JUEVES: ["Core adaptado + movilidad", "Crunch modificado", "Planchas rodillas"],
      Viernes: ["Circuito funcional adaptado", "Caminata larga"]
    }

  };

  const recomendacionesNutricionales = {
    // HOMBRE - DEFINIR - PRINCIPIANTE
    "hombre_definir_principiante_bajo_peso": [
      "Evitar déficit calórico; mantener ingesta de mantenimiento.",
      "Comer 4-5 veces al día alimentos ricos en proteína (huevo, pescado, pollo).",
      "Evitar ayunos prolongados que puedan reducir masa muscular.",
      "Incluir snacks con carbohidratos complejos y grasas buenas (maní, aguacate).",
      "Hidratación constante, mínimo 2.5 litros/día."
    ],
    "hombre_definir_principiante_peso_medio": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "2 huevos revueltos + 2 claras",
            "1 taza de avena cocida en agua con una cucharadita de azúcar o canela"
          ],
          "media_mañana": [
            "1 banano"
          ],
          "almuerzo": [
            "120 g de arroz con atún en agua",
            "Ensalada de tomate y lechuga con una cucharadita de aceite"
          ],
          "merienda": [
            "1 arepa pequeña con queso bajo en sal"
          ],
          "cena": [
            "2 huevos cocidos con papa cocida y ensalada de repollo"
          ]
        },
        "Martes": {
          "desayuno": [
            "1 arepa con 1 huevo frito en sartén antiadherente",
            "1 café negro"
          ],
          "media_mañana": [
            "1 mandarina"
          ],
          "almuerzo": [
            "150 g de lentejas cocidas",
            "Arroz blanco (1 taza)",
            "Plátano maduro al horno o cocido"
          ],
          "merienda": [
            "1 yogurt natural pequeño"
          ],
          "cena": [
            "1 porción de puré de papa",
            "1 huevo cocido + 1 clara",
            "Zanahoria rallada"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "1 sándwich con pan integral y huevo revuelto",
            "1 fruta (manzana o banano)"
          ],
          "media_mañana": [
            "1 puñado de maní sin sal"
          ],
          "almuerzo": [
            "Arroz (1 taza)",
            "Pollo guisado (120 g, muslo sin piel o pechuga)",
            "Ensalada de tomate y pepino"
          ],
          "merienda": [
            "1 huevo cocido"
          ],
          "cena": [
            "Sopa de verduras",
            "1 arepa con aguacate"
          ]
        },
        "jueves": {
          "desayuno": [
            "1 taza de avena con leche y trocitos de banano",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 tinto sin azúcar + 1 galleta integral"
          ],
          "almuerzo": [
            "Fríjoles (1 taza)",
            "Arroz (½ taza)",
            "Huevo revuelto",
            "Arepita pequeña"
          ],
          "merienda": [
            "1 fruta (pera, guayaba o papaya)"
          ],
          "cena": [
            "Puré de plátano",
            "1 huevo cocido",
            "Ensalada de repollo con zanahoria"
          ]
        },
        "Viernes": {
          "desayuno": [
            "1 arepa pequeña con queso rallado bajo en sal",
            "1 café negro"
          ],
          "media_mañana": [
            "1 fruta de temporada"
          ],
          "almuerzo": [
            "Tamal o sancocho casero con porción moderada de arroz y proteína (pollo)",
            "Ensalada simple (zanahoria y lechuga)"
          ],
          "merienda": [
            "1 vaso de leche con una cucharada de avena en polvo"
          ],
          "cena": [
            "Tortilla de huevo con cebolla y tomate",
            "1 papa cocida pequeña",
            "1 infusión de hierbas"
          ]
        }
      },
      "recomendaciones": [
        "Haz las compras semanalmente en mercados locales o plazas para ahorrar en frutas, verduras y huevos.",
        "Usa alimentos base como arroz, huevos, avena, papa, lentejas y atún que son económicos y nutritivos.",
        "Evita el pan blanco y los alimentos procesados, aunque parezcan baratos a corto plazo.",
        "Bebe agua, evita jugos azucarados o bebidas en caja.",
        "Cocina a la plancha, hervido o al vapor para evitar grasas innecesarias.",
        "No te saltes comidas, eso solo hace que tengas más hambre y comas mal más tarde.",
        "Duerme bien (7–8 horas) para mantenerte con energía y quemar grasa mejor.",
        "La proteína más económica y efectiva es el huevo. Aprovéchala en diferentes formas.",
        "Si puedes comprar en cantidad, hazlo con arroz, avena, fríjoles, lentejas y plátano.",
        "La clave está en la constancia: no hace falta gastar mucho, pero sí comer bien todos los días."
      ]
    },

    "hombre_definir_principiante_sobrepeso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "2 huevos cocidos",
            "½ taza de avena cocida en agua con banano picado",
            "1 taza de café sin azúcar"
          ],
          "media_mañana": [
            "1 manzana",
            "5 maníes o nueces"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral o papa cocida",
            "Ensalada de repollo con zanahoria rallada y limón"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 rodaja de pan integral"
          ],
          "cena": [
            "Omelette con 2 huevos, espinaca y cebolla",
            "1 taza de lentejas cocidas"
          ]
        },
        "Martes": {
          "desayuno": [
            "1 batido de leche descremada con ½ banana y avena",
            "2 tostadas integrales"
          ],
          "media_mañana": [
            "1 naranja",
            "1 puñado de semillas de girasol"
          ],
          "almuerzo": [
            "150 g de pescado (tilapia, merluza o atún natural)",
            "1 taza de arroz o yuca cocida",
            "Ensalada de tomate, pepino y lechuga"
          ],
          "merienda": [
            "1 yogurt natural bajo en grasa",
            "6 galletas integrales sin azúcar"
          ],
          "cena": [
            "2 huevos revueltos con tomate y cebolla",
            "1 taza de brócoli cocido"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 arepas pequeñas de maíz sin sal",
            "1 huevo frito en sartén sin aceite",
            "1 taza de té verde"
          ],
          "media_mañana": [
            "1 banano",
            "1 cucharada de mantequilla de maní natural"
          ],
          "almuerzo": [
            "150 g de carne magra (res molida baja en grasa o hígado)",
            "1 taza de lentejas",
            "Ensalada de espinaca y zanahoria"
          ],
          "merienda": [
            "1 huevo duro",
            "1 fruta (pera, guayaba o papaya)"
          ],
          "cena": [
            "Tortilla con 2 claras + 1 huevo, cebolla y tomate",
            "1 taza de calabacín cocido"
          ]
        },
        "jueves": {
          "desayuno": [
            "1 smoothie de avena, leche vegetal, banana y 1 cucharadita de chía",
            "1 tostada integral"
          ],
          "media_mañana": [
            "1 taza de frutas picadas",
            "1 cucharada de semillas"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo al horno",
            "1 taza de puré de papa o batata",
            "Ensalada cocida (zanahoria, arveja, pimentón)"
          ],
          "merienda": [
            "1 taza de café con leche descremada",
            "3 galletas integrales"
          ],
          "cena": [
            "1 ensalada con atún natural, tomate, lechuga, aguacate",
            "1 arepa pequeña de maíz"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 claras + 1 huevo con cebolla",
            "1 rodaja de pan integral",
            "1 infusión digestiva"
          ],
          "media_mañana": [
            "1 mandarina o guayaba",
            "1 cucharada de maní natural"
          ],
          "almuerzo": [
            "150 g de carne de res asada o a la plancha",
            "1 taza de arroz integral",
            "Ensalada de repollo con zanahoria rallada y aguacate"
          ],
          "merienda": [
            "1 batido con leche descremada y fruta",
            "1 puñado pequeño de avena"
          ],
          "cena": [
            "Crema de verduras sin crema (solo licuadas)",
            "Tortilla de 2 huevos",
            "1 infusión relajante"
          ]
        }
      },
      "recomendaciones": [
        "Iniciar con un déficit calórico leve (15-20%) para perder grasa sin debilitarse.",
        "Evitar fritos, pan blanco, dulces, gaseosas y embutidos.",
        "Hidratarse constantemente: mínimo 2.5 litros de agua al día.",
        "Comer cada 3-4 horas para mantener energía y evitar atracones.",
        "Dormir bien: 7–8 horas por noche es clave para la pérdida de grasa.",
        "Incluir fibra (verduras, frutas con cáscara, granos) en todas las comidas.",
        "Controlar la sal y evitar salsas procesadas como mayonesa y kétchup.",
        "Preparar alimentos a la plancha, hervidos, al vapor o al horno.",
        "Medirse cada 15 días con cinta métrica o fotos (más útil que la báscula).",
        "Tener constancia: el proceso es lento, pero sostenible si se hace bien."
      ]
    },

    "hombre_definir_intermedio_bajo_peso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "4 claras + 2 huevos enteros",
            "1 taza de avena cocida en leche",
            "1 banano",
            "1 café negro"
          ],
          "media_mañana": [
            "1 arepa con queso bajo en grasa",
            "1 fruta (manzana o papaya)"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza de arroz",
            "1 taza de lentejas",
            "1 ensalada con aceite de oliva"
          ],
          "merienda": [
            "1 vaso de leche + 1 sándwich integral con huevo y tomate"
          ],
          "cena": [
            "Tortilla con 3 huevos + cebolla y pimentón",
            "1 batata o papa cocida",
            "1 infusión"
          ]
        },
        "Martes": {
          "desayuno": [
            "1 smoothie con leche, avena, banano y mantequilla de maní",
            "2 tostadas integrales con queso fresco"
          ],
          "media_mañana": [
            "1 taza de frutas mixtas",
            "1 puñado de frutos secos"
          ],
          "almuerzo": [
            "150 g de carne magra (res, hígado o pavo)",
            "1 taza de arroz o quinoa",
            "1 taza de arvejas o fríjoles",
            "Ensalada mixta"
          ],
          "merienda": [
            "1 yogurt natural",
            "6 galletas integrales"
          ],
          "cena": [
            "2 huevos revueltos con verduras",
            "1 porción de pasta con atún natural"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "1 batido con leche + avena + fruta",
            "1 arepa con huevo"
          ],
          "media_mañana": [
            "1 banano + 10 almendras"
          ],
          "almuerzo": [
            "150 g de pescado (tilapia o merluza)",
            "1 taza de arroz",
            "1 taza de garbanzos",
            "1 ensalada con aguacate"
          ],
          "merienda": [
            "1 taza de leche con cacao sin azúcar",
            "1 tostada con huevo"
          ],
          "cena": [
            "1 porción de pollo desmenuzado con verduras salteadas",
            "1 papa cocida o yuca"
          ]
        },
        "jueves": {
          "desayuno": [
            "3 huevos enteros + 1 rodaja de pan integral",
            "1 taza de avena cocida con frutas",
            "1 té verde"
          ],
          "media_mañana": [
            "1 yogurt griego bajo en azúcar",
            "5 maníes"
          ],
          "almuerzo": [
            "150 g de carne molida baja en grasa",
            "1 taza de arroz integral",
            "1 taza de lentejas o fríjoles",
            "1 taza de verduras cocidas"
          ],
          "merienda": [
            "1 huevo duro + 1 fruta"
          ],
          "cena": [
            "Tortilla de huevo + verduras",
            "1 taza de batido con leche y banano"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 huevos revueltos + 1 arepa",
            "1 vaso de leche con cacao sin azúcar"
          ],
          "media_mañana": [
            "1 fruta (mandarina o guayaba)",
            "1 puñado pequeño de nueces"
          ],
          "almuerzo": [
            "150 g de pollo al horno",
            "1 taza de arroz o puré de papa",
            "1 taza de ensalada verde",
            "1 jugo natural sin azúcar"
          ],
          "merienda": [
            "1 smoothie con leche y avena",
            "1 huevo cocido"
          ],
          "cena": [
            "Ensalada con atún y huevo",
            "2 tostadas integrales"
          ]
        }
      },
      "recomendaciones": [
        "Aumentar el consumo de calorías con alimentos densos en nutrientes pero sin ultraprocesados.",
        "Combinar proteína animal (pollo, carne, pescado) y vegetal (lentejas, fríjoles).",
        "No saltarse comidas: hacer 5 comidas al día (3 fuertes y 2 snacks).",
        "Beber al menos 2.5 litros de agua al día.",
        "Dormir 7–8 horas diarias para permitir la recuperación y síntesis muscular.",
        "Incluir grasas saludables como aguacate, frutos secos y aceite de oliva.",
        "Evitar azúcares líquidos: priorizar jugos naturales sin azúcar o agua.",
        "Cocinar al vapor, al horno o a la plancha; evitar fritos.",
        "Tomar fotos o usar ropa de referencia cada 15 días para ver progresos.",
        "Realizar estiramientos suaves después de cada entrenamiento."
      ]
    },

    "hombre_definir_intermedio_peso_medio": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "4 claras + 2 huevos enteros al sartén",
            "½ taza de avena cocida en agua con banana",
            "1 café negro sin azúcar"
          ],
          "media_mañana": [
            "1 yogurt natural bajo en grasa",
            "1 puñado de nueces"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral",
            "Ensalada mixta con aceite de oliva",
            "1 fruta (manzana o piña)"
          ],
          "merienda": [
            "1 batido con leche, banano y 1 scoop de proteína",
            "1 galleta integral"
          ],
          "cena": [
            "Tortilla con espinaca y 2 huevos enteros",
            "1 taza de calabacín salteado",
            "1 infusión digestiva"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie: leche vegetal + avena + fresa + 1 scoop de proteína",
            "2 tostadas integrales"
          ],
          "media_mañana": [
            "1 fruta (mandarina o papaya)",
            "1 puñado de almendras"
          ],
          "almuerzo": [
            "150 g de filete de pescado al horno",
            "1 taza de quinoa cocida",
            "Verduras al vapor (zanahoria, brócoli)",
            "1 vaso de agua con limón"
          ],
          "merienda": [
            "1 vaso de leche con cacao sin azúcar",
            "1 huevo cocido"
          ],
          "cena": [
            "Ensalada con atún, lechuga, tomate, cebolla",
            "1 tajada de pan integral"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos + 2 claras revueltos",
            "1 rodaja de pan integral",
            "½ aguacate",
            "1 té verde"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "6 nueces"
          ],
          "almuerzo": [
            "150 g de carne magra (res o pavo)",
            "1 taza de lentejas",
            "Ensalada de espinaca con tomate y zanahoria"
          ],
          "merienda": [
            "1 scoop de proteína con agua",
            "1 fruta pequeña"
          ],
          "cena": [
            "Tortilla con champiñones",
            "1 taza de brócoli",
            "1 infusión de manzanilla"
          ]
        },
        "jueves": {
          "desayuno": [
            "Smoothie: ½ taza de avena + leche vegetal + banano + chía",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 kiwi",
            "1 cda de semillas de girasol"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo en tiras",
            "1 taza de arroz integral",
            "Vegetales salteados",
            "1 fruta cítrica"
          ],
          "merienda": [
            "1 yogurt bajo en grasa",
            "1 galleta integral sin azúcar"
          ],
          "cena": [
            "2 huevos cocidos + ensalada de lechuga, tomate y aguacate",
            "1 tostada integral",
            "1 té digestivo"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 claras + 2 huevos enteros con tomate",
            "1 tajada de pan integral",
            "1 rodaja de piña"
          ],
          "media_mañana": [
            "1 taza de té verde",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "150 g de pescado a la plancha",
            "1 taza de batata cocida",
            "Ensalada mixta con aceite de oliva",
            "1 fruta tropical (papaya, sandía)"
          ],
          "merienda": [
            "1 smoothie de frutas con proteína",
            "1 cucharada de avena"
          ],
          "cena": [
            "Crema de verduras (sin crema, solo vegetales)",
            "Tortilla de huevo con 2 claras",
            "1 infusión relajante"
          ]
        }
      },
      "recomendaciones": [
        "Déficit calórico leve (10–15%) para bajar grasa sin perder músculo.",
        "Incluir proteínas magras en cada comida (pollo, pescado, huevos).",
        "Distribuir bien los carbohidratos en el desayuno, almuerzo y postentreno.",
        "Evitar azúcares añadidos y fritos.",
        "Consumir vegetales en al menos 2 comidas del día.",
        "Beber 2.5 a 3 litros de agua al día.",
        "Evitar saltarse comidas, especialmente postentreno.",
        "Combinar ejercicios de fuerza con cardio funcional.",
        "Usar sal con moderación, preferir especias naturales.",
        "Mantener hábitos de sueño constantes (7–8 horas por noche)."
      ]
    },


    "hombre_definir_intermedio_sobrepeso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "4 claras + 1 huevo entero al sartén",
            "½ taza de avena con agua, canela y banana picada",
            "1 taza de café sin azúcar"
          ],
          "media_mañana": [
            "1 fruta (manzana o guayaba)",
            "1 puñado de maní sin sal"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral o batata cocida",
            "Ensalada de lechuga, zanahoria y tomate",
            "Agua con limón"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 taza de avena licuada con agua"
          ],
          "cena": [
            "2 huevos revueltos con cebolla y espinaca",
            "1 arepa pequeña o tajada de plátano maduro cocido"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie: ½ taza de avena + leche + banana + chía",
            "1 tostada integral"
          ],
          "media_mañana": [
            "1 mandarina o naranja",
            "6 nueces"
          ],
          "almuerzo": [
            "150 g de pescado a la plancha (basa o tilapia)",
            "1 taza de arroz blanco",
            "Ensalada cocida (zanahoria, brócoli, calabacín)"
          ],
          "merienda": [
            "1 yogurt natural bajo en grasa",
            "1 fruta (pera o papaya)"
          ],
          "cena": [
            "Tortilla con 2 claras + 1 huevo entero",
            "1 taza de calabacín al vapor"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 arepas pequeñas con queso bajo en grasa",
            "2 huevos cocidos",
            "1 taza de té"
          ],
          "media_mañana": [
            "1 banana pequeña",
            "1 puñado de semillas de girasol"
          ],
          "almuerzo": [
            "150 g de carne molida magra",
            "1 taza de lentejas cocidas",
            "Ensalada verde con zanahoria rallada"
          ],
          "merienda": [
            "1 batido de leche y avena",
            "1 huevo cocido"
          ],
          "cena": [
            "Omelette con 2 huevos, tomate y cebolla",
            "1 taza de brócoli"
          ]
        },
        "jueves": {
          "desayuno": [
            "1 taza de avena cocida + 1 cucharada de mantequilla de maní",
            "1 huevo al sartén"
          ],
          "media_mañana": [
            "1 manzana",
            "6 almendras"
          ],
          "almuerzo": [
            "150 g de pollo desmechado",
            "1 papa cocida",
            "Verduras salteadas (zanahoria, calabacín, cebolla)"
          ],
          "merienda": [
            "1 batido de avena + leche + cacao natural",
            "1 galleta integral"
          ],
          "cena": [
            "Ensalada con atún en agua, tomate y lechuga",
            "1 tajada de pan integral"
          ]
        },
        "Viernes": {
          "desayuno": [
            "3 claras + 1 huevo entero con espinaca",
            "1 rodaja de pan integral",
            "1 infusión"
          ],
          "media_mañana": [
            "1 fruta (piña o papaya)",
            "1 puñado pequeño de maní sin sal"
          ],
          "almuerzo": [
            "150 g de carne magra o hígado",
            "1 taza de arroz",
            "Ensalada mixta con aceite de oliva"
          ],
          "merienda": [
            "1 vaso de yogurt natural con avena",
            "1 huevo cocido"
          ],
          "cena": [
            "Crema de verduras (licuada sin crema)",
            "1 huevo + 1 clara",
            "1 infusión relajante"
          ]
        }
      },
      "recomendaciones": [
        "Seguir un déficit calórico moderado (15–20%) para reducir grasa corporal sin perder masa muscular.",
        "Mantener alta la ingesta de proteína (pollo, atún, huevos, pescado, legumbres).",
        "Hacer énfasis en vegetales y carbohidratos complejos: arroz integral, avena, papa cocida, lentejas.",
        "Evitar fritos, dulces procesados, gaseosas y harinas refinadas.",
        "Tomar 2.5 a 3 litros de agua al día.",
        "No pasar largos periodos sin comer (máximo 4 horas).",
        "Dormir entre 7 y 8 horas por noche para optimizar la recuperación.",
        "Complementar el entrenamiento con caminatas o actividad cardiovascular ligera.",
        "Incluir grasas saludables en pequeñas porciones (aguacate, maní, semillas).",
        "Evitar distracciones al comer; practicar alimentación consciente para mejorar la saciedad."
      ]
    },

    // HOMBRE - SUBIR - PRINCIPIANTE
    "hombre_subir_principiante_bajo_peso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "4 claras + 2 huevos al sartén con cebolla",
            "2 tajadas de pan integral con mantequilla de maní",
            "1 vaso de avena con leche"
          ],
          "media_mañana": [
            "1 banana grande",
            "10 almendras"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza y media de arroz blanco",
            "Ensalada de zanahoria, remolacha y aguacate",
            "1 vaso de jugo natural sin azúcar"
          ],
          "merienda": [
            "1 vaso de leche con avena y cacao natural",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla de 3 huevos con tomate y espinaca",
            "1 tajada de pan o arepa",
            "1 infusión"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie de leche, banana, avena y chía",
            "2 arepas con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 manzana",
            "1 puñado de maní sin sal"
          ],
          "almuerzo": [
            "150 g de carne molida magra",
            "1 taza de lentejas cocidas",
            "Plátano maduro cocido",
            "Agua con limón"
          ],
          "merienda": [
            "1 yogurt natural con granola",
            "6 nueces"
          ],
          "cena": [
            "Omelette con 2 huevos + 2 claras y champiñones",
            "1 papa cocida",
            "1 taza de avena líquida con leche"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos + 2 claras revueltos",
            "1 pan integral con aguacate",
            "1 vaso de leche"
          ],
          "media_mañana": [
            "1 mandarina",
            "1 cucharada de semillas de girasol"
          ],
          "almuerzo": [
            "150 g de filete de pescado a la plancha",
            "1 taza de arroz integral",
            "Ensalada verde con aceite de oliva",
            "1 batido de frutas naturales"
          ],
          "merienda": [
            "1 batido de avena + banana + leche",
            "1 huevo cocido"
          ],
          "cena": [
            "2 huevos cocidos + arepa con queso",
            "1 infusión"
          ]
        },
        "jueves": {
          "desayuno": [
            "Avena cocida con leche + manzana rallada",
            "1 huevo al sartén",
            "1 vaso de jugo natural sin azúcar"
          ],
          "media_mañana": [
            "1 pera",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "150 g de pollo guisado",
            "1 taza de arroz blanco",
            "Tajadas de plátano",
            "Agua"
          ],
          "merienda": [
            "1 vaso de yogurt natural con granola",
            "1 huevo cocido"
          ],
          "cena": [
            "2 arepas con huevo y queso",
            "1 vaso de leche tibia"
          ]
        },
        "Viernes": {
          "desayuno": [
            "Pan integral con aguacate y 2 huevos",
            "1 taza de avena con leche",
            "1 fruta"
          ],
          "media_mañana": [
            "1 banana",
            "6 almendras"
          ],
          "almuerzo": [
            "150 g de hígado o carne magra",
            "1 taza de lentejas o fríjoles",
            "Plátano cocido",
            "1 jugo natural"
          ],
          "merienda": [
            "1 batido de leche + avena + cacao natural",
            "1 fruta (papaya, mango o piña)"
          ],
          "cena": [
            "Omelette de 2 huevos + 2 claras con vegetales",
            "1 tajada de pan o galletas integrales"
          ]
        }
      },
      "recomendaciones": [
        "Mantener un superávit calórico moderado para promover el aumento de masa muscular.",
        "Consumir al menos 5 comidas al día, evitando ayunos prolongados.",
        "Aumentar la ingesta de carbohidratos complejos (avena, arroz, plátano, papas).",
        "Tener buena cantidad de proteína por comida (pollo, huevo, legumbres, lácteos).",
        "Beber al menos 2 litros de agua diarios.",
        "Incluir grasas buenas (maní, aguacate, semillas) en cada comida.",
        "Entrenar con buena técnica antes que con mucho peso.",
        "Evitar comida chatarra aunque el objetivo sea subir peso; debe ser masa magra.",
        "Dormir 7-8 horas diarias para que el cuerpo se recupere y crezca.",
        "Tener paciencia: la ganancia de músculo es un proceso constante y progresivo."
      ]
    },

    "hombre_subir_principiante_peso_medio": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "4 claras + 2 huevos enteros al sartén",
            "2 tajadas de pan integral con mantequilla de maní",
            "1 vaso de avena con leche"
          ],
          "media_mañana": [
            "1 banana",
            "10 almendras"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza de arroz blanco o integral",
            "Ensalada de zanahoria con aguacate",
            "1 vaso de jugo natural sin azúcar"
          ],
          "merienda": [
            "1 vaso de leche con avena y cacao natural",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla de 3 huevos con tomate y espinaca",
            "1 arepa o papa cocida",
            "1 infusión digestiva"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie: leche, banana, avena y chía",
            "2 arepas con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 manzana",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "150 g de carne molida magra",
            "1 taza de lentejas",
            "Plátano maduro cocido",
            "Agua o jugo sin azúcar"
          ],
          "merienda": [
            "1 yogurt natural con granola",
            "6 nueces"
          ],
          "cena": [
            "Omelette con 2 huevos + 2 claras y champiñones",
            "1 arepa con queso",
            "1 té"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos + 2 claras revueltos con cebolla",
            "1 pan integral con aguacate",
            "1 vaso de leche"
          ],
          "media_mañana": [
            "1 pera",
            "1 puñado de semillas de girasol"
          ],
          "almuerzo": [
            "150 g de filete de pescado",
            "1 taza de arroz o quinoa",
            "Ensalada verde con tomate y aceite de oliva",
            "1 fruta"
          ],
          "merienda": [
            "1 batido de leche + avena + banano",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla de vegetales con 2 huevos",
            "1 papa cocida o pan integral",
            "1 vaso de agua o infusión"
          ]
        },
        "jueves": {
          "desayuno": [
            "Avena cocida con leche y manzana picada",
            "1 huevo cocido",
            "1 vaso de jugo natural"
          ],
          "media_mañana": [
            "1 mandarina",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo salteado",
            "1 taza de arroz",
            "Verduras cocidas (zanahoria, brócoli)",
            "1 fruta"
          ],
          "merienda": [
            "1 yogurt natural",
            "1 galleta integral sin azúcar"
          ],
          "cena": [
            "2 arepas con huevo y queso",
            "1 taza de leche"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 huevos + 2 claras con tomate",
            "1 tajada de pan integral con aguacate",
            "1 taza de avena líquida"
          ],
          "media_mañana": [
            "1 banana",
            "6 almendras"
          ],
          "almuerzo": [
            "150 g de carne de res magra",
            "1 taza de lentejas o fríjoles",
            "1 plátano cocido",
            "1 jugo natural sin azúcar"
          ],
          "merienda": [
            "1 batido casero con leche + avena + fruta",
            "1 fruta entera"
          ],
          "cena": [
            "Tortilla de 2 huevos + vegetales",
            "Galletas integrales o papa cocida",
            "Infusión de manzanilla"
          ]
        }
      },
      "recomendaciones": [
        "Mantén un superávit calórico ligero (300–500 kcal adicionales al día).",
        "Come cada 3–4 horas para mantener el flujo constante de nutrientes.",
        "Usa batidos caseros si te cuesta llegar a las calorías diarias.",
        "Consume buenas fuentes de carbohidratos como arroz, avena, papa, plátano, pan integral.",
        "Agrega siempre una fuente de proteína magra a cada comida.",
        "Ingiere grasas saludables (aguacate, maní, semillas, aceite de oliva).",
        "Duerme mínimo 7–8 horas para que tu cuerpo se recupere y crezca.",
        "Evita saltarte comidas, incluso si no tienes hambre.",
        "Sé constante y no abuses del cardio: enfócate en fuerza y volumen.",
        "Bebe suficiente agua y evita gaseosas o jugos azucarados."
      ]
    },

    "hombre_subir_principiante_sobrepeso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "4 claras + 1 huevo entero con cebolla y tomate",
            "1 taza de avena cocida con leche y canela",
            "1 banano"
          ],
          "media_mañana": [
            "1 yogur natural bajo en grasa",
            "1 puñado de maní sin sal"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral",
            "Ensalada con lechuga, zanahoria y aguacate",
            "1 mandarina"
          ],
          "merienda": [
            "1 vaso de batido de avena con leche y fruta",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla de 2 huevos con espinaca",
            "1 papa cocida",
            "Infusión de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie de banana, leche y avena",
            "2 arepas integrales con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 manzana",
            "1 cucharada de semillas de girasol"
          ],
          "almuerzo": [
            "150 g de carne molida magra",
            "1 taza de lentejas",
            "Plátano maduro cocido",
            "Agua con limón"
          ],
          "merienda": [
            "1 yogur natural",
            "6 nueces"
          ],
          "cena": [
            "Ensalada con atún, huevo, tomate y aguacate",
            "1 tajada de pan integral",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos + 2 claras con cebolla",
            "1 pan integral con aguacate",
            "1 vaso de leche"
          ],
          "media_mañana": [
            "1 pera",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "150 g de pescado a la plancha",
            "1 taza de arroz integral",
            "Vegetales cocidos (zanahoria, calabacín)",
            "1 fruta"
          ],
          "merienda": [
            "1 batido casero con leche, avena y fruta",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla de vegetales con 2 huevos",
            "1 papa cocida",
            "Agua o infusión"
          ]
        },
        "jueves": {
          "desayuno": [
            "Avena con leche y trozos de manzana",
            "1 huevo cocido",
            "1 taza de té verde"
          ],
          "media_mañana": [
            "1 kiwi",
            "1 puñado de nueces"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo en tiras",
            "1 taza de arroz integral",
            "Verduras salteadas",
            "1 mandarina"
          ],
          "merienda": [
            "1 yogur natural",
            "1 galleta integral"
          ],
          "cena": [
            "Omelette con espinaca y tomate",
            "1 arepa con queso",
            "Infusión"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 claras + 2 huevos enteros revueltos con cebolla",
            "1 rodaja de pan integral con aguacate",
            "1 banana"
          ],
          "media_mañana": [
            "1 taza de té",
            "1 puñado de frutos secos"
          ],
          "almuerzo": [
            "150 g de carne de res magra",
            "1 taza de fríjoles",
            "1 papa cocida",
            "1 taza de jugo natural sin azúcar"
          ],
          "merienda": [
            "1 batido casero con leche, avena, fruta",
            "1 fruta entera"
          ],
          "cena": [
            "Ensalada con huevo cocido, tomate y lechuga",
            "1 tajada de pan integral",
            "Infusión relajante"
          ]
        }
      },

      "recomendaciones": [
        "Mantén un superávit calórico ligero (+200–300 kcal) con alimentos naturales.",
        "Evita azúcares simples y productos procesados aunque estés subiendo de peso.",
        "Incluye proteínas en cada comida: huevos, pollo, carne magra, yogur, lentejas.",
        "No te saltes comidas; distribuye 4–5 tiempos al día.",
        "Usa batidos caseros si te cuesta llegar al total calórico.",
        "Combina ejercicio de fuerza con cardio suave como marcha o bicicleta.",
        "Bebe entre 2 y 3 litros de agua al día.",
        "Duerme al menos 7–8 horas para asegurar recuperación muscular.",
        "Evita gaseosas, jugos azucarados y fritos.",
        "Haz tus compras con una lista para ahorrar y evitar comprar ultraprocesados."
      ]
    },

    "hombre_subir_intermedio_bajo_peso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "4 claras + 2 huevos enteros al sartén con tomate y cebolla",
            "1 taza de avena cocida con banano",
            "1 vaso de leche"
          ],
          "media_mañana": [
            "1 puñado de maní natural",
            "1 yogur natural o bebida de avena"
          ],
          "almuerzo": [
            "180 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral",
            "Ensalada con zanahoria y aguacate",
            "1 fruta"
          ],
          "merienda": [
            "1 batido de leche, avena y fruta",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla con 2 huevos y espinaca",
            "1 arepa de maíz con queso",
            "Té digestivo"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie de leche, avena, banana y chía",
            "2 tostadas integrales con mantequilla de maní"
          ],
          "media_mañana": [
            "1 manzana",
            "1 puñado de nueces"
          ],
          "almuerzo": [
            "180 g de carne magra (res o cerdo sin grasa)",
            "1 taza de lentejas",
            "1 papa cocida",
            "1 mandarina"
          ],
          "merienda": [
            "1 yogur bajo en azúcar",
            "1 fruta seca (ciruela o dátil)"
          ],
          "cena": [
            "Ensalada con atún, huevo y aguacate",
            "1 rodaja de pan integral",
            "Infusión"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos enteros + 2 claras revueltos",
            "1 pan integral con aguacate",
            "1 vaso de leche"
          ],
          "media_mañana": [
            "1 taza de batido de avena con fruta",
            "6 almendras"
          ],
          "almuerzo": [
            "180 g de pescado al horno",
            "1 taza de arroz",
            "Verduras cocidas (brócoli y zanahoria)",
            "1 fruta"
          ],
          "merienda": [
            "1 yogur natural",
            "1 puñado de frutos secos"
          ],
          "cena": [
            "Tortilla de vegetales y 2 huevos",
            "1 papa pequeña",
            "Agua o infusión"
          ]
        },
        "jueves": {
          "desayuno": [
            "Avena cocida con manzana y canela",
            "1 huevo cocido",
            "1 té verde"
          ],
          "media_mañana": [
            "1 banano",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "180 g de pechuga de pollo",
            "1 taza de arroz integral",
            "Vegetales salteados con aceite de oliva",
            "1 mandarina"
          ],
          "merienda": [
            "1 batido casero con leche, avena y fruta",
            "1 galleta integral"
          ],
          "cena": [
            "Omelette de espinaca con 2 huevos",
            "1 arepa con queso bajo en grasa",
            "Infusión de manzanilla"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 huevos enteros + 2 claras con tomate y cebolla",
            "1 rodaja de pan integral",
            "1 rodaja de piña"
          ],
          "media_mañana": [
            "1 taza de leche o bebida vegetal",
            "1 puñado de semillas"
          ],
          "almuerzo": [
            "180 g de carne molida magra",
            "1 taza de garbanzos cocidos",
            "1 papa cocida",
            "1 fruta"
          ],
          "merienda": [
            "1 batido con leche, avena y frutas",
            "1 huevo duro"
          ],
          "cena": [
            "Ensalada de huevo con lechuga y aguacate",
            "1 arepa pequeña",
            "Infusión relajante"
          ]
        }
      },

      "recomendaciones": [
        "Mantén un superávit calórico de +300 kcal/día con alimentos naturales.",
        "Evita azúcares simples, jugos artificiales y productos procesados.",
        "Consume proteína en cada comida para estimular síntesis muscular.",
        "Haz 5 comidas al día para facilitar el volumen calórico.",
        "Usa batidos caseros (leche + avena + fruta) si cuesta comer sólido.",
        "Entrena con técnica y constancia; enfócate en progresar cargas.",
        "Bebe 2.5–3 litros de agua al día.",
        "Prioriza el sueño (7–8 horas) para aumentar masa y recuperación.",
        "Haz estiramientos suaves post-entreno para evitar tensiones.",
        "Compra comida básica a granel: arroz, avena, huevos, legumbres, frutas."
      ]
    },

    "hombre_subir_intermedio_peso_medio": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "4 claras + 2 huevos enteros con cebolla y tomate",
            "1 taza de avena con banano y canela",
            "1 vaso de leche"
          ],
          "media_mañana": [
            "1 yogur natural o bebida de avena",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "200 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral",
            "Ensalada con zanahoria y aguacate",
            "1 mandarina"
          ],
          "merienda": [
            "1 batido de leche con avena y fruta",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla de espinaca con 2 huevos",
            "1 arepa pequeña con queso",
            "Té digestivo"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie con leche, avena, banano y chía",
            "2 tostadas integrales con mantequilla de maní"
          ],
          "media_mañana": [
            "1 fruta (manzana o pera)",
            "1 puñado de nueces"
          ],
          "almuerzo": [
            "200 g de carne magra (res o cerdo sin grasa)",
            "1 taza de lentejas cocidas",
            "1 papa mediana",
            "1 naranja"
          ],
          "merienda": [
            "1 yogur sin azúcar",
            "2 galletas integrales"
          ],
          "cena": [
            "Ensalada con huevo duro, aguacate y vegetales mixtos",
            "1 tajada de pan integral",
            "Infusión"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos + 2 claras revueltos con espinaca",
            "1 rodaja de pan integral con aguacate",
            "1 vaso de leche"
          ],
          "media_mañana": [
            "1 batido de avena y fruta",
            "6 almendras"
          ],
          "almuerzo": [
            "200 g de pescado a la plancha",
            "1 taza de arroz",
            "Verduras al vapor (brócoli y zanahoria)",
            "1 fruta"
          ],
          "merienda": [
            "1 batido casero con leche y fruta",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla de vegetales con 2 huevos",
            "1 papa pequeña",
            "Infusión relajante"
          ]
        },
        "jueves": {
          "desayuno": [
            "Avena cocida con manzana y canela",
            "1 huevo cocido",
            "1 té verde"
          ],
          "media_mañana": [
            "1 banano",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "200 g de pechuga de pollo",
            "1 taza de arroz integral",
            "Vegetales cocidos con aceite de oliva",
            "1 mandarina"
          ],
          "merienda": [
            "1 batido de leche, avena y fruta",
            "1 tostada integral"
          ],
          "cena": [
            "Omelette de espinaca y tomate",
            "1 arepa con queso bajo en grasa",
            "Infusión"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 huevos + 2 claras con tomate",
            "1 pan integral",
            "1 vaso de jugo natural sin azúcar"
          ],
          "media_mañana": [
            "1 taza de leche o bebida vegetal",
            "1 puñado de semillas (girasol o chía)"
          ],
          "almuerzo": [
            "200 g de carne molida magra",
            "1 taza de garbanzos",
            "1 papa mediana cocida",
            "1 fruta"
          ],
          "merienda": [
            "1 batido con leche, avena y banano",
            "1 huevo cocido"
          ],
          "cena": [
            "Ensalada con huevo y aguacate",
            "1 arepa pequeña",
            "1 infusión"
          ]
        }
      },

      "recomendaciones": [
        "Mantén un superávit calórico de aproximadamente 300-500 kcal sobre tu mantenimiento.",
        "Incluye proteína en cada comida: huevos, pollo, carne, legumbres o batidos.",
        "Evita comidas ultraprocesadas, pero no temas al arroz, pan o avena.",
        "Entrena progresivamente: enfócate en subir pesos semana a semana.",
        "Realiza 5–6 comidas al día para lograr el volumen calórico más fácilmente.",
        "Hidrátate con mínimo 2.5 litros de agua por día.",
        "Consume frutas y verduras a diario para evitar déficit de micronutrientes.",
        "Asegura un buen descanso (mínimo 7 horas por noche).",
        "Usa batidos caseros (leche + avena + banana) para ganar calorías si no tienes mucho apetito.",
        "Sé paciente: ganar músculo lleva tiempo, pero vale la pena si eres constante."
      ]
    },

    "hombre_subir_intermedio_sobrepeso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "3 claras + 2 huevos enteros revueltos con tomate",
            "1 arepa de maíz pequeña con aguacate",
            "1 taza de café sin azúcar"
          ],
          "media_mañana": [
            "1 banano",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "200 g de pechuga de pollo",
            "1 taza de arroz integral",
            "Ensalada mixta con aceite de oliva",
            "1 fruta cítrica"
          ],
          "merienda": [
            "1 batido de avena, leche y banano",
            "1 huevo cocido"
          ],
          "cena": [
            "Tortilla de espinaca con 2 huevos",
            "1 papa cocida",
            "Infusión de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Avena cocida con manzana y canela",
            "1 vaso de leche",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 mandarina",
            "6 almendras"
          ],
          "almuerzo": [
            "200 g de carne magra (res sin grasa)",
            "1 taza de lentejas",
            "1 porción de yuca cocida",
            "1 rodaja de piña"
          ],
          "merienda": [
            "1 yogur sin azúcar",
            "1 galleta integral"
          ],
          "cena": [
            "Ensalada con huevo duro, aguacate y tomate",
            "1 tajada de pan integral",
            "Té verde"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos + 2 claras con cebolla",
            "1 arepa con queso bajo en grasa",
            "1 café negro"
          ],
          "media_mañana": [
            "1 batido de avena + fruta + leche",
            "1 puñado de semillas"
          ],
          "almuerzo": [
            "200 g de pescado a la plancha",
            "1 taza de arroz blanco",
            "Verduras cocidas (zanahoria, brócoli)",
            "1 fruta"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 tostada integral"
          ],
          "cena": [
            "Tortilla con vegetales",
            "1 papa pequeña",
            "Infusión"
          ]
        },
        "jueves": {
          "desayuno": [
            "Smoothie: leche + avena + banano",
            "2 tostadas integrales con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 fruta",
            "6 nueces"
          ],
          "almuerzo": [
            "200 g de pechuga de pollo",
            "1 taza de garbanzos",
            "Ensalada de espinaca con zanahoria",
            "1 mandarina"
          ],
          "merienda": [
            "1 yogur natural",
            "1 arepa pequeña"
          ],
          "cena": [
            "Huevos revueltos con tomate y cebolla",
            "1 tajada de pan integral",
            "Té de limón"
          ]
        },
        "Viernes": {
          "desayuno": [
            "4 claras + 2 huevos enteros",
            "1 pan integral",
            "1 jugo natural sin azúcar"
          ],
          "media_mañana": [
            "1 banano",
            "1 puñado de maní"
          ],
          "almuerzo": [
            "200 g de carne molida magra",
            "1 taza de frijoles",
            "1 porción de arroz",
            "1 rodaja de papaya"
          ],
          "merienda": [
            "1 batido de leche + avena + fruta",
            "1 galleta integral"
          ],
          "cena": [
            "Tortilla de huevo con vegetales",
            "1 papa cocida",
            "Infusión relajante"
          ]
        }
      },

      "recomendaciones": [
        "Mantén un superávit calórico moderado (250-400 kcal extras/día).",
        "Evita harinas refinadas, azúcares simples y comidas fritas.",
        "Prioriza proteína magra: pollo, pescado, huevos, legumbres.",
        "Incluye carbohidratos integrales: arroz integral, avena, yuca, lentejas.",
        "Haz al menos 5 comidas diarias para facilitar la digestión y mantener energía.",
        "Mantén un entrenamiento con pesos progresivos, evitando descansos excesivos.",
        "Hidrátate con 2.5–3 L de agua diarios, evita gaseosas o jugos comerciales.",
        "Duerme al menos 7 horas diarias para una correcta recuperación muscular.",
        "Controla tu peso corporal cada 2 semanas; si subes mucho en grasa, ajusta porciones.",
        "Sé constante: una buena ganancia muscular requiere meses, pero cada semana cuenta."
      ]
    },






    // MUJER - DEFINIR - PRINCIPIANTE
    "mujer_definir_principiante_bajo_peso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "2 huevos revueltos con tomate y cebolla",
            "1 arepa pequeña con aguacate",
            "1 taza de té verde"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "1 banana"
          ],
          "almuerzo": [
            "120 g de pechuga de pollo a la plancha",
            "1 taza de arroz blanco o integral",
            "Ensalada con tomate y zanahoria",
            "1 mandarina"
          ],
          "merienda": [
            "1 vaso de leche o bebida vegetal",
            "2 galletas integrales"
          ],
          "cena": [
            "Tortilla de 2 huevos con espinaca y champiñones",
            "1 papa mediana cocida",
            "Infusión de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie con leche vegetal, banana y avena",
            "2 tostadas integrales con mermelada sin azúcar"
          ],
          "media_mañana": [
            "1 manzana",
            "1 puñado de maní natural"
          ],
          "almuerzo": [
            "100 g de pescado al horno con limón",
            "1 taza de lentejas cocidas",
            "Vegetales cocidos (zanahoria, cebolla, calabacín)",
            "1 kiwi"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 fruta pequeña"
          ],
          "cena": [
            "Ensalada con atún, lechuga, tomate, aguacate",
            "1 tostada integral",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 claras + 1 huevo entero",
            "1 arepa con queso bajo en grasa",
            "1 café negro"
          ],
          "media_mañana": [
            "1 yogurt griego",
            "5 almendras"
          ],
          "almuerzo": [
            "120 g de carne molida magra",
            "½ taza de arroz",
            "Ensalada verde con zanahoria rallada",
            "1 naranja"
          ],
          "merienda": [
            "1 batido de leche + avena + fruta",
            "1 galleta integral"
          ],
          "cena": [
            "Tortilla con vegetales + 2 huevos",
            "1 taza de brócoli al vapor",
            "Infusión"
          ]
        },
        "jueves": {
          "desayuno": [
            "Avena cocida con manzana picada y canela",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 kiwi",
            "1 cda de semillas de girasol"
          ],
          "almuerzo": [
            "100 g de pollo al sartén",
            "1 taza de puré de papa",
            "Verduras cocidas (brócoli y zanahoria)",
            "1 mandarina"
          ],
          "merienda": [
            "1 vaso de leche",
            "1 tostada integral"
          ],
          "cena": [
            "Tortilla de espinaca con 2 huevos",
            "Ensalada fresca con aguacate",
            "1 infusión relajante"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 huevos revueltos con espinaca",
            "1 rodaja de pan integral con mantequilla de maní",
            "1 café"
          ],
          "media_mañana": [
            "1 taza de té verde",
            "1 banana"
          ],
          "almuerzo": [
            "120 g de pescado a la plancha",
            "1 taza de batata cocida",
            "Ensalada con aguacate y tomate",
            "1 taza de papaya"
          ],
          "merienda": [
            "1 batido de leche + avena + fruta",
            "1 galleta integral"
          ],
          "cena": [
            "Ensalada de huevo (2 huevos cocidos picados con lechuga y tomate)",
            "1 arepa pequeña",
            "Infusión de manzanilla"
          ]
        }
      },

      "recomendaciones": [
        "No reducir más peso: el enfoque es tonificar y ganar resistencia sin perder masa.",
        "Enfocar el entrenamiento en el tren inferior al menos 3 veces por semana.",
        "Asegurar una ingesta suficiente de proteínas (huevos, pollo, lentejas, yogurt).",
        "Hacer entre 4 a 5 comidas al día para evitar déficit energético.",
        "Incluir carbohidratos complejos como avena, arroz, papa y arepas.",
        "Evitar ayunos prolongados que lleven a pérdida de masa muscular.",
        "Hidratarse bien (2 litros/día como mínimo).",
        "Limitar azúcares procesados, jugos artificiales y ultraprocesados.",
        "Evitar comidas frente a pantallas y comer lentamente.",
        "Priorizar el descanso nocturno (7-8 horas) para tonificar sin fatiga acumulada."
      ]
    },

    "mujer_definir_principiante_peso_medio": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "1 huevo + 2 claras revueltos con tomate",
            "1 arepa pequeña con queso bajo en grasa",
            "1 taza de té verde"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "1 banana"
          ],
          "almuerzo": [
            "120 g de pechuga de pollo a la plancha",
            "½ taza de arroz integral",
            "Ensalada con lechuga, zanahoria y tomate",
            "1 naranja"
          ],
          "merienda": [
            "1 vaso de leche o bebida vegetal",
            "1 galleta integral"
          ],
          "cena": [
            "Tortilla con espinaca y 2 huevos",
            "1 taza de calabacín al vapor",
            "Infusión de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Smoothie con leche vegetal, avena y banana",
            "2 tostadas integrales"
          ],
          "media_mañana": [
            "1 manzana",
            "1 puñado de maní natural"
          ],
          "almuerzo": [
            "100 g de filete de pescado",
            "1 taza de lentejas cocidas",
            "Verduras salteadas",
            "1 kiwi"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 fruta pequeña"
          ],
          "cena": [
            "Ensalada con atún natural, aguacate, tomate, lechuga",
            "1 tostada integral",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 claras + 1 huevo entero",
            "1 arepa con mantequilla de maní",
            "1 café negro"
          ],
          "media_mañana": [
            "1 yogurt griego sin azúcar",
            "5 almendras"
          ],
          "almuerzo": [
            "120 g de carne molida magra",
            "½ taza de arroz integral",
            "Ensalada de espinaca y zanahoria",
            "1 mandarina"
          ],
          "merienda": [
            "1 batido con leche + avena + fruta",
            "1 galleta integral"
          ],
          "cena": [
            "Tortilla con vegetales + 2 huevos",
            "1 papa cocida pequeña",
            "Infusión"
          ]
        },
        "jueves": {
          "desayuno": [
            "Avena cocida con manzana y canela",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 kiwi",
            "1 cda de semillas de girasol"
          ],
          "almuerzo": [
            "100 g de pechuga de pollo",
            "1 taza de puré de papa",
            "Brócoli al vapor",
            "1 mandarina"
          ],
          "merienda": [
            "1 vaso de leche o bebida vegetal",
            "1 tostada integral"
          ],
          "cena": [
            "Tortilla de espinaca con 2 huevos",
            "Ensalada fresca con aguacate",
            "Té relajante"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 huevos revueltos con cebolla",
            "1 pan integral con queso bajo en grasa",
            "1 café"
          ],
          "media_mañana": [
            "1 taza de té verde",
            "1 banana"
          ],
          "almuerzo": [
            "120 g de pescado a la plancha",
            "½ taza de batata cocida",
            "Ensalada con aguacate y zanahoria",
            "1 taza de papaya"
          ],
          "merienda": [
            "1 smoothie de leche + fruta + avena",
            "1 galleta integral"
          ],
          "cena": [
            "Ensalada con huevo cocido y tomate",
            "1 arepa pequeña",
            "Infusión de manzanilla"
          ]
        }
      },

      "recomendaciones": [
        "Evitar ayunos prolongados y asegurar 4-5 comidas equilibradas al día.",
        "Incluir proteína magra en cada comida para evitar pérdida muscular.",
        "Hidratarse con 2-2.5 litros de agua diarios (infusiones naturales si desea variedad).",
        "Evitar azúcares líquidos (jugos, gaseosas) y productos ultraprocesados.",
        "Evitar comer frente a pantallas y hacerlo con atención plena.",
        "Aumentar el consumo de vegetales de hoja verde, legumbres y frutas enteras.",
        "Reducir el uso de sal y aderezos comerciales.",
        "Procurar dormir entre 7 y 8 horas diarias para favorecer recuperación muscular.",
        "Evitar restricciones calóricas extremas que reduzcan el metabolismo.",
        "Ser constante, incluso con ejercicios simples, y priorizar técnica sobre peso."
      ]
    },



    "mujer_definir_principiante_sobrepeso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "2 claras + 1 huevo entero revueltos con cebolla",
            "1 arepa pequeña",
            "1 taza de té verde"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "5 almendras"
          ],
          "almuerzo": [
            "100 g de pechuga de pollo a la plancha",
            "½ taza de arroz integral",
            "Ensalada con lechuga, zanahoria y tomate",
            "1 mandarina"
          ],
          "merienda": [
            "1 banana pequeña",
            "1 cda de avena en agua"
          ],
          "cena": [
            "Omelette con espinaca y 2 huevos",
            "1 taza de calabacín salteado",
            "Infusión relajante"
          ]
        },
        "Martes": {
          "desayuno": [
            "Avena cocida con manzana y canela",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 kiwi",
            "1 puñado de semillas de girasol"
          ],
          "almuerzo": [
            "100 g de filete de pescado al horno",
            "½ taza de lentejas",
            "Brócoli y zanahoria al vapor",
            "1 taza de papaya"
          ],
          "merienda": [
            "1 vaso de leche vegetal",
            "1 galleta integral"
          ],
          "cena": [
            "Ensalada con atún, lechuga, tomate y aguacate",
            "1 tostada integral",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 claras + 1 huevo entero revueltos con tomate",
            "1 pan integral pequeño",
            "1 café sin azúcar"
          ],
          "media_mañana": [
            "1 manzana",
            "1 cda de maní natural"
          ],
          "almuerzo": [
            "100 g de carne magra",
            "½ taza de puré de yuca",
            "Ensalada de repollo y zanahoria",
            "1 naranja"
          ],
          "merienda": [
            "1 batido de leche vegetal + avena + banana",
            "1 galleta de avena"
          ],
          "cena": [
            "Tortilla de 2 huevos con vegetales",
            "1 papa cocida pequeña",
            "Infusión de manzanilla"
          ]
        },
        "jueves": {
          "desayuno": [
            "Smoothie de leche vegetal, avena y frutas",
            "2 tostadas integrales"
          ],
          "media_mañana": [
            "1 yogurt sin azúcar",
            "1 puñado de semillas"
          ],
          "almuerzo": [
            "100 g de pechuga de pollo en tiras",
            "½ taza de arroz integral",
            "Ensalada cocida de verduras",
            "1 mandarina"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 fruta pequeña"
          ],
          "cena": [
            "Ensalada con huevo cocido, tomate y aguacate",
            "1 arepa pequeña",
            "Té de jengibre"
          ]
        },
        "Viernes": {
          "desayuno": [
            "2 huevos revueltos con cebolla y tomate",
            "1 tajada de pan integral",
            "1 taza de té verde"
          ],
          "media_mañana": [
            "1 banana",
            "5 almendras"
          ],
          "almuerzo": [
            "100 g de pescado a la plancha",
            "½ taza de batata cocida",
            "Ensalada mixta con aguacate",
            "1 taza de piña"
          ],
          "merienda": [
            "1 vaso de leche vegetal",
            "1 galleta integral"
          ],
          "cena": [
            "Crema de vegetales sin crema",
            "Tortilla de 1 huevo + 2 claras",
            "Infusión relajante"
          ]
        }
      },

      "recomendaciones": [
        "Aplicar un déficit calórico suave (15–20%) sin eliminar grupos alimenticios.",
        "Dar prioridad a proteína magra (pollo, pescado, huevos, legumbres).",
        "Distribuir la alimentación en 4-5 comidas pequeñas y balanceadas.",
        "Aumentar la ingesta de fibra con frutas, verduras y cereales integrales.",
        "Evitar jugos procesados, bebidas azucaradas y snacks ultraprocesados.",
        "Hidratarse con mínimo 2.5 litros de agua diarios, o infusiones sin azúcar.",
        "Hacer actividad física al menos 5 días por semana, combinando fuerza y cardio.",
        "Cuidar el sueño: dormir entre 7 y 8 horas diarias para favorecer el metabolismo.",
        "Reducir sal y salsas industriales; usar especias naturales para sazonar.",
        "Ser constante: los resultados vendrán con hábitos, no con restricciones extremas."
      ]
    },



    "mujer_definir_intermedio_bajo_peso": [
      "Dieta de mantenimiento con buenos niveles de proteína.",
      "Agregar frutos secos y snacks proteicos entre comidas.",
      "Evitar entrenamiento en ayunas.",
      "Distribuir carbohidratos antes y después de entrenar.",
      "Beber suficiente agua e incluir electrolitos si es necesario."
    ],



    "mujer_definir_intermedio_peso_medio": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "2 claras + 1 huevo entero revueltos con espinaca",
            "1 arepa delgada con queso bajo en grasa",
            "1 taza de té verde"
          ],
          "media_mañana": [
            "1 manzana",
            "1 puñado de almendras"
          ],
          "almuerzo": [
            "120 g de pechuga de pollo a la plancha",
            "½ taza de arroz integral",
            "Brócoli y zanahoria al vapor",
            "1 rodaja de piña"
          ],
          "merienda": [
            "1 yogurt griego sin azúcar",
            "1 tostada integral"
          ],
          "cena": [
            "Tortilla con champiñones + 2 huevos",
            "1 papa pequeña cocida",
            "Infusión de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Avena cocida con leche vegetal, manzana y canela",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 kiwi",
            "1 cucharada de semillas de girasol"
          ],
          "almuerzo": [
            "100 g de carne molida magra",
            "½ taza de lentejas",
            "Ensalada con lechuga, tomate y aguacate",
            "1 mandarina"
          ],
          "merienda": [
            "1 batido con leche, avena y banano",
            "1 galleta integral"
          ],
          "cena": [
            "Ensalada de atún con huevo cocido, tomate y espinaca",
            "1 pan integral pequeño",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "Batido con leche vegetal, banano y avena",
            "1 arepa pequeña con mantequilla de maní natural"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "5 almendras"
          ],
          "almuerzo": [
            "120 g de pescado a la plancha",
            "½ taza de arroz integral",
            "Ensalada con zanahoria rallada y pepino",
            "1 rodaja de sandía"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 tostada de avena"
          ],
          "cena": [
            "Tortilla de espinaca + 2 huevos",
            "1 papa al vapor",
            "Té de hierbas"
          ]
        },
        "jueves": {
          "desayuno": [
            "2 huevos revueltos con cebolla y tomate",
            "1 pan integral con queso",
            "1 café negro"
          ],
          "media_mañana": [
            "1 fruta (manzana o papaya)",
            "1 cucharada de semillas de chía"
          ],
          "almuerzo": [
            "100 g de pechuga de pollo al horno",
            "1 taza de puré de papa",
            "Verduras cocidas",
            "1 naranja"
          ],
          "merienda": [
            "1 batido con bebida vegetal, avena y fruta",
            "1 galleta integral"
          ],
          "cena": [
            "Ensalada con huevo cocido, zanahoria y lechuga",
            "1 arepa pequeña",
            "Infusión relajante"
          ]
        },
        "Viernes": {
          "desayuno": [
            "Smoothie con leche vegetal, avena y banana",
            "2 tostadas integrales con aguacate"
          ],
          "media_mañana": [
            "1 huevo duro",
            "1 rodaja de piña"
          ],
          "almuerzo": [
            "120 g de carne de res magra",
            "½ taza de batata cocida",
            "Brócoli salteado con aceite de oliva",
            "1 taza de papaya"
          ],
          "merienda": [
            "1 vaso de yogurt sin azúcar",
            "1 cucharada de maní natural"
          ],
          "cena": [
            "Tortilla con vegetales + 2 claras de huevo",
            "1 pan integral",
            "Té digestivo"
          ]
        }
      },

      "recomendaciones": [
        "Mantener una ingesta constante de proteínas para preservar masa muscular mientras se reduce grasa.",
        "Evitar ayunos prolongados y repartir las comidas cada 3–4 horas.",
        "Limitar azúcares añadidos, harinas blancas y ultraprocesados.",
        "Aumentar el consumo de vegetales y frutas ricas en fibra para favorecer la saciedad.",
        "Beber entre 2 y 2.5 litros de agua al día, preferiblemente sin saborizantes.",
        "Utilizar aceite de oliva con moderación para cocción o ensaladas.",
        "Dormir al menos 7 horas por noche para evitar retención de grasa abdominal.",
        "Mantener constancia en el entrenamiento físico, con enfoque en técnica correcta y pausas activas.",
        "Evitar dietas restrictivas que reduzcan demasiado las calorías y el metabolismo.",
        "Consultar con un nutricionista si se tiene alguna condición de salud específica."
      ]
    },

    "mujer_definir_intermedio_sobrepeso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "2 claras + 1 huevo entero revueltos con cebolla",
            "1 arepa delgada sin mantequilla",
            "1 taza de té verde"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "1 rodaja de papaya"
          ],
          "almuerzo": [
            "120 g de pechuga de pollo a la plancha",
            "½ taza de arroz integral",
            "Ensalada con lechuga, tomate y pepino",
            "1 mandarina"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 galleta integral"
          ],
          "cena": [
            "Tortilla con espinaca + 2 huevos",
            "1 taza de calabacín cocido",
            "Infusión de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Avena cocida con leche vegetal y manzana",
            "1 huevo duro"
          ],
          "media_mañana": [
            "1 manzana",
            "1 cucharada de semillas de girasol"
          ],
          "almuerzo": [
            "100 g de carne molida magra",
            "½ taza de lentejas cocidas",
            "Verduras al vapor",
            "1 rodaja de piña"
          ],
          "merienda": [
            "1 vaso de leche o bebida vegetal",
            "1 galleta integral"
          ],
          "cena": [
            "Ensalada con atún natural, aguacate, tomate, lechuga",
            "1 pan integral pequeño",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "Batido con leche vegetal, banana y avena",
            "1 tostada integral con aguacate"
          ],
          "media_mañana": [
            "1 yogurt griego sin azúcar",
            "5 almendras"
          ],
          "almuerzo": [
            "120 g de pescado a la plancha",
            "½ taza de batata cocida",
            "Brócoli salteado con cebolla",
            "1 naranja"
          ],
          "merienda": [
            "1 huevo duro",
            "1 fruta pequeña"
          ],
          "cena": [
            "Tortilla con champiñones y 2 claras de huevo",
            "1 taza de ensalada mixta sin aderezos",
            "Té relajante"
          ]
        },
        "jueves": {
          "desayuno": [
            "2 claras de huevo + espinaca",
            "1 arepa sin sal ni mantequilla",
            "1 café negro sin azúcar"
          ],
          "media_mañana": [
            "1 taza de té verde",
            "1 banana pequeña"
          ],
          "almuerzo": [
            "100 g de pechuga de pollo al horno",
            "½ taza de arroz integral",
            "Ensalada con zanahoria y lechuga",
            "1 kiwi"
          ],
          "merienda": [
            "1 batido con bebida vegetal y avena",
            "1 tostada integral"
          ],
          "cena": [
            "Ensalada con huevo cocido, tomate y aguacate",
            "1 arepa pequeña",
            "Té digestivo"
          ]
        },
        "Viernes": {
          "desayuno": [
            "Smoothie con leche vegetal, avena y banano",
            "1 pan integral con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 manzana",
            "1 puñado de frutos secos (sin sal)"
          ],
          "almuerzo": [
            "120 g de carne magra (res o cerdo magro)",
            "½ taza de lentejas o garbanzos cocidos",
            "Ensalada de espinaca con tomate",
            "1 mandarina"
          ],
          "merienda": [
            "1 yogurt natural sin azúcar",
            "1 cucharada de semillas de chía"
          ],
          "cena": [
            "Tortilla de vegetales con 2 huevos",
            "1 papa al vapor pequeña",
            "Infusión de hierbas"
          ]
        }
      },

      "recomendaciones": [
        "Hacer 5 comidas pequeñas al día para evitar atracones y estabilizar el metabolismo.",
        "Aumentar el consumo de vegetales verdes, fibra y agua (al menos 2.5 L/día).",
        "Evitar jugos azucarados, gaseosas y snacks procesados.",
        "Incluir proteína magra en cada comida para evitar pérdida muscular.",
        "Evitar freír alimentos, usar cocciones como plancha, vapor, horno o hervido.",
        "Comer con conciencia plena, sin pantallas o distracciones.",
        "Evitar salsas comerciales, preferir limón, vinagre o aceite de oliva en poca cantidad.",
        "Dormir mínimo 7 h diarias, ya que el descanso regula hormonas relacionadas al apetito.",
        "Acompañar la dieta con actividad física regular al menos 4 días por semana.",
        "Consultar a un profesional de salud en caso de patologías metabólicas o gastrointestinales."
      ]
    },

    // MUJER - SUBIR - PRINCIPIANTE
    "mujer_subir_principiante_bajo_peso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "1 vaso de leche con avena y banano licuado",
            "1 arepa con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 huevo cocido",
            "1 fruta (manzana o pera)"
          ],
          "almuerzo": [
            "120 g de carne molida magra",
            "½ taza de arroz blanco",
            "Ensalada con zanahoria y aguacate",
            "1 mandarina"
          ],
          "merienda": [
            "1 vaso de yogurt natural sin azúcar",
            "1 puñado de maní natural"
          ],
          "cena": [
            "Tortilla con espinaca y 2 huevos",
            "1 papa cocida pequeña",
            "Té de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Avena cocida con leche, trozos de manzana y canela",
            "1 huevo revuelto"
          ],
          "media_mañana": [
            "1 vaso de batido de fruta natural (leche + fruta)",
            "1 galleta de avena"
          ],
          "almuerzo": [
            "120 g de pechuga de pollo a la plancha",
            "1 taza de puré de papa",
            "Brócoli al vapor",
            "1 rodaja de piña"
          ],
          "merienda": [
            "1 tostada integral con mantequilla de maní",
            "1 banana"
          ],
          "cena": [
            "Ensalada con atún, lechuga, tomate y huevo cocido",
            "1 pan integral pequeño",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "Batido con leche, avena, maní y banano",
            "2 tostadas integrales"
          ],
          "media_mañana": [
            "1 yogurt griego sin azúcar",
            "1 cucharada de semillas de girasol"
          ],
          "almuerzo": [
            "130 g de pescado a la plancha",
            "½ taza de lentejas cocidas",
            "Zanahoria salteada",
            "1 kiwi"
          ],
          "merienda": [
            "1 vaso de leche o bebida vegetal",
            "1 galleta integral"
          ],
          "cena": [
            "Tortilla con champiñones y espinaca + 2 huevos",
            "1 arepa pequeña",
            "Té de hierbas"
          ]
        },
        "jueves": {
          "desayuno": [
            "2 claras + 1 huevo entero revueltos",
            "1 pan integral con queso",
            "1 café"
          ],
          "media_mañana": [
            "1 fruta (papaya, mango o piña)",
            "1 puñado de nueces"
          ],
          "almuerzo": [
            "120 g de carne a la plancha",
            "1 taza de arroz integral",
            "Ensalada con pepino y aguacate",
            "1 rodaja de sandía"
          ],
          "merienda": [
            "1 batido con leche + avena + fruta",
            "2 galletas de avena"
          ],
          "cena": [
            "Tortilla de vegetales + 2 huevos",
            "1 papa cocida pequeña",
            "Té de manzanilla"
          ]
        },
        "Viernes": {
          "desayuno": [
            "Smoothie con leche vegetal, banano, avena y canela",
            "1 tostada integral con aguacate"
          ],
          "media_mañana": [
            "1 huevo cocido",
            "1 manzana"
          ],
          "almuerzo": [
            "120 g de pechuga de pollo a la plancha",
            "½ taza de batata cocida",
            "Ensalada con tomate y espinaca",
            "1 mandarina"
          ],
          "merienda": [
            "1 vaso de yogurt natural",
            "1 puñado de semillas (chia o girasol)"
          ],
          "cena": [
            "Ensalada de huevo, tomate y aguacate",
            "1 arepa pequeña",
            "Infusión relajante"
          ]
        }
      },

      "recomendaciones": [
        "Hacer entre 4 y 5 comidas al día para mantener el cuerpo nutrido y con energía constante.",
        "Incluir carbohidratos complejos y proteína en cada comida para promover el aumento de masa muscular.",
        "No saltarse ninguna comida, especialmente desayuno y almuerzo.",
        "Tomar entre 2 y 2.5 litros de agua diariamente.",
        "Agregar fuentes de grasa saludable como aguacate, semillas y nueces.",
        "Aprovechar snacks naturales como frutas, batidos caseros o frutos secos.",
        "Evitar azúcares procesados y gaseosas que aportan calorías vacías.",
        "Dormir de 7 a 8 horas diarias para favorecer el crecimiento y la recuperación.",
        "Evitar el cardio excesivo. Priorizar entrenamiento de fuerza con técnica adecuada.",
        "Mantener constancia en la alimentación aunque no haya cambios inmediatos visibles."
      ]
    },



    "mujer_subir_principiante_peso_medio": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "Batido de leche, banano, avena y mantequilla de maní",
            "1 arepa con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "1 puñado de nueces"
          ],
          "almuerzo": [
            "130 g de pechuga de pollo a la plancha",
            "½ taza de arroz blanco",
            "Ensalada con tomate, pepino y aguacate",
            "1 mandarina"
          ],
          "merienda": [
            "1 vaso de leche o bebida vegetal",
            "2 galletas integrales"
          ],
          "cena": [
            "Tortilla con espinaca y 2 huevos",
            "1 papa pequeña cocida",
            "Té de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Avena cocida con leche y trozos de manzana",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 banana",
            "1 cucharadita de semillas de girasol"
          ],
          "almuerzo": [
            "120 g de carne molida magra",
            "1 taza de puré de papa",
            "Zanahoria y brócoli al vapor",
            "1 kiwi"
          ],
          "merienda": [
            "1 fruta (pera o papaya)",
            "1 puñado de maní natural"
          ],
          "cena": [
            "Ensalada con huevo cocido, lechuga, tomate y aguacate",
            "2 tostadas integrales",
            "Infusión relajante"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos revueltos con cebolla",
            "1 pan integral con mantequilla de maní",
            "1 café negro"
          ],
          "media_mañana": [
            "1 vaso de batido natural (leche + avena + fruta)",
            "1 galleta de avena casera"
          ],
          "almuerzo": [
            "130 g de filete de pescado",
            "½ taza de lentejas cocidas",
            "Ensalada de espinaca y zanahoria",
            "1 rodaja de piña"
          ],
          "merienda": [
            "1 yogurt sin azúcar",
            "1 manzana pequeña"
          ],
          "cena": [
            "Tortilla de calabacín con 2 huevos",
            "1 arepa pequeña",
            "Té digestivo"
          ]
        },
        "jueves": {
          "desayuno": [
            "Smoothie con leche vegetal, banano y avena",
            "2 tostadas integrales con queso"
          ],
          "media_mañana": [
            "1 taza de frutas (papaya, mango, piña)",
            "1 huevo cocido"
          ],
          "almuerzo": [
            "130 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral",
            "Verduras salteadas con aceite de oliva",
            "1 naranja"
          ],
          "merienda": [
            "1 galleta integral",
            "1 vaso de leche o bebida vegetal"
          ],
          "cena": [
            "Ensalada con atún, aguacate y huevo",
            "1 pan integral pequeño",
            "Infusión de hierbas"
          ]
        },
        "Viernes": {
          "desayuno": [
            "Avena cocida con canela y fruta",
            "1 huevo revuelto"
          ],
          "media_mañana": [
            "1 yogurt natural",
            "1 puñado de maní o semillas"
          ],
          "almuerzo": [
            "130 g de carne magra a la plancha",
            "½ taza de batata cocida",
            "Ensalada con tomate y aguacate",
            "1 taza de papaya"
          ],
          "merienda": [
            "1 smoothie de leche + avena + fruta",
            "1 galleta de avena"
          ],
          "cena": [
            "Tortilla con champiñones y 2 huevos",
            "1 papa cocida",
            "Infusión de manzanilla"
          ]
        }
      },

      "recomendaciones": [
        "Hacer 5 comidas al día, enfocadas en proteína, carbohidrato complejo y grasas saludables.",
        "Evitar saltarse comidas: el cuerpo necesita energía constante para construir masa.",
        "Preferir frutas enteras a jugos para aprovechar la fibra.",
        "Hidratarse bien: entre 2 y 2.5 litros de agua diarios.",
        "Dormir 7-8 horas para favorecer el crecimiento y la recuperación muscular.",
        "Consumir una fuente de proteína en cada comida principal.",
        "Evitar ayunos prolongados si no están recomendados por un profesional.",
        "Incluir grasas buenas (aguacate, nueces, aceite de oliva) en al menos 2 comidas del día.",
        "Ser constante: la alimentación es clave en el aumento de masa, especialmente para principiantes.",
        "Complementar la dieta con entrenamiento progresivo y técnica adecuada."
      ]
    },


    "mujer_subir_principiante_sobrepeso": [
      "Superávit mínimo (5-8%).",
      "Subir masa muscular sin grasa: proteína magra y verduras.",
      "Evitar harinas procesadas y frituras.",
      "Usar batidos moderados en calorías.",
      "Comidas balanceadas y ricas en micronutrientes."
    ],



    "mujer_subir_intermedio_bajo_peso": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "Batido con leche, avena, banano y una cucharadita de mantequilla de maní",
            "2 tostadas integrales con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 huevo cocido",
            "1 manzana"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral",
            "Ensalada de zanahoria, pepino y lechuga",
            "1 rodaja de piña"
          ],
          "merienda": [
            "1 vaso de leche o bebida vegetal",
            "1 galleta de avena casera"
          ],
          "cena": [
            "Tortilla con espinaca y 2 huevos",
            "1 papa cocida pequeña",
            "Infusión de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Avena cocida con manzana y canela",
            "1 huevo revuelto"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "1 puñado de almendras"
          ],
          "almuerzo": [
            "150 g de carne molida magra",
            "½ taza de lentejas cocidas",
            "Brócoli salteado",
            "1 mandarina"
          ],
          "merienda": [
            "1 fruta pequeña (banana o pera)",
            "1 tostada integral con aguacate"
          ],
          "cena": [
            "Ensalada con atún, tomate, aguacate y huevo cocido",
            "2 tostadas integrales",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "2 huevos revueltos con cebolla",
            "1 arepa con mantequilla de maní",
            "1 taza de jugo natural sin azúcar"
          ],
          "media_mañana": [
            "1 batido pequeño de leche + fruta + avena",
            "1 galleta integral"
          ],
          "almuerzo": [
            "150 g de filete de pescado",
            "1 taza de puré de papa",
            "Ensalada de espinaca, tomate y zanahoria",
            "1 taza de papaya"
          ],
          "merienda": [
            "1 huevo duro",
            "1 rodaja de pan integral"
          ],
          "cena": [
            "Tortilla de calabacín y 2 huevos",
            "1 arepa pequeña",
            "Infusión relajante"
          ]
        },
        "jueves": {
          "desayuno": [
            "Smoothie de avena, leche vegetal, banano y semillas",
            "2 galletas integrales"
          ],
          "media_mañana": [
            "1 taza de frutas mixtas (piña, mango, papaya)",
            "1 puñado de maní natural"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo",
            "1 taza de arroz blanco",
            "Verduras salteadas con aceite de oliva",
            "1 kiwi"
          ],
          "merienda": [
            "1 yogurt griego natural sin azúcar",
            "2 nueces o almendras"
          ],
          "cena": [
            "Ensalada de huevo cocido, aguacate y tomate",
            "1 papa mediana al vapor",
            "Té de hierbas"
          ]
        },
        "Viernes": {
          "desayuno": [
            "Arepa con queso bajo en grasa",
            "1 batido de leche con banano y avena"
          ],
          "media_mañana": [
            "1 mandarina",
            "1 cucharadita de semillas de girasol"
          ],
          "almuerzo": [
            "150 g de carne magra a la plancha",
            "½ taza de fríjoles",
            "Ensalada con aguacate y repollo",
            "1 rodaja de sandía"
          ],
          "merienda": [
            "1 fruta pequeña",
            "1 vaso de leche"
          ],
          "cena": [
            "Tortilla con champiñones y queso",
            "1 tostada integral",
            "Infusión de manzanilla"
          ]
        }
      },

      "recomendaciones": [
        "Hacer 5 comidas al día con proteína en cada una.",
        "Priorizar carbohidratos complejos como arroz, papa, lentejas y avena.",
        "Aumentar la ingesta calórica poco a poco para ganar peso sin grasa.",
        "No saltarse comidas, especialmente el desayuno y la post-entreno.",
        "Incluir grasas buenas como aguacate, nueces, aceite de oliva.",
        "Hidratarse bien, mínimo 2 litros diarios.",
        "Evitar alimentos procesados, frituras y bebidas azucaradas.",
        "Dormir entre 7-8 horas diarias para favorecer la recuperación.",
        "Evitar entrenamientos excesivos en ayunas.",
        "Ser paciente y constante: el aumento de masa requiere tiempo y buena nutrición."
      ]
    }
    ,



    "mujer_subir_intermedio_peso_medio": {
      "dieta": {
        "Lunes": {
          "desayuno": [
            "1 tortilla de 2 huevos + espinaca",
            "1 arepa con queso bajo en grasa",
            "1 vaso de jugo natural sin azúcar (naranja o papaya)"
          ],
          "media_mañana": [
            "1 puñado de maní natural",
            "1 banano"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo a la plancha",
            "1 taza de arroz integral",
            "Ensalada de zanahoria, lechuga y tomate",
            "1 mandarina"
          ],
          "merienda": [
            "1 vaso de avena con leche o bebida vegetal",
            "2 galletas integrales"
          ],
          "cena": [
            "Tortilla con 2 huevos + calabacín rallado",
            "1 arepa pequeña",
            "Infusión de manzanilla"
          ]
        },
        "Martes": {
          "desayuno": [
            "Avena cocida con trozos de manzana y canela",
            "1 huevo cocido"
          ],
          "media_mañana": [
            "1 yogurt natural sin azúcar",
            "1 puñado de semillas de girasol"
          ],
          "almuerzo": [
            "150 g de carne molida magra",
            "½ taza de batata cocida",
            "Brócoli salteado",
            "1 kiwi"
          ],
          "merienda": [
            "1 fruta pequeña",
            "1 puñado de nueces"
          ],
          "cena": [
            "Ensalada con atún, aguacate y tomate",
            "2 tostadas integrales",
            "Té digestivo"
          ]
        },
        "Miercoles": {
          "desayuno": [
            "Batido con leche, avena, banano y chía",
            "1 pan integral con queso bajo en grasa"
          ],
          "media_mañana": [
            "1 manzana",
            "1 huevo duro"
          ],
          "almuerzo": [
            "150 g de filete de pescado",
            "1 taza de lentejas",
            "Ensalada de espinaca y pepino",
            "1 naranja"
          ],
          "merienda": [
            "1 yogurt griego sin azúcar",
            "2 galletas de avena caseras"
          ],
          "cena": [
            "Tortilla con champiñones y 2 huevos",
            "1 papa cocida pequeña",
            "Infusión relajante"
          ]
        },
        "jueves": {
          "desayuno": [
            "2 huevos revueltos con cebolla",
            "1 arepa pequeña con mantequilla de maní",
            "1 café o té sin azúcar"
          ],
          "media_mañana": [
            "1 taza de sandía",
            "1 puñado de almendras"
          ],
          "almuerzo": [
            "150 g de pechuga de pollo",
            "1 taza de puré de papa",
            "Zanahoria cocida",
            "1 kiwi"
          ],
          "merienda": [
            "1 batido con leche + avena + fruta",
            "1 tostada integral"
          ],
          "cena": [
            "Tortilla con espinaca y queso",
            "1 taza de calabacín al vapor",
            "Té de manzanilla"
          ]
        },
        "Viernes": {
          "desayuno": [
            "Smoothie con leche vegetal, avena, banano y mantequilla de maní",
            "1 pan integral tostado"
          ],
          "media_mañana": [
            "1 mandarina",
            "1 puñado de semillas de calabaza"
          ],
          "almuerzo": [
            "150 g de carne a la plancha",
            "½ taza de arroz integral",
            "Ensalada de repollo con zanahoria y aguacate",
            "1 taza de piña"
          ],
          "merienda": [
            "1 huevo cocido",
            "1 fruta pequeña"
          ],
          "cena": [
            "Ensalada de atún con lechuga, tomate y huevo",
            "1 arepa pequeña",
            "Infusión digestiva"
          ]
        }
      },

      "recomendaciones": [
        "Incluir fuente de proteína en cada comida (huevo, pollo, pescado, yogurt, legumbres).",
        "No saltarse comidas para evitar pérdida de masa muscular.",
        "Incluir grasas saludables como aguacate, frutos secos y semillas.",
        "Tomar al menos 2 litros de agua al día.",
        "Evitar fritos, empanados y bebidas azucaradas.",
        "Evitar ayunos prolongados, sobre todo si se entrena por la mañana.",
        "Descansar 7-8 horas cada noche para facilitar la recuperación muscular.",
        "Variar los vegetales para asegurar aporte de vitaminas y minerales.",
        "No eliminar los carbohidratos: usarlos como fuente de energía especialmente pre y post entrenamiento.",
        "Ser constante con la rutina y llevar registro de medidas o progresos cada 15-30 días."
      ]
    }
    ,


    "mujer_subir_intermedio_sobrepeso": [
      "Superávit leve (5-8%) evitando grasa corporal.",
      "Evitar pan blanco y gaseosas.",
      "Comidas completas: proteína, vegetal, grasa saludable.",
      "Hidratación mínima 2 litros/día.",
      "Elegir alimentos con buena densidad nutricional."
    ]
  };


  const rutinaElegida = rutinas[key];
  const recomendaciones = recomendacionesNutricionales[key];

  if (!rutinaElegida) {
    alert("Combinación no válida o no implementada aún. Verifica los datos.");
    return;
  }

  // PDF - Encabezado
  doc.addImage(logoData, 'PNG', 30, 50, 150, 150);
  doc.setFillColor(255, 215, 0);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`PowerGym - RUTINA PERSONALIZADA DE ${nombre} `, 10, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Nombre: ${nombre}`, 10, 30);
  doc.text(`Género: ${genero}`, 10, 38);
  doc.text(`Objetivo: ${objetivo}`, 10, 46);
  doc.text(`Nivel: ${nivel}`, 10, 54);
  doc.text(`Peso: ${peso} kg`, 100, 30);
  doc.text(`Altura: ${(altura * 100).toFixed(1)} cm`, 100, 38);
  doc.text(`IMC: ${imc.toFixed(2)} `, 100, 46);
  doc.setDrawColor(255, 215, 0);
  doc.line(10, 58, 200, 58);

  // Rutina
  let y = 70;
  for (const dia in rutinaElegida) {
    doc.setFont(undefined, "bold");
    doc.text(`${dia}:`, 10, y);
    y += 6;
    doc.setFont(undefined, "normal");


    rutinaElegida[dia].forEach(ej => {
      doc.text(`- ${ej}`, 12, y);
      y += 6;


      for (const nombre in imagenesEjercicios) {
        if (ej.toLowerCase().includes(nombre)) {
          doc.addImage(imagenesEjercicios[nombre], 'PNG', 30, y, 70, 45);
          y += 48;
        }
      }

      if (y > 260) {
        doc.addPage();
        doc.addImage(logoData, 'PNG', 30, 50, 150, 150);
        y = 20;
      }
    });
  }

  // Dieta y Recomendaciones
  // Dieta y Recomendaciones
  if (recomendaciones && recomendaciones.dieta) {
    y += 10;
    doc.setTextColor(215, 181, 0);
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("PLAN DE ALIMENTACIÓN (SUGERIDO - CONSULTAR EN CASO DE PATOLOGÍAS) ", 10, y);
    y += 10;

    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");

    const comidaOrden = ["desayuno", "media_mañana", "almuerzo", "merienda", "cena"];
    const etiquetas = {
      desayuno: "Desayuno",
      media_mañana: "Media mañana",
      almuerzo: "Almuerzo",
      merienda: "Merienda",
      cena: "Cena"
    };

    for (const dia in recomendaciones.dieta) {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFont(undefined, "bold");
      doc.text(dia.charAt(0).toUpperCase() + dia.slice(1) + ":", 10, y);
      y += 6;
      doc.setFont(undefined, "normal");

      for (const comida of comidaOrden) {
        if (recomendaciones.dieta[dia][comida]) {
          doc.setFont(undefined, "bold");
          doc.text(`  ${etiquetas[comida]}:`, 12, y);
          y += 6;
          doc.setFont(undefined, "normal");

          for (const item of recomendaciones.dieta[dia][comida]) {
            doc.text(`    - ${item}`, 14, y);
            y += 6;
            if (y > 260) {
              doc.addPage();
              doc.addImage(logoData, 'PNG', 30, 50, 150, 150);
              y = 20;
            }
          }
        }
      }

      y += 6;
    }
  }

  // Recomendaciones Nutricionales
  if (recomendaciones && recomendaciones.recomendaciones) {
    y += 10;
    doc.setTextColor(215, 181, 0);
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("RECOMENDACIONES NUTRICIONALES", 10, y);
    y += 10;

    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");

    for (const r of recomendaciones.recomendaciones) {
      if (y > 270) {
        doc.addPage();
        doc.addImage(logoData, 'PNG', 30, 50, 150, 150);
        y = 20;
      }
      doc.text(`- ${r}`, 10, y);
      y += 6;
    }

    y += 5;
    doc.text("Sueño: mínimo 7-8 horas por noche", 10, y);
  }


  // Pie
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Generado por JuanGoyeneche © 2025", 10, 285);

  doc.save(`Rutina_PowerGym_${nombre.replace(" ", "_")}.pdf`);
}
