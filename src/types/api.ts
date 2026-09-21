/**
 * Loose shape of a value thrown by axios or rejected by the backend.
 * Every field is optional because a thrown value is never guaranteed.
 */
export interface ApiError {
  message?: string;
  details?: unknown;
  response?: {
    data?: {
      message?: string;
    };
  };
}
