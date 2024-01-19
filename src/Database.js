class Database {
  /**
   * @typedef Log
   * @property {number} randomNumber - A random number associated with the log.
   * @property {number} timestamp - The timestamp at which the log was generated.
   *
   * @typedef IntervalData
   * @property {number} intervalId - The identifier of the interval.
   * @property {Log[]} logs - An array of log objects.
   *
   * @typedef {Record<string, IntervalData>} Db
   *
   * @type {Db}
   */
  _database = {};
  constructor() {}
  /**
   *
   * @param {number} jobId
   * @param {number} intervalId
   * @param {Log} log - The log object containing the following properties:
   * @typedef Log
   * @property {number} randomNumber - A random number associated with the log.
   * @property {number} timestamp - The timestamp at which the log was generated.
   */
  addLogs(jobId, intervalId, log) {
    return (this._database[jobId] = {
      intervalId,
      logs: [...(this?._database[jobId]?.logs || []), log],
    });
  }

  getLogs(jobId) {
    return this._database?.[jobId];
  }
  removeLogs() {}
}
export default new Database();
