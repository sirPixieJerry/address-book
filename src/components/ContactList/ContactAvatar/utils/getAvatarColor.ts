const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#33FFF5',
  '#F5FF33',
];

const stringToIndex = (string: string): number => {
  const hash = [...string].reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
    0
  );
  return Math.abs(hash) % colors.length;
};

export const getAvatarColor = (firstName: string, lastName: string): string => {
  const colorIndex = stringToIndex(`${firstName}${lastName}`);
  return colors[colorIndex];
};
