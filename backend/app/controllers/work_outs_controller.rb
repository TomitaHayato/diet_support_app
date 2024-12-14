class WorkOutsController < ApplicationController
  def index
    p params
    weight      = params[:weight].to_i
    kcal_intake = params[:kcal_intake].to_i

    data_list = WorkOut.random10.workouts_data(weight: weight, kcal_intake: kcal_intake)

    render json: data_list
  end
end
