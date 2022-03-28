const prompt = require("prompt-sync")();

const AsciiTable = require("ascii-table");
let table;
let jogar = true;
console.log(
  "A guerra da Ucrânia desencadeou uma terceira Guerra Mundial. A população foi dizimada graças as bombas nucleares e e armas biologicas. Poucos sobreviveram, porem não por muito tempo, com o fim da guerra e das sociedades, o mundo esta totalmente desconhecidos, com vários perigos como minas abandonadas, e criaturas mutadas por causa da radiação."
);
console.log("Preparado para essa aventura?");

//itens a ser jogados aleatoriam
const suprimentos = [
  "agua",
  "carne",
  "corda",
  "madeira",
  "peixe",
  "mel",
  "tecido",
  "ervaMedicinal",
];

const criaturas = {
  zumbi: {
    vida: 10,
    ataque: 10,
  },
  gorilaMutante: {
    vida: 40,
    ataque: 20,
  },
  serpentes: {
    vida: 10,
    ataque: 5,
  },
  vespaGigante: {
    vida: 10,
    ataque: 8,
  },
};
//diminuir a sede do player
const usaveis = {
  tomar: function () {
    let op;
    while (op != 1 && op != 2) {
      console.log("[1] ÁGUA (-5 sede)");
      console.log("[2] MEL (+5 energia");
      op = +prompt();
      switch (op) {
        case 1:
          if (player.bag.agua > 4 && player.sede > 4) {
            player.sede -= 5;
            player.bag.agua -= 5;
          } else {
            if (player.bag.agua < 5) {
              console.log("Água insuficiente");
            }
          }
          break;
        case 2:
          if (player.bag.mel > 4 && player.energia > 4) {
            player.energia += 5;
            player.bag.mel -= 5;
          } else {
            if (player.bag.mel < 5) {
              console.log("Mel insuficiente");
            }
          }
          break;
        default:
          console.log("Digite um valor válido");
      }
    }
  },

  //aumentar energia do player
  comer: function () {
    let op;
    while (op != 1 && op != 2) {
      console.log("[1] carne ( -5 fome)");
      console.log("[2] peixe (-3 fome");
      op = +prompt();
      switch (op) {
        case 1:
          if (player.bag.carne >= 5 && player.fome >= 5) {
            player.fome -= 5;
            player.bag.carne -= 5;
          } else {
            console.log("Você não tem carne suficiente.");
            break;
          }
        case suprimentos.peixe:
          if (player.bag.peixe >= 3 && player.fome >= 3) {
            player.fome -= 3;
            player.bag.peixe -= 3;
          } else {
            console.log("Você não tem peixe suficiente.");
            break;
          }
        default:
          console.log("Digite um valor válido");
      }
    }
  },
  //aumentar ataque do player
  equiparArmas: function () {
    let op;
    while (op != 1 && op != 2) {
      console.log("Para fazer uma lança necessita de 1 madeira");
      console.log(
        "Para fazer um arco-flecha necessita de 1 madeira e uma corda"
      );
      console.log("[1] criar lança)");
      console.log("[2] criar arco-flexa");
      op = +prompt();
      switch (op) {
        case 1:
          if (player.bag.madeira > 0) {
            console.log("Você fez uma lança. (+1 ataque)");
            player.ataque++;
            player.bag.madeira--;
            break;
          } else {
            console.log("Madeira insuficiente.");
          }
        case 2:
          if (player.bag.madeira > 0) {
            console.log("Você fez um arco-flecha. (+3 ataque)");
            player.ataque += 3;
            player.bag.madeira--;
            player.bag.corda--;
          } else {
            console.log("Madeira insuficiente.");
          }
          break;
        default:
          console.log("Digite um valor válido");
      }
    }
  },

  //curar o player
  curar: function () {
    if (player.bag.ervaMedicinal >= 5 && suprimentos.tecido >= 5) {
      console.log("Você fez curativos. ( +10 vida)");
      player.vida += 10;
      player.bag.tecido -= 5;
      player.bag.ervaMedicinal -= 5;
    } else {
      if (player.bag.ervaMedicinal < 5 && player.bag.tecido < 5) {
        console.log("Você não tem erva medicinal e tecido suficiente.");
      } else if (player.bag.ervaMedicinal < 5) {
        console.log("Você não tem erva medicinal suficiente.");
      } else if (player.bag.tecido < 5) {
        console.log("Você não tecido suficiente.");
      }
    }
  },
};

//player ganha força atraves de combates
//player ganha agilidade atraves da exploração

const player = {
  vida: 100,
  energia: 100,
  forca: 1,
  agilidade: 2,
  sede: 0,
  sono: 0,
  fome: 0,
  bag: {
    agua: 0,
    carne: 0,
    corda: 0,
    madeira: 0,
    peixe: 0,
    mel: 0,
    tecido: 0,
    ervaMedicinal: 0,
  },
  geraAtaque: function () {
    return (this.forca * this.agilidade) / 2;
  },
};
function espalharItens() {
  return suprimentos[Math.floor(Math.random() * suprimentos.length)];
}
let listaInimigos = [];
Object.keys(criaturas).forEach((item) => {
  listaInimigos.push(item);
});
function espalhaInimigos() {
  let inimigo = listaInimigos[Math.floor(Math.random() * listaInimigos.length)];
  return inimigo;
}

function espalhar() {
  let listaEspalhar = [espalhaInimigos(), espalharItens()];
  return listaEspalhar[Math.floor(Math.random() * listaEspalhar.length)];
}
function explorar() {
  let esc = espalhar();
  console.log("[N] NORTE");
  console.log("[S] SUL");
  console.log("[L] LESTE");
  console.log("[O] OESTE");
  let op = prompt().toUpperCase();
  switch (op) {
    case "N":
      player.energia -= 2;
      player.sono += 3;
      player.sede += 5;
      player.agilidade++;
      console.log(esc);
      if (suprimentos.includes(esc)) {
        console.log(`Você encontrou ${esc}`);
        player.bag[esc] += 2;
      } else if (listaInimigos.includes(esc)) {
        console.log(`Cuidado! Um(a) ${esc}, te tirou ${criaturas[esc].ataque} de vida.
        `);
        player.vida -= criaturas[esc].ataque;
        criaturas[esc].vida -= player.ataque;
        if (criaturas[esc].vida < 1) {
          console.log(`Voce matou um(a) ${esc}`);
          player.forca++;
        } else if (player.vida < 1) {
          console.log(`Um(a) ${esc} te matou.`);
          gameOver();
        }
      }
      break;
    case "S":
      player.energia -= 2;
      player.sono += 3;
      player.sede += 5;
      player.agilidade++;
      if (suprimentos.includes(esc)) {
        console.log(`Você encontrou ${esc}`);
        player.bag[esc] += 3;
      } else if (listaInimigos.includes(esc)) {
        console.log(`Cuidado! Um(a) ${esc}, te tirou ${criaturas[esc].ataque} de vida.
        `);
        player.vida -= criaturas[esc].ataque;
        criaturas[esc].vida -= player.ataque;
        if (criaturas[esc].vida < 1) {
          console.log(`Voce matou um(a) ${esc}`);
          player.forca++;
        } else if (player.vida < 1) {
          console.log(`Um(a) ${esc} te matou.`);
          gameOver();
        }
      }
      break;
    case "L":
      player.energia--;
      player.sono += 10;
      player.sede += 5;
      player.agilidade++;
      if (suprimentos.includes(esc)) {
        console.log(`Você encontrou ${esc}`);
        player.bag[esc] += 3;
      } else if (listaInimigos.includes(esc)) {
        console.log(`Cuidado! Um(a) ${esc}, te tirou ${criaturas[esc].ataque} de vida.
        `);
        player.vida -= criaturas[esc].ataque;
        criaturas[esc].vida -= player.ataque;
        if (criaturas[esc].vida < 1) {
          console.log(`Voce matou um(a) ${esc}`);
          player.forca++;
        } else if (player.vida < 1) {
          console.log(`Um(a) ${esc} te matou.`);
          gameOver();
        }
      }
      break;
    case "O":
      player.energia -= 5;
      player.sono += 10;
      player.sede += 5;
      player.agilidade++;
      player.fome += 5;
      if (suprimentos.includes(esc)) {
        console.log(`Você encontrou ${esc}`);
        player.bag[esc] += 3;
      } else if (listaInimigos.includes(esc)) {
        console.log(`Cuidado! Um(a) ${esc}, te tirou ${criaturas[esc].ataque} de vida.
        `);
        player.vida -= criaturas[esc].ataque;
        criaturas[esc].vida -= player.ataque;
        if (criaturas[esc].vida < 1) {
          console.log(`Voce matou um(a) ${esc}`);
          player.forca++;
        } else if (player.vida < 1) {
          console.log(`Um(a) ${esc} te matou.`);
          gameOver();
        }
      }
      break;
  }
}
function chamaStatus() {
  console.clear();
  table = new AsciiTable();
  const listaStatus = [];
  Object.keys(player).forEach((item) => {
    listaStatus.push(item);
    player.ataque = player.geraAtaque();
    if (item != "bag" && item != "geraAtaque") {
      table.addRow(item, player[item]);
    }
  });
  return table.toString();
}
function chamaMochila() {
  console.clear();
  table = new AsciiTable();
  let objMochila = player.bag;
  const listaMochila = [];
  Object.keys(objMochila).forEach((item) => {
    listaMochila.push(item);
    table.addRow(item, objMochila[item]);
  });
  return table.toString();
}

function main() {
  let opcao;
  chamaStatus();
  while (jogar) {
    console.log("[1] STATUS");
    console.log("[2] MOCHILA");
    console.log("[3] BEBER");
    console.log("[4] COMER");
    console.log("[5] CURAR");
    console.log("[6] ARMA");
    console.log("[7] EXPLORAR");
    console.log("[8] SAIR DO JOGO");
    opcao = +prompt();

    switch (opcao) {
      case 1:
        let status = chamaStatus();
        console.log(status);
        break;
      case 2:
        console.log(chamaMochila());
        break;
      case 3:
        usaveis.tomar();
        break;
      case 4:
        usaveis.comer();
        break;
      case 5:
        usaveis.curar();
        break;
      case 6:
        usaveis.equiparArmas();
        break;
      case 7:
        explorar();
        break;
      case 8:
        gameOver();
        break;
      default:
        console.log("Digite um valor válido");
    }

    console.log("Digite [ENTER] para voltar ao menu principal");
    prompt();
    console.clear();
  }
}
function gameOver() {
  console.log("GAME OVER!");
  let op;
  while (op != 1 && op != 2) {
    console.log("Iniciar o jogo novamente?");
    console.log("[1] SIM");
    console.log("[2] NÃO");
    op = +prompt();
    switch (op) {
      case 1:
        main();
        break;
      case 2:
        jogar = false;
        break;
      default:
        console.log("Digite um valor válido");
    }
  }
}
main();
