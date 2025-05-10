export function bgColor(theme) {
  return theme == "dark" ? 
    "bg-gradient-to-tr from-black to-indigo-900" :
    "bg-gradient-to-bl from-yellow-50 to-lime-100"
}

export function titleColor(theme) {
  return theme == "dark" ? 
    "animate-pulse bg-gradient-to-tr from-cyan-100   to-indigo-400 bg-clip-text text-transparent" :
    "animate-pulse bg-gradient-to-tr from-yellow-400 to-red-600    bg-clip-text text-transparent"
}

export function grayText(theme) {
  return theme == "dark" ? "text-gray-400" : "text-gray-500";
}
