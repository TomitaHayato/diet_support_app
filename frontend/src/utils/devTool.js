export function putDev(val) {
  if(import.meta.env.DEV) console.log(val);
}
