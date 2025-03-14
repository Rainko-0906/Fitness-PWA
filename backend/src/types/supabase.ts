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
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          avatar_url: string | null
          fitness_level: string | null
          goals: string[] | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          fitness_level?: string | null
          goals?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          fitness_level?: string | null
          goals?: string[] | null
        }
      }
      workouts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          type: string
          duration: number
          calories_burned: number
          notes: string | null
        }
        Insert: {
          id: string
          created_at?: string
          user_id: string
          type: string
          duration: number
          calories_burned: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          type?: string
          duration?: number
          calories_burned?: number
          notes?: string | null
        }
      }
      nutrition: {
        Row: {
          id: string
          created_at: string
          user_id: string
          meal_type: string
          calories: number
          protein: number
          carbs: number
          fat: number
          notes: string | null
        }
        Insert: {
          id: string
          created_at?: string
          user_id: string
          meal_type: string
          calories: number
          protein: number
          carbs: number
          fat: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          meal_type?: string
          calories?: number
          protein?: number
          carbs?: number
          fat?: number
          notes?: string | null
        }
      }
      goals: {
        Row: {
          id: string
          created_at: string
          user_id: string
          type: string
          target: number
          current: number
          deadline: string | null
          status: string
        }
        Insert: {
          id: string
          created_at?: string
          user_id: string
          type: string
          target: number
          current: number
          deadline?: string | null
          status: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          type?: string
          target?: number
          current?: number
          deadline?: string | null
          status?: string
        }
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
  }
} 