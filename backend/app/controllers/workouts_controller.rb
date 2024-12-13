class WorkoutsController < ApplicationController
  def index
    weight      = params[:weight]
    kcal_intake = params[:kcal_intake]

    workouts  = WorkOut.order("RAND()").limit(10)
    data_list = workouts.workouts_data(weight: weight, kcal_intake: kcal_intake)

    render json: data_list
  end
end
