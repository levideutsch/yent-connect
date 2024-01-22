class LikesController < ApplicationController

    def first_like
        render json: Like.first
    end

    def display_likes_for_post
        render json: Like.all
    end

    def like_post 
     
        post = Post.find_by(id: params[:postId].to_i)
        
        # Check if the user has already liked the post
        existing_like = Like.find_by(post_id: post.id, user_id: current_user.id)
      
        if existing_like
          # User has already liked the post, handle accordingly (e.g., return an error)
          render json: { error: 'User has already liked this post' }, status: :unprocessable_entity
        else
          # User hasn't liked the post, create a new like
          like = Like.create(post_id: post.id, user_id: current_user.id)
          render json: like
        end
      end

      def unlike_post
        post_id = params[:postId].to_i
        user_id = current_user.id
        like = Like.find_by(post_id: post_id, user_id: user_id)
    
        if like
          like.destroy
          render json: { message: 'Like successfully removed' }
        else
          render json: { error: 'Like not found' }, status: :not_found
        end
      end

      def all_likes_for_post
        post_id = params[:post_id].to_i
        likes = Like.where(post_id: post_id)
        render json: likes
      end

      def max_likes
        post_with_max_likes = Post.all.max_by { |post| post.likes.count }
      
        render json: post_with_max_likes
      end
      
end
