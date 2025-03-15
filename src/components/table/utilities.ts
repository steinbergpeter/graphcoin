const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const formattedTime = date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })
    .toLowerCase();
  return `${month} ${day}${suffix}, ${year}, ${formattedTime}`;
};

export { formatDate };
