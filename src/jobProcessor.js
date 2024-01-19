import Database from "./Database";
/**
 * Generates a log object containing a random number and a timestamp.
 *
 * @returns {Log} An object representing the generated log with the following properties:
 * @typedef Log
 * @property {number} randomNumber - A random number between 0 and 9999.9999...
 * @property {number} timestamp - The timestamp in milliseconds at which the log was generated.
 */
function generateLogs() {
  return {
    randomNumber: Math.round(Math.random() * 10000),
    timestamp: new Date().getTime(),
  };
}
export function jobProcessor(jobId) {
  //store the jobId , then with that jobid store -> intervalId, [{randomNumber,timestamp}]
  let timerObj = setInterval(helperFunction, 5 * 1000); //NOTE: For testing purposes I am assuming 5 seconds but I know the requirement says 5 Minutes

  function helperFunction() {
    let intervalId = timerObj[Symbol.toPrimitive]();
    let log = generateLogs();
    Database.addLogs(jobId, intervalId, log);
  }
  //for the first time store this intervalId
}
