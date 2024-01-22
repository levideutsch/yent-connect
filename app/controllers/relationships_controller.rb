class RelationshipsController < ApplicationController

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



end
