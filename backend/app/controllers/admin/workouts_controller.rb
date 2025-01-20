class Admin::WorkoutsController < Admin::BasesController
  def index
    all_workouts = WorkOut.includes(:tags)
    render json: all_workouts.as_json(include: :tags)
  end

  def update
    workout = WorkOut.find(params[:id])
  end

  def destroy
    workout = WorkOut.find(params[:id])
  end
end
