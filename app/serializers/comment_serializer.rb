class CommentSerializer
  include JSONAPI::Serializer
  attributes :body, :user_id, :post_id

  # belongs_to :post
  belongs_to :user, serializer: UserSerializer
end
