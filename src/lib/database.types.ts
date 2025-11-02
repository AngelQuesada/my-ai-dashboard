export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      boxes: {
        Row: {
          id: string
          cron_config: Json | null
          email_instructions: string | null
        }
        Insert: {
          id: string
          cron_config?: Json | null
          email_instructions?: string | null
        }
        Update: {
          id?: string
          cron_config?: Json | null
          email_instructions?: string | null
        }
        Relationships: []
      }
      resultados_famosos_granada: {
        Row: {
          id: number
          nombre_evento: string | null
          descripcion: string | null
          localizacion: string | null
          famoso_principal: string | null
          metodo_contacto: string | null
        }
        Insert: {
          id?: number
          nombre_evento?: string | null
          descripcion?: string | null
          localizacion?: string | null
          famoso_principal?: string | null
          metodo_contacto?: string | null
        }
        Update: {
          id?: number
          nombre_evento?: string | null
          descripcion?: string | null
          localizacion?: string | null
          famoso_principal?: string | null
          metodo_contacto?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
