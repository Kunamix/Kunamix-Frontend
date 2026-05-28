// src/hooks/useTestimonials.ts
import { useState, useEffect } from "react";

export interface FillFeedbackReview {
  _id: string;
  respondent: string;
  rating: number;
  documentUrl: string;
  answers: {
    Email?: string;
    "Full Name"?: string;
    "Company Name"?: string;
    Role?: string;
    Review?: string;
  };
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<FillFeedbackReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fallback to the string just in case the .env isn't loaded properly during dev
        const apiKey = import.meta.env.VITE_FILLFEEDBACK_API_KEY;

        const response = await fetch(
          "https://api.fillfeedback.com/api/v1/reviews",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const result = await response.json();

        if (result.success && result.data && result.data.data) {
          // Only take 5-star or 4-star reviews, and limit to max 3 for the homepage grid
          const validReviews = result.data.data
            .filter(
              (rev: FillFeedbackReview) =>
                rev.rating >= 4 && rev.answers?.Review,
            )
            .slice(0, 3);

          setTestimonials(validReviews);
        } else {
          throw new Error("Invalid API structure");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { testimonials, isLoading, error };
};
