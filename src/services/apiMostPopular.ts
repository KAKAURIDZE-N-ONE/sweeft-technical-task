const apiKey: string = "zIjMaHAA3Z-TPw4-cndPHdXEXrAPmDwvA8y8v_2SsCk";
import { Result } from "../features/gallerySlice";
export async function getMostPopular(): Promise<Result[]> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=1&per_page=20&order_by=popular&client_id=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
