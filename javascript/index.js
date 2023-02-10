//creo un array de objetos con 3 elementos
const heroes = [
  {
    nombre: "IronMan",
    superPoder: "Millonario",
    ciudad: "Manhattan",
  },
  {
    nombre: "Thor",
    superPoder: "Control de rayos",
    ciudad: "Asgard",
  },
  {
    nombre: "Hulk",
    superPoder: "Dayton",
    ciudad: "Fuerza bruta",
  },
  {
    nombre: "SpiderMan",
    superPoder: "Queens",
    ciudad: "Sentido aracnido",
  },
  {
    nombre: "Capitan America",
    superPoder: "Brooklyn ",
    ciudad: "Super Fuerza",
  },
  {
    nombre: "Thanos",
    superPoder: "Intelecto superior",
    ciudad: "Titán",
  },
];

const personajes = [
  {
    nombre: "ultron",
  },
  {
    nombre: "loki",
  },
  {
    nombre: "abominacion",
  },
  {
    nombre: "venom",
  },
  {
    nombre: "craneo rojo",
  },
  {
    nombre: "Thanos",
  },
];

const elegirPeleador = () => {
  let mensaje = `ìngrese su heroe para enfrentar al vengador`;
  personajes.forEach((value, index) => {
    mensaje += `
      ${index + 1} - ${value.nombre} 
  `;
  });

  return parseInt(prompt(mensaje));
};

for (let i = 0; i < heroes.length; i++) {
  console.log("==================");
  console.log("nombre: " + heroes[i].nombre);
  console.log("superPoder: " + heroes[i].superPoder);
  console.log("ciudad: " + heroes[i].ciudad);
}

var psj = ["ultron", "loki", "abominacion", "venom", "craneo rojo", "Thanos"];

psj.forEach((value, index) => {
  console.log("value", value);
  console.log("index", index);
});

//validacion para continuar jugando o abandonar el juego
const validacion = () => {
  let seguirJugando = confirm("quiere seguir jugando?");
  if (seguirJugando) {
    alert("Volviendo a pelear");
    return seguirJugando;
  } else {
    alert("Saliendo del programa");
    return seguirJugando;
  }
};
//primer pregunta para iniciar el juego
let opcion = confirm("te animas a enfrentar al vengador?");
console.log(opcion);
//este if valida continuar el juego despues de una partida
if (opcion) {
  while (opcion) {
    //usuario ingresa el dato para iniciar
    let adversario = elegirPeleador();
    //verifico que sea un dato valido
    if (adversario != "esc" && adversario != "" && adversario != null) {
      juegoMarvel(adversario);
      opcion = validacion();
    } else {
      //aviso que el dato no es valido y vuelvo a preguntar
      alert("dato invalido debilucho");
      opcion = validacion();
    }
  }
} else {
  //si el dato "opcion" es false abandona el juego
  alert("Abandonando el juego");
}
//funcion para jugar, switch para definir los casos
function juegoMarvel(adversario) {
  //la variable vengador cambia dependiendo del dato ingrsado por usuario
  let vengador = "";
  switch (adversario) {
    case "ultron":
      vengador = "IronMan";
      console.log(`${vengador} vs ${adversario}`);
      alert(` ${vengador} fue el encargado de humillarte`);
      break;

    case isNaN("loki"):
      vengador = "Thor";
      console.log(`${vengador} vs ${adversario}`);
      alert(` ${vengador} fue el encargado de humillarte`);
      break;

    case "abominacion":
      vengador = "Hulk";
      console.log(`${vengador} vs ${adversario}`);
      alert(` ${vengador} fue el encargado de humillarte`);
      break;
    case "venom":
      vengador = "SpiderMan";
      console.log(`${vengador} vs ${adversario}`);
      alert(` ${vengador} fue el encargado de humillarte`);
      break;
    case "craneo rojo":
      vengador = "Capitan America";
      console.log(`${vengador} vs ${adversario}`);
      alert(` ${vengador} fue el encargado de humillarte`);
      break;
    default:
      vengador = "Thanos";
      console.log(`${vengador} vs ${adversario}`);
      alert(`Tu Victoria no durará por mucho tiempo...`);
      break;
  }
}
