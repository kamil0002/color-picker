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

export const resetRolledColorsAction = () => {
  return {
    type: 'RESET_ROLLED_COLORS',
  };
};

export const updateLockedColorsAction = index => {
  return {
    type: 'LOCK',
    payload: {
      index,
    },
  };
};

export const savePaletteAction = () => {
  return {
    type: 'SAVE_PALETTE',
  };
};

export const deletePaletteAction = e => {
  const id = +e.target.parentNode.previousSibling.id;
  return {
    type: 'DELETE_PALETTE',
    payload: {
      id,
    },
  };
};

export const saveColorAction = color => {
  return {
    type: 'SAVE_COLOR',
    payload: { color },
  };
};

export const changeViewAction = currentView => {
  return {
    type: 'CHANGE_VIEW',
    payload: { currentView },
  };
};
