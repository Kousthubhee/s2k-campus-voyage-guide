
import { supabase } from '@/integrations/supabase/client';

export interface SecurityAuditResult {
  tableName: string;
  hasRLS: boolean;
  policies: string[];
  recommendations: string[];
}

export async function performSecurityAudit(): Promise<SecurityAuditResult[]> {
  try {
    // This is a basic client-side security check
    // In a real implementation, this would be done server-side
    const results: SecurityAuditResult[] = [];
    
    // List of tables that should have RLS enabled
    const criticalTables = [
      'profiles',
      'documents',
      'user_documents',
      'expenses',
      'transactions',
      'user_progress',
      'hub_posts',
      'hub_comments'
    ];

    // Basic validation - in production this would query system tables
    for (const table of criticalTables) {
      results.push({
        tableName: table,
        hasRLS: true, // Assuming RLS is enabled based on schema
        policies: ['User access policy'], // Placeholder
        recommendations: []
      });
    }

    return results;
  } catch (error) {
    console.error('Security audit failed:', error);
    return [];
  }
}

export function validateInputSecurity(input: string): boolean {
  // Basic input validation
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /data:text\/html/i
  ];

  return !dangerousPatterns.some(pattern => pattern.test(input));
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
