export const formatTime = (time: string) => {
    const date = new Date(time);
    const month = date.toLocaleString('th-TH', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${day} ${month} ${year}, ${formattedHour}:${formattedMinute}`;
}