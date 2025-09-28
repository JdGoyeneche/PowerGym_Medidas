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
    const imgRemoBajoCerrado = await convertirImagenABase64("remo-bajo-cerrado.png");
    const imgJalonEnPolea = await convertirImagenABase64("jalon en polea.png");
    const imgFemoralaUnaPierna = await convertirImagenABase64("femoral a una pierna.png");
  
  
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
      "elevaciones de talones sentado": imgEleTal,
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
      "flexiones de pecho": imgFlexiones,
      "copa": imgCopa,
      "remo bajo cerrado": imgRemoBajoCerrado,
      "jalon en polea": imgJalonEnPolea,
      "femoral a una pierna": imgFemoralaUnaPierna,
  
  
  
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
        "hombre_mantener_futbolista_bajo_peso": {
            "Lunes": [
              "Press de pecho con mancuernas en banco plano 3x12 hoaolags",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
        ],
        "Miercoles": [
          "Press militar sentado - 4x10",
          "Press Arnold - 4x10",
          "Elevaciones laterales - 4x10",
          "Elevaciones frontales - 4x10",
          "trapecios - 6x15",
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
        ],
        "Miercoles: Hombros y trapecios": [
          "Press militar sentado - 4x15",
          "Press Arnold - 4x15",
          "Elevaciones laterales - 4x15",
          "Elevaciones frontales - 4x15",
          "Trapecios - 6x15",
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes: Pierna": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x15",
          "Prensa inclinada - 4x15",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
        ],
        "Miercoles": [
          "Press militar sentado - 4x10",
          "Press Arnold - 4x10",
          "Elevaciones laterales - 4x10",
          "Elevaciones frontales - 4x10",
          "trapecios - 6x15",
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
        ],
        "Miercoles: Hombros y trapecios": [
          "Press militar sentado - 4x15",
          "Press Arnold - 4x15",
          "Elevaciones laterales - 4x15",
          "Elevaciones frontales - 4x15",
          "Trapecios - 6x15",
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes: Pierna": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x15",
          "Prensa inclinada - 4x15",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
        ],
        "Miercoles": [
          "Press militar sentado - 4x10",
          "Press Arnold - 4x10",
          "Elevaciones laterales - 4x10",
          "Elevaciones frontales - 4x10",
          "trapecios - 6x15",
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
        ],
        "Miercoles": [
          "Press militar sentado - 4x10",
          "Press Arnold - 4x10",
          "Elevaciones laterales - 4x10",
          "Elevaciones frontales - 4x10",
          "trapecios - 6x15",
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
        ],
        "Miercoles": [
          "Press militar sentado - 4x10",
          "Press Arnold - 4x10",
          "Elevaciones laterales - 4x10",
          "Elevaciones frontales - 4x10",
          "trapecios - 6x15",
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
        ],
        "Miercoles: Hombros y trapecios": [
          "Press militar sentado - 4x15",
          "Press Arnold - 4x15",
          "Elevaciones laterales - 4x15",
          "Elevaciones frontales - 4x15",
          "Trapecios - 6x15",
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes: Pierna": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x15",
          "Prensa inclinada - 4x15",
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
          "Dominadas asistidas - 4 al fallo",
          "Jalón al pecho - 4x10",
          "Remo con mancuerna o hammer bajo - 4x10 c/u",
          "Remo con barra - 4x15",
          "Curl de bíceps - 4x10",
          "curl predicador - 4x10",
          "curl martillo - 4x10",
          "Crunch abdominal - 4x10",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Extensión de tríceps tumbado - 4x10",
          "plancha con toques de hombro - 4x20",
          "plancha - 4x40",
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
  
  "hombre_subir_personalizado_peso_medio": {
      "Lunes": [
        "Press de pecho con mancuernas en banco plano - 4x12",
        "Press de pecho con mancuernas en banco inclinado (mancuerna/banco o maquina) - 4x12",
        "Aperturas en banco inclinado - 3x12",
        "Peck deck - 4x15",
        "Press militar sentado - 4x12",
        "Elevaciones laterales - 4x12",
        "Elevaciones frontales - 4x12",
        "Extensión de tríceps con cuerda - 3x12",
        "Copa - 4x12",
      ],
      "Martes": [
        "Hack squat - 4x12",
        "Prensa inclinada - 4x12",
        "Extensión de cuádriceps - 4x12",
        "Zancadas con mancuernas - 4x12",
        "Hip trust - 4x12",
        "sentadilla sumo - 4x20",
        "Elevaciones de talones sentado - 4x20",
      ],
      "Miercoles": [
        "Jalón al pecho - 4x12",
        "Remo bajo cerrado 4x12",
        "Remo con mancuerna o hammer bajo - 4x12",
        "Jalon en polea - 4x15",
        "Curl de bíceps - 4x12",
        "curl predicador - 4x15",
        "curl martillo - 4x12",
        "Crunch abdominal - 4x20",
        "Plancha - 4x1 minuto",
        "Crunch oblicuo - 3x20",
      ],
      "jueves": [
        "Press militar sentado - 4x12",
        "Elevaciones laterales - 4x12",
        "Elevaciones frontales - 4x12",
        "Face pull - 4x15",
        "Trapecios - 4x20",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
      ],
      "Viernes": [
        "Peso muerto con barra - 4x12",
        "Sentadilla búlgara con peso (Mancuernas)",
        "Hip trust - 4x12",
        "Sentadilla sumo - 4x20",
        "Curl femoral 4x12",
        "Abducción de cadera en máquina 4x20"
      ]
    },


    "hombre_definir_personalizado_sobrepeso": {
      "Lunes": [
        "Press de pecho con mancuernas en banco plano - 4x12",
        "Press de pecho con mancuernas en banco inclinado (mancuerna/banco o maquina) - 4x12",
        "Aperturas en banco inclinado - 3x12",
        "Peck deck - 4x15",
        "Press militar sentado - 4x12",
        "Elevaciones laterales - 4x12",
        "Elevaciones frontales - 4x12",
        "Extensión de tríceps con cuerda - 3x12",
        "Copa - 4x12",
      ],
      "Martes": [
        "Hack squat - 4x12",
        "Prensa inclinada - 4x12",
        "Extensión de cuádriceps - 4x12",
        "Zancadas con mancuernas - 4x12",
        "Hip trust - 4x12",
        "sentadilla sumo - 4x20",
        "Elevaciones de talones sentado - 4x20",
      ],
      "Miercoles": [
        "Jalón al pecho - 4x12",
        "Remo bajo cerrado 4x12",
        "Remo con mancuerna o hammer bajo - 4x12",
        "Jalon en polea - 4x15",
        "Curl de bíceps - 4x12",
        "curl predicador - 4x15",
        "curl martillo - 4x12",
        "Crunch abdominal - 4x20",
        "Plancha - 4x1 minuto",
        "Crunch oblicuo - 3x20",
      ],
      "jueves": [
        "Press militar sentado - 4x12",
        "Elevaciones laterales - 4x12",
        "Elevaciones frontales - 4x12",
        "Face pull - 4x15",
        "Trapecios - 4x20",
        "Copa - 4x10",
        "Extensión de tríceps con cuerda - 4x10",
      ],
      "Viernes": [
        "Peso muerto con barra - 4x12",
        "Sentadilla búlgara con peso (Mancuernas)",
        "Hip trust - 4x12",
        "Sentadilla sumo - 4x20",
        "Curl femoral 4x12",
        "Abducción de cadera en máquina 4x20"
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
          "Jalón al pecho - 4x15",
          "Remo bajo cerrado - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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
          "Jalón al pecho - 4x15",
          "Remo bajo cerrado - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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
          "Jalón al pecho - 4x15",
          "Remo bajo cerrado - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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
          "Jalón al pecho - 4x15",
          "Remo bajo cerrado - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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
          "Jalón al pecho - 4x15",
          "Remo bajo cerrado - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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
          "Jalón al pecho - 4x15",
          "Remo bajo cerrado - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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
          "Jalón al pecho - 4x15",
          "Remo bajo cerrado - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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
          "Jalón al pecho - 4x15",
          "Remo bajo cerrado - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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
          "Jalón al pecho - 4x15",
          "Remo con mancuerna o hammer bajo - 4x15 c/u",
          "Remo bajo cerrado - 4x15",
          "Jalon en polea 4x15",
          "Curl de bíceps - 4x15",
          "curl predicador - 4x15",
          "curl martillo - 4x15",
          "Crunch abdominal - 4x15",
          "Plancha - 4x40 segundos",
          "Mountain climbers - 4x40 segundos"
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
          "Copa - 4x10",
          "Fondos asistidos con maquina - 4x10",
          "plancha - 4x40",
          "crunch abdominal - 4x20"
        ],
        "Viernes": [
          "Sentadilla libre con barra variacion zumo(principiantes) 4x10",
          "Prensa inclinada - 4x10",
          "Curl femoral 4x10",
          "Hip trust 4x15",
          "Femoral a una pierna 4x10",
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

    const rutinaElegida = rutinas[key];

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

      // Pie
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Generado por JuanGoyeneche © 2025", 10, 285);

  doc.save(`Rutina_PowerGym_${nombre.replace(" ", "_")}.pdf`);

}
