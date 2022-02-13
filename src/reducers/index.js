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
  generatedPalette: [],
  savedPalettes: [
    {
      id: 1,
      colors: [
        '207, 225, 250',
        '59, 31, 115',
        '133, 255, 143',
        '211, 111, 111',
        '255, 20, 111',
      ],
    },
    {
      id: 2,
      colors: [
        '207, 225, 250',
        '59, 31, 115',
        '133, 255, 143',
        '211, 111, 111',
        '255, 20, 111',
      ],
    },
    {
      id: 3,
      colors: [
        '207, 225, 250',
        '59, 31, 115',
        '133, 255, 143',
        '211, 111, 111',
        '255, 20, 111',
      ],
    },
  ],
  savedColors: [],
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
      const isElementLocked = !state.generatedColors[action.payload.index]
        .locked;

      return {
        ...state,
        generatedColors: [
          ...state.generatedColors.map(({ id, locked, RGBColor }) => {
            return {
              id,
              locked: action.payload.index === id ? !locked : locked,
              RGBColor,
            };
          }),
        ],
        // Dodanie lub usunięciu elementu z listy zapisanych
        generatedPalette: isElementLocked
          ? [
              ...state.generatedPalette,
              state.generatedColors[action.payload.index],
            ]
          : [
              ...state.generatedPalette.filter(
                item => item.id !== action.payload.index
              ),
            ],
      };
    }
    case 'RESET_ROLLED_COLORS': {
      return {
        ...state,
        ...state.palettes,
        generatedColors: [...initialState.generatedColors],
      };
    }
    case 'SAVE_PALETTE': {
      return {
        ...state,
        ...state.savedPalettes.push({
          id: +Date.now()
            .toString()
            .slice(-10)
            .concat(
              Math.random()
                .toString()
                .slice(-5)
            ),
          colors: state.generatedColors.map(prop => prop.RGBColor),
        }),
      };
    }
    case 'DELETE_PALETTE': {
      return {
        ...state,
        savedPalettes: [
          ...state.savedPalettes.filter(
            color => color.id !== action.payload.id
          ),
        ],
      };
    }
    default:
      return state;
  }
};
export default rootReducer;
