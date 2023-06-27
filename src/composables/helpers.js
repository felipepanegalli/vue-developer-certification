export const resumeText = (text = null, limit = 40) => {
  if (!text) return ' - '
  return text.toString().substring(0, limit) + '...'
}
