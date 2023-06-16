export const LocalStorage = {
  setAccessToken: (value: string) => localStorage.setItem("accessToken", value),
  getAccessToken: () => localStorage.getItem("accessToken"),
  removeAccessToken: () => localStorage.removeItem("accessToken"),

  setRefreshToken: (value: string) =>
    localStorage.setItem("refreshToken", value),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  removeRefreshToken: () => localStorage.removeItem("refreshToken"),
};
