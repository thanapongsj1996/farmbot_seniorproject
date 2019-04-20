var numSpace = 12  //Number of spaces
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
  
  // if (r == '1') {
    document.getElementById("apple").style.border = null
    document.getElementById("banana").style.border = null
    document.getElementById("lettuce").style.border = null
    document.getElementById("watering").style.border = null
    submit_Data()
  // }else{
  //   alert(r)
  // }
}

//Function for monitor the JSON data of fruitPosition & waterPosition
submit_Data = () => {
  for (indexFruit in fruitPosition) {
    if (fruitPosition[indexFruit] != null) {
      var x_position_fruit = 175 + (Math.floor(indexFruit / 3)) * 240
      var y_position_fruit = (indexFruit % 3) * 265
      objectFruit.positions.push([x_position_fruit, y_position_fruit])
    }
  }
  var jsonFruit = JSON.stringify(objectFruit) //fruitPosition in JSON

  for (indexWater in waterPosition) {
    if (waterPosition[indexWater] == 1) {
      var x_position_water = 175 + (Math.floor(indexWater / 3)) * 240
      var y_position_water = (indexWater % 3) * 265
      objectWatering.positions.push([x_position_water, y_position_water])
    }
  }
  var jsonWater = JSON.stringify(objectWatering) //waterPosition in JSON


  document.getElementById("showFruitJSON").innerHTML = jsonFruit
  document.getElementById("showWaterJSON").innerHTML = jsonWater

  microgear.publish("/fruit", objectFruit.positions);
  microgear.publish("/water", objectWatering.positions);
  console.log(objectFruit.positions)
  console.log(objectWatering.positions)
}

scan_func = () => {
  let r = confirm("Are you sure to scan?")
  if (r) {
    microgear.publish("/weed", 'ok');
    // weed_positions = prompt('Input weed positions.')
    // if (weed_positions != null && weed_positions != '') {
    //   console.log(weed_positions)
    //   alert('Sent data sucessfully!')
    //   alert(weed_positions)
    //   microgear.publish("/weed", weed_positions);
    // } else if (weed_positions == '') {
    //   alert('No data, please try again later!')
    // }
  }
}

