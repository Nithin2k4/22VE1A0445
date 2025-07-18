const logError = (log) => {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push({ ...log, timestamp: new Date().toISOString() });
  localStorage.setItem('logs', JSON.stringify(logs));
};
export default logError;
