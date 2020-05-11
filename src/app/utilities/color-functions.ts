export function setFontColorWithContrast(hexColorValue: string): 'black' | 'white' {
    if (hexColorValue.slice(0, 1) === '#') {
        hexColorValue = hexColorValue.slice(1);
    }
    const r = parseInt(hexColorValue.substr(0, 2), 16);
    const g = parseInt(hexColorValue.substr(2, 2), 16);
    const b = parseInt(hexColorValue.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}
