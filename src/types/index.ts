export interface Category {
  id: string
  name: string
  slug: string
  display_order: number
  created_at: string
}

export interface Product {
  id: string
  category_id: string | null
  name: string
  slug: string
  description: string | null
  image_url: string | null
  unit: string | null
  is_featured: boolean
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
  categories?: Category | null
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}
