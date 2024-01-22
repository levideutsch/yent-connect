class UserSettingsController < ApplicationController
    skip_before_action :authorize, only: [:toggle_theme]

    # Toggle between dark mode and light mode 
    def toggle_theme
        user_setting = current_user.user_setting
        if user_setting
          new_theme = !user_setting.is_dark_mode
          user_setting.update(is_dark_mode: new_theme)
          render json: { is_dark_mode: new_theme }
        else
          render json: { error: 'User setting not found' }, status: :not_found
        end
      end

      def md
        mode = current_user.user_setting
        render json: mode
      end
  

end
