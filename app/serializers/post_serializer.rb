class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :body, :image, :post_image_url, :created_at, :user_id

  has_many :comments #, serializer: CommentSerializer


  
end
