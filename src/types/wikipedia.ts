export interface WikipediaSummary {
  title: string;
  extract?: string;

  thumbnail?: {
    source: string;
  };

  content_urls: {
    desktop: {
      page: string;
    };
  };
}
