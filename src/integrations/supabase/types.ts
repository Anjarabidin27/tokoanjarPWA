export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      daily_reports: {
        Row: {
          created_at: string
          id: string
          photocopy_income: number | null
          report_date: string
          total_profit: number | null
          total_sales: number | null
          total_transactions: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          photocopy_income?: number | null
          report_date: string
          total_profit?: number | null
          total_sales?: number | null
          total_transactions?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          photocopy_income?: number | null
          report_date?: string
          total_profit?: number | null
          total_sales?: number | null
          total_transactions?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          barcode: string | null
          category: string
          cost_price: number
          created_at: string
          description: string | null
          id: string
          is_photocopy: boolean
          name: string
          price: number
          sell_price: number
          stock: number
          updated_at: string
        }
        Insert: {
          barcode?: string | null
          category: string
          cost_price?: number
          created_at?: string
          description?: string | null
          id?: string
          is_photocopy?: boolean
          name: string
          price: number
          sell_price?: number
          stock?: number
          updated_at?: string
        }
        Update: {
          barcode?: string | null
          category?: string
          cost_price?: number
          created_at?: string
          description?: string | null
          id?: string
          is_photocopy?: boolean
          name?: string
          price?: number
          sell_price?: number
          stock?: number
          updated_at?: string
        }
        Relationships: []
      }
      receipt_items: {
        Row: {
          cost_price: number
          id: string
          product_id: string | null
          product_name: string
          profit: number
          quantity: number
          receipt_id: string
          total_price: number
          unit_price: number
        }
        Insert: {
          cost_price: number
          id?: string
          product_id?: string | null
          product_name: string
          profit: number
          quantity: number
          receipt_id: string
          total_price: number
          unit_price: number
        }
        Update: {
          cost_price?: number
          id?: string
          product_id?: string | null
          product_name?: string
          profit?: number
          quantity?: number
          receipt_id?: string
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "receipt_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipt_items_receipt_id_fkey"
            columns: ["receipt_id"]
            isOneToOne: false
            referencedRelation: "receipts"
            referencedColumns: ["id"]
          },
        ]
      }
      receipts: {
        Row: {
          created_at: string
          discount: number
          id: string
          invoice_number: string | null
          payment_method: string | null
          profit: number
          subtotal: number
          total: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          discount?: number
          id: string
          invoice_number?: string | null
          payment_method?: string | null
          profit?: number
          subtotal?: number
          total?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          discount?: number
          id?: string
          invoice_number?: string | null
          payment_method?: string | null
          profit?: number
          subtotal?: number
          total?: number
          user_id?: string | null
        }
        Relationships: []
      }
      shopping_items: {
        Row: {
          created_at: string
          current_stock: number | null
          id: string
          is_completed: boolean
          name: string
          notes: string | null
          quantity: number | null
          unit: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_stock?: number | null
          id?: string
          is_completed?: boolean
          name: string
          notes?: string | null
          quantity?: number | null
          unit?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_stock?: number | null
          id?: string
          is_completed?: boolean
          name?: string
          notes?: string | null
          quantity?: number | null
          unit?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transaction_items: {
        Row: {
          id: string
          price: number
          product_id: string | null
          product_name: string
          quantity: number
          subtotal: number
          transaction_id: string
        }
        Insert: {
          id?: string
          price: number
          product_id?: string | null
          product_name: string
          quantity: number
          subtotal: number
          transaction_id: string
        }
        Update: {
          id?: string
          price?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
          subtotal?: number
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_items_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          cashier_name: string | null
          discount_amount: number | null
          discount_percent: number | null
          final_amount: number
          id: string
          is_manual_note: boolean | null
          notes: string | null
          payment_method: string
          total_amount: number
          transaction_code: string
          transaction_date: string
        }
        Insert: {
          cashier_name?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          final_amount: number
          id?: string
          is_manual_note?: boolean | null
          notes?: string | null
          payment_method: string
          total_amount: number
          transaction_code: string
          transaction_date?: string
        }
        Update: {
          cashier_name?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          final_amount?: number
          id?: string
          is_manual_note?: boolean | null
          notes?: string | null
          payment_method?: string
          total_amount?: number
          transaction_code?: string
          transaction_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_by_username_or_email: {
        Args: { identifier: string }
        Returns: {
          email: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
