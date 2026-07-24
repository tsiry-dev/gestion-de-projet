import { ZodError } from "zod";
import type { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "@/config/http.config";
import { ErrorCode } from "@/shared/constants/error-code";
import { AppError } from "@/shared/errors/AppError";


const formatZodErrors = (error: ZodError) => {
  const formatted: Record<string, string> = {};

  error.issues.forEach((err) => {
    const field = err.path.join(".");
    formatted[field] = err.message;
  });

  return formatted;
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error("🔥 ERROR:", error);

  /* =========================
   🧪 ZOD VALIDATION ERROR
  ========================= */
  if (error instanceof ZodError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation error",
      errors: formatZodErrors(error),
      errorCode: ErrorCode.VALIDATION_ERROR,
    });
  }

  /* =========================
   🧠 CUSTOM APP ERROR
  ========================= */
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
      errorCode: error.errorCode,
    });
  }

  /* =========================
   💥 UNKNOWN ERROR (fallback)
  ========================= */
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
    errors: {},
    errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
  });
};