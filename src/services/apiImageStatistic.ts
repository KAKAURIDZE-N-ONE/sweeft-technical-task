const apiKey: string = "WUcnunigYeqrGUKXOkykSIce6CkbqgRWrO-TUYoNg5w";

export async function getImageDetails(photoId: string) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/${photoId}/statistics?client_id=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
