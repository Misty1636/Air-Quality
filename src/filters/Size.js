export default function (item) {
  let str = '';
  if (item.length < 3) {
    str = 'aqi__currentZone__title';
  } else {
    str = 'aqi__currentZone__titleSmall';
  }
  return str;
}
