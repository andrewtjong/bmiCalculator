if (process.argv.length  !== 7) {
console.log(
    `You gave ${process.argv.length - 2} argument(s) to the program
    
    Please provide 5 arguments for

    weight (kg),
    height (m),
    age (years),
    whether you exercise daily? (yes or no),
    and your gender (m or f)

    Example:

    $ node index.js 82 1.79 32 yes m
    `);
    process.exit();
};

var weightInKg = parseInt(process.argv[2]);
var heightInM = parseFloat(process.argv[3]);
var age = parseInt(process.argv[4]);
var dailyExercise = process.argv[5];
// get input of wether a user is 'm' or 'f' using process.argv
var gender = process.argv[6];

if (isNaN(weightInKg)|| isNaN(heightInM) || isNaN(age)) {
    console.log(`
    Please make sure weight, height & age are numbers:

    weight (kg) example 82 | your input: ${process.argv[2]} 
    height (m) example 1.89 | your input: ${process.argv[3]} 
    age (years) example 29 | your input: ${process.argv[4]} 

    `);
    process.exit();
};

if (age <= 20) {
    console.log(`
    This BMI calculator is designed for people over 20.
    `);
    process.exit();
};

if (weightInKg <= 30 || weightInKg >= 300) {
    console.log(`
    Please provide a number for weight in kilograms between 30 and 300
    
    weight (kg) example 75 | your input: ${process.argv[2]}'
    
    `);
    process.exit();
};

if (dailyExercise !== "yes" && dailyExercise !== "no") {
    console.log(`
    Please specify if you exercise daily with "yes" or "no"
    
    Do you exercise daily? yes or no | your input ${process.argv[5]}
    `);
    process.exit();
};

// The formula for BMI is: weight (kg) / (height (m) x height (m))
var bmi = weightInKg /(heightInM * heightInM);

// Assumption: ideal BMI is 22.5
// The formula for idealWeight is 22.5 x height (m) x height (m)
var idealWeight = 22.5 * heightInM * heightInM;

var heightInCm = heightInM * 100;

// The formula for Basal Metabolic Rate (BMR) is: 10 x weight (kg) + 6.25 x height (cm) - 5 x age
// var bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age;

// If you are a man we add 50 calories to your Basal Metabolic Rate
// If you are a woman we can subtract 150 calories from the Basal Metabolic Rate

var bmr = gender === "m" ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 50 : 
10 * weightInKg + 6.25 * heightInCm - 5 * age - 150;

var dailyCalories;

//  If a person exercises daily, daily calories is BMR x 1.6, if not BMR x 1.4
var dailyCalories = dailyExercise === "yes" ? dailyCalories = bmr * 1.6 : dailyCalories = bmr * 1.4;

// The amount of weight to lose to reach your idealweight is: weight (kg) - ideal weight (kg)
var loseWeight = weightInKg - idealWeight;

if (Math.sign(loseWeight) === 1) {
    consumeCalories = bmr - 500;
} else {
    consumeCalories = bmr + 500;
}

var consumeCalories;

// The time (weeks) it will take to reach your ideal weight is: amount of weight to lose / 0.5
var weeksToIdealWeight = loseWeight / 0.5;

// Assumption: calories for a normal lifestyle is BMR * 1.4
var burnCalories = bmr * 1.4;

console.log(`
**************
BMI CALCULATOR
**************

age: ${age} years
gender ${gender}
height: ${heightInM} m
weight: ${weightInKg} kg
Do you exercise daily? ${dailyExercise}

****************
FACING THE FACTS
****************

Your BMI is ${Math.round(bmi)}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${Math.round(idealWeight)} kg
With a normal lifestyle you burn ${Math.round(burnCalories)} calories a day.

**********
DIET PLAN
**********

If you want to reach your ideal weight of ${Math.round(idealWeight)} kg.
Eat ${Math.round(consumeCalories)} calories a day for ${Math.abs(Math.round(weeksToIdealWeight))} weeks.
`);

/*
// Option 1: pass it into the Number() function
var numberConvertedFromString = Number("1.79");
console.log(numberConvertedFromString); // 1.79, not '1.79'

// Option 2: parse an integer from a string (kg gets ignored!)
var integerFromString = parseInt("82 kg");
console.log(integerFromString); // 82

// Option 3: parse a floating point number (number with decimal places) from a string
var floatParsedFromString = parseFloat("1.79 meters");
console.log(floatParsedFromString); // 1.79

// If there are letter characters before the number you will get NaN (Not a Number)
var nope = parseInt("I am 82 kg");
console.log(nope); // NaN
var alsoDoesNotWork = parseFloat("I am 1.79 tall");
console.log(alsoDoesNotWork); // NaN
*/