export default function RGBToString(rgbString) {
  const rgbArray = rgbString.split(',');
  const rgbAsNumbers = rgbArray.map(color => Number.parseInt(color));
  return (
    '#' +
    rgbAsNumbers
      .map(color =>
        color.toString(16).length === 1
          ? 0 + color.toString(16).toUpperCase()
          : color.toString(16).toUpperCase()
      )
      .join('')
  );
}
