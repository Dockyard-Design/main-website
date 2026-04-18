export interface Project {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  is_public: boolean;
  is_indexable: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  featured_image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  data: Project[];
}
