class ProfilesController < ApplicationController



    def create
        # Check if the user already has a profile
        if current_user.profile
          # If a profile exists, update it
          current_user.profile.update!(profile_params)
          render json: current_user.profile
        else
          # If no profile exists, create a new one
          profile = current_user.build_profile(profile_params)
          profile.save!
          render json: profile
        end
      end

    def edit_profile
        profile = current_user.profile.update!(profile_params)
        render json: profile
    end



    private

    def profile_params
        params.require(:profile).permit(:age, :sex, :location, :profile_photo)
    end

end
