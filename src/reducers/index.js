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
  savedColorsView: 'palettes',
  lockedColors: [false, false, false, false, false],
  generatedPalette: [],
  savedPalettes: [],
  savedColors: [],
  savedUserColors: [],
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
      localStorage.setItem(
        'palettes',
        JSON.stringify([
          ...state.savedPalettes,
          {
            id: action.payload.paletteId,
            colors: state.generatedColors.map(prop => prop.RGBColor),
          },
        ])
      );
      return {
        ...state,
        ...state.savedPalettes.push({
          id: action.payload.paletteId,
          colors: state.generatedColors.map(prop => prop.RGBColor),
        }),
      };
    }
    case 'DELETE_PALETTE': {
      localStorage.setItem(
        'palettes',
        JSON.stringify(
          state.savedPalettes.filter(color => color.id !== action.payload.id)
        )
      );
      return {
        ...state,
        savedPalettes: [
          ...state.savedPalettes.filter(
            color => color.id !== action.payload.id
          ),
        ],
      };
    }
    case 'SAVE_COLOR': {
      localStorage.setItem(
        'app-colors',
        JSON.stringify([...state.savedColors, action.payload.color])
      );
      return {
        ...state,
        ...state.savedColors.push(action.payload.color),
      };
    }
    case 'CHANGE_VIEW': {
      return {
        ...state,
        savedColorsView: action.payload.currentView,
      };
    }
    case 'SAVE_USER_COLOR': {
      localStorage.setItem(
        'user-colors',
        JSON.stringify([...state.savedUserColors, action.payload.color])
      );
      return {
        ...state,
        ...state.savedUserColors.push(action.payload.color),
      };
    }
    case 'DELETE_COLOR': {
      localStorage.setItem(
        'app-colors',
        JSON.stringify(
          state.savedColors.filter(color => color !== action.payload.color)
        )
      );
      localStorage.setItem(
        'user-colors',
        JSON.stringify(
          state.savedUserColors.filter(color => color !== action.payload.color)
        )
      );
      return {
        ...state,
        savedColors: state.savedColors.filter(
          color => color !== action.payload.color
        ),
        savedUserColors: state.savedUserColors.filter(
          color => color !== action.payload.color
        ),
      };
    }
    case 'LOAD_STORAGE': {
      return {
        ...state,
        savedColors:
          action.payload.values?.appColorsStorage !== undefined
            ? [...action.payload.values?.appColorsStorage]
            : state.savedColors,
        savedPalettes:
          action.payload.values?.savedPalettesStorage !== undefined
            ? [...action.payload.values?.savedPalettesStorage]
            : state.savedColors,
        savedUserColors:
          action.payload.values?.userColorsStorage !== undefined
            ? [...action.payload.values?.userColorsStorage]
            : state.savedUserColors,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
