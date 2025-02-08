class WorkOutsController < ApplicationController
  def index
    weight      = params[:weight]&.to_i
    kcal_intake = params[:kcal_intake]&.to_i || 0

    render status: 422 if !weight # 体重データが送信されていない場合、422エラーを返す

    data_list = WorkOut.workouts_data(weight:, kcal_intake:)

    render json: data_list
  end
end
