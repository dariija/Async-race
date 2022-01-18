const namePartOne = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const namePartTwo = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function getRandomNum(minNum: number, maxNum: number) {
    const min = Math.ceil(minNum);
    const max = Math.floor(maxNum);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function generateRandomName() {
    return `${namePartOne[getRandomNum(0, namePartOne.length)]} ${namePartTwo[getRandomNum(0, namePartTwo.length)]} `;
}
