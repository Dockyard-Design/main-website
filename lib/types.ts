import { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt: string;
  status: string;
  is_public: boolean;
  is_featured?: boolean;
  is_indexable?: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  featured_image_url?: string | null;
  featured_desktop_image_url?: string | null;
  featured_phone_image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  data: Project[];
}

export interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

export interface ServicesCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  cardClassName?: string;
  iconClassName?: string;
  iconWrapperStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  children?: ReactNode;
}
