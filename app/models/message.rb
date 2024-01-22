class Message < ApplicationRecord
    belongs_to :conversation
    belongs_to :user
    belongs_to :recipient, class_name: 'User'


    validates_presence_of :body, :conversation_id, :user_id

end
