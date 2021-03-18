export default function reducer(state = {
  isLoading: false
}, action) {
  switch (action.type) {
    case 'showLoading':
      return {
        isLoading: true
      };
    case 'hideLoading':
      return {
        isLoading: false
      };
    case 'toggleLoading':
      return {
        isLoading: !state.isLoading
      };
    default:
      return state;
  }
}
