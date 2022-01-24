import brandsCars from './brands-cars';
import modelsCars from './models-cars';

function getRandomNum(minNum: number, maxNum: number) {
    const min = Math.ceil(minNum);
    const max = Math.floor(maxNum);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function generateRandomName() {
    return `${brandsCars[getRandomNum(0, brandsCars.length)]} ${modelsCars[getRandomNum(0, modelsCars.length)]} `;
}
