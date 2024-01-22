class CommentsController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        new_comment = Comment.create!(comment_params)
        render json: new_comment
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :user_id, :post_id)
    end

end
