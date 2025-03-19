class WorkoutRecordsController < ApplicationController
  before_action :authenticate_user! # 未認証ユーザーにstatus: :401を返す

  # 今日、今週、今月、全期間のデータを返す
  def index
    now          = Time.current
    yearly_data  = current_user.get_complete_yearly_records(now)
    monthly_data = current_user.get_complete_monthly_records(now)
    weekly_data  = current_user.get_complete_weekly_records(now)
    today_data   = current_user.get_today_record
    history_data = current_user.get_records_history
    all_data     = { yearly_data:, monthly_data:, weekly_data:, today_data:, history_data:}
    render json: all_data, status: 200
  end

  def index_yearly_data
    # 取得したいデータは何年前?
    target_year = params[:years_ago].to_i.years.ago
    yearly_data = current_user.workout_records.yearly_data(target_year)

    render json: yearly_data
  end

  def index_monthly_data
    # 取得したいデータは何ヶ月前か
    target_month = params[:month_ago].to_i.month.ago
    monthly_data = current_user.workout_records.monthly_data(target_month)

    render json: monthly_data
  end

  def index_weekly_data
    # 取得したいデータは何週間前か
    target_week = params[:weeks_ago].to_i.weeks.ago
    weekly_data = current_user.workout_records.weekly_data(target_week)

    render json: weekly_data
  end

  def create
    if current_user.workout_records.create(add_today_info_to_params(new_record_params))
      redirect_to action: :index
    else
      render status: 422
      return
    end
  end

  private

  def new_record_params
    params.require(:workout_record).permit(:workout_time, :burned_calories, :intaked_calories, :workout_id)
  end

  def add_today_info_to_params(params_strong)
    today = Time.current
    # 今日の曜日, 月, 日
    week  = ["日", "月", "火", "水", "木", "金", "土"]
    params_strong[:dow]   = week[today.wday]
    params_strong[:month] = today.strftime("%m")
    params_strong[:date]  = today.strftime("%d")

    params_strong
  end
end
