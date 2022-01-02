export const rerollColorsAction = () => {
  const generateRGBColors = () => {
    let RGBColorTable = [];
    const RGBColorsTable = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        RGBColorTable.push(Math.trunc(Math.random() * 255));
      }
      RGBColorsTable.push(RGBColorTable);
      RGBColorTable = [];
    }
    return RGBColorsTable;
  };

  return {
    type: 'REROLL',
    payload: {
      rgbColors: generateRGBColors(),
    },
  };
};

export const updateLocksColorsAction = (index) => {
  return {
    type: 'LOCK',
    payload: {
      index
    }
  }
};
