import logger from "./logger.js";

class Telemetry {
  constructor() {
    this.apiMetrics = [];
    this.aiMetrics = [];
    this.dbMetrics = [];
    this.userEvents = [];
    this.errors = [];
    this.maxRecords = 500; // Keep memory bounded
  }

  // Bound records count
  _boundArray(arr) {
    if (arr.length > this.maxRecords) {
      arr.shift();
    }
  }

  // API Call Metric Tracking
  trackApiMetric(method, path, status, duration) {
    const metric = {
      timestamp: new Date().toISOString(),
      method,
      path,
      status,
      duration,
    };
    this.apiMetrics.push(metric);
    this._boundArray(this.apiMetrics);
    
    // Log slow API requests (>1500ms)
    if (duration > 1500) {
      logger.warn(`Slow API detected: ${method} ${path} took ${duration}ms`);
    }
  }

  // AI Inference Metric Tracking
  trackAiMetric(service, duration, success, tokens = 0) {
    const metric = {
      timestamp: new Date().toISOString(),
      service,
      duration,
      success,
      tokens,
    };
    this.aiMetrics.push(metric);
    this._boundArray(this.aiMetrics);
    
    logger.info(`AI Metric: Service [${service}] took ${duration}ms (success: ${success})`);
  }

  // DB Query Metric Tracking
  trackDbMetric(operation, duration) {
    const metric = {
      timestamp: new Date().toISOString(),
      operation,
      duration,
    };
    this.dbMetrics.push(metric);
    this._boundArray(this.dbMetrics);

    // Log slow DB calls (>500ms)
    if (duration > 500) {
      logger.warn(`Slow DB Query detected: ${operation} took ${duration}ms`);
    }
  }

  // User Event Analytics (retention/journey tracking)
  trackUserEvent(userId, eventName, metadata = {}) {
    const event = {
      timestamp: new Date().toISOString(),
      userId,
      eventName,
      metadata,
    };
    this.userEvents.push(event);
    this._boundArray(this.userEvents);

    logger.info(`User Event Analytics: User [${userId || "guest"}] triggered ${eventName}`, metadata);
  }

  // Capture Exception (Sentry-like capability)
  captureException(error, context = {}) {
    const errorRecord = {
      timestamp: new Date().toISOString(),
      name: error.name || "Error",
      message: error.message || String(error),
      stack: error.stack,
      context,
    };
    this.errors.push(errorRecord);
    this._boundArray(this.errors);

    logger.error(`Telemetry Exception Captured: ${errorRecord.message}`, error, context);
  }

  // Generate observability dashboard report
  getReport() {
    const memory = process.memoryUsage();
    
    // Average API durations
    const apiCount = this.apiMetrics.length;
    const avgApiDuration = apiCount
      ? this.apiMetrics.reduce((acc, m) => acc + m.duration, 0) / apiCount
      : 0;

    // API error rates
    const apiErrors = this.apiMetrics.filter((m) => m.status >= 400).length;
    const apiErrorRate = apiCount ? (apiErrors / apiCount) * 100 : 0;

    // AI summary
    const aiCount = this.aiMetrics.length;
    const avgAiDuration = aiCount
      ? this.aiMetrics.reduce((acc, m) => acc + m.duration, 0) / aiCount
      : 0;
    const aiSuccessRate = aiCount
      ? (this.aiMetrics.filter((m) => m.success).length / aiCount) * 100
      : 100;

    // DB summary
    const dbCount = this.dbMetrics.length;
    const avgDbDuration = dbCount
      ? this.dbMetrics.reduce((acc, m) => acc + m.duration, 0) / dbCount
      : 0;

    // Feature popularity counting
    const popularity = {};
    this.userEvents.forEach((evt) => {
      popularity[evt.eventName] = (popularity[evt.eventName] || 0) + 1;
    });

    return {
      system: {
        uptime: process.uptime(),
        memoryHeapUsedMB: Math.round(memory.heapUsed / 1024 / 1024 * 100) / 100,
        memoryHeapTotalMB: Math.round(memory.heapTotal / 1024 / 1024 * 100) / 100,
      },
      apis: {
        totalRequestsLogged: apiCount,
        avgDurationMs: Math.round(avgApiDuration),
        errorRatePercentage: Math.round(apiErrorRate * 100) / 100,
        recentErrorsCount: this.errors.length,
      },
      ai: {
        totalInferencesLogged: aiCount,
        avgDurationMs: Math.round(avgAiDuration),
        successRatePercentage: Math.round(aiSuccessRate * 100) / 100,
      },
      db: {
        totalQueriesLogged: dbCount,
        avgDurationMs: Math.round(avgDbDuration),
      },
      analytics: {
        totalUserEventsLogged: this.userEvents.length,
        featurePopularity: popularity,
      },
      recentCapturedExceptions: this.errors.slice(-5), // last 5 errors
    };
  }
}

export const telemetry = new Telemetry();
export default telemetry;
