export const filterByKey = (key, value) => {
  if(typeof key === 'object'){
    return key.filter(item =>  item.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) !== -1).length;
  }
  return key.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) !== -1;
}