var gameData = {
    points: 0,
    pointsPerClick: 1,
    pointsPerClickCost: 10
  }
  
function gainpoints() { 
    gameData.points += gameData.pointsPerClick
    document.getElementById("pointsGained").innerHTML = gameData.points + " Points Gained"
}

function buyGoldPerClick() {
   if (gameData.points >= gameData.pointsPerClickCost) {
      gameData.points -= gameData.pointsPerClickCost
      gameData.pointsPerClick += 1
      gameData.pointsPerClickCost *= 2
      document.getElementById("pointsGained").innerHTML = gameData.points + " Points Gained"
      document.getElementById("perClickUpgrade").innerHTML = "Upgrade Generator (Currently Level " + gameData.pointsPerClick + ") Cost: " + gameData.pointsPerClickCost + " points"
  }
}
 
var mainGameLoop = window.setInterval(function() {
    gainpoints()
    if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
  }, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("school-project-save", JSON.stringify(gameData))
    if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
  }, 15000)

var savegame = JSON.parse(localStorage.getItem("school-project-save"))
   if (savegame !== null) {
    gameData = savegame
    if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
  }