export const setUserToken = (TOKEN) => {
  return localStorage.setItem('TOKEN', TOKEN)
}

export const getUserToken = () => {
  return localStorage.getItem('TOKEN')
}

export const removeUserToken = () => {
  return localStorage.removeItem('TOKEN')
}
