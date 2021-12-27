export const formatTime = (ms: number) => {
    const min = Math.floor(ms / 1000 / 60);
    const sec = Math.floor((ms / 1000) % 60);

    return `${min}:${sec < 10 ? "0" + sec : sec}`;
};
