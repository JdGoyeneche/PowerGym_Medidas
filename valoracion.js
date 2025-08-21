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

  const pantorrillaDerecha = document.getElementById("pantorrillaDer").value;
const pantorrillaIzquierda = document.getElementById("pantorrillaIzq").value;
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


  if (pantorrillaDerecha) medidas.push(["Pantorrilla derecha", pantorrillaDerecha]);
  if (pantorrillaIzquierda) medidas.push(["Pantorrilla izquierda", pantorrillaIzquierda]);
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