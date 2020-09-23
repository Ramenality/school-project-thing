var money = 10
var generators = []
var lastUpdate = Date.now()

for (let i = 0; i < 10; i++) {
    let generator = {
        cost: Math.pow(Math.pow(10, i), i),
        bought: 0,
        amount: 0,
        mult: 1
    }
    generators.push(generator)
}

function format(amount) {
    let power = Math.floor(Math.log10(amount))
    let mantissa = amount / Math.pow(10, power)
    if (power < 3) return amount.toFixed(2)
    return mantissa.toFixed(2) + "e" + power
}


function updateGUI() {
    document.getElementById("currency").textContent = "You have $ " + format(money)
    for (let i = 0; i < 10; i++) {
        let g = generators[i]
        document.getElementById("gen" + (i + 1)).innerHTML = "Amount " + format(g.amount) + "<br>Bought: " + g.amount + "<br>Mult " + format(g.mult) + "x<br>Cost: " + format(g.cost)
    }
}
function productionLoop(diff) {
    money += generators[0].amount * generators[0].mult * diff
    for (let i = 1; i < 10; i++) {
        generators[i - 1].amount += generators[i].amount * generators[i].mult * diff / 5
    }
}

function MainLoop() {
    var diff = (Date.now() - lastUpdate) / 1000
    
    productionLoop(diff)
    updateGUI

    lastUpdate = Date.now()
}

setInterval(MainLoop, 50)

updateGUI()