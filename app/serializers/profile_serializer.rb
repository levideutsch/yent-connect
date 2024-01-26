class ProfileSerializer
  include JSONAPI::Serializer
  attributes :id, :age, :sex, :location, :profile_photo, :profile_photo_url, :user_id
end
