class UsersController < ApplicationController
    skip_before_action :authorize, only: [:show, :all_users, :create]


    # Signup
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :ok
    end


    def show
        user = current_user
        if user
            render json: user.as_json(include: :user_setting)
        else
          render json: { errors: ["User not found"] }, status: :not_found
        end
    end

    def all_users
        users = User.all
        render json: users
    end
    
    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
