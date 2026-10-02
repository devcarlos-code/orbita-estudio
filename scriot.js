"use strict";

(() => {
  const STORAGE_KEY = "orbita.study.v1";
  const SESSION_SIZE = 6;
  const EXAM_SIZE = 10;
  const EXAM_SECONDS = 15 * 60;
  const letters = ["A", "B", "C", "D"];

  const questions = {
    matematicas: [
      { topic: "Aritmética y números", type: "practico", title: "La mezcla del laboratorio", prompt: "Una receta necesita 3/4 de litro de agua. Si preparas 4 recetas, ¿cuántos litros de agua necesitas?", answer: 3, explanation: "Multiplica la cantidad por el número de recetas: 4 × 3/4 = 3 litros." },
      { topic: "Aritmética y números", type: "opcion", title: "Operaciones combinadas", prompt: "Calcula: 18 − 3 × (2 + 4). ¿Cuál es el resultado?", choices: ["0", "6", "12", "90"], answer: 0, explanation: "Primero el paréntesis: 2 + 4 = 6. Después la multiplicación: 3 × 6 = 18. Por último, 18 − 18 = 0." },
      { topic: "Razones, proporciones y porcentajes", type: "practico", title: "Descuento en la librería", prompt: "Un libro cuesta $80 y tiene 15 % de descuento. ¿Cuánto se paga después del descuento? Escribe el número sin el signo $.", answer: 68, explanation: "El descuento es 0,15 × 80 = $12. El precio final es 80 − 12 = $68." },
      { topic: "Razones, proporciones y porcentajes", type: "completar", title: "Escala y proporción", prompt: "En un mapa, 2 cm representan 10 km. Una distancia de 7 cm en el mapa representa ___ km.", answers: ["35", "35 km"], explanation: "Cada centímetro representa 10 ÷ 2 = 5 km; por tanto, 7 cm representan 7 × 5 = 35 km." },
      { topic: "Álgebra y expresiones", type: "completar", title: "Propiedad distributiva", prompt: "Completa: 3(x + 5) = 3x + ___.", answers: ["15", "quince"], explanation: "Distribuye 3 a cada término dentro del paréntesis: 3 × x + 3 × 5 = 3x + 15." },
      { topic: "Ecuaciones e inecuaciones", type: "practico", title: "La ecuación del número oculto", prompt: "Resuelve 4x − 7 = 17. ¿Cuánto vale x?", answer: 6, explanation: "Suma 7 a ambos lados: 4x = 24. Divide entre 4: x = 6." },
      { topic: "Ecuaciones e inecuaciones", type: "opcion", title: "Una desigualdad", prompt: "¿Cuál es la solución de 2x + 3 < 11?", choices: ["x < 4", "x > 4", "x < 7", "x > 7"], answer: 0, explanation: "Resta 3: 2x < 8. Divide entre 2: x < 4." },
      { topic: "Funciones y gráficas", type: "opcion", title: "Evaluar una función", prompt: "Si f(x) = 2x² − 1, ¿cuánto vale f(3)?", choices: ["5", "11", "17", "35"], answer: 2, explanation: "Sustituye x = 3: f(3) = 2(3²) − 1 = 18 − 1 = 17." },
      { topic: "Funciones y gráficas", type: "pareo", title: "Relaciona cada recta", prompt: "Relaciona la ecuación de la recta con su pendiente.", pairs: [{ term: "y = 3x + 2", match: "Pendiente 3" }, { term: "y = −2x + 5", match: "Pendiente −2" }, { term: "y = x − 4", match: "Pendiente 1" }], explanation: "En la forma y = mx + b, la pendiente es el coeficiente m que acompaña a x." },
      { topic: "Geometría y medición", type: "practico", title: "Área de un triángulo", prompt: "La base de un triángulo mide 10 cm y su altura, 6 cm. ¿Cuál es su área en cm²?", answer: 30, explanation: "Área = (base × altura) ÷ 2 = (10 × 6) ÷ 2 = 30 cm²." },
      { topic: "Geometría y medición", type: "opcion", title: "Pitágoras en la rampa", prompt: "Una rampa forma un triángulo rectángulo con base de 6 m y altura de 8 m. ¿Cuánto mide la rampa?", choices: ["7 m", "10 m", "12 m", "14 m"], answer: 1, explanation: "La hipotenusa c = √(6² + 8²) = √100 = 10 m." },
      { topic: "Geometría y medición", type: "completar", title: "Perímetro de una circunferencia", prompt: "Un círculo tiene radio 4 cm. Su circunferencia es ___π cm.", answers: ["8"], explanation: "La longitud de la circunferencia es C = 2πr = 2π(4) = 8π cm." },
      { topic: "Trigonometría", type: "opcion", title: "Razones trigonométricas", prompt: "En un triángulo rectángulo, el lado opuesto a un ángulo mide 3 y la hipotenusa mide 5. ¿Cuál es el seno del ángulo?", choices: ["3/5", "4/5", "5/3", "3/4"], answer: 0, explanation: "Por definición, sen(θ) = cateto opuesto ÷ hipotenusa = 3/5." },
      { topic: "Estadística y probabilidad", type: "practico", title: "La media de los datos", prompt: "Calcula la media de 4, 6, 8 y 10.", answer: 7, explanation: "Media = (4 + 6 + 8 + 10) ÷ 4 = 28 ÷ 4 = 7." },
      { topic: "Estadística y probabilidad", type: "opcion", title: "Una probabilidad sencilla", prompt: "Se elige al azar un número del 1 al 10. ¿Cuál es la probabilidad de obtener un número par?", choices: ["1/5", "1/2", "2/5", "5/2"], answer: 1, explanation: "Hay 5 números pares entre 10 resultados igualmente posibles: 5/10 = 1/2." },
      { topic: "Sucesiones y patrones", type: "completar", title: "Encuentra el patrón", prompt: "Completa la sucesión: 5, 9, 13, 17, ___.", answers: ["21", "veintiuno"], explanation: "Cada término aumenta en 4; el siguiente término es 17 + 4 = 21." }
    ],
    quimica: [
      { topic: "Materia y sus propiedades", type: "opcion", title: "Propiedades de la materia", prompt: "¿Cuál de estas es una propiedad intensiva, que no depende de la cantidad de muestra?", choices: ["Masa", "Volumen", "Densidad", "Longitud"], answer: 2, explanation: "La densidad es intensiva: no cambia al dividir la muestra. Masa, volumen y longitud son extensivas." },
      { topic: "Materia y sus propiedades", type: "completar", title: "Cambio de estado", prompt: "El paso de un líquido a un gas se llama ___.", answers: ["vaporizacion", "vaporización", "evaporacion", "evaporación"], explanation: "La vaporización convierte un líquido en gas; la evaporación y la ebullición son formas de vaporización." },
      { topic: "Estructura atómica", type: "opcion", title: "Partículas del átomo", prompt: "¿Qué partícula subatómica tiene carga negativa?", choices: ["Protón", "Neutrón", "Electrón", "Núcleo"], answer: 2, explanation: "El electrón posee carga −1. El protón posee carga +1 y el neutrón no tiene carga." },
      { topic: "Estructura atómica", type: "completar", title: "Número atómico", prompt: "El número atómico Z de un elemento es igual al número de ___.", answers: ["protones", "proton"], explanation: "El número atómico Z identifica al elemento y corresponde al número de protones del núcleo." },
      { topic: "Tabla periódica", type: "pareo", title: "Familias de la tabla periódica", prompt: "Relaciona cada familia con sus características.", pairs: [{ term: "Grupo 1", match: "Metales alcalinos" }, { term: "Grupo 17", match: "Halógenos" }, { term: "Grupo 18", match: "Gases nobles" }], explanation: "Los elementos del mismo grupo comparten propiedades químicas relacionadas con su configuración electrónica." },
      { topic: "Enlace químico y nomenclatura", type: "opcion", title: "Enlace entre dos elementos", prompt: "¿Qué tipo de enlace se forma habitualmente entre un metal y un no metal?", choices: ["Iónico", "Covalente no polar", "Puente de hidrógeno", "Metálico"], answer: 0, explanation: "En un enlace iónico, normalmente un metal transfiere electrones a un no metal y se forman iones de carga opuesta." },
      { topic: "Enlace químico y nomenclatura", type: "completar", title: "Una molécula conocida", prompt: "En la fórmula H₂O hay ___ átomos de hidrógeno por molécula.", answers: ["2", "dos"], explanation: "El subíndice 2 se aplica al hidrógeno e indica dos átomos de H por cada molécula de agua." },
      { topic: "Reacciones y estequiometría", type: "opcion", title: "Conservación de los átomos", prompt: "¿Cuál es la ecuación correctamente balanceada para formar agua?", choices: ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → H₂O", "2H₂ + 2O₂ → H₂O"], answer: 1, explanation: "Hay 4 átomos de H y 2 de O en ambos lados de 2H₂ + O₂ → 2H₂O." },
      { topic: "Reacciones y estequiometría", type: "practico", title: "Conservación de la masa", prompt: "En una reacción se obtienen 12 g de producto A y 8 g de producto B. Si la masa se conserva, ¿qué masa total de reactivos se necesitó, en gramos?", answer: 20, explanation: "La ley de conservación de la masa indica que la masa total de los reactivos es igual a la de los productos: 12 + 8 = 20 g." },
      { topic: "Gases y estados de la materia", type: "opcion", title: "Comportamiento de un gas", prompt: "Si la temperatura permanece constante y se reduce a la mitad el volumen de un gas, ¿qué ocurre con su presión (ley de Boyle)?", choices: ["Se reduce a la mitad", "Se duplica", "No cambia", "Se cuadruplica"], answer: 1, explanation: "La ley de Boyle establece P₁V₁ = P₂V₂ a temperatura constante. Si V se reduce a la mitad, P se duplica." },
      { topic: "Disoluciones y concentración", type: "practico", title: "Concentración molar", prompt: "Se disuelve 1 mol de soluto para preparar 2 L de disolución. ¿Cuál es la molaridad en mol/L?", answer: 0.5, explanation: "Molaridad = moles de soluto ÷ litros de disolución = 1 ÷ 2 = 0,5 mol/L." },
      { topic: "Ácidos, bases y equilibrio", type: "opcion", title: "Escala de pH", prompt: "A 25 °C, una disolución con pH = 3 es:", choices: ["Ácida", "Neutra", "Básica", "Una sal"], answer: 0, explanation: "A 25 °C, pH < 7 es ácido, pH = 7 es neutro y pH > 7 es básico." },
      { topic: "Ácidos, bases y equilibrio", type: "completar", title: "Neutralización", prompt: "En una neutralización, un ácido reacciona con una base para formar sal y ___.", answers: ["agua"], explanation: "La neutralización de un ácido y una base produce una sal y agua." },
      { topic: "Reacciones de oxidación-reducción", type: "opcion", title: "Oxidación y electrones", prompt: "¿Qué ocurre con los electrones cuando una especie química se oxida?", choices: ["Los gana", "Los pierde", "Los comparte siempre por igual", "No cambia"], answer: 1, explanation: "Oxidación es pérdida de electrones; reducción es ganancia de electrones." },
      { topic: "Química orgánica", type: "opcion", title: "La familia de los alcanos", prompt: "¿Cuál es la fórmula general de los alcanos de cadena abierta con enlaces sencillos?", choices: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙHₙ"], answer: 0, explanation: "Los alcanos acíclicos saturados tienen fórmula general CₙH₂ₙ₊₂; el metano, por ejemplo, es CH₄." },
      { topic: "Química orgánica", type: "pareo", title: "Grupos funcionales básicos", prompt: "Relaciona cada grupo funcional con la familia que identifica.", pairs: [{ term: "−OH", match: "Alcohol" }, { term: "−COOH", match: "Ácido carboxílico" }, { term: "−CHO", match: "Aldehído" }], explanation: "Los grupos funcionales determinan la familia y muchas propiedades características de los compuestos orgánicos." },
      { topic: "Química y ambiente", type: "opcion", title: "Conservación de la materia", prompt: "En una reacción química que ocurre en un sistema cerrado, los átomos:", choices: ["Se crean al final", "Se destruyen al inicio", "Se reorganizan y se conservan", "Se convierten siempre en energía"], answer: 2, explanation: "En una reacción química los átomos se reorganizan formando nuevas sustancias; se conserva el número de átomos de cada elemento." }
    ]
  };

  Object.entries(window.orbitaExtraQuestions || {}).forEach(([subject, additions]) => {
    if (questions[subject] && Array.isArray(additions)) questions[subject].push(...additions);
  });

  const theory = {
    matematicas: {
      title: "Fundamentos y conexiones matemáticas",
      description: "Consulta definiciones, procedimientos y fórmulas de los bloques matemáticos. Usa las notas como guía y revisa también el material original de tu curso cuando esté disponible.",
      pdf: "https://github.com/devcarlos-code/orbita-estudio/releases/download/modulos-2021/Admision.Modulo.Matemtica.2021.pdf",
      pdfLabel: "Abrir módulo completo de Matemáticas",
      units: [
        ["Conjuntos, lógica y sistemas numéricos", "<p>Un conjunto es una colección bien definida de elementos. La pertenencia se escribe ∈; la inclusión, ⊆. La unión A ∪ B reúne los elementos de ambos conjuntos; la intersección A ∩ B reúne los comunes; el complemento Aᶜ comprende los elementos del universo que no pertenecen a A. Un diagrama de Venn representa gráficamente estas relaciones. En lógica, una proposición es un enunciado que puede ser verdadero o falso. La negación ¬p invierte su valor de verdad; la conjunción p ∧ q exige que ambas sean verdaderas; la disyunción p ∨ q exige que al menos una lo sea; la implicación p ⇒ q solo es falsa cuando p es verdadera y q falsa.</p><p>Los números naturales se usan para contar; los enteros incorporan el cero y los negativos; los racionales son cocientes de enteros con denominador distinto de cero. Los irracionales no pueden expresarse como fracción de enteros; su expansión decimal es infinita no periódica. Los reales reúnen racionales e irracionales. Compara fracciones usando denominadores comunes o productos cruzados. Respeta la jerarquía de operaciones: paréntesis, potencias y raíces, multiplicación y división, suma y resta.</p><div class=\"formula-box\">a/b + c/d = (ad + bc)/bd &nbsp; · &nbsp; |a| = distancia de a a 0</div>"],
        ["Razones, proporciones y porcentajes", "<p>Una razón compara dos cantidades mediante un cociente; una proporción afirma que dos razones son iguales. En una proporción a/b = c/d, los productos cruzados satisfacen ad = bc. Una relación es directamente proporcional si el cociente entre las variables es constante (y = kx); es inversamente proporcional si su producto es constante (xy = k).</p><p>Un porcentaje es una razón cuyo denominador es 100. Para calcular p % de una cantidad N, multiplica N por p/100. Un aumento porcentual multiplica la cantidad inicial por (1 + p/100); una reducción, por (1 − p/100). Para calcular una velocidad media, divide la distancia recorrida entre el tiempo transcurrido y expresa las unidades compatibles.</p><div class=\"formula-box\">p % de N = (p/100)N &nbsp; · &nbsp; velocidad = distancia / tiempo</div>"],
        ["Potencias, raíces y notación científica", "<p>Para a ≠ 0, aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1 y a⁻ⁿ = 1/aⁿ. Las raíces son las operaciones inversas de las potencias: ⁿ√(aᵐ) puede expresarse como aᵐ/ⁿ cuando está definida. Simplifica radicales extrayendo factores que sean potencias perfectas. La notación científica escribe un número como a × 10ⁿ, donde 1 ≤ |a| < 10; para multiplicar o dividir números así expresados, opera por separado con coeficientes y potencias.</p><p>Con números negativos, la paridad del exponente importa: una base negativa elevada a un exponente par produce un resultado positivo; a uno impar, negativo. Distingue cuidadosamente −3² = −9 de (−3)² = 9.</p>"],
        ["Álgebra: expresiones, polinomios y factorización", "<p>Una variable representa un número. Los términos semejantes tienen las mismas variables elevadas a los mismos exponentes; se suman o restan sus coeficientes. La propiedad distributiva establece a(b + c) = ab + ac. Un polinomio suma monomios. Para multiplicar polinomios, multiplica cada término de uno por cada término del otro y reduce términos semejantes.</p><p>Identidades fundamentales: (a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²; (a + b)(a − b) = a² − b². Factorizar es expresar una suma como producto: extrae el factor común; usa diferencia de cuadrados; en un trinomio cuadrático, busca dos factores que reproduzcan sus coeficientes.</p><div class=\"formula-box\">a² − b² = (a − b)(a + b) &nbsp; · &nbsp; (a ± b)² = a² ± 2ab + b²</div>"],
        ["Ecuaciones, inecuaciones y sistemas", "<p>Una ecuación conserva la igualdad si aplicas la misma operación a ambos miembros. Para resolver ax + b = c, aísla x mediante operaciones inversas y verifica sustituyendo. En una inecuación se siguen las mismas reglas, pero al multiplicar o dividir por un número negativo se invierte el sentido del signo. Un sistema de dos ecuaciones lineales puede resolverse por sustitución, eliminación o interpretación gráfica; su solución, si existe y es única, satisface ambas ecuaciones.</p><p>Para ax² + bx + c = 0, con a ≠ 0, las soluciones son x = [−b ± √(b² − 4ac)]/(2a). El discriminante Δ = b² − 4ac determina si las raíces reales son dos (Δ > 0), una doble (Δ = 0) o no reales (Δ < 0). Comprueba las soluciones y descarta las que no pertenezcan al dominio original.</p><div class=\"formula-box\">ax² + bx + c = 0 &nbsp; ⇒ &nbsp; x = (−b ± √(b² − 4ac))/(2a)</div>"],
        ["Funciones, relaciones y gráficas", "<p>Una función asigna exactamente una salida a cada entrada de su dominio. Se escribe y = f(x). El dominio reúne las entradas permitidas y el rango reúne las salidas que efectivamente se obtienen. Calcula imágenes sustituyendo la entrada; encuentra intersecciones con el eje x resolviendo f(x) = 0, y con el eje y calculando f(0). Una gráfica permite interpretar crecimiento, decrecimiento, máximos, mínimos e intersecciones.</p><p>En la recta y = mx + b, m = (y₂ − y₁)/(x₂ − x₁) es la pendiente y b la intersección vertical. Las rectas paralelas tienen la misma pendiente; dos rectas no verticales perpendiculares tienen pendientes cuyo producto es −1. La parábola y = ax² + bx + c abre hacia arriba si a > 0 y hacia abajo si a < 0; su eje de simetría es x = −b/(2a).</p><div class=\"formula-box\">Pendiente: m = Δy/Δx &nbsp; · &nbsp; Vértice de y = ax² + bx + c: x = −b/(2a)</div>"],
        ["Geometría, polígonos y medición", "<p>La suma de los ángulos internos de un triángulo es 180°. Triángulos semejantes tienen ángulos correspondientes iguales y lados proporcionales. El teorema de Pitágoras en un triángulo rectángulo es a² + b² = c², donde c es la hipotenusa. El perímetro suma longitudes de los lados; el área mide la superficie. Usa unidades cuadradas para áreas y cúbicas para volúmenes, y convierte las unidades antes de calcular.</p><p>Rectángulo: A = bh; triángulo: A = bh/2; paralelogramo: A = bh; trapecio: A = (B + b)h/2; círculo: A = πr² y perímetro C = 2πr. Prisma: V = área de la base × altura; cilindro: V = πr²h. Una vuelta completa mide 360° o 2π radianes.</p><div class=\"formula-box\">Pitágoras: a² + b² = c² &nbsp; · &nbsp; Círculo: A = πr², C = 2πr</div>"],
        ["Trigonometría", "<p>En un triángulo rectángulo respecto al ángulo agudo θ: sen θ = cateto opuesto / hipotenusa; cos θ = cateto adyacente / hipotenusa; tan θ = cateto opuesto / cateto adyacente = sen θ / cos θ. Recuerda SOH-CAH-TOA. La identidad fundamental es sen² θ + cos² θ = 1. Usa el modo grados o radianes indicado por el problema y la calculadora. Para ángulos notables, memoriza los valores de 30°, 45° y 60° o π/6, π/4 y π/3.</p><p>La ley de senos relaciona cada lado con el seno de su ángulo opuesto: a/sen A = b/sen B = c/sen C. La ley de cosenos generaliza Pitágoras: c² = a² + b² − 2ab cos C. Decide cuál ley aplicar según los lados y los ángulos conocidos.</p><div class=\"formula-box\">sen θ = opuesto/hipotenusa &nbsp; · &nbsp; cos θ = adyacente/hipotenusa &nbsp; · &nbsp; tan θ = opuesto/adyacente</div>"],
        ["Estadística, probabilidad y conteo", "<p>La media aritmética es suma de datos dividida entre el número de datos; la mediana es el dato central tras ordenar; la moda es el valor más frecuente. El rango es máximo menos mínimo. Un diagrama de barras compara categorías, un histograma representa intervalos y un diagrama de dispersión muestra pares de observaciones.</p><p>Si los resultados son igualmente probables, P(A) = casos favorables / casos posibles; 0 ≤ P(A) ≤ 1. El complemento cumple P(Aᶜ) = 1 − P(A). Para sucesos independientes, P(A ∩ B) = P(A)P(B). El principio multiplicativo cuenta etapas: si una elección se realiza de m maneras y otra de n maneras, ambas juntas se realizan de mn maneras. Distingue cuándo el orden importa y cuándo no.</p><div class=\"formula-box\">Media = Σx / n &nbsp; · &nbsp; P(A) = resultados favorables / resultados posibles</div>"],
        ["Sucesiones y cambio", "<p>Una sucesión ordena términos según una regla. En una sucesión aritmética se suma la diferencia constante d: aₙ = a₁ + (n − 1)d. En una geométrica se multiplica por una razón constante r: aₙ = a₁rⁿ⁻¹. Identifica la regularidad y verifica la regla con varios términos, no solo con el siguiente.</p><p>La tasa de cambio entre dos puntos es la razón entre el cambio de salida y el de entrada. El interés simple se calcula como I = Prt, donde P es el capital, r la tasa por período y t el tiempo en períodos compatibles; el monto es P + I. En interés compuesto, A = P(1 + r)ⁿ. Expresa tasas y plazos en las mismas unidades antes de sustituir.</p><div class=\"formula-box\">Sucesión aritmética: aₙ = a₁ + (n − 1)d &nbsp; · &nbsp; Interés compuesto: A = P(1 + r)ⁿ</div>"],
        ["Precálculo: exponenciales y logaritmos", "<p>Una función exponencial tiene forma f(x) = aˣ, a > 0 y a ≠ 1; crece si a > 1 y decrece si 0 < a < 1. El logaritmo logₐ(x) responde a la pregunta «¿a qué exponente hay que elevar a para obtener x?». Así, logₐ(x) = y equivale a aʸ = x; el argumento debe ser positivo.</p><p>Propiedades: logₐ(xy) = logₐx + logₐy; logₐ(x/y) = logₐx − logₐy; logₐ(xʳ) = r logₐx. Estas relaciones permiten resolver ecuaciones exponenciales y transformar escalas. La función logarítmica es la inversa de la exponencial.</p><div class=\"formula-box\">logₐ(x) = y ⇔ aʸ = x &nbsp; · &nbsp; logₐ(xy) = logₐx + logₐy</div>"]
      ]
    },
    quimica: {
      title: "Materia, estructura y transformación",
      description: "Estudia cada bloque con definiciones, leyes, relaciones y procedimientos. Al final puedes abrir el módulo original completo de química disponible en tu proyecto para consultar todas sus páginas.",
      pdf: "https://github.com/devcarlos-code/orbita-estudio/releases/download/modulos-2021/Modulo.Quimica.-.2021.pdf",
      pdfLabel: "Abrir módulo completo de Química",
      units: [
        ["Materia, propiedades y medición", "<p>La materia tiene masa y ocupa espacio. Una sustancia pura posee composición definida: puede ser un elemento o un compuesto. Una mezcla combina sustancias en proporciones variables; es homogénea si presenta una sola fase y heterogénea si sus fases pueden distinguirse. Propiedades extensivas (masa, volumen) dependen de la cantidad; intensivas (densidad, temperatura de fusión) no dependen de ella.</p><p>Los cambios físicos alteran el estado o la forma sin cambiar la identidad química; los cambios químicos forman sustancias nuevas. Estados comunes: sólido (forma y volumen definidos), líquido (volumen definido y forma variable) y gas (ni forma ni volumen definidos). En el SI, la masa se expresa en kilogramos, el volumen en metros cúbicos o litros y la temperatura en kelvin. Densidad = masa/volumen; verifica que las unidades correspondan.</p><div class=\"formula-box\">Densidad (ρ) = masa (m) / volumen (V) &nbsp; · &nbsp; K = °C + 273,15</div>"],
        ["Estructura atómica e isótopos", "<p>El núcleo concentra protones, de carga +1, y neutrones, sin carga; los electrones, de carga −1, ocupan regiones alrededor del núcleo. El número atómico Z es el número de protones e identifica al elemento. El número másico A es protones + neutrones; por tanto, neutrones = A − Z. Un átomo neutro tiene igual número de protones y electrones. Un ion se forma al perder electrones (catión, positivo) o ganarlos (anión, negativo).</p><p>Los isótopos son átomos del mismo elemento con igual Z y distinto número de neutrones y A. La masa atómica relativa de la tabla periódica es un promedio ponderado de las masas de los isótopos naturales. En el modelo de capas, los electrones externos o de valencia ayudan a explicar los enlaces y la reactividad química.</p><div class=\"formula-box\">Z = protones &nbsp; · &nbsp; A = protones + neutrones &nbsp; · &nbsp; átomo neutro: electrones = protones</div>"],
        ["Tabla periódica y propiedades", "<p>La tabla periódica ordena los elementos por número atómico creciente. Las filas son períodos y las columnas son grupos o familias; los elementos de un grupo comparten patrones de electrones de valencia y propiedades. Los grupos 1, 2, 17 y 18 incluyen, respectivamente, metales alcalinos, alcalinotérreos, halógenos y gases nobles. Metales ocupan principalmente la zona izquierda y central; no metales, la derecha; metaloides se aproximan a la escalera divisoria.</p><p>A lo largo de un período, el radio atómico generalmente disminuye y la energía de ionización y electronegatividad generalmente aumentan. Hacia abajo de un grupo, el radio suele aumentar; las tendencias tienen excepciones. La electronegatividad expresa la atracción de un átomo por electrones compartidos y ayuda a anticipar la polaridad de enlaces.</p>"],
        ["Enlace químico y estructura", "<p>En un enlace iónico hay atracción entre cationes y aniones, habitualmente tras transferencia de electrones entre un metal y un no metal. En un enlace covalente, normalmente entre no metales, se comparten pares de electrones; puede ser polar o no polar según la distribución de carga. El enlace metálico explica la conductividad y maleabilidad de muchos metales. Los enlaces intramoleculares mantienen unidos los átomos; las fuerzas intermoleculares actúan entre partículas y afectan, entre otras propiedades, los puntos de ebullición.</p><p>Una estructura de Lewis representa los electrones de valencia como puntos y los pares enlazantes como enlaces. Usa el octeto como regla orientadora (el hidrógeno completa un dueto) y reconoce sus excepciones. La polaridad molecular depende tanto de la polaridad de cada enlace como de la geometría: las polaridades pueden cancelarse o sumarse.</p>"],
        ["Nomenclatura de compuestos", "<p>Una fórmula química indica los elementos presentes y sus proporciones. Los subíndices forman parte de la fórmula: H₂O tiene dos átomos de H por cada átomo de O. Un coeficiente delante de una fórmula multiplica la cantidad de todas las partículas: 2H₂O contiene cuatro átomos de H. En compuestos iónicos la suma de cargas debe ser cero; nombra primero el catión y después el anión. En compuestos covalentes moleculares se usan prefijos como mono-, di-, tri- y tetra- para indicar cantidades cuando el sistema de nomenclatura correspondiente los requiere.</p><p>Aprende a reconocer óxidos, hidruros, ácidos, bases y sales según el sistema de nomenclatura enseñado en tu curso. Conserva intactos los subíndices al escribir la fórmula de una sustancia: al balancear una ecuación se modifican coeficientes, no fórmulas químicas.</p>"],
        ["Reacciones químicas y estequiometría", "<p>Una ecuación química representa reactivos y productos con fórmulas, una flecha de reacción y coeficientes. Balancea aplicando la conservación de los átomos: ajusta coeficientes enteros mínimos para que cada elemento tenga la misma cantidad a ambos lados. No cambies subíndices. Tipos frecuentes: síntesis, descomposición, desplazamiento simple, doble desplazamiento y combustión. Un indicador de reacción puede ser la formación de gas o precipitado, un cambio de color o una variación de energía, aunque una observación aislada debe interpretarse con cuidado.</p><p>Un mol contiene el número de Avogadro, 6,02214076 × 10²³ entidades elementales. La masa molar en g/mol corresponde numéricamente a la masa atómica o molecular en u. Para resolver problemas, convierte primero los datos a moles, aplica la proporción de coeficientes de la ecuación balanceada y convierte al final a la unidad solicitada. El reactivo limitante se consume primero y determina la cantidad máxima de producto; el rendimiento porcentual compara rendimiento real con teórico.</p><div class=\"formula-box\">n = m/M &nbsp; · &nbsp; N = nNₐ &nbsp; · &nbsp; % rendimiento = (real / teórico) × 100</div>"],
        ["Estados de la materia y leyes de los gases", "<p>En un sólido las partículas vibran cerca de posiciones fijas; en un líquido se deslizan y, en un gas, se mueven libremente y son compresibles. Fusión, solidificación, vaporización, condensación, sublimación y deposición describen cambios de estado. Durante un cambio de fase de una sustancia pura, a presión constante, la temperatura permanece constante mientras se intercambia energía latente.</p><p>Ley de Boyle: P₁V₁ = P₂V₂ si T y n son constantes. Ley de Charles: V₁/T₁ = V₂/T₂ si P y n son constantes. Ley de Gay-Lussac: P₁/T₁ = P₂/T₂ si V y n son constantes. Ley combinada: P₁V₁/T₁ = P₂V₂/T₂ para n constante. Ecuación de gas ideal: PV = nRT. Las temperaturas en las leyes deben expresarse en kelvin; mantén compatibles las unidades de R, presión y volumen.</p><div class=\"formula-box\">PV = nRT &nbsp; · &nbsp; Temperatura absoluta: T(K) = T(°C) + 273,15</div>"],
        ["Disoluciones y concentración", "<p>Una disolución consta de soluto disuelto en disolvente. La solubilidad depende de la naturaleza de las sustancias y la temperatura; para gases también suele depender de la presión. Una disolución insaturada admite más soluto; una saturada está en equilibrio con el máximo disuelto bajo esas condiciones; una sobresaturada contiene más de la cantidad de equilibrio y es inestable.</p><p>La molaridad M expresa moles de soluto por litro de disolución. El porcentaje masa/masa compara gramos de soluto con gramos de disolución y el porcentaje volumen/volumen compara volúmenes. En diluciones sin reacción química, los moles de soluto se conservan: M₁V₁ = M₂V₂. Distingue el volumen final de disolución del volumen de disolvente añadido.</p><div class=\"formula-box\">M = moles de soluto / litros de disolución &nbsp; · &nbsp; M₁V₁ = M₂V₂</div>"],
        ["Energía, rapidez y equilibrio químico", "<p>Una reacción exotérmica libera calor al entorno; una endotérmica lo absorbe. La entalpía de reacción ΔH es negativa para un proceso exotérmico y positiva para uno endotérmico. La energía de activación es la barrera energética para que ocurra la reacción; un catalizador proporciona una vía alternativa de menor energía de activación y modifica la rapidez, no la posición del equilibrio ni la energía neta entre reactivos y productos.</p><p>La rapidez de reacción depende, entre otros factores, de concentración, temperatura, superficie de contacto y catalizadores. En una reacción reversible, el equilibrio dinámico ocurre cuando las velocidades directa e inversa son iguales. La constante de equilibrio K expresa la relación entre concentraciones de equilibrio con exponentes derivados de los coeficientes balanceados. Según Le Châtelier, un sistema en equilibrio responde a un cambio imponiendo un desplazamiento que tiende a contrarrestarlo; no confundas ese desplazamiento con un cambio del valor de K por concentración.</p>"],
        ["Ácidos, bases y pH", "<p>Según Brønsted-Lowry, un ácido dona protones H⁺ y una base los acepta. La reacción entre un ácido y una base puede producir una sal y agua. El pH = −log[H₃O⁺]; a 25 °C, pH menor que 7 indica medio ácido, pH 7 neutro y pH mayor que 7 básico. La escala es logarítmica: una diferencia de una unidad corresponde a un factor diez en concentración de H₃O⁺.</p><p>Un ácido o una base fuerte se ioniza ampliamente en agua; uno débil, solo parcialmente. En una titulación se añade una disolución de concentración conocida a otra para determinar su concentración. Un indicador cambia de color cerca de su intervalo de viraje; el punto de equivalencia es cuando las cantidades estequiométricas reaccionaron según la ecuación.</p><div class=\"formula-box\">pH = −log[H₃O⁺] &nbsp; · &nbsp; a 25 °C: pH + pOH = 14</div>"],
        ["Oxidación-reducción y electroquímica", "<p>La oxidación es pérdida de electrones; la reducción es ganancia. Una especie que se oxida aumenta su número de oxidación y actúa como agente reductor; una que se reduce disminuye su número de oxidación y actúa como agente oxidante. En una reacción redox, los electrones perdidos y ganados se igualan al balancear las semirreacciones y se conserva también la carga.</p><p>En una celda galvánica, una reacción espontánea convierte energía química en eléctrica: la oxidación ocurre en el ánodo y la reducción en el cátodo. Los electrones fluyen externamente del ánodo al cátodo. La electrólisis utiliza corriente eléctrica para impulsar una reacción no espontánea. Para asignar números de oxidación, aplica las reglas del estado elemental, los iones monoatómicos y las sumas de cargas de especies neutras e iónicas.</p>"],
        ["Química orgánica y biomoléculas", "<p>El carbono forma cuatro enlaces covalentes y cadenas y anillos estables. Hidrocarburos: alcanos (enlaces sencillos; CₙH₂ₙ₊₂ en cadenas abiertas), alquenos (al menos un doble enlace) y alquinos (al menos un triple). Los grupos funcionales incluyen alcohol (−OH), aldehído (−CHO), cetona (>C=O), ácido carboxílico (−COOH), éster (−COO−), éter (−O−), amina (−NH₂) y amida (−CONH₂).</p><p>Los isómeros tienen igual fórmula molecular y diferente estructura o disposición espacial. En las macromoléculas, carbohidratos, lípidos, proteínas y ácidos nucleicos cumplen funciones biológicas diversas. Dibuja la cadena principal, numera para dar los localizadores apropiados, identifica los sustituyentes y respeta el sistema de nomenclatura indicado en el curso.</p>"],
        ["Química ambiental y seguridad", "<p>La química ambiental estudia la composición y las transformaciones de aire, agua y suelo. Los gases de efecto invernadero absorben y reemiten radiación infrarroja; un ciclo del carbono alterado intensifica el cambio climático. Óxidos de azufre y nitrógeno pueden contribuir a lluvia ácida. Eutrofización describe el enriquecimiento de nutrientes en agua, que puede causar crecimiento excesivo de algas y reducir oxígeno disuelto. Distingue contaminante, fuente y efecto; relaciona procesos químicos con medidas de prevención, reducción, reutilización y tratamiento.</p><p>En el laboratorio, lee las etiquetas y pictogramas antes de manipular reactivos, usa protección apropiada y sigue las instrucciones institucionales. Nunca mezcles sustancias desconocidas ni pipetees con la boca; comunica derrames o exposiciones y sigue el protocolo local de emergencia. La seguridad de la persona y la disposición correcta de residuos tienen prioridad sobre cualquier experimento.</p>"]
      ]
    }
  };

  const state = {
    subject: "matematicas",
    theorySubject: "matematicas",
    session: null,
    toastTimer: null,
    toastElement: document.querySelector("#toast"),
    saved: loadProgress(),
    account: { auth: null, db: null, user: null, modules: null, unsubscribe: null, syncing: false },
    soundEnabled: false,
    audioContext: null,
    focusTimer: null,
    focusRemaining: 25 * 60,
    calculatorExpression: "",
    pathFilter: "todas"
  };
  const pdfModulesAvailable = window.ORBITA_PDF_MODULES_AVAILABLE !== false;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    })[char]);
  }

  function showToast(message) {
    state.toastElement.textContent = message;
    state.toastElement.classList.add("visible");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => state.toastElement.classList.remove("visible"), 4200);
  }

  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { sessions: [] };
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.sessions)) throw new Error("El formato de progreso guardado no es válido.");
      return { sessions: parsed.sessions.filter((item) =>
        item && ["matematicas", "quimica"].includes(item.subject) &&
        Number.isFinite(item.correct) && Number.isFinite(item.total) &&
        Number.isFinite(item.grade) && Array.isArray(item.topics)
      ).slice(-200) };
    } catch (error) {
      showToast("No se pudo leer el progreso guardado. Tus nuevas sesiones seguirán disponibles en esta visita.");
      console.error("No se pudo leer el progreso de Órbita.", error);
      return { sessions: [] };
    }
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.saved));
      return true;
    } catch (error) {
      showToast("No se pudo guardar el progreso en este dispositivo. Revisa el espacio disponible o los permisos del navegador.");
      console.error("No se pudo guardar el progreso de Órbita.", error);
      return false;
    }
  }

  function firebaseIsConfigured() {
    const config = window.ORBITA_FIREBASE_CONFIG;
    return Boolean(config && ["apiKey", "authDomain", "projectId", "appId"].every((key) =>
      typeof config[key] === "string" && config[key].length > 0 && !config[key].includes("YOUR_")
    ));
  }

  async function initializeFirebase() {
    if (location.protocol === "file:") {
      throw new Error("Para usar Google, abre la página desde localhost o desde tu dominio HTTPS, no directamente como archivo.");
    }
    if (!firebaseIsConfigured()) {
      throw new Error("Añade los datos de tu proyecto Firebase a firebase-config.js y activa Google en Authentication.");
    }
    if (state.account.modules) return state.account.modules;
    if (!state.account.initializing) {
      state.account.initializing = Promise.all([
        import("https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"),
        import("https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js")
      ]).then(([appModule, authModule, firestoreModule]) => {
        const app = appModule.initializeApp(window.ORBITA_FIREBASE_CONFIG);
        state.account.auth = authModule.getAuth(app);
        state.account.db = firestoreModule.getFirestore(app);
        state.account.modules = { ...authModule, ...firestoreModule };
        state.account.unsubscribe = authModule.onAuthStateChanged(
          state.account.auth,
          (user) => {
            state.account.user = user;
            renderAccount();
            if (document.querySelector("#perfil").classList.contains("active")) renderProfile();
            if (user) syncCloudProgress().catch((error) => {
              console.error("No se pudo sincronizar el progreso con Firebase.", error);
              showToast("No se pudo sincronizar con Google. Revisa la conexión y las reglas de Firestore.");
            });
          },
          (error) => {
            console.error("Firebase no pudo comprobar la sesión.", error);
            showToast("No se pudo verificar tu sesión de Google. Inténtalo de nuevo.");
          }
        );
        return state.account.modules;
      }).catch((error) => {
        state.account.initializing = null;
        throw error;
      });
    }
    return state.account.initializing;
  }

  function updateCloudSessionId(session) {
    if (!session.id) session.id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return session;
  }

  function isValidCloudSession(record) {
    return record && ["matematicas", "quimica"].includes(record.subject) &&
      Number.isFinite(record.correct) && Number.isFinite(record.total) &&
      Number.isFinite(record.grade) && Array.isArray(record.topics) &&
      typeof record.date === "string";
  }

  async function syncCloudProgress() {
    const { user, db, modules } = state.account;
    if (!user || !db || !modules) return;
    if (state.account.syncing) {
      state.account.pendingSync = true;
      return;
    }
    state.account.syncing = true;
    try {
      state.saved.sessions = state.saved.sessions.map(updateCloudSessionId);
      const remote = await modules.getDocs(modules.collection(db, "users", user.uid, "sessions"));
      const merged = new Map();
      remote.forEach((snapshot) => {
        const record = { ...snapshot.data(), id: snapshot.id };
        if (isValidCloudSession(record)) merged.set(record.id, record);
      });
      state.saved.sessions.forEach((record) => merged.set(record.id, record));
      state.saved.sessions = [...merged.values()]
        .sort((first, second) => Date.parse(first.date) - Date.parse(second.date))
        .slice(-200);
      saveProgress();
      await Promise.all(state.saved.sessions.map((record) =>
        modules.setDoc(modules.doc(db, "users", user.uid, "sessions", record.id), record, { merge: true })
      ));
      renderHomeStats();
      if (document.querySelector("#progreso").classList.contains("active")) renderProgress();
    } finally {
      state.account.syncing = false;
      if (document.querySelector("#perfil").classList.contains("active")) renderProfile();
      if (state.account.pendingSync) {
        state.account.pendingSync = false;
        await syncCloudProgress();
      }
    }
  }

  function renderAccount() {
    const button = document.querySelector("#account-open");
    const label = document.querySelector("#account-label");
    const name = document.querySelector("#signed-in-user");
    const signOutButton = document.querySelector("#google-sign-out");
    const disclaimer = document.querySelector("#auth-disclaimer");
    if (!button || !label) return;
    const user = state.account.user;
    button.classList.toggle("signed-in", Boolean(user));
    label.textContent = user ? user.displayName || "Cuenta conectada" : "Guardar progreso";
    name.hidden = !user;
    name.textContent = user ? `Conectada como ${user.email || user.displayName || "cuenta de Google"}.` : "";
    signOutButton.hidden = !user;
    document.querySelector("#google-sign-in").hidden = Boolean(user);
    if (disclaimer) disclaimer.hidden = firebaseIsConfigured();
  }

  function formatProfileDate(value) {
    if (!value) return "No disponible";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "No disponible"
      : new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" }).format(date);
  }

  function getStudyJourneyStats(sessions) {
    const xp = sessions.reduce((total, session) => total + (Number.isFinite(session.xp) ? session.xp : session.correct * 10), 0);
    const rankIndex = Math.min(5, Math.floor(xp / 100));
    const ranks = ["E · Aspirante", "D · Iniciado", "C · Despierto", "B · Experto", "A · Élite", "S · Maestro"];
    const days = [...new Set(sessions.map((session) => {
      const date = new Date(session.date);
      if (Number.isNaN(date.getTime())) return "";
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }).filter(Boolean))].sort((first, second) => second - first);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    for (let day = days.includes(today.getTime()) ? today.getTime() : today.getTime() - 86400000;
      days.includes(day); day -= 86400000) streak += 1;

    return {
      xp,
      rank: `Rango ${ranks[rankIndex]}`,
      rankIndex,
      xpInRank: xp % 100,
      streak
    };
  }

  function renderProfile() {
    const user = state.account.user;
    const photo = document.querySelector("#profile-photo");
    const photoFallback = document.querySelector("#profile-avatar-fallback");
    const identityName = document.querySelector("#profile-name");
    const identityEmail = document.querySelector("#profile-email");
    const status = document.querySelector("#profile-status");
    const statusLabel = status.querySelector("span");
    const action = document.querySelector("#profile-account-action");
    const copyButton = document.querySelector("#profile-copy-uid");
    const safePhoto = user && typeof user.photoURL === "string" && /^https:\/\//i.test(user.photoURL)
      ? user.photoURL
      : "";
    photo.onerror = () => {
      photo.hidden = true;
      photoFallback.hidden = false;
    };

    identityName.textContent = user ? user.displayName || "Estudiante de Órbita" : "Sesión local";
    identityEmail.textContent = user
      ? user.email || "Tu cuenta no comparte un correo electrónico."
      : "Inicia sesión con Google para consultar la información de tu cuenta.";
    photo.hidden = !safePhoto;
    photoFallback.hidden = Boolean(safePhoto);
    if (safePhoto && photo.src !== safePhoto) photo.src = safePhoto;
    action.innerHTML = user
      ? 'Administrar cuenta <span aria-hidden="true">→</span>'
      : 'Conectar Google <span aria-hidden="true">→</span>';
    status.classList.toggle("profile-status-online", Boolean(user));
    status.classList.toggle("profile-status-syncing", Boolean(user && state.account.syncing));
    statusLabel.textContent = !user
      ? "Progreso guardado en este dispositivo"
      : state.account.syncing
        ? "Sincronizando progreso con Google…"
        : "Cuenta Google conectada · nube disponible";

    const detail = (selector, value) => {
      document.querySelector(selector).textContent = value || "No disponible";
    };
    detail("#profile-detail-name", user ? user.displayName : "Inicia sesión para consultar este dato");
    detail("#profile-detail-email", user ? user.email : "Inicia sesión para consultar este dato");
    detail("#profile-detail-verified", user ? (user.email ? (user.emailVerified ? "Sí" : "Pendiente") : "No compartido") : "—");
    const providers = user ? [...new Set((user.providerData || []).map((provider) => {
      if (provider.providerId === "google.com") return "Google";
      return provider.providerId.replace(/\.com$/, "").replace(/^./, (character) => character.toUpperCase());
    }))] : [];
    detail("#profile-detail-provider", providers.length ? providers.join(", ") : user ? "Firebase" : "—");
    detail("#profile-created", user ? formatProfileDate(user.metadata.creationTime) : "—");
    detail("#profile-last-login", user ? formatProfileDate(user.metadata.lastSignInTime) : "—");
    detail("#profile-uid", user ? user.uid : "—");
    copyButton.disabled = !user;

    const { xp, rank, rankIndex, xpInRank, streak } = getStudyJourneyStats(state.saved.sessions);
    document.querySelector("#profile-rank").textContent = rank;
    document.querySelector("#profile-xp").textContent = `${xp} XP`;
    const xpFill = document.querySelector("#profile-xp-fill");
    xpFill.style.width = rankIndex === 5 ? "100%" : `${xpInRank}%`;
    document.querySelector("#profile-xp-progress").setAttribute(
      "aria-label",
      rankIndex === 5 ? `${rank}; rango máximo alcanzado` : `${rank}; ${xpInRank} de 100 XP para subir`
    );
    document.querySelector("#profile-sessions").textContent = String(state.saved.sessions.length);
    const average = state.saved.sessions.length
      ? state.saved.sessions.reduce((sum, session) => sum + session.grade, 0) / state.saved.sessions.length
      : null;
    document.querySelector("#profile-grade").textContent = average === null ? "—" : average.toFixed(1).replace(".", ",");
    document.querySelector("#profile-streak").textContent = String(streak);
  }

  const authDialog = document.querySelector("#auth-dialog");
  const authFeedback = document.querySelector("#auth-feedback");
  const profileAccountAction = document.querySelector("#profile-account-action");
  document.querySelector("#account-open").addEventListener("click", () => {
    authFeedback.textContent = "";
    authFeedback.classList.remove("visible");
    authDialog.showModal();
  });
  profileAccountAction.addEventListener("click", () => document.querySelector("#account-open").click());
  document.querySelector("#profile-copy-uid").addEventListener("click", async () => {
    const user = state.account.user;
    if (!user) return;
    try {
      await navigator.clipboard.writeText(user.uid);
      showToast("Identificador de cuenta copiado.");
    } catch (error) {
      console.error("No se pudo copiar el identificador de cuenta.", error);
      showToast("No se pudo copiar el identificador. Comprueba los permisos del navegador.");
    }
  });
  document.querySelector("#google-sign-in").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      const modules = await initializeFirebase();
      const provider = new modules.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await modules.signInWithPopup(state.account.auth, provider);
      authDialog.close();
      showToast("Cuenta de Google conectada. Tu progreso se está sincronizando.");
    } catch (error) {
      if (error && error.code === "auth/popup-blocked") {
        try {
          const modules = await initializeFirebase();
          const redirectProvider = new modules.GoogleAuthProvider();
          redirectProvider.setCustomParameters({ prompt: "select_account" });
          modules.signInWithRedirect(state.account.auth, redirectProvider).catch((redirectError) => {
            console.error("No se pudo iniciar sesión con Google mediante redirección.", redirectError);
            showToast("No se pudo abrir el acceso de Google. Revisa la conexión y los dominios autorizados de Firebase.");
          });
          authDialog.close();
          showToast("Preparando el acceso de Google…");
          return;
        } catch (redirectError) {
          console.error("No se pudo iniciar sesión con Google mediante redirección.", redirectError);
          authFeedback.textContent = "No se pudo abrir el acceso de Google. Revisa la conexión y los dominios autorizados de Firebase.";
          authFeedback.classList.add("visible");
          return;
        }
      }
      console.error("No se pudo iniciar sesión con Google.", error);
      const message = error instanceof Error ? error.message : "No se pudo iniciar sesión con Google. Revisa la configuración de Firebase.";
      authFeedback.textContent = message;
      authFeedback.classList.add("visible");
    } finally {
      button.disabled = false;
      renderAccount();
    }
  });
  document.querySelector("#google-sign-out").addEventListener("click", async () => {
    try {
      if (state.account.auth && state.account.modules) await state.account.modules.signOut(state.account.auth);
      state.account.user = null;
      renderAccount();
      showToast("Se cerró la sesión de Google. El progreso local no se borró.");
    } catch (error) {
      console.error("No se pudo cerrar la sesión de Google.", error);
      showToast("No se pudo cerrar la sesión de Google. Inténtalo de nuevo.");
    }
  });

  function renderSoundToggle() {
    const button = document.querySelector("#sound-toggle");
    button.setAttribute("aria-pressed", String(state.soundEnabled));
    button.setAttribute("aria-label", state.soundEnabled ? "Desactivar sonidos" : "Activar sonidos");
    button.title = state.soundEnabled ? "Sonidos activados" : "Sonidos desactivados";
    button.textContent = state.soundEnabled ? "♪" : "◖";
  }

  try {
    state.soundEnabled = localStorage.getItem("orbita.sound.v1") === "on";
  } catch (error) {
    console.error("No se pudo cargar la preferencia de sonido.", error);
    showToast("No se pudo leer la preferencia de sonidos del navegador.");
  }

  document.querySelector("#sound-toggle").addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    try {
      localStorage.setItem("orbita.sound.v1", state.soundEnabled ? "on" : "off");
    } catch (error) {
      console.error("No se pudo guardar la preferencia de sonido.", error);
    }
    renderSoundToggle();
    if (state.soundEnabled) playSound("correct");
  });
  renderSoundToggle();

  function playSound(kind) {
    if (!state.soundEnabled) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!state.audioContext) state.audioContext = new AudioContextClass();
    if (state.audioContext.state === "suspended") state.audioContext.resume().catch((error) => {
      console.warn("El navegador no permitió activar el sonido opcional.", error);
    });
    const frequencies = kind === "success" ? [660, 880] : kind === "error" ? [220] : [520];
    frequencies.forEach((frequency, index) => {
      const oscillator = state.audioContext.createOscillator();
      const gain = state.audioContext.createGain();
      const startAt = state.audioContext.currentTime + index * .095;
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(.022, startAt + .018);
      gain.gain.exponentialRampToValueAtTime(.0001, startAt + .11);
      oscillator.connect(gain);
      gain.connect(state.audioContext.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + .12);
    });
  }

  const toolsDialog = document.querySelector("#tools-dialog");
  document.querySelector("#tools-open").addEventListener("click", () => toolsDialog.showModal());
  document.querySelectorAll(".app-dialog").forEach((dialog) => {
    dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
    dialog.addEventListener("cancel", () => document.body.classList.remove("dialog-open"));
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener("close", () => { if (document.querySelector("dialog[open]")) document.body.classList.add("dialog-open"); });
  });
  document.querySelectorAll("#account-open, #tools-open").forEach((button) =>
    button.addEventListener("click", () => document.body.classList.add("dialog-open"))
  );

  function showFocusTime() {
    const minutes = String(Math.floor(state.focusRemaining / 60)).padStart(2, "0");
    const seconds = String(state.focusRemaining % 60).padStart(2, "0");
    document.querySelector("#focus-clock").textContent = `${minutes}:${seconds}`;
  }

  document.querySelector("#focus-start").addEventListener("click", (event) => {
    const button = event.currentTarget;
    if (state.focusTimer) {
      window.clearInterval(state.focusTimer);
      state.focusTimer = null;
      button.textContent = "Continuar";
      return;
    }
    button.textContent = "Pausar";
    state.focusTimer = window.setInterval(() => {
      state.focusRemaining -= 1;
      showFocusTime();
      if (state.focusRemaining <= 0) {
        window.clearInterval(state.focusTimer);
        state.focusTimer = null;
        button.textContent = "Empezar de nuevo";
        playSound("success");
        showToast("Completaste tu bloque de enfoque. ¡Bien hecho!");
      }
    }, 1000);
  });
  document.querySelector("#focus-reset").addEventListener("click", () => {
    if (state.focusTimer) window.clearInterval(state.focusTimer);
    state.focusTimer = null;
    state.focusRemaining = 25 * 60;
    document.querySelector("#focus-start").textContent = "Empezar";
    showFocusTime();
  });

  function evaluateCalculatorExpression(source) {
    if (!source || source.length > 80 || !/^[\d+\-*/().\s]+$/.test(source)) throw new Error("Escribe una expresión aritmética válida.");
    const tokens = source.match(/\d+(?:\.\d+)?|[()+\-*/]/g) || [];
    if (tokens.join("") !== source.replace(/\s/g, "")) throw new Error("Revisa la expresión: hay caracteres no reconocidos.");
    let cursor = 0;
    function parseFactor() {
      if (tokens[cursor] === "+") { cursor += 1; return parseFactor(); }
      if (tokens[cursor] === "-") { cursor += 1; return -parseFactor(); }
      if (tokens[cursor] === "(") {
        cursor += 1;
        const value = parseExpression();
        if (tokens[cursor] !== ")") throw new Error("Falta cerrar un paréntesis.");
        cursor += 1;
        return value;
      }
      const number = tokens[cursor];
      if (!number || !/^\d+(?:\.\d+)?$/.test(number)) throw new Error("Revisa la expresión junto al operador.");
      cursor += 1;
      return Number(number);
    }
    function parseTerm() {
      let value = parseFactor();
      while (tokens[cursor] === "*" || tokens[cursor] === "/") {
        const operator = tokens[cursor++];
        const next = parseFactor();
        if (operator === "/" && next === 0) throw new Error("No se puede dividir entre cero.");
        value = operator === "*" ? value * next : value / next;
      }
      return value;
    }
    function parseExpression() {
      let value = parseTerm();
      while (tokens[cursor] === "+" || tokens[cursor] === "-") {
        const operator = tokens[cursor++];
        const next = parseTerm();
        value = operator === "+" ? value + next : value - next;
      }
      return value;
    }
    const result = parseExpression();
    if (cursor !== tokens.length || !Number.isFinite(result)) throw new Error("Comprueba que la expresión esté completa y el resultado sea válido.");
    return Math.round((result + Number.EPSILON) * 1e10) / 1e10;
  }

  document.querySelectorAll("[data-calc]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.calc;
      const display = document.querySelector("#calc-display");
      if (key === "clear") state.calculatorExpression = "";
      else if (key === "back") state.calculatorExpression = state.calculatorExpression.slice(0, -1);
      else if (key === "equals") {
        try {
          const result = evaluateCalculatorExpression(state.calculatorExpression);
          state.calculatorExpression = String(result);
        } catch (error) {
          showToast(error.message);
          return;
        }
      } else if (state.calculatorExpression.length < 80) state.calculatorExpression += key;
      display.textContent = state.calculatorExpression || "0";
    });
  });

  const notes = document.querySelector("#study-notes");
  const notesCount = document.querySelector("#notes-count");
  try {
    notes.value = localStorage.getItem("orbita.notes.v1") || "";
    notesCount.textContent = `${notes.value.length} / 5000`;
  } catch (error) {
    console.error("No se pudieron cargar los apuntes locales.", error);
    showToast("El navegador no permitió cargar los apuntes guardados.");
  }
  notes.addEventListener("input", () => {
    notesCount.textContent = `${notes.value.length} / 5000`;
    try {
      localStorage.setItem("orbita.notes.v1", notes.value);
    } catch (error) {
      console.error("No se pudieron guardar los apuntes locales.", error);
      showToast("No se pudieron guardar los apuntes. Revisa los permisos o el espacio disponible.");
    }
  });

  function setView(name) {
    const target = document.getElementById(name);
    if (!target) return;
    document.querySelectorAll(".view").forEach((view) => {
      const active = view === target;
      view.classList.toggle("active", active);
      view.hidden = !active;
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      const active = link.dataset.view === name;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.querySelectorAll(".mobile-dock [data-view]").forEach((link) => {
      const active = link.dataset.view === name;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (name === "progreso") renderProgress();
    if (name === "inicio") renderHomeStats();
    if (name === "ruta") renderStudyPath();
    if (name === "perfil") renderProfile();
    if (name === "estudio") document.querySelector("#start-session").focus({ preventScroll: true });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-view]");
    if (!link) return;
    const name = link.dataset.view;
    if (!document.getElementById(name)) return;
    event.preventDefault();
    if (link.dataset.subject) selectSubject(link.dataset.subject);
    history.replaceState(null, "", `#${name}`);
    setView(name);
  });

  window.addEventListener("hashchange", () => {
    const view = location.hash.slice(1);
    if (document.getElementById(view)) setView(view);
  });

  function typeLabel(type) {
    return ({
      opcion: "Mejor respuesta",
      multiple: "Escoge varias respuestas",
      verdadero: "Verdadero o falso",
      completar: "Completa el espacio",
      pareo: "Pareo",
      practico: "Problema práctico"
    })[type] || "Ejercicio";
  }

  function updateTopicOptions() {
    const select = document.querySelector("#topic-select");
    const topics = [...new Set(questions[state.subject].map((question) => question.topic))];
    select.innerHTML = `<option value="todos">Todos los temas</option>${topics.map((topic) =>
      `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`
    ).join("")}`;
    select.value = "todos";
  }

  function selectSubject(subject) {
    state.subject = subject;
    document.querySelectorAll("[data-pick-subject]").forEach((item) =>
      item.classList.toggle("selected", item.dataset.pickSubject === subject)
    );
    updateTopicOptions();
  }

  function getStudyPath() {
    return ["matematicas", "quimica"].flatMap((subject) => {
      const topics = [...new Set(questions[subject].map((question) => question.topic))];
      return topics.map((topic) => ({ subject, topic }));
    });
  }

  function renderStudyPath() {
    const sessions = state.saved.sessions;
    const { xp, rank, rankIndex, xpInRank, streak } = getStudyJourneyStats(sessions);
    document.querySelector("#hunter-rank").textContent = rank;
    document.querySelector("#hunter-xp").textContent = `${xp} XP`;
    document.querySelector("#xp-next").textContent = rankIndex === 5 ? "Rango máximo" : `${100 - xpInRank} XP para subir`;
    document.querySelector("#xp-fill").style.width = rankIndex === 5 ? "100%" : `${xpInRank}%`;

    document.querySelector("#hunter-streak").textContent = String(streak);

    const results = aggregateTopics(sessions);
    const path = getStudyPath();
    const cards = path.map((mission) => {
      const subjectResults = results.find((result) => result.topic === mission.topic);
      const unlocked = !path.slice(0, path.indexOf(mission)).some((previous) =>
        previous.subject === mission.subject &&
        !(results.find((result) => result.topic === previous.topic && result.total >= 3 && result.ratio >= .8))
      );
      const complete = Boolean(subjectResults && subjectResults.total >= 3 && subjectResults.ratio >= .8);
      const done = complete;
      const progress = subjectResults ? `${subjectResults.correct}/${subjectResults.total} aciertos · ${Math.round(subjectResults.ratio * 100)} %` : "Completa la misión para desbloquear la siguiente.";
      const subjectName = mission.subject === "matematicas" ? "MATEMÁTICAS" : "QUÍMICA";
      const index = path.indexOf(mission);
      const available = unlocked || done;
      return `<button class="quest-card glass-panel${done ? " quest-done" : ""}" type="button" data-quest-index="${index}" ${available ? "" : "disabled"} aria-label="${available ? "Empezar" : "Bloqueada"}: ${escapeHtml(mission.topic)}"><span class="quest-gate" aria-hidden="true">${done ? "✓" : unlocked ? "◈" : "🔒"}</span><span class="quest-detail"><span class="eyebrow">${subjectName} · MISIÓN ${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(mission.topic)}</h3><p>${escapeHtml(progress)}</p></span><span class="quest-reward">${done ? "COMPLETADA" : unlocked ? "+50 XP" : "BLOQUEADA"}</span></button>`;
    });
    const filtered = state.pathFilter === "todas" ? cards : cards.filter((_, index) => path[index].subject === state.pathFilter);
    document.querySelector("#quest-list").innerHTML = filtered.join("");
  }

  document.querySelectorAll("[data-path-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pathFilter = button.dataset.pathFilter;
      document.querySelectorAll("[data-path-filter]").forEach((filter) =>
        filter.classList.toggle("selected", filter === button)
      );
      renderStudyPath();
    });
  });

  document.querySelector("#quest-list").addEventListener("click", (event) => {
    const quest = event.target.closest("[data-quest-index]");
    if (!quest) return;
    const mission = getStudyPath()[Number(quest.dataset.questIndex)];
    if (!mission) return;
    if (quest.disabled) {
      showToast("Completa las misiones anteriores para desbloquear este portal.");
      return;
    }
    selectSubject(mission.subject);
    document.querySelector("#topic-select").value = mission.topic;
    document.querySelector("#mode-select").value = "taller";
    history.replaceState(null, "", "#estudio");
    setView("estudio");
    startSession();
  });

  document.querySelectorAll("[data-pick-subject]").forEach((button) => {
    button.addEventListener("click", () => {
      selectSubject(button.dataset.pickSubject);
    });
  });

  function renderTheory() {
    const subject = theory[state.theorySubject];
    const subjectName = state.theorySubject === "matematicas" ? "Matemáticas" : "Química";
    const materialLink = pdfModulesAvailable
      ? `<a class="theory-link" href="${subject.pdf}" target="_blank" rel="noopener">↗ &nbsp; ${escapeHtml(subject.pdfLabel)}</a>`
      : `<span class="theory-link theory-link-unavailable" aria-label="El módulo PDF no está incluido en esta publicación">Módulo PDF no incluido</span>`;
    const intro = `<article class="theory-intro-card glass-panel"><div><span class="eyebrow">MATERIAL DE ESTUDIO · ${subject.units.length} BLOQUES TEMÁTICOS</span><h2>${escapeHtml(subject.title)}</h2><p>${escapeHtml(subject.description)}</p></div>${materialLink}</article>`;
    const units = subject.units.map(([title, content], index) =>
      `<details class="theory-unit glass-panel"><summary><span class="unit-number">${String(index + 1).padStart(2, "0")}</span><span class="unit-title">${escapeHtml(title)}</span><span class="unit-chevron" aria-hidden="true">＋</span></summary><div class="unit-content">${content}</div></details>`
    ).join("");
    const coverageText = pdfModulesAvailable
      ? `Las notas de esta página son una guía de consulta temática, no una transcripción literal ni una garantía de que cubran cada tema del programa de tu curso. Para estudiar el material completo disponible, abre el módulo original de ${subjectName} con el enlace de arriba.`
      : `Las notas de esta página son una guía de consulta temática, no una transcripción literal ni una garantía de que cubran cada tema del programa de tu curso. El módulo PDF original de ${subjectName} no se incluyó en esta publicación.`;
    const coverage = `<div class="coverage-note">${coverageText}</div>`;
    document.querySelector("#theory-content").innerHTML = `${intro}<div class="theory-units">${units}</div>${coverage}`;
  }

  document.querySelectorAll("[data-theory-subject]").forEach((button) => {
    button.addEventListener("click", () => {
      state.theorySubject = button.dataset.theorySubject;
      document.querySelectorAll("[data-theory-subject]").forEach((item) => item.classList.toggle("selected", item === button));
      renderTheory();
    });
  });

  function shuffle(list) {
    const result = [...list];
    for (let index = result.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function chooseQuestions() {
    const topic = document.querySelector("#topic-select").value;
    const mode = document.querySelector("#mode-select").value;
    let available = questions[state.subject].filter((question) => topic === "todos" || question.topic === topic);
    if (mode === "taller") {
      const topics = [...new Set(available.map((question) => question.topic))];
      if (topic === "todos" && topics.length) {
        const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
        available = available.filter((question) => question.topic === selectedTopic);
      }
      return shuffle(available);
    }
    if (mode === "practico") available = available.filter((question) => question.type === "practico");
    if (mode === "opcion") available = available.filter((question) => question.type === "opcion");
    if (mode === "multiple") available = available.filter((question) => question.type === "multiple");
    if (mode === "verdadero") available = available.filter((question) => question.type === "verdadero");
    if (mode === "completar") available = available.filter((question) => question.type === "completar");
    if (mode === "pareo") available = available.filter((question) => question.type === "pareo");
    const count = mode === "examen" ? EXAM_SIZE : SESSION_SIZE;
    return shuffle(available).slice(0, count);
  }

  function startSession() {
    const selectedQuestions = chooseQuestions();
    if (!selectedQuestions.length) {
      showToast("No hay ejercicios de este tipo para el tema seleccionado. Elige otro método o todos los temas.");
      return;
    }
    const isExam = document.querySelector("#mode-select").value === "examen";
    state.session = {
      questions: selectedQuestions,
      answers: [],
      index: 0,
      subject: state.subject,
      mode: isExam ? "Simulación de examen" : document.querySelector("#mode-select").value === "taller" ? "Taller temático" : document.querySelector("#mode-select").selectedOptions[0].textContent.split(" · ")[0],
      deadline: isExam ? Date.now() + EXAM_SECONDS * 1000 : null,
      timer: null
    };
    if (isExam) {
      state.session.timer = window.setInterval(() => updateExamTimer(), 1000);
    }
    renderQuestion();
  }

  document.querySelector("#start-session").addEventListener("click", startSession);

  function renderQuestion() {
    const session = state.session;
    if (!session) return;
    const question = session.questions[session.index];
    const current = session.index + 1;
    const progress = ((current - 1) / session.questions.length) * 100;
    const timer = session.deadline ? `<span id="exam-timer" class="session-counter">15:00</span>` : "";
    let content = "";
    if (["opcion", "multiple", "verdadero"].includes(question.type)) {
      const choices = question.type === "verdadero" ? ["Verdadero", "Falso"] : question.choices;
      const multiple = question.type === "multiple";
      content = `${multiple ? `<p class="select-many-note">Selecciona todas las opciones correctas.</p>` : ""}<div class="question-content" role="group" aria-label="${multiple ? "Selecciona varias respuestas" : "Selecciona una respuesta"}">${choices.map((choice, index) =>
        `<button class="choice-option${multiple ? " multiple-choice" : ""}" type="button" data-answer-choice="${index}" aria-pressed="false"><span class="choice-letter">${multiple ? "✓" : letters[index % letters.length]}</span><span>${escapeHtml(choice)}</span></button>`
      ).join("")}</div>`;
    } else if (question.type === "pareo") {
      content = `<div class="pair-list">${question.pairs.map((pair, index) =>
        `<label class="pair-row"><span class="pair-term">${escapeHtml(pair.term)}</span><select class="match-select" data-pair-index="${index}" aria-label="Respuesta para ${escapeHtml(pair.term)}"><option value="">Elige una respuesta</option>${shuffle(question.pairs.map((item) => item.match)).map((match) => `<option value="${escapeHtml(match)}">${escapeHtml(match)}</option>`).join("")}</select></label>`
      ).join("")}</div>`;
    } else {
      const placeholder = question.type === "completar" ? "Escribe la palabra o el número..." : "Escribe tu respuesta numérica...";
      content = `<input class="answer-input" id="answer-input" type="text" inputmode="decimal" autocomplete="off" placeholder="${placeholder}" aria-label="${placeholder}">`;
    }
    document.querySelector("#practice-area").innerHTML = `
      <article class="session-panel glass-panel">
        <div class="session-topline"><span>${escapeHtml(session.mode.toUpperCase())} · ${escapeHtml(session.subject === "matematicas" ? "MATEMÁTICAS" : "QUÍMICA")}</span><span class="session-counter">PREGUNTA ${current} / ${session.questions.length} ${timer ? `&nbsp; ${timer}` : ""}</span></div>
        <div class="progress-track" role="progressbar" aria-label="Progreso de la práctica" aria-valuemin="0" aria-valuemax="${session.questions.length}" aria-valuenow="${current - 1}"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="question-tags"><span class="chip-tag">${escapeHtml(question.topic)}</span><span class="chip-tag">${escapeHtml(typeLabel(question.type))}</span></div>
        <h2 class="question-title">${escapeHtml(question.title)}</h2>
        <p class="question-prompt">${escapeHtml(question.prompt)}</p>
        ${content}
        <div class="answer-feedback" id="answer-feedback" role="status" aria-live="polite"></div>
        <div class="session-actions"><button type="button" class="text-button" id="reveal-answer">Ver explicación</button><button type="button" class="button button-primary" id="check-answer">Comprobar respuesta <span aria-hidden="true">→</span></button></div>
      </article>`;
    document.querySelectorAll("[data-answer-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        if (question.type === "multiple") {
          const selected = !button.classList.contains("selected");
          button.classList.toggle("selected", selected);
          button.setAttribute("aria-pressed", String(selected));
        } else {
          document.querySelectorAll("[data-answer-choice]").forEach((option) => {
            option.classList.toggle("selected", option === button);
            option.setAttribute("aria-pressed", String(option === button));
          });
        }
      });
    });
    document.querySelector("#check-answer").addEventListener("click", checkAnswer);
    document.querySelector("#reveal-answer").addEventListener("click", revealAnswer);
    const input = document.querySelector("#answer-input");
    if (input) input.addEventListener("keydown", (event) => { if (event.key === "Enter") checkAnswer(); });
    if (session.deadline) updateExamTimer();
  }

  function getUserAnswer(question) {
    if (["opcion", "verdadero"].includes(question.type)) {
      const selected = document.querySelector(".choice-option.selected");
      return selected ? Number(selected.dataset.answerChoice) : null;
    }
    if (question.type === "multiple") {
      const selected = [...document.querySelectorAll(".choice-option.selected")].map((button) => Number(button.dataset.answerChoice));
      return selected.length ? selected : null;
    }
    if (question.type === "pareo") {
      const selects = [...document.querySelectorAll("[data-pair-index]")];
      if (selects.some((select) => !select.value)) return null;
      return selects.map((select) => select.value);
    }
    const input = document.querySelector("#answer-input");
    return input ? input.value.trim() : null;
  }

  function normalized(value) {
    return String(value).trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
  }

  function isCorrect(question, answer) {
    if (question.type === "opcion") return answer === question.answer;
    if (question.type === "verdadero") return (answer === 0) === question.answer;
    if (question.type === "multiple") {
      return answer.length === question.answers.length &&
        [...answer].sort((a, b) => a - b).every((choice, index) => choice === [...question.answers].sort((a, b) => a - b)[index]);
    }
    if (question.type === "pareo") return question.pairs.every((pair, index) => answer[index] === pair.match);
    const accepted = question.answers || [String(question.answer)];
    const normalizedAnswer = normalized(answer);
    if (accepted.some((item) => normalizedAnswer === normalized(item))) return true;
    if (question.type === "practico") {
      const userNumber = Number(normalizedAnswer.replace(",", "."));
      const targetNumber = Number(question.answer);
      return Number.isFinite(userNumber) && Math.abs(userNumber - targetNumber) <= Math.max(1e-9, Math.abs(targetNumber) * 1e-6);
    }
    return false;
  }

  function correctAnswerText(question) {
    if (question.type === "opcion") return question.choices[question.answer];
    if (question.type === "verdadero") return question.answer ? "Verdadero" : "Falso";
    if (question.type === "multiple") return question.answers.map((index) => question.choices[index]).join(" · ");
    if (question.type === "pareo") return question.pairs.map((pair) => `${pair.term}: ${pair.match}`).join(" · ");
    return (question.answers || [String(question.answer)])[0];
  }

  function userAnswerText(question, answer) {
    if (question.type === "pareo") {
      return answer.map((value, index) => `${question.pairs[index].term}: ${value}`).join(" · ");
    }
    if (question.type === "multiple") return answer.map((index) => question.choices[index]).join(" · ");
    if (question.type === "verdadero") return ["Verdadero", "Falso"][answer];
    if (question.type === "opcion") return question.choices[answer];
    return String(answer);
  }

  function lockFeedback(question, answer, correct) {
    const feedback = document.querySelector("#answer-feedback");
    const answerText = userAnswerText(question, answer);
    feedback.className = `answer-feedback visible ${correct ? "correct" : "incorrect"}`;
    feedback.innerHTML = `<strong>${correct ? "¡Correcto!" : "Todavía no — revisa la respuesta."}</strong>${correct ? "" : `Tu respuesta: ${escapeHtml(answerText)}. Respuesta correcta: ${escapeHtml(correctAnswerText(question))}. `}${escapeHtml(question.explanation)}`;
    state.session.answers.push({ correct, answer });
    playSound(correct ? "correct" : "error");
    document.querySelector("#check-answer").textContent = state.session.index + 1 < state.session.questions.length ? "Siguiente pregunta →" : "Ver resultados →";
    document.querySelector("#check-answer").dataset.locked = "true";
    document.querySelector("#reveal-answer").disabled = true;
    document.querySelectorAll(".choice-option, .match-select").forEach((element) => { element.disabled = true; });
    document.querySelectorAll(".choice-option").forEach((element) => element.setAttribute("aria-disabled", "true"));
    const input = document.querySelector("#answer-input");
    if (input) input.disabled = true;
  }

  function checkAnswer() {
    const session = state.session;
    if (!session) return;
    const button = document.querySelector("#check-answer");
    if (button.dataset.locked === "true") {
      session.index += 1;
      if (session.index >= session.questions.length) finishSession();
      else renderQuestion();
      return;
    }
    const question = session.questions[session.index];
    const answer = getUserAnswer(question);
    if (answer === null || answer === "") {
      showToast("Responde la pregunta antes de continuar. También puedes consultar la explicación.");
      return;
    }
    lockFeedback(question, answer, isCorrect(question, answer));
  }

  function revealAnswer() {
    const question = state.session.questions[state.session.index];
    const feedback = document.querySelector("#answer-feedback");
    feedback.className = "answer-feedback visible";
    feedback.innerHTML = `<strong>Respuesta: ${escapeHtml(correctAnswerText(question))}</strong>${escapeHtml(question.explanation)}<br>Consultar la respuesta te sirve para aprender, pero no se contará como un intento calificado.`;
    state.session.answers.push({ correct: false, answer: null, revealed: true });
    document.querySelector("#reveal-answer").disabled = true;
    document.querySelector("#check-answer").textContent = state.session.index + 1 < state.session.questions.length ? "Siguiente pregunta →" : "Ver resultados →";
    document.querySelector("#check-answer").dataset.locked = "true";
    document.querySelectorAll(".choice-option, .match-select, #answer-input").forEach((element) => { element.disabled = true; });
  }

  function updateExamTimer() {
    const session = state.session;
    if (!session || !session.deadline) return;
    const remaining = Math.max(0, Math.ceil((session.deadline - Date.now()) / 1000));
    const timer = document.querySelector("#exam-timer");
    if (timer) {
      const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
      const seconds = String(remaining % 60).padStart(2, "0");
      timer.textContent = `${minutes}:${seconds}`;
      if (remaining <= 60) timer.style.color = "var(--danger)";
    }
    if (remaining === 0) {
      window.clearInterval(session.timer);
      finishSession(true);
    }
  }

  function finishSession(timeExpired = false) {
    const session = state.session;
    if (!session) return;
    if (session.timer) window.clearInterval(session.timer);
    const correct = session.answers.filter((answer) => answer.correct).length;
    const total = session.questions.length;
    const grade = Math.round((1 + 4 * correct / total) * 10) / 10;
    const topics = [...new Set(session.questions.map((question) => question.topic))].map((topic) => {
      const related = session.questions.filter((question) => question.topic === topic);
      const right = related.filter((question) => {
        const index = session.questions.indexOf(question);
        return session.answers[index] && session.answers[index].correct;
      }).length;
      return { topic, correct: right, total: related.length };
    });
    const record = { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`, subject: session.subject, mode: session.mode, correct, total, grade, xp: correct * 10 + (correct === total ? 20 : 0), topics, date: new Date().toISOString() };
    state.saved.sessions.push(record);
    state.saved.sessions = state.saved.sessions.slice(-200);
    saveProgress();
    if (state.account.user) syncCloudProgress().catch((error) => {
      console.error("No se pudo guardar la sesión nueva en Firebase.", error);
      showToast("La sesión quedó guardada localmente, pero no se pudo sincronizar con Google.");
    });
    playSound("success");
    const review = session.questions.map((question, index) => {
      const result = session.answers[index];
      const right = Boolean(result && result.correct);
      const response = result
        ? result.revealed ? "Consultaste la explicación" : userAnswerText(question, result.answer)
        : "Sin responder (tiempo agotado)";
      return `<div class="review-row ${right ? "correct" : "incorrect"}"><strong>${right ? "✓" : "↗"} ${escapeHtml(question.title)}</strong><br>${right ? "Correcta" : `Tu respuesta: ${escapeHtml(response)} · Respuesta correcta: ${escapeHtml(correctAnswerText(question))}`}</div>`;
    }).join("");
    const gradeLabel = grade.toFixed(1).replace(".", ",");
    const recommendation = topics.filter((topic) => topic.correct < topic.total).map((topic) => topic.topic);
    const advice = recommendation.length
      ? ` Para avanzar, repasa: ${escapeHtml(recommendation.join(", "))}.`
      : " ¡No tuviste errores en esta sesión!";
    document.querySelector("#practice-area").innerHTML = `<article class="session-panel session-results glass-panel"><span class="result-emblem">${grade >= 4 ? "✦" : "✓"}</span><span class="eyebrow">${timeExpired ? "TIEMPO COMPLETADO" : "PRÁCTICA COMPLETADA"} · ${escapeHtml(session.subject === "matematicas" ? "MATEMÁTICAS" : "QUÍMICA")}</span><h2>Tu esfuerzo cuenta.</h2><p>Respondiste correctamente ${correct} de ${total} preguntas.${advice}</p><div class="result-grade">${gradeLabel}</div><div class="result-scale">Calificación de 1,0 a 5,0 · escala proporcional</div><div class="result-review">${review}</div><div class="result-actions"><button class="button button-primary" type="button" id="retry-session">Practicar de nuevo <span aria-hidden="true">→</span></button><a class="button button-quiet" href="#progreso" data-view="progreso">Ver mi progreso</a></div></article>`;
    document.querySelector("#retry-session").addEventListener("click", startSession);
    state.session = null;
    renderHomeStats();
    if (document.querySelector("#ruta").classList.contains("active")) renderStudyPath();
  }

  function aggregateTopics(sessions = state.saved.sessions) {
    const totals = new Map();
    sessions.forEach((session) => session.topics.forEach((topic) => {
      const value = totals.get(topic.topic) || { correct: 0, total: 0 };
      value.correct += topic.correct;
      value.total += topic.total;
      totals.set(topic.topic, value);
    }));
    return [...totals.entries()].map(([topic, result]) => ({ topic, ...result, ratio: result.total ? result.correct / result.total : 0 }));
  }

  function renderHomeStats() {
    const sessions = state.saved.sessions;
    document.querySelector("#home-sessions").textContent = String(sessions.length);
    if (!sessions.length) {
      document.querySelector("#home-grade").textContent = "—";
      document.querySelector("#home-strength").textContent = "Aún por descubrir";
      return;
    }
    const average = sessions.reduce((sum, session) => sum + session.grade, 0) / sessions.length;
    const topics = aggregateTopics().sort((a, b) => b.ratio - a.ratio || b.total - a.total);
    document.querySelector("#home-grade").textContent = average.toFixed(1).replace(".", ",");
    document.querySelector("#home-strength").textContent = topics.length ? topics[0].topic : "En progreso";
  }

  function renderProgress() {
    const sessions = state.saved.sessions;
    const totalQuestions = sessions.reduce((sum, session) => sum + session.total, 0);
    const totalCorrect = sessions.reduce((sum, session) => sum + session.correct, 0);
    document.querySelector("#progress-sessions").textContent = String(sessions.length);
    document.querySelector("#progress-correct").textContent = totalQuestions ? `${Math.round(totalCorrect / totalQuestions * 100)}%` : "0%";
    const average = sessions.length ? sessions.reduce((sum, session) => sum + session.grade, 0) / sessions.length : null;
    document.querySelector("#progress-grade").textContent = average === null ? "—" : average.toFixed(1).replace(".", ",");
    const topics = aggregateTopics().sort((a, b) => b.ratio - a.ratio || b.total - a.total);
    const best = topics[0];
    const needsPractice = topics.filter((topic) => topic.correct < topic.total);
    const focus = needsPractice.sort((a, b) => a.ratio - b.ratio || b.total - a.total)[0];
    document.querySelector("#best-topic").textContent = best ? best.topic : "Aún no hay datos";
    document.querySelector("#best-detail").textContent = best ? `${best.correct} de ${best.total} respuestas correctas (${Math.round(best.ratio * 100)} %).` : "Completa tu primera práctica para conocerla.";
    document.querySelector("#focus-topic").textContent = focus ? focus.topic : topics.length ? "¡Sin errores!" : "Aún no hay datos";
    document.querySelector("#focus-detail").textContent = focus
      ? `${focus.total - focus.correct} de ${focus.total} preguntas para repasar.`
      : topics.length ? "Prueba otro tema o aumenta la dificultad." : "Tus errores te ayudan a decidir qué repasar.";
    const chart = document.querySelector("#topic-chart");
    chart.innerHTML = topics.length ? topics.map((topic) => `<div class="chart-row"><span class="chart-label" title="${escapeHtml(topic.topic)}">${escapeHtml(topic.topic)}</span><div class="chart-track" role="img" aria-label="${escapeHtml(topic.topic)}: ${Math.round(topic.ratio * 100)} % de aciertos"><div class="chart-fill" style="width:${Math.round(topic.ratio * 100)}%"></div></div><span class="chart-score">${Math.round(topic.ratio * 100)}%</span></div>`).join("") : `<p class="chart-empty">Cuando completes una sesión, aquí verás tus aciertos por tema.</p>`;
    const history = [...sessions].reverse().slice(0, 8);
    document.querySelector("#session-history").innerHTML = history.length ? history.map((session) => {
      const subject = session.subject === "matematicas" ? "Matemáticas" : "Química";
      const date = new Date(session.date);
      const dateLabel = Number.isNaN(date.getTime()) ? "Fecha no disponible" : new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(date);
      return `<div class="history-row"><span class="history-subject">${escapeHtml(subject)}<small>${escapeHtml(session.mode)} · ${escapeHtml(dateLabel)}</small></span><span class="history-count">${session.correct}/${session.total} correctas</span><span class="history-grade">${session.grade.toFixed(1).replace(".", ",")} / 5,0</span></div>`;
    }).join("") : `<p class="history-empty">Todavía no hay sesiones. Cuando completes una práctica, aquí encontrarás tus resultados.</p>`;
    renderHomeStats();
  }

  document.querySelector("#reset-progress").addEventListener("click", async () => {
    if (!state.saved.sessions.length) {
      showToast("Aún no hay sesiones guardadas para borrar.");
      return;
    }
    const scope = state.account.user ? " en este dispositivo y en tu cuenta de Google" : " en este dispositivo";
    if (!window.confirm(`¿Quieres borrar todas tus sesiones y resultados${scope}? Esta acción no se puede deshacer.`)) return;
    try {
      if (state.account.user && state.account.db && state.account.modules) {
        const { db, modules, user } = state.account;
        const documents = await modules.getDocs(modules.collection(db, "users", user.uid, "sessions"));
        await Promise.all(documents.docs.map((snapshot) => modules.deleteDoc(snapshot.ref)));
      }
    } catch (error) {
      console.error("No se pudo borrar el progreso en Firebase.", error);
      showToast("No se pudo borrar el progreso de la nube. No se modificó el historial local.");
      return;
    }
    state.saved = { sessions: [] };
    const wasSaved = saveProgress();
    renderProgress();
    if (wasSaved) showToast("Tu progreso guardado se ha borrado.");
  });

  updateTopicOptions();
  renderTheory();
  renderAccount();
  renderProfile();
  renderHomeStats();
  const initialView = location.hash.slice(1);
  if (document.getElementById(initialView)) setView(initialView);
  if (location.protocol !== "file:" && firebaseIsConfigured()) {
    initializeFirebase().catch((error) => {
      console.error("No se pudo restaurar la sesión de Firebase.", error);
      showToast("No se pudo comprobar tu cuenta. El progreso de este dispositivo sigue disponible.");
    });
  }
})();
