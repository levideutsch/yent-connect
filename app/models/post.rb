class Post < ApplicationRecord

    belongs_to :user
    has_one_attached :image
    has_many :comments

    # Likes
    has_many :likes
    has_many :liking_users, through: :likes, source: :user

    def post_image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end

end
