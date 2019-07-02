export default function (status) {
  let className = '';
  switch (status) {
    case '良好':
      className = 'aqi__standard__num--lv1';
      break;
    case '普通':
      className = 'aqi__standard__num--lv2';
      break;
    case '對敏感族群不健康':
      className = 'aqi__standard__num--lv3';
      break;
    case '對所有族群不健康':
      className = 'aqi__standard__num--lv4';
      break;
    case '非常不健康':
      className = 'aqi__standard__num--lv5';
      break;
    case '危害':
      className = 'aqi__standard__num--lv6';
      break;
    default:
      className = 'aqi__standard__num--NA';
      break;
  }
  return className;
}
