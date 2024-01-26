class Profile < ApplicationRecord
    belongs_to :user
    has_one_attached :profile_photo


    def profile_photo_url
        Rails.application.routes.url_helpers.url_for(profile_photo) if profile_photo.attached?
    end
end
