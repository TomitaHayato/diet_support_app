class WorkoutsController < ApplicationController
  def index
    weight      = params[:weight]
    kcal_intake = params[:kcal_intake]

    data_list = WorkOut.random10.workouts_data(weight: weight, kcal_intake: kcal_intake)

    render json: data_list
  end
end
