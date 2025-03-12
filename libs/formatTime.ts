export const formatTime = (time: string) => {
    const date = new Date(time);
    const month = date.toLocaleString('th-TH', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${day} ${month} ${year} ${hour}:${minute}`;
}