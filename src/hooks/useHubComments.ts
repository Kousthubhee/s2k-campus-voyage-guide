
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
    if (!postId) {
      console.log('No postId provided');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Fetching comments for post:', postId);
      
      // Get comments with basic info first
      const { data: commentsData, error: commentsError } = await supabase
        .from('hub_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
        throw commentsError;
      }

      console.log('Comments data:', commentsData);

      if (!commentsData || commentsData.length === 0) {
        setComments([]);
        return;
      }

      // Get user profiles for all comment authors
      const userIds = [...new Set(commentsData.map(c => c.user_id))];
      console.log('User IDs for profiles:', userIds);
      
      const profilePromises = userIds.map(async (userId) => {
        try {
          // First try hub_user_profiles
          const { data: hubProfile } = await supabase
            .from('hub_user_profiles')
            .select('display_name, avatar_url')
            .eq('user_id', userId)
            .maybeSingle();

          if (hubProfile) {
            return {
              user_id: userId,
              display_name: hubProfile.display_name,
              avatar_url: hubProfile.avatar_url
            };
          }

          // Fallback to profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('name, email')
            .eq('id', userId)
            .maybeSingle();
          
          return {
            user_id: userId,
            display_name: profileData?.name || profileData?.email || 'Anonymous User',
            avatar_url: undefined
          };
        } catch (error) {
          console.error('Error fetching profile for user:', userId, error);
          return {
            user_id: userId,
            display_name: 'Anonymous User',
            avatar_url: undefined
          };
        }
      });

      const profiles = await Promise.all(profilePromises);
      const profileMap = profiles.reduce((acc, profile) => {
        acc[profile.user_id] = profile;
        return acc;
      }, {} as Record<string, { display_name: string; avatar_url?: string }>);

      console.log('Profile map:', profileMap);

      // Transform comments with profile data
      const commentsWithProfiles = commentsData.map(comment => ({
        id: comment.id,
        post_id: comment.post_id,
        user_id: comment.user_id,
        content: comment.content,
        parent_id: comment.parent_id,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        user_profile: {
          display_name: profileMap[comment.user_id]?.display_name || 'Anonymous User',
          avatar_url: profileMap[comment.user_id]?.avatar_url
        }
      }));

      // Organize comments into parent-child structure
      const parentComments = commentsWithProfiles.filter(c => !c.parent_id);
      const childComments = commentsWithProfiles.filter(c => c.parent_id);

      const organizedComments = parentComments.map(parent => ({
        ...parent,
        replies: childComments.filter(child => child.parent_id === parent.id)
      }));

      console.log('Organized comments:', organizedComments);
      setComments(organizedComments);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, parentId?: string) => {
    if (!user || !content.trim()) {
      toast.error('Please sign in and enter a comment');
      return;
    }

    console.log('Adding comment:', { content, parentId, postId, userId: user.id });

    try {
      const insertData: any = {
        post_id: postId,
        user_id: user.id,
        content: content.trim()
      };

      if (parentId) {
        insertData.parent_id = parentId;
      }

      const { data, error } = await supabase
        .from('hub_comments')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error inserting comment:', error);
        throw error;
      }

      console.log('Comment added successfully:', data);
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
    if (postId) {
      fetchComments();
    }
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
