
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface HubPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  type: 'qa' | 'blog' | 'reel' | 'poll';
  media_url?: string;
  poll_options?: any[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export const useHubPosts = () => {
  const [posts, setPosts] = useState<HubPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('hub_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our HubPost interface
      const transformedPosts: HubPost[] = (data || []).map(post => ({
        id: post.id,
        user_id: post.user_id,
        title: post.title,
        content: post.content,
        category: post.category,
        type: (post as any).type || 'qa' as 'qa' | 'blog' | 'reel' | 'poll',
        media_url: (post as any).media_url,
        poll_options: (post as any).poll_options,
        likes_count: post.likes_count || 0,
        comments_count: post.comments_count || 0,
        created_at: post.created_at,
        updated_at: post.updated_at
      }));
      
      setPosts(transformedPosts);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: {
    title: string;
    content: string;
    category: string;
    type: 'qa' | 'blog' | 'reel' | 'poll';
    media_url?: string;
    poll_options?: any[];
  }) => {
    if (!user) {
      toast.error('Please sign in to create posts');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('hub_posts')
        .insert({
          ...postData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      const newPost: HubPost = {
        id: data.id,
        user_id: data.user_id,
        title: data.title,
        content: data.content,
        category: data.category,
        type: (data as any).type || postData.type,
        media_url: (data as any).media_url || postData.media_url,
        poll_options: (data as any).poll_options || postData.poll_options,
        likes_count: data.likes_count || 0,
        comments_count: data.comments_count || 0,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      
      setPosts(prev => [newPost, ...prev]);
      toast.success('Post created successfully!');
      return newPost;
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
      throw error;
    }
  };

  const updatePost = async (postId: string, updates: Partial<HubPost>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('hub_posts')
        .update(updates)
        .eq('id', postId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      const updatedPost: HubPost = {
        id: data.id,
        user_id: data.user_id,
        title: data.title,
        content: data.content,
        category: data.category,
        type: (data as any).type || 'qa' as 'qa' | 'blog' | 'reel' | 'poll',
        media_url: (data as any).media_url,
        poll_options: (data as any).poll_options,
        likes_count: data.likes_count || 0,
        comments_count: data.comments_count || 0,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      
      setPosts(prev => prev.map(post => post.id === postId ? updatedPost : post));
      toast.success('Post updated successfully!');
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    }
  };

  const deletePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('hub_posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setPosts(prev => prev.filter(post => post.id !== postId));
      toast.success('Post deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const likePost = async (postId: string) => {
    if (!user) {
      toast.error('Please sign in to like posts');
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

        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: Math.max(0, post.likes_count - 1) }
            : post
        ));
      } else {
        // Like
        await supabase
          .from('hub_likes')
          .insert({ post_id: postId, user_id: user.id });

        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        ));
      }
    } catch (error: any) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    likePost,
    refetch: fetchPosts,
  };
};
