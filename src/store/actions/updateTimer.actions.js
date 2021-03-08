export default function updateTimer(time) {
  return {
    type: 'UPDATE_TIME',
    payload: time,
  };
}
