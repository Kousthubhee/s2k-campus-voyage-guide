
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface HubComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
  user_profile?: {
    display_name: string;
    avatar_url?: string;
  };
  replies?: HubComment[];
}

export const useHubComments = (postId: string) => {
  const [comments, setComments] = useState<HubComment[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchComments = async () => {
    if (!postId) return;
    
    setLoading(true);
    try {
      // Get comments with basic info first
      const { data: commentsData, error: commentsError } = await supabase
        .from('hub_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Get user profiles for all comment authors
      const userIds = [...new Set(commentsData?.map(c => c.user_id) || [])];
      const profilePromises = userIds.map(async (userId) => {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', userId)
          .single();
        
        return {
          user_id: userId,
          display_name: profileData?.name || profileData?.email || 'Anonymous User'
        };
      });

      const profiles = await Promise.all(profilePromises);
      const profileMap = profiles.reduce((acc, profile) => {
        acc[profile.user_id] = profile;
        return acc;
      }, {} as Record<string, { display_name: string }>);

      // Transform comments with profile data
      const commentsWithProfiles = (commentsData || []).map(comment => ({
        ...comment,
        user_profile: {
          display_name: profileMap[comment.user_id]?.display_name || 'Anonymous',
          avatar_url: undefined
        }
      }));

      // Organize comments into parent-child structure
      const parentComments = commentsWithProfiles.filter(c => !c.parent_id);
      const childComments = commentsWithProfiles.filter(c => c.parent_id);

      const organizedComments = parentComments.map(parent => ({
        ...parent,
        replies: childComments.filter(child => child.parent_id === parent.id)
      }));

      setComments(organizedComments);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, parentId?: string) => {
    if (!user || !content.trim()) return;

    try {
      const insertData: any = {
        post_id: postId,
        user_id: user.id,
        content: content.trim()
      };

      if (parentId) {
        insertData.parent_id = parentId;
      }

      const { error } = await supabase
        .from('hub_comments')
        .insert(insertData);

      if (error) throw error;

      toast.success('Comment added successfully!');
      fetchComments();
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const updateComment = async (commentId: string, content: string) => {
    if (!user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('hub_comments')
        .update({ content: content.trim() })
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Comment updated successfully!');
      fetchComments();
    } catch (error: any) {
      console.error('Error updating comment:', error);
      toast.error('Failed to update comment');
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('hub_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Comment deleted successfully!');
      fetchComments();
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return {
    comments,
    loading,
    addComment,
    updateComment,
    deleteComment,
    refetch: fetchComments
  };
};
