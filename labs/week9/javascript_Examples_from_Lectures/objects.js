var car = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969
  };
car;
//var car2=car;
var car3=JSON.parse(JSON.stringify(car))
//console.log(car2.make)
//car2.year='2005';
car3.year='2000'
//console.log("car 2 year", car2.year)
console.log("car 1 year", car.year)
console.log("car 3 year", car3.year)