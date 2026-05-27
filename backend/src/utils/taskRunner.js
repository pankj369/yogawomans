import { v4 as uuidv4 } from "uuid";
import logger from "./logger.js";
import telemetry from "./telemetry.js";

class TaskRunner {
  constructor() {
    this.jobs = new Map();
    this.isProcessing = false;
  }

  /**
   * Enqueues a job for background execution.
   * @param {String} jobType The type of job (e.g., 'EMAIL_NOTIFICATION', 'STORAGE_CLEANUP')
   * @param {Object} payload Payload arguments for the job
   */
  enqueueJob(jobType, payload = {}) {
    const jobId = uuidv4();
    const job = {
      id: jobId,
      type: jobType,
      payload,
      status: "queued",
      createdAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      error: null,
    };

    this.jobs.set(jobId, job);
    logger.info(`Background job [${jobType}] enqueued. Job ID: ${jobId}`);

    // Trigger queue processing asynchronously (non-blocking)
    setImmediate(() => this._processQueue());

    return jobId;
  }

  /**
   * Retrieves the current status of a job.
   */
  getJobStatus(jobId) {
    return this.jobs.get(jobId) || null;
  }

  /**
   * Processes the next job in the queue
   */
  async _processQueue() {
    if (this.isProcessing) return;

    // Find the first queued job
    let nextJob = null;
    for (const job of this.jobs.values()) {
      if (job.status === "queued") {
        nextJob = job;
        break;
      }
    }

    if (!nextJob) return;

    this.isProcessing = true;
    nextJob.status = "processing";
    nextJob.startedAt = new Date().toISOString();
    logger.info(`Starting execution of job [${nextJob.type}] with ID: ${nextJob.id}`);

    const startTime = Date.now();

    try {
      // Execute based on job type
      await this._executeJob(nextJob.type, nextJob.payload);
      
      nextJob.status = "completed";
      nextJob.completedAt = new Date().toISOString();
      const duration = Date.now() - startTime;
      
      logger.info(`Job [${nextJob.type}] completed successfully in ${duration}ms`);
      
      // Track duration under background task metrics
      telemetry.trackDbMetric(`job_${nextJob.type}`, duration);
    } catch (err) {
      nextJob.status = "failed";
      nextJob.error = err.message || String(err);
      nextJob.completedAt = new Date().toISOString();
      
      logger.error(`Job [${nextJob.type}] with ID: ${nextJob.id} failed:`, err);
      telemetry.captureException(err, { jobId: nextJob.id, jobType: nextJob.type });
    } finally {
      this.isProcessing = false;
      // Process next in queue
      setImmediate(() => this._processQueue());
    }
  }

  /**
   * Simulates job execution execution logic.
   */
  async _executeJob(type, payload) {
    // Simulating asynchronous task duration
    switch (type) {
      case "EMAIL_NOTIFICATION_PUSH":
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate SMTP delay
        logger.info(`Email successfully dispatched to ${payload.email || "user"}`);
        break;

      case "PALM_IMAGE_CLEANUP":
        await new Promise((resolve) => setTimeout(resolve, 400));
        logger.info(`Cleaned up temp reference files for path: ${payload.filePath || "/"}`);
        break;

      case "DAILY_SUMMARY_REPORT":
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Long report building
        logger.info(`Daily aggregations compiled for user streak stats`);
        break;

      case "AI_WELLNESS_PLAN_GENERATION":
        await new Promise((resolve) => setTimeout(resolve, 2000)); // AI parsing delay
        logger.info(`AI schedule models successfully cached in user profile history`);
        break;

      default:
        throw new Error(`Unknown job type: ${type}`);
    }
  }
}

export const taskRunner = new TaskRunner();
export default taskRunner;
