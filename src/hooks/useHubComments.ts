
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useHubUserProfiles } from '@/hooks/useHubUserProfiles';
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
  const [lastFetchedPostId, setLastFetchedPostId] = useState<string | null>(null);
  const { user } = useAuth();
  const { getProfile } = useHubUserProfiles();

  // Memoize the buildCommentTree function to prevent recreation on every render
  const buildCommentTree = useMemo(() => {
    return (comments: HubComment[], parentId: string | null = null): HubComment[] => {
      return comments
        .filter(comment => comment.parent_id === parentId)
        .map(comment => ({
          ...comment,
          replies: buildCommentTree(comments, comment.id)
        }));
    };
  }, []);

  const fetchComments = useCallback(async () => {
    if (!postId || loading || lastFetchedPostId === postId) return;
    
    setLoading(true);
    setLastFetchedPostId(postId);
    
    try {
      console.log('Fetching comments for post:', postId);
      
      // Get all comments for this post
      const { data: commentsData, error: commentsError } = await supabase
        .from('hub_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      console.log('Raw comments data:', commentsData);

      if (!commentsData || commentsData.length === 0) {
        setComments([]);
        return;
      }

      // Get user profiles for all comment authors
      const userIds = [...new Set(commentsData.map(c => c.user_id))];
      console.log('User IDs to fetch profiles for:', userIds);
      
      const profilePromises = userIds.map(userId => getProfile(userId));
      const profiles = await Promise.all(profilePromises);
      
      const profileMap = profiles.reduce((acc, profile) => {
        if (profile) {
          acc[profile.user_id] = profile;
        }
        return acc;
      }, {} as Record<string, any>);

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

      // Build nested comment tree
      const nestedComments = buildCommentTree(commentsWithProfiles);

      console.log('Organized nested comments:', nestedComments);
      setComments(nestedComments);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  }, [postId, getProfile, buildCommentTree, loading, lastFetchedPostId]);

  const addComment = async (content: string, parentId?: string) => {
    if (!user || !content.trim()) return;

    try {
      console.log('Adding comment:', { content, parentId, postId, userId: user.id });

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
      // Reset the last fetched post ID to force a refresh
      setLastFetchedPostId(null);
      await fetchComments();
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
      setLastFetchedPostId(null);
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
      setLastFetchedPostId(null);
      fetchComments();
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  // Reset comments when postId changes
  useEffect(() => {
    if (postId !== lastFetchedPostId) {
      setComments([]);
      setLastFetchedPostId(null);
    }
  }, [postId, lastFetchedPostId]);

  useEffect(() => {
    if (postId && !loading && lastFetchedPostId !== postId) {
      fetchComments();
    }
  }, [postId, fetchComments, loading, lastFetchedPostId]);

  return {
    comments,
    loading,
    addComment,
    updateComment,
    deleteComment,
    refetch: useCallback(() => {
      setLastFetchedPostId(null);
      fetchComments();
    }, [fetchComments])
  };
};
