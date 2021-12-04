const initialState = {
  generatedColors: [
    {
      id: 1,
      RGBColor: '207, 225, 250',
      locked: false,
    },

    {
      id: 2,
      RGBColor: '59, 31, 115',
      locked: false,
    },

    {
      id: 3,
      RGBColor: '133, 255, 143',
      locked: false,
    },

    {
      id: 4,
      RGBColor: '211, 111, 111',
      locked: false,
    },

    {
      id: 5,
      RGBColor: '255, 20, 111',
      locked: false,
    },
  ],
};

const rootReducer = (state = initialState, action) => {
     switch(action.type) {
      case 'REROLL': {
        return {
          // ...state,
          generatedColors: [
             ...state.generatedColors.map(({id, locked}, i) => {
              return {
                id,
                locked,
                RGBColor: action.payload.rgbColors[i].join(),
              }
            })
          ]
          
        };
      }
      default: return state;
     }
}
export default rootReducer;
