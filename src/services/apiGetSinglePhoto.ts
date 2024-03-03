const apiKey: string = "zIjMaHAA3Z-TPw4-cndPHdXEXrAPmDwvA8y8v_2SsCk";

export async function getSinglePhoto(imageId: string) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/${imageId}?client_id=${apiKey}`
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
