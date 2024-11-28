export const NormalizeArray = (input) => {
    if (!input) {
      // Handle null, undefined, or empty string
      return [];
    }
  
    if (Array.isArray(input)) {
      return input.map((item) => item.trim());
    }
  
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => item.trim());
      }
    } catch (error) {
      console.error("Error parsing input:", error);
    }
  
    return []; // Return an empty array if parsing fails or input is invalid
  }
  