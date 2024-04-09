// authReducer.js
const initialState = {
  isAuthenticated: false,
  user: null,
  role: null, // Add a 'role' field to store the user's role
  organization: '',
  username: '',
  otp: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORGANIZATION':
      return {
        ...state,
        organization: action.payload,
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'SET_OTP':
      return {
        ...state,
        otp: action.payload,
      };
    case 'LOGIN':
      const { role, userData } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user: userData,
        role: role, // Set the role in the state
      };
    case 'LOGOUT':
      return initialState; // Reset state on logout
    default:
      return state;
  }
};

export default authReducer;
