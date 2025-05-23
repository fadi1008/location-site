export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      apartments: {
        Row: {
          id: number
          title: string
          location: string
          price: string
          images: string[]
          bedrooms: number
          bathrooms: number
          area: number
          features: string[]
          description: string
        }
        Insert: {
          id?: number
          title: string
          location: string
          price: string
          images?: string[]
          bedrooms?: number
          bathrooms?: number
          area?: number
          features?: string[]
          description?: string
        }
        Update: {
          id?: number
          title?: string
          location?: string
          price?: string
          images?: string[]
          bedrooms?: number
          bathrooms?: number
          area?: number
          features?: string[]
          description?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export const Constants = {
  public: {
    Enums: {},
  },
} as const
