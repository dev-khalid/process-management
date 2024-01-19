import cookieParser from "cookie-parser";
import express from "express";

/**
 * @Note - following part is optional and this is just to depict the actual production scenario
 * --------------------------------------**START**------------------------------------------------------
 */
import IORedis from "ioredis";
import { Queue, Worker, QueueEvents } from "bullmq";
import { jobProcessor } from "./jobProcessor";
import Database from "./Database";

let jobName = "randomLogGenerator";
let serviceName = "r-mq";

const client = new IORedis({
  password: "STauCMOVjpHaHFQ3oG6O6gU30CBfv08l",
  host: "redis-11658.c325.us-east-1-4.ec2.cloud.redislabs.com",
  port: 11658,
  maxRetriesPerRequest: null,
});
const queue = new Queue(serviceName, { connection: client });

const worker = new Worker(
  serviceName,
  async (job) => {
    if (job.name === jobName) {
      jobProcessor(job.id);
    }
  },
  { connection: client }
);

worker.on("ready", () => {
  console.log("worker is ready to server ...");
});

worker.on("error", (error) => {
  console.log("worker error: ", error);
});

worker.on("completed", (job) => {
  console.log("completed job: ", job.name, job.id);
});

/**
 * ---------------------------**END**-------------------------------------
 * @NOTE -> Scenario ends here
 */

const app = express();
// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/start", async (req, res, next) => {
  const job = await queue.add(jobName, { color: "blue" });
  res.json({ processId: job.id });
});

app.get("/stop/:processId", async (req, res, next) => {
  let processId = req.params.processId;
  let logs = Database.getLogs(processId);
  if (logs.intervalId) {
    clearInterval(logs.intervalId);
  }
  res.json({
    message: "Stopped processing successfully " + processId,
    logs: logs.logs,
  });
});

app.get("/checklogs/:processId", (req, res, next) => {
  let info = Database.getLogs(req?.params?.processId);
  if (!info) {
    res.status(404).json({
      message: "No data processed for process " + req?.params?.processId,
    });
  } else res.json({ processId: req.params.processId, logs: info.logs });
});

export default app;
