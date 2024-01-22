class PostsController < ApplicationController
    skip_before_action :authorize, only: [:latest, :index]


 

        # def index
        #     # Grab all post in desc order
        #     posts = Post.all.order(created_at: :desc)

        #     serialized_posts = PostSerializer.new(posts, include: [:comments]).serializable_hash[:data].map do |post|
        #       attributes = post[:attributes]
        #       attributes[:comments] = post[:relationships][:comments][:data].map do |comment_data|
        #         comment_id = comment_data[:id]
        #         comment = Comment.find(comment_id)
        #         CommentSerializer.new(comment).serializable_hash[:data][:attributes]
        #       end
        #       attributes
        #     end
          
        #     render json: { posts: serialized_posts }
        #   end




    def all_users_posts
        # Grab all posts in descending order
        posts = Post.all.order(created_at: :desc)
        
        serialized_posts = PostSerializer.new(posts, include: [:comments]).serializable_hash[:data].map do |post|
            attributes = post[:attributes]
            attributes[:comments] = post[:relationships][:comments][:data]
                                    .map { |comment_data| Comment.find(comment_data[:id]) }
                                    .sort_by(&:created_at)
                                    .reverse
                                    .map { |comment| CommentSerializer.new(comment).serializable_hash[:data][:attributes] }
            attributes
        end
        
        render json: { posts: serialized_posts }
    end



    
    # def index
    #     # Get the users that the current_user follows
    #     following_users = current_user.following
      
    #     # Get posts from those following users in descending order
    #     posts = Post.where(user: following_users).order(created_at: :desc)
      
    #     serialized_posts = PostSerializer.new(posts, include: [:comments]).serializable_hash[:data].map do |post|
    #       attributes = post[:attributes]
    #       attributes[:comments] = post[:relationships][:comments][:data]
    #                                 .map { |comment_data| Comment.find(comment_data[:id]) }
    #                                 .sort_by(&:created_at)
    #                                 .reverse
    #                                 .map { |comment| CommentSerializer.new(comment).serializable_hash[:data][:attributes] }
    #       attributes
    #     end
      
    #     render json: { posts: serialized_posts }
    #   end
    #final
    def index
        # Get the users that the current_user follows
        following_users = current_user.following
      
        # Get posts from those following users and the current_user in descending order
        posts = Post.where(user: [current_user] + following_users).order(created_at: :desc)
      
        serialized_posts = PostSerializer.new(posts, include: [:comments]).serializable_hash[:data].map do |post|
          attributes = post[:attributes]
          attributes[:comments] = post[:relationships][:comments][:data]
                                    .map { |comment_data| Comment.find(comment_data[:id]) }
                                    .sort_by(&:created_at)
                                    .reverse
                                    .map { |comment| CommentSerializer.new(comment).serializable_hash[:data][:attributes] }
          attributes
        end
      
        render json: { posts: serialized_posts }
      end
      
          
        

    def create 
        post = current_user.posts.create!(post_params)
        render json: post
    end

    private

    def post_params
        params.require(:post).permit(:body, :image)
    end
end
