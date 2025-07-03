
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface HubPost {
  id: string;
  title: string;
  content: string;
  category: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  author?: {
    name: string;
    email: string;
  };
}

export interface HubComment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  post_id: string;
  author?: {
    name: string;
    email: string;
  };
}

export const useHubData = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<HubPost[]>([]);
  const [comments, setComments] = useState<{ [postId: string]: HubComment[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      // Fetch posts with user profile information
      const { data: postsData, error } = await supabase
        .from('hub_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get unique user IDs
      const userIds = [...new Set(postsData?.map(post => post.user_id) || [])];
      
      // Fetch profiles for these users
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, name, email')
        .in('id', userIds);

      // Create a map of user profiles
      const profilesMap = new Map(
        profilesData?.map(profile => [profile.id, profile]) || []
      );

      const postsWithAuthor = postsData?.map(post => ({
        ...post,
        author: profilesMap.get(post.user_id) || undefined
      })) || [];

      setPosts(postsWithAuthor);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const { data: commentsData, error } = await supabase
        .from('hub_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Get unique user IDs for comments
      const userIds = [...new Set(commentsData?.map(comment => comment.user_id) || [])];
      
      // Fetch profiles for these users
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, name, email')
        .in('id', userIds);

      // Create a map of user profiles
      const profilesMap = new Map(
        profilesData?.map(profile => [profile.id, profile]) || []
      );

      const commentsWithAuthor = commentsData?.map(comment => ({
        ...comment,
        author: profilesMap.get(comment.user_id) || undefined
      })) || [];

      setComments(prev => ({
        ...prev,
        [postId]: commentsWithAuthor
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    }
  };

  const createPost = async (title: string, content: string, category: string) => {
    if (!user) {
      toast.error('Please log in to create a post');
      return;
    }

    try {
      const { error } = await supabase
        .from('hub_posts')
        .insert({
          user_id: user.id,
          title,
          content,
          category
        });

      if (error) throw error;

      toast.success('Post created successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  const createComment = async (postId: string, content: string) => {
    if (!user) {
      toast.error('Please log in to comment');
      return;
    }

    try {
      const { error } = await supabase
        .from('hub_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content
        });

      if (error) throw error;

      toast.success('Comment added successfully!');
      fetchComments(postId);
      
      // Update comment count manually
      const { error: updateError } = await supabase
        .from('hub_posts')
        .update({ comments_count: supabase.from('hub_comments').select('*', { count: 'exact' }).eq('post_id', postId) })
        .eq('id', postId);
      
      fetchPosts();
    } catch (error) {
      console.error('Error creating comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const updateComment = async (commentId: string, content: string, postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('hub_comments')
        .update({ content })
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Comment updated successfully!');
      fetchComments(postId);
    } catch (error) {
      console.error('Error updating comment:', error);
      toast.error('Failed to update comment');
    }
  };

  const deleteComment = async (commentId: string, postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('hub_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Comment deleted successfully!');
      fetchComments(postId);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) {
      toast.error('Please log in to like posts');
      return;
    }

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('hub_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('hub_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        // Get current post to decrement likes
        const { data: currentPost } = await supabase
          .from('hub_posts')
          .select('likes_count')
          .eq('id', postId)
          .single();

        if (currentPost) {
          await supabase
            .from('hub_posts')
            .update({ likes_count: Math.max(0, (currentPost.likes_count || 0) - 1) })
            .eq('id', postId);
        }
      } else {
        // Like
        await supabase
          .from('hub_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });

        // Get current post to increment likes
        const { data: currentPost } = await supabase
          .from('hub_posts')
          .select('likes_count')
          .eq('id', postId)
          .single();

        if (currentPost) {
          await supabase
            .from('hub_posts')
            .update({ likes_count: (currentPost.likes_count || 0) + 1 })
            .eq('id', postId);
        }
      }

      fetchPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  return {
    posts,
    comments,
    loading,
    fetchComments,
    createPost,
    createComment,
    updateComment,
    deleteComment,
    toggleLike
  };
};
