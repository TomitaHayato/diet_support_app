class WorkoutRecordsController < ApplicationController
  before_action :authenticate_user! # 未認証ユーザーにstatus: :401を返す

  # 今日、今週、今月、全期間のデータを返す
  def index
    now          = Time.current
    yearly_data  = current_user.workout_records.yearly_data(now.beginning_of_year  , now.end_of_year)
    monthly_data = current_user.workout_records.monthly_data(now.beginning_of_month, now.end_of_month)
    weekly_data  = current_user.workout_records.weekly_data(now.beginning_of_week  , now.end_of_week)
    today_data   = current_user.workout_records.today_data
    all_data     = { yearly_data:, monthly_data:, weekly_data:, today_data:}

    render json: all_data, status: 200
  end

  def index_yearly_data
    # 取得したいデータは何年前?
    target_year = params[:years_ago].to_i.years.ago
    yearly_data = current_user.workout_records.yearly_data(target_year.beginning_of_year..target_year.end_of_year)

    render json: yearly_data
  end

  def index_monthly_data
    # 取得したいデータは何ヶ月前か
    target_month = params[:month_ago].to_i.month.ago
    monthly_data = current_user.workout_records.monthly_data(target_month.beginning_of_month..target_month.end_of_month)

    render json: monthly_data
  end

  def index_weekly_data
    # 取得したいデータは何週間前か
    target_week = params[:weeks_ago].to_i.weks_ago
    weekly_data = current_user.workout_records.weekly_data(target_week.beginning_of_week..target_week.end_of_week)

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
    params.require(:workout_record).permit(:workout_time, :burned_calories, :unburned_calories, :intaked_calories)
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
