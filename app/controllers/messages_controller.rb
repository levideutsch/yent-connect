class MessagesController < ApplicationController
    skip_before_action :authorize, only: [:create_message]

  
    # POST /messages/create_for_conversation/:conversation_id
    # def create_for_conversation
    #     conversation = Conversation.find(params[:conversation_id])
    #     message = current_user.sent_messages.create!(body: params[:body], conversation: conversation)
    #     render json: message, status: :created
    #   end

    # def create_message
    #     conversation_id = params[:chatId]
    #     recipient = conversation.recipient
      
    #     new_message = current_user.sent_messages.create(
    #       conversation_id: params[:conversation_id],
    #       recipient_id: recipient.id,  # Set the recipient_id based on the conversation
    #       body: params[:body]
    #     )
      
    #     render json: new_message
    #   end

    def create_message
       
        conversation_id = params[:chatId].to_i
        conversation = Conversation.find_by_id(conversation_id)
      
        if conversation.nil?
          render json: { error: 'Conversation not found' }, status: :not_found
          return
        end
      
        recipient = params[:userId].to_i
      
        new_message = Message.create(
          conversation_id: conversation_id,
          user_id: current_user.id,
          recipient_id: recipient,
          body: params[:body]
        )
   
      
        # if new_message.persisted?
          render json: new_message
        # else
        #   render json: { error: 'Failed to create message' }, status: :unprocessable_entity
        # end
      end
    # def create_message
    #     conversation_id = params[:chatId].to_i
    #     conversation = Conversation.find_by_id(conversation_id)
      
    #     if conversation.nil?
    #       render json: { error: 'Conversation not found' }, status: :not_found
    #       return
    #     end
      
    #     # Determine the recipient based on the conversation
    #     recipient = (current_user == conversation.sender) ? conversation.recipient : conversation.sender
      
    #     new_message = current_user.sent_messages.create(
    #       conversation_id: conversation_id,
    #       recipient_id: recipient.id,
    #       body: params[:body]
    #     )
      
    #     # if new_message.persisted?
    #     #   render json: new_message
    #     # else
    #     #   render json: { error: 'Failed to create message' }, status: :unprocessable_entity
    #     # end
    #   end
      
      

    def all_messages
        sent = current_user.sent_messages
        received = current_user.received_messages
        render json: {sent: sent, received: received}
    end
  
    private
  
   
  
    
  end
  