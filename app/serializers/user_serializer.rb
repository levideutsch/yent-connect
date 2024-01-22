class UserSerializer
  include JSONAPI::Serializer
  attributes :username, :id 
end
