const number = parseInt(prompt("Enter number"));
let isPrime = true;
if (number === 1) {
    console.log("1 is neither prime nor composite number");
}
else if (number > 1) {
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        console.log("number is a prime number");
    } else {
        console.log("number is a not prime number");
    }
}
let zz=number*2
for (let i = number+1; i <= zz+1; i++) {
    let flag = 0;

    for (let j = 2; j < i; j++) {
        if (i % j == 0) {
            flag = 1;
            break;
        }
    }
    if (i > 1 && flag == 0) {
        console.log(i-number);
        break;
    }
}
