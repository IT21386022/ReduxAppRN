export const setUsername = (username) => ({
  type: 'SET_USERNAME',
  payload: username,
});

export const setOTP = (otp) => ({
  type: 'SET_OTP',
  payload: otp,
});

export const setOrganization = (organization) => ({
  type: 'SET_ORGANIZATION',
  payload: organization,
});

export const login = (userData, role) => ({
  type: 'LOGIN',
  payload: { userData, role },
});

export const logout = () => ({
  type: 'LOGOUT',
});
