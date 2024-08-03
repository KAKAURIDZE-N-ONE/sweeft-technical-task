const apiKey: string = "zIjMaHAA3Z-TPw4-cndPHdXEXrAPmDwvA8y8v_2SsCk";

interface Result {
  alt_description: string;
  alternative_slugs: AlternativeSlugs;
  asset_type: string;
  blur_hash: string;
  color: string;
  created_at: string;
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: Links;
  promoted_at: string | null;
  slug: string;
  sponsorship: string | null;
  tags: Tag[];
  updated_at: string;
  urls: Urls;
  user: User;
  width: number;
}

interface AlternativeSlugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  [key: string]: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Tag {
  title: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  [key: string]: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
}

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
