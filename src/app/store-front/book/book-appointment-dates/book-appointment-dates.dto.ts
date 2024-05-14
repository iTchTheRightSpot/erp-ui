export interface ValidTime {
  date: Date;
  times: Date[];
}

const times = (emp: String, date: Date) => {
  const arr: Date[] = [];
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0)
      arr.push(new Date(`May ${13 + (i + 1)}, 2024 23:15:30 GMT+00:00`));
    else arr.push(new Date(`June ${1 + (i + 1)}, 2024 23:15:30 GMT+00:00`));
  }
  return arr;
};
