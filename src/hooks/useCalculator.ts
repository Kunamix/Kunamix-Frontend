
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";

// ─── Discovery Calculator Payload ─────────────────────────────────────────────

export interface DiscoveryCalculatorPayload {
  name: string;
  email: string;

  platforms: string[];
  description: string;

  timeline: string;

  userScale: string;

  notes?: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface CalcApiResponse {
  success: boolean;
  message: string;
  previewUrl?: string;
  pdfUrl?: string;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useCalculator = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] =
    useState<CalcApiResponse | null>(null);

  const [error, setError] = useState<string | null>(null);

  const submitCalculator = async (
    payload: DiscoveryCalculatorPayload,
  ): Promise<CalcApiResponse> => {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const res = await axiosInstance.post<CalcApiResponse>(
        "/calculator",
        payload,
      );

      setResponse(res.data);

      return res.data;
    } catch (err: unknown) {
      const message =
        (err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        })?.response?.data?.message ||
        "Failed to submit calculator.";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResponse(null);
    setError(null);
  };

  return {
    submitCalculator,
    loading,
    response,
    error,
    reset,
  };
};