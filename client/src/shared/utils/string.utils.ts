const truncate = (text: string, limit: number) => {
  return text.length > limit
    ? text.substring(0, limit) + "..."
    : text;
};

const truncateTask = (text: string, limit: number) => {
  return text.length > limit
    ? text.substring(0, limit)
    : text;
};



export { truncate , truncateTask};