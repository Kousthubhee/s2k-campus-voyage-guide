export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string | null
          id: string
          is_admin: boolean | null
          is_document_reviewer: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          is_document_reviewer?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          is_document_reviewer?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          id: string
          message: string
          role: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          message: string
          role: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          message?: string
          role?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chatbotfaq: {
        Row: {
          answer: string
          category: string
          created_at: string
          id: string
          question: string
        }
        Insert: {
          answer: string
          category: string
          created_at?: string
          id?: string
          question: string
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          id?: string
          question?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          created_at: string
          description: string | null
          emoji: string | null
          famous_places: string | null
          id: string
          local_insights: Json | null
          name: string
          schools_count: number | null
          sports_facilities: string | null
          student_life: string | null
          transport: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          emoji?: string | null
          famous_places?: string | null
          id?: string
          local_insights?: Json | null
          name: string
          schools_count?: number | null
          sports_facilities?: string | null
          student_life?: string | null
          transport?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          emoji?: string | null
          famous_places?: string | null
          id?: string
          local_insights?: Json | null
          name?: string
          schools_count?: number | null
          sports_facilities?: string | null
          student_life?: string | null
          transport?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      document_reviews: {
        Row: {
          created_at: string | null
          document_id: string
          id: string
          review_notes: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          document_id: string
          id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string
          id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_reviews_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "user_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string | null
          created_at: string | null
          file_path: string | null
          file_size: number | null
          id: string
          is_important: boolean | null
          mime_type: string | null
          name: string
          notes: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_important?: boolean | null
          mime_type?: string | null
          name: string
          notes?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_important?: boolean | null
          mime_type?: string | null
          name?: string
          notes?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          budgeted: number | null
          color: string | null
          created_at: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          budgeted?: number | null
          color?: string | null
          created_at?: string | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          budgeted?: number | null
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category_id: string | null
          created_at: string | null
          date: string
          description: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          category_id?: string | null
          created_at?: string | null
          date?: string
          description: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          category_id?: string | null
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      faq_logs: {
        Row: {
          category: string | null
          clicked_suggestion: boolean | null
          confidence_score: number | null
          created_at: string
          id: string
          matched_question: string | null
          user_query: string
        }
        Insert: {
          category?: string | null
          clicked_suggestion?: boolean | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          matched_question?: string | null
          user_query: string
        }
        Update: {
          category?: string | null
          clicked_suggestion?: boolean | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          matched_question?: string | null
          user_query?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string | null
          category: string | null
          created_at: string | null
          id: string
          question: string | null
        }
        Insert: {
          answer?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          question?: string | null
        }
        Update: {
          answer?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          question?: string | null
        }
        Relationships: []
      }
      hub_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hub_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "hub_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      hub_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hub_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "hub_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      hub_posts: {
        Row: {
          category: string
          comments_count: number | null
          content: string
          created_at: string
          id: string
          likes_count: number | null
          media_url: string | null
          poll_options: Json | null
          title: string
          type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          comments_count?: number | null
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          media_url?: string | null
          poll_options?: Json | null
          title: string
          type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          comments_count?: number | null
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          media_url?: string | null
          poll_options?: Json | null
          title?: string
          type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about: string | null
          age: string | null
          created_at: string | null
          education_level: string | null
          email: string
          gap_year_duration: number | null
          has_children: boolean | null
          has_gap_year: boolean | null
          has_health_issues: boolean | null
          has_work_experience: boolean | null
          id: string
          is_married: boolean | null
          name: string
          nationality: string | null
          photo_url: string | null
          prev_education: string | null
          target_city: string | null
          target_program: string | null
          updated_at: string | null
          work_experience: string | null
        }
        Insert: {
          about?: string | null
          age?: string | null
          created_at?: string | null
          education_level?: string | null
          email: string
          gap_year_duration?: number | null
          has_children?: boolean | null
          has_gap_year?: boolean | null
          has_health_issues?: boolean | null
          has_work_experience?: boolean | null
          id: string
          is_married?: boolean | null
          name: string
          nationality?: string | null
          photo_url?: string | null
          prev_education?: string | null
          target_city?: string | null
          target_program?: string | null
          updated_at?: string | null
          work_experience?: string | null
        }
        Update: {
          about?: string | null
          age?: string | null
          created_at?: string | null
          education_level?: string | null
          email?: string
          gap_year_duration?: number | null
          has_children?: boolean | null
          has_gap_year?: boolean | null
          has_health_issues?: boolean | null
          has_work_experience?: boolean | null
          id?: string
          is_married?: boolean | null
          name?: string
          nationality?: string | null
          photo_url?: string | null
          prev_education?: string | null
          target_city?: string | null
          target_program?: string | null
          updated_at?: string | null
          work_experience?: string | null
        }
        Relationships: []
      }
      qa_messages: {
        Row: {
          created_at: string
          file_name: string | null
          file_url: string | null
          id: string
          is_bookmarked: boolean | null
          message: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_bookmarked?: boolean | null
          message: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_bookmarked?: boolean | null
          message?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      school_profiles: {
        Row: {
          admission_requirements: string | null
          brochures: Json | null
          city: string
          contact_links: Json | null
          created_at: string
          cultural_societies: string | null
          degrees: string[] | null
          detailed_programs: Json | null
          entrance_exams: string | null
          facilities: string | null
          fees: string | null
          global_rankings: string | null
          housing: string | null
          id: string
          indian_amenities: string | null
          indian_community: string | null
          language: string | null
          language_tests: string | null
          living_costs: string | null
          name: string
          overview: string | null
          programs: string[] | null
          recognitions: string | null
          scholarships: string | null
          slug: string
          student_services: string | null
          subjects: string[] | null
          updated_at: string
        }
        Insert: {
          admission_requirements?: string | null
          brochures?: Json | null
          city: string
          contact_links?: Json | null
          created_at?: string
          cultural_societies?: string | null
          degrees?: string[] | null
          detailed_programs?: Json | null
          entrance_exams?: string | null
          facilities?: string | null
          fees?: string | null
          global_rankings?: string | null
          housing?: string | null
          id?: string
          indian_amenities?: string | null
          indian_community?: string | null
          language?: string | null
          language_tests?: string | null
          living_costs?: string | null
          name: string
          overview?: string | null
          programs?: string[] | null
          recognitions?: string | null
          scholarships?: string | null
          slug: string
          student_services?: string | null
          subjects?: string[] | null
          updated_at?: string
        }
        Update: {
          admission_requirements?: string | null
          brochures?: Json | null
          city?: string
          contact_links?: Json | null
          created_at?: string
          cultural_societies?: string | null
          degrees?: string[] | null
          detailed_programs?: Json | null
          entrance_exams?: string | null
          facilities?: string | null
          fees?: string | null
          global_rankings?: string | null
          housing?: string | null
          id?: string
          indian_amenities?: string | null
          indian_community?: string | null
          language?: string | null
          language_tests?: string | null
          living_costs?: string | null
          name?: string
          overview?: string | null
          programs?: string[] | null
          recognitions?: string | null
          scholarships?: string | null
          slug?: string
          student_services?: string | null
          subjects?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          accreditations: Json | null
          accreditations_text: string | null
          city: string
          contact_info: Json | null
          contact_info_text: string | null
          created_at: string | null
          description: string | null
          detailed_programs: Json | null
          detailed_programs_text: string | null
          emoji: string | null
          id: string
          image_url: string | null
          long_description: string | null
          name: string
          programs: string[] | null
          ranking: string | null
          rankings: Json | null
          rankings_text: string | null
          recognition: Json | null
          recognition_text: string | null
          specializations: Json | null
          specializations_text: string | null
          subjects: string[] | null
          tuition_fees: Json | null
          tuition_fees_text: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          accreditations?: Json | null
          accreditations_text?: string | null
          city: string
          contact_info?: Json | null
          contact_info_text?: string | null
          created_at?: string | null
          description?: string | null
          detailed_programs?: Json | null
          detailed_programs_text?: string | null
          emoji?: string | null
          id?: string
          image_url?: string | null
          long_description?: string | null
          name: string
          programs?: string[] | null
          ranking?: string | null
          rankings?: Json | null
          rankings_text?: string | null
          recognition?: Json | null
          recognition_text?: string | null
          specializations?: Json | null
          specializations_text?: string | null
          subjects?: string[] | null
          tuition_fees?: Json | null
          tuition_fees_text?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          accreditations?: Json | null
          accreditations_text?: string | null
          city?: string
          contact_info?: Json | null
          contact_info_text?: string | null
          created_at?: string | null
          description?: string | null
          detailed_programs?: Json | null
          detailed_programs_text?: string | null
          emoji?: string | null
          id?: string
          image_url?: string | null
          long_description?: string | null
          name?: string
          programs?: string[] | null
          ranking?: string | null
          rankings?: Json | null
          rankings_text?: string | null
          recognition?: Json | null
          recognition_text?: string | null
          specializations?: Json | null
          specializations_text?: string | null
          subjects?: string[] | null
          tuition_fees?: Json | null
          tuition_fees_text?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          created_at: string
          expiry_date: string | null
          file_name: string | null
          file_url: string | null
          id: string
          is_important: boolean | null
          name: string
          notes: string | null
          notification_enabled: boolean | null
          renewal_process: string[] | null
          requires_verification: boolean | null
          status: string | null
          submission_date: string | null
          type: string
          updated_at: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_important?: boolean | null
          name: string
          notes?: string | null
          notification_enabled?: boolean | null
          renewal_process?: string[] | null
          requires_verification?: boolean | null
          status?: string | null
          submission_date?: string | null
          type: string
          updated_at?: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_important?: boolean | null
          name?: string
          notes?: string | null
          notification_enabled?: boolean | null
          renewal_process?: string[] | null
          requires_verification?: boolean | null
          status?: string | null
          submission_date?: string | null
          type?: string
          updated_at?: string
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      user_plans: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          plan_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_modules: string[] | null
          created_at: string | null
          current_page: string | null
          id: string
          keys: number | null
          unlocked_modules: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_modules?: string[] | null
          created_at?: string | null
          current_page?: string | null
          id?: string
          keys?: number | null
          unlocked_modules?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_modules?: string[] | null
          created_at?: string | null
          current_page?: string | null
          id?: string
          keys?: number | null
          unlocked_modules?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_school_favorites: {
        Row: {
          created_at: string | null
          id: string
          school_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          school_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          school_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_school_favorites_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_school_favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
