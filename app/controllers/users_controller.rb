class UsersController < ApplicationController
    skip_before_action :authorize, only: [:show, :create]


    # Signup
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :ok
    end

    # Stay logged in
    def show
        user = current_user
      
        if user
            render json: user.as_json(
                include: {
                  profile: {
                    only: [:id, :age, :sex, :location],
                    methods: :profile_photo_url
                  },
                  user_setting: {
                    only: [:is_dark_mode]
                  }
                }
              )
        else
          render json: { errors: ["User not found"] }, status: :not_found
        end
      end

    def all_users
        users = User.all.includes(:profile)
  
        users_data = users.map do |user|
          user_data = {
            id: user.id,
            username: user.username,
            
          }
      
          # Include profile information if available
          if user.profile
            profile_data = {
              age: user.profile.age,
              sex: user.profile.sex,
              location: user.profile.location,
              profile_photo_url: user.profile.profile_photo_url,
              # Include other profile attributes as needed
            }
      
            user_data[:profile] = profile_data
          end
      
          user_data
        end
      
        render json: users_data
    end


    def all_users_with_profiles
        users = User.all.includes(:profile)
  
        users_data = users.map do |user|
          user_data = {
            id: user.id,
            username: user.username,
            
          }
      
          # Include profile information if available
          if user.profile
            profile_data = {
              age: user.profile.age,
              sex: user.profile.sex,
              location: user.profile.location,
              profile_photo_url: user.profile.profile_photo_url,
              # Include other profile attributes as needed
            }
      
            user_data[:profile] = profile_data
          end
      
          user_data
        end
      
        render json: users_data
    end
    
    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
