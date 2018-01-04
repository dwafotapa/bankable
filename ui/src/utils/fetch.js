export const handleResponse = (response, isJSON = true) => {
  if (response.ok) {
    if (isJSON) {
      return response.json()
    } else {
      return response.text()
    }
  }
  
  throw new Error(response.statusText)
}