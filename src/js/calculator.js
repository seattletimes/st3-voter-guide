var propertyTaxIncrease = function(property) {
  return property * .00025;
};

var salesTax = [
  { income: 0, diff: 50 },
  { income: 15, diff: 65 },
  { income: 25, diff: 81 },
  { income: 35, diff: 94 },
  { income: 45, diff: 111 },
  { income: 55, diff: 131 },
  { income: 70, diff: 152 },
  { income: 85, diff: 179 },
  { income: 105, diff: 214 },
  { income: 140, diff: 330 }
];

var salesTaxIncrease = function(income) {
  income /= 1000;
  if (income == 0) return 0;
  for (var i = salesTax.length - 1; i >= 0; i--) {
    var bracket = salesTax[i];
    if (income > bracket.income) return bracket.diff;
  }
};

var carTabIncrease = function(rta) {
  return rta * (8 / 3) * .93;
};

var calculatorElement = document.querySelector(".calculator");

var process = function() {

  var formula = {
    property: propertyTaxIncrease,
    sales: salesTaxIncrease,
    car: carTabIncrease
  }

  var total = 0;
  for (var k in formula) {
    var input = calculatorElement.querySelector(`[data-in="${k}"]`);
    var value = input.value.replace(/[$,]/g, "") * 1;
    var increase = formula[k](value);
    total += increase;
    var output = calculatorElement.querySelector(".output." + k);
    output.innerHTML = "$" + increase.toFixed(2);
  }

  calculatorElement.querySelector(".total.output").innerHTML = "$" + total.toFixed(2);

};

process();

calculatorElement.addEventListener("keyup", process);