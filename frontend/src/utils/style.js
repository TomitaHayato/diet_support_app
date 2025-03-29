export function bgColor(theme) {
  return theme == "dark" ? 
    "bg-gradient-to-tr from-black to-indigo-900" :
    "bg-gradient-to-tr from-base-100 to-yellow-50"
}

export function grayText(theme) {
  return theme == "dark" ? "text-gray-400" : "text-gray-500";
}
