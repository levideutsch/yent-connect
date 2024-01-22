class User < ApplicationRecord

    # Security
    has_secure_password

    # Associations
    has_one :user_setting
    has_many :posts
    has_many :comments

    # Conversations and Messages
    has_many :sent_conversations, foreign_key: :sender_id, class_name: 'Conversation'
    has_many :received_conversations, foreign_key: :recipient_id, class_name: 'Conversation'
    has_many :sent_messages, through: :sent_conversations, source: :messages
    has_many :received_messages, through: :received_conversations, source: :messages

    # Likes
    has_many :likes
    has_many :liked_posts, through: :likes, source: :post

      # Following and Followers
    has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
    has_many :following, through: :active_relationships, source: :followed

    has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
    has_many :followers, through: :passive_relationships, source: :follower

  def follow(user)
    # Create active relationship (user.first follows user.last)
    active_relationships.create(followed_id: user.id)

    # Check if user.last is not already following user.first
    unless user.following?(self)
      # If not, create active relationship (user.last follows user.first)
      user.active_relationships.create(followed_id: self.id)
    end
  end

  def unfollow(user)
    active_relationships.find_by(followed_id: user.id)&.destroy
    user.active_relationships.find_by(followed_id: self.id)&.destroy
  end

  def following?(user)
    following.include?(user)
  end







    # Methods
    after_create :create_user_setting

    # validations
    validates :username, presence: true, uniqueness: true
    validates :password_confirmation, presence: true

    private

    # Creates users settings after creation of user object
    def create_user_setting
      UserSetting.create(user: self)
    end

end
