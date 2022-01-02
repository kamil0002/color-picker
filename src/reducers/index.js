const initialState = {
  generatedColors: [
    {
      id: 0,
      RGBColor: '207, 225, 250',
      locked: false,
    },

    {
      id: 1,
      RGBColor: '59, 31, 115',
      locked: false,
    },

    {
      id: 2,
      RGBColor: '133, 255, 143',
      locked: false,
    },

    {
      id: 3,
      RGBColor: '211, 111, 111',
      locked: false,
    },

    {
      id: 4,
      RGBColor: '255, 20, 111',
      locked: false,
    },
  ],
  lockedColors: [false, false, false, false, false],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REROLL': {
      return {
        ...state,
        generatedColors: [
          ...state.generatedColors.map(({ id, locked, RGBColor }, i) => {
            return {
              id,
              locked,
              RGBColor: locked ? RGBColor : action.payload.rgbColors[i].join(),
            };
          }),
        ],
      };
    }
    case 'LOCK': {
      return {
        generatedColors: [
          ...state.generatedColors.map(({ id, locked, RGBColor }) => {
            return {
              id,
              locked: action.payload.index === id ? !locked : locked,
              RGBColor,
            };
          }),
        ],
        lockedColors: [
          ...state.lockedColors.map((item, index) => {
            return index === action.payload.index ? !item : item;
          }),
        ],
      };
    }
    default:
      return state;
  }
};
export default rootReducer;
