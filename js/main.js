var raha = 15
var masin = []
var lastUpdate = Date.now()

if (Date.now()) alert("See mäng pole veel valmis ja selles võib olla (ilmselt ongi) palju vigu sees.")

for (let i = 0; i < 10; i++) {
  let masinad = {
    hind: Math.pow(Math.pow(35, i), i * 1.025) * 15,
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
  g.korrutaja = Math.pow(g.korrutaja, 1.07) * 1.2 * Math.pow(1.2, 1.4645) - 0.522 * g.korrutaja
  if ((g.ostetud > 20) && (g.ostetud < 75)) g.korrutaja *= 1.035
  if ((g.ostetud > 40) && (g.ostetud < 150)) g.korrutaja *= 1.035
  if ((g.ostetud > 75) && (g.ostetud < 100)) g.korrutaja *= 1.05
  if ((g.korrutaja > (g.hind-1e100)) && (g.korrutaja > 1e50)) g.korrutaja *= 1.0015^g.bought
  g.hind = Math.pow(g.hind, 1.06)
}

function updateGUI() {
  document.getElementById("rahaühik").textContent = "Sul on " + format(raha) + "€"
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
