class ConversationsController < ApplicationController
    skip_before_action :authorize, only: [:create, :destroy, :index, :show]


#     #  Create conversation
#     def create_conversation
#         recipient_id = params[:user]
#         existing_conversation = Conversation.between_users(current_user.id, recipient_id).first
      
#         if existing_conversation
#           render json: { error: 'Conversation already exists' }, status: :unprocessable_entity
#         else
#           new_conversation = Conversation.create!(
#             sender: current_user,
#             recipient_id: recipient_id
#           )
#           render json: new_conversation
#         end
#       end
    def create_conversation
        recipient_id = params[:user]
        existing_conversation = Conversation.between_users(current_user.id, recipient_id).first

        if existing_conversation
        render json: { chatId: existing_conversation.id }
        else
        new_conversation = Conversation.create!(
            sender: current_user,
            recipient_id: recipient_id
        )
        render json: { chatId: new_conversation.id }
        end
    end

    def show
        conversation = Conversation.find(params[:id])
        messages = conversation.messages
    
        render json: { conversation: conversation, messages: messages }
    end

      

    # Delete conversation
    def destroy
    end

    # View all conversations
    def index
       sent = current_user.sent_conversations
       received = current_user.received_conversations
    render json: {sent: sent, received: received}
    end

    # View one specific conversation (optional)
    # def show
    # end

end
