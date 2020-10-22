var raha = 10
var masin = []
var lastUpdate = Date.now()

for (let i = 0; i < 10; i++) {
  let masinad = {
    hind: Math.pow(Math.pow(10, i), i) * 10,
    ostetud: 0,
    kogus: 0,
    korrutaja: 1
  }
  masin.push(masinad)
}

function format(kogus) {
  let power = Math.floor(Math.log10(kogus))
  let mantissa = kogus / Math.pow(10, power)
  if (power < 3) return kogus.toFixed(2)
  return mantissa.toFixed(2) + "e" + power
}

function OstaMasin(i) {
  let g = masin[i - 1]
  if (g.hind > raha) return
  raha -= g.hind
  g.kogus += 1
  g.ostetud += 1
  g.korrutaja = Math.pow(g.korrutaja, 1.05)*1.2*Math.pow(1.2, 1.4965)-0.522*g.korrutaja
  g.hind = Math.pow(g.hind, 1.06)
}


function updateGUI() {
  document.getElementById("rahaühik").textContent = "Sul on €" + format(raha)
  for (let i = 0; i < 10; i++) {
    let g = masin[i]
    document.getElementById("gen" + (i + 1)).innerHTML = "Kogus: " + format(g.kogus) + "<br>Ostetud: " + g.ostetud + "<br>Korrutaja: " + format(g.korrutaja) + "x<br>Hind: " + format(g.hind) + "€"
    if (g.hind > raha) document.getElementById("gen" + (i + 1)).classList.add("lukus")
    else document.getElementById("gen" + (i + 1)).classList.remove("lukus")
  }
}

function productionLoop(diff) {
  raha += masin[0].kogus * masin[0].korrutaja * diff
  for (let i = 1; i < 10; i++) {
    masin[i - 1].kogus += masin[i].kogus * masin[i].korrutaja * diff / 5
  }
}

function mainLoop() {
  var diff = (Date.now() - lastUpdate) / 1000

  productionLoop(diff)
  updateGUI()

  lastUpdate = Date.now()
}

setInterval(mainLoop, 50)

updateGUI()
