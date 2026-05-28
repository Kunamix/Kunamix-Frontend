import { useState } from "react";
import { axiosInstance } from "@/lib/axios";

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface CalculatorFormData {
  name: string;
  email: string;
  platforms: string[];
  description: string;
  timeline: string;
  userScale: string;
  notes?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendContactForm = async (
    formData: ContactFormData,
  ): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axiosInstance.post<ApiResponse>(
        "/mail/contact",
        formData,
      );
      setResponse(res.data);
      return res.data;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return { sendContactForm, loading, response, error };
};

// ─── Calculator Form ──────────────────────────────────────────────────────────

export const useCalculatorForm = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendCalculatorForm = async (
    formData: CalculatorFormData,
  ): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axiosInstance.post<ApiResponse>("/calculate", formData);
      setResponse(res.data);
      return res.data;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return { sendCalculatorForm, loading, response, error };
};

// ─── Referral Form ────────────────────────────────────────────────────────────

interface ReferralFormData {
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany?: string;
  projectDetails: string;
  estimatedBudget: string;
}

export const useReferForm = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendReferForm = async (
    formData: ReferralFormData,
  ): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axiosInstance.post<ApiResponse>(
        "/refer-form",
        formData,
      );
      setResponse(res.data);
      return res.data;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return { sendReferForm, loading, response, error };
};
