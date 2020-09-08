const array = ["one", "two", "three", "four", "five", "six"];
const elements = [];
const distance = 10;

if(array.length % 2 === 1) {
    const base = Math.round(array.length / 2);
    let step = base - 1;

    array.forEach((item, index) => {
        if(index + 1 < base) {
            elements.push(step * distance);
            step--;
        }
        else if(index + 1 > base) {
            elements.push(step * distance);
            step++;
        }
        else {
            elements.push(0);
            step++;
        }
    })
}
else {
    const base1 = Math.round(array.length / 2);
    const base2 = base1 + 1;
    let step = base1 - 1;

    array.forEach((item, index) => {
        if(index + 1 < base1) {
            elements.push(step * distance);
            step--;
        }
        else if(index + 1 > base2) {
            elements.push(step * distance);
            step++;
        }
        else {
            elements.push(0);
            if(index + 1 === base2) {
                step++;
            }
        }
    })
}

console.log(elements);
