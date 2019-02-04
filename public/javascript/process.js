var numSpace = 16  //Number of spaces
var waterStatus = false
var fruitPosition = []
var waterPosition = []
var objectFruit = { command: "plat", positions: [] }
var objectWatering = { command: "water", positions: [] }

// Creating array for fruitPosition & waterPosition
for (var i = 0; i <= numSpace - 1; i++) {
  fruitPosition.push(null)
  waterPosition.push(0)
}

//Function for monitor the position of fruits and watering area
show_data = () => {
  document.getElementById("Array_fruits").innerHTML = fruitPosition
  document.getElementById("Array_water").innerHTML = waterPosition
}

//Function for checking the type of image clicked and the action after clicked
imgTypes = (type) => {
  this.imgType = type
  if (imgType == 'apple') {
    document.getElementById("apple").style.border = "thin solid #0000FF"
    document.getElementById("banana").style.border = null
    document.getElementById("lettuce").style.border = null
    document.getElementById("watering").style.border = null
    document.getElementById("apple").style.borderRadius = "10px"
  }
  else if (imgType == 'banana') {
    document.getElementById("apple").style.border = null
    document.getElementById("banana").style.border = "thin solid #0000FF"
    document.getElementById("lettuce").style.border = null
    document.getElementById("watering").style.border = null
    document.getElementById("banana").style.borderRadius = "10px"
  }
  else if (imgType == 'lettuce') {
    document.getElementById("apple").style.border = null
    document.getElementById("banana").style.border = null
    document.getElementById("lettuce").style.border = "thin solid #0000FF"
    document.getElementById("watering").style.border = null
    document.getElementById("lettuce").style.borderRadius = "10px"
  }
  else if (imgType == 'watering') {
    document.getElementById("apple").style.border = null
    document.getElementById("banana").style.border = null
    document.getElementById("lettuce").style.border = null
    document.getElementById("watering").style.border = "thin solid #0000FF"
    document.getElementById("watering").style.borderRadius = "10px"
  }
  else if (imgType == 'watering_all') {
    document.getElementById("apple").style.border = null
    document.getElementById("banana").style.border = null
    document.getElementById("lettuce").style.border = null
    document.getElementById("watering").style.border = null
    waterAll()
  }
}

//Fuction for show image of fruit or watering area
show = (id) => {
  if (fruitPosition[id] != imgType) {
    if (imgType == 'apple') {
      fruitPosition[id] = 'apple'
      document.getElementById("space" + id).innerHTML = ' <img src="img/apple.png" style="height: 100%; width: 100%;"> '
    }
    else if (imgType == 'banana') {
      fruitPosition[id] = 'banana'
      document.getElementById("space" + id).innerHTML = ' <img src="img/banana.png" style="height: 100%; width: 100%;"> '
    }
    else if (imgType == 'lettuce') {
      fruitPosition[id] = 'lettuce'
      document.getElementById("space" + id).innerHTML = ' <img src="img/lettuce.png" style="height: 100%; width: 100%;"> '
    }
    else if (imgType == 'watering') {
      if (waterPosition[id] == 0) {
        waterPosition[id] = 1
        document.getElementById("space" + id).style.backgroundColor = "lightblue"
      } else {
        waterPosition[id] = 0
        document.getElementById("space" + id).style.backgroundColor = "antiquewhite"
      }
    }
  }
  else if (fruitPosition[id] == imgType) {
    fruitPosition[id] = null
    document.getElementById("space" + id).innerHTML = null
  }
  show_data()
}

//Function for watering all area or not
waterAll = () => {
  if (!waterStatus) {
    for (var id in waterPosition) {
      document.getElementById("space" + id).style.backgroundColor = "lightblue";
      waterPosition[id] = 1
    }
    waterStatus = !waterStatus
  } else {
    for (var id in waterPosition) {
      document.getElementById("space" + id).style.backgroundColor = "antiquewhite";
      waterPosition[id] = 0
    }
    waterStatus = !waterStatus
  }
  show_data()
}

//Fuction run when user click OK button
confirm_func = () => {
  var r = confirm("Comfirm data? You will not be able to edit!")
  if (r == true) {
    document.getElementById("apple").style.border = null
    document.getElementById("banana").style.border = null
    document.getElementById("lettuce").style.border = null
    document.getElementById("watering").style.border = null
    submit_Data()
  }
}

//Function for monitor the JSON data of fruitPosition & waterPosition
submit_Data = () => {
  for (indexFruit in fruitPosition) {
    if (fruitPosition[indexFruit] != null) {
      var x_position_fruit = 5 + (indexFruit % 4) * 10
      var y_position_fruit = 5 + (Math.floor(indexFruit / 4)) * 10
      objectFruit.positions.push([x_position_fruit, y_position_fruit])
    }
  }
  var jsonFruit = JSON.stringify(objectFruit) //fruitPosition in JSON

  for (indexWater in waterPosition) {
    if (waterPosition[indexWater] == 1) {
      var x_position_water = 5 + (indexWater % 4) * 10
      var y_position_water = 5 + (Math.floor(indexWater / 4)) * 10
      objectWatering.positions.push([x_position_water, y_position_water])
    }
  }
  var jsonWater = JSON.stringify(objectWatering) //waterPosition in JSON


  document.getElementById("showFruitJSON").innerHTML = jsonFruit
  document.getElementById("showWaterJSON").innerHTML = jsonWater
  console.log(jsonWater, jsonFruit)

  microgear.publish("/fruit",objectFruit.positions);
  microgear.publish("/water",objectWatering.positions);
}