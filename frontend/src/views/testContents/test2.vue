<template>

</template>

<script>
// 09:00을 millisecond로 변환
const startTime = '09:00';
const [startHours, startMinutes] = startTime.split(':');
const startTimeMs = (parseInt(startHours) * 60 * 60 * 1000) + (parseInt(startMinutes) * 60 * 1000);

// 00:15를 millisecond로 변환
const intervalTime = '00:15';
const [intervalHours, intervalMinutes] = intervalTime.split(':');
const intervalTimeMs = (parseInt(intervalHours) * 60 * 60 * 1000) + (parseInt(intervalMinutes) * 60 * 1000);

// 두 값을 더함
console.log(startTimeMs)
console.log(intervalTimeMs)
const totalMs = startTimeMs + intervalTimeMs;
console.log(totalMs)

// 새로운 millisecond 값을 HH:mm 형식으로 변환
const newHours = Math.floor(totalMs / (60 * 60 * 1000));
const newMinutes = Math.floor((totalMs % (60 * 60 * 1000)) / (60 * 1000));

// HH:mm 형식으로 변환된 값을 표시
const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;

console.log(newTime); // 결과 출력
</script>

<style scoped>

</style>

