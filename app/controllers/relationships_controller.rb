class RelationshipsController < ApplicationController

  # skip_before_action :authorize, only: [:current_user_relationships]


    def current_user_relationships
        following = current_user.following
        followers = current_user.followers
        render json: {following: following, followers: followers}
    end

    def follow_user
        me = current_user
        who_im_following = User.find_by(id: params[:userId])
      
        if who_im_following
          follow = me.follow(who_im_following)
          render json: follow
        else
          render json: { error: 'User not found' }, status: :not_found
        end
      end


      def unfollow_user
        me = current_user
        who_im_following = User.find_by(id: params[:userId])
      
        if who_im_following
          unfollow = me.unfollow(who_im_following)
          render json: unfollow
        else
          render json: { error: 'User not found' }, status: :not_found
        end
      end

    # def relationship_by_id
    #     user = User.find_by(id: params[:userId])
    #     following = user.following
    #     followers = user.followers
    #     render json: {following: following, followers: followers}
    # end
    def relationship_by_id
      user = User.find_by(id: params[:userId])
    
      following = user.following.includes(:profile)
      followers = user.followers.includes(:profile)
    
      following_data = following.map do |followed_user|
        {
          id: followed_user.id,
          username: followed_user.username,
          profile: followed_user.profile&.slice(:id, :age, :sex, :location, :profile_photo_url)
        }
      end
    
      followers_data = followers.map do |follower_user|
        {
          id: follower_user.id,
          username: follower_user.username,
          profile: follower_user.profile&.slice(:id, :age, :sex, :location, :profile_photo_url)
        }
      end
    
      render json: { following: following_data, followers: followers_data }
    end
    



end
