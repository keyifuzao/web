const date = new Date('1993-03-15');
const now = new Date();
const diff = Math.abs(now.getTime() - date.getTime());
const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
console.log(age); // 31