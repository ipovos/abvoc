export const calculatePercent = (part, total) => {
  return (part / total) * 100;
};

export const createID = () => {
  return `f${(~~(Math.random() * 1e8)).toString(16)}`;
};
