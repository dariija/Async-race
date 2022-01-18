export default function generateRandomColour() {
    return `#${(0x1000000 + Math.random() * 0xffffff).toString(16).slice(1, 7)}`;
}
