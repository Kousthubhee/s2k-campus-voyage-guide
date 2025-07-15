import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface HubPost {
  id: string;
  title: string;
  content: string;
  category: string;
  type: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  media_url?: string;
  poll_options?: Array<{ text: string; votes: number; voters?: string[] }>;
  user_profile?: {
    display_name: string;
    avatar_url?: string;
  };
}

export const useHubPosts = () => {
  const [posts, setPosts] = useState<HubPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      // First get the posts
      const { data: postsData, error: postsError } = await supabase
        .from('hub_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Then get user profiles separately
      const userIds = [...new Set(postsData?.map(post => post.user_id) || [])];
      const { data: profilesData } = await supabase
        .from('hub_user_profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', userIds);

      // Create a map of user profiles
      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.user_id, profile);
      });

      const transformedPosts: HubPost[] = (postsData || []).map(post => ({
        ...post,
        likes_count: post.likes_count || 0,
        comments_count: post.comments_count || 0,
        poll_options: post.poll_options ? 
          (Array.isArray(post.poll_options) ? post.poll_options : []) as Array<{ text: string; votes: number; voters?: string[] }> : 
          undefined,
        user_profile: profilesMap.get(post.user_id) || {
          display_name: 'Anonymous User',
          avatar_url: null
        }
      }));

      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (postData: {
    title: string;
    content: string;
    category: string;
    type: string;
    media_url?: string;
    poll_options?: Array<{ text: string; votes: number }>;
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

      await fetchPosts();
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  const updatePost = async (postId: string, updates: Partial<HubPost>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('hub_posts')
        .update(updates)
        .eq('id', postId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchPosts();
      toast.success('Post updated successfully!');
    } catch (error) {
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

      await fetchPosts();
      toast.success('Post deleted successfully!');
    } catch (error) {
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
      // Check if user already liked the post
      const { data: existingLike } = await supabase
        .from('hub_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Unlike the post
        await supabase
          .from('hub_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        // Like the post
        await supabase
          .from('hub_likes')
          .insert({ post_id: postId, user_id: user.id });
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to update like');
    }
  };

  const voteOnPoll = async (postId: string, optionIndex: number) => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      // Get the current post
      const post = posts.find(p => p.id === postId);
      if (!post || !post.poll_options) return;

      const updatedOptions = [...post.poll_options];
      
      // Check if user has already voted
      const hasVoted = updatedOptions.some(option => 
        option.voters && option.voters.includes(user.id)
      );

      if (hasVoted) {
        toast.error('You have already voted on this poll');
        return;
      }

      // Add vote to the selected option
      if (!updatedOptions[optionIndex].voters) {
        updatedOptions[optionIndex].voters = [];
      }
      updatedOptions[optionIndex].voters!.push(user.id);
      updatedOptions[optionIndex].votes = updatedOptions[optionIndex].voters!.length;

      // Update the post in database
      const { error } = await supabase
        .from('hub_posts')
        .update({ poll_options: updatedOptions })
        .eq('id', postId);

      if (error) throw error;

      await fetchPosts();
      toast.success('Vote recorded successfully!');
    } catch (error) {
      console.error('Error voting on poll:', error);
      toast.error('Failed to record vote');
    }
  };

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    likePost,
    voteOnPoll,
    refetch: fetchPosts,
  };
};
