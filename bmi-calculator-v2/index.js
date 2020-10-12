function calculateBMI(weight, height) {
    return weight / (height * height);
};

function calculateBMR(weight, height, ageOfUser, genderOfUser) {
    const heightInCm = height * 100;
    let BMR;
    if (genderOfUser === "m") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
    } else {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
    };
    return BMR;
};

function calculateIdealWeight(height) {
    let idealWeight = 22.5 * height * height;
    return Math.round(idealWeight);
};

function calculateDailyCalories(doesUserExercise, bmrOfUser) {
    // console.log("input to function OK:", doesUserExercise, bmrOfUser);
    let dailyCalories;
    return doesUserExercise === "yes" ? dailyCalories = bmrOfUser * 1.60: dailyCalories = bmrOfUser * 1.40;
} ;

function calculateDietWeeks(weightToLose) {
    return Math.abs(weightToLose / 0.5);
};

function calculateDietCalories(weightToLose, dailyCalories) {
    return weightToLose > 0 ? dailyCalories - 500 : dailyCalories + 500;
};

function validateNumberOfInputs(argv) {
    if (argv.length !== 7)  {
        console.log(`
        You gave ${argv.length - 2} argument(s) to the program

        Please provide 5 arguments for:

        weight (kg)
        height (m)
        age (years)
        whether you exercise daily (yes or no)
        and your gender (m or f)

        Example:

        $ node index.js 75 1.77 29 yes m
        `);
            process.exit();
    };
};

function validateWeightHeightAndAge(weight, height, age) {
    if ( isNaN(weight) || isNaN(height) || isNaN(age) ) {
        console.log(`
        Please make sure weight, height and age are numbers:

        weight (kg) for example 82 | your input ${process.argv[2]}
        height (m) for example 1.79 | your input ${process.argv[3]}
        age (years) for example 32 | your input ${process.argv[4]}
        
        `);
        process.exit();
    };

    if (age <= 20) {
        console.log(`
        This BMI is calculator for people over 20.
        `);
        process.exit();
    };

    if (weight <= 30 || weight >= 300) {
        console.log(`
        Please provide a number for weight in kilograms between 30 and 300:

        weight (kg) example 75 | your input ${process.argv[2]}

        `);
        process.exit();
    };
};

function validateDailyExercise(doesUserExercise) {
    if(doesUserExercise !== "yes" && doesUserExercise !== "no") {
        console.log(`
        Please state if you exercise daily with "yes" or "no":

        Do you exercise daily? yes or no | your input ${process.argv[5]}
        `);
        process.exit();
    };
};

function validateGender(genderOfUser) {
    if (genderOfUser !== "m" && genderOfUser !== "f") {
        console.log(`
        Please state if you are a male or female?

        Are you a male or female? m or f | your input ${process.argv[6]}
        `);
    process.exit();
    };
};

function formatOutput(userObject) {
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM} m
    weight: ${userObject.weightInKg} kg
    do you exercise daily ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.weightInKg}
    With a normal lifestyle you burn ${userObject.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeight} kg:

    Eat ${userObject.dietCalories} calories a day
    For ${userObject.dietWeeks} weeks
    `;
};

function bmiCalculator() {
    validateNumberOfInputs(process.argv);

    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age);
    validateDailyExercise(dailyExercise);
    validateGender(gender);

    const BMI = calculateBMI(weightInKg, heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const idealWeight = calculateIdealWeight(heightInM);
    const dailyCalories = calculateDailyCalories(dailyExercise, BMR);
    const weightToLoseKg = weightInKg - idealWeight;
    const dietWeeks = calculateDietWeeks(weightToLoseKg);
    const dietCalories = calculateDailyCalories(weightToLoseKg, dailyCalories);

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeight: idealWeight,
        dailyCalories: dailyCalories,
        weightToLoseKg: weightToLoseKg,
        dietWeeks: dietWeeks,
        dietCalories: dietCalories,
    };
    const output = formatOutput(user);
    console.log(output);
};

bmiCalculator();