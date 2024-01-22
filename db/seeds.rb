# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# User.create(username: "levi", password: "123", password_confirmation: "123")
# User.create(username: "buba", password: "123", password_confirmation: "123")


# UserSetting.create(is_dark_mode: false, user: User.first)
# Comment.create(body: "first comment", user_id: User.first.id, post_id: Post.last.id)
# Comment.create(body: "second comment", user_id: User.first.id, post_id: Post.last.id)
# Comment.create(body: "third comment", user_id: User.last.id, post_id: Post.last.id)
# Comment.create(body: "third comment", user_id: User.first.id, post_id: Post.last.id)


# user1 = User.last
# user2 = User.find_by(username: "abba")
# # ... create other users ...

# # Create a Conversation between the first and last users
# conversation = Conversation.find_by_id(6)

# # Send a message from the first user to the second user
# message = Message.create(
#   body: 'Hello, user!',
#   conversation: conversation,
#   user: user1,        # user1 is the sender
#   recipient: user2    # user2 is the recipient
# )
# post1 = Post.last

# Like.create(user_id: user1.id, post_id: post1.id)


user_first = User.first
user_stam = User.find_by(username: "abba")

# Make user.first follow user.last
user_first.follow(user_stam)

