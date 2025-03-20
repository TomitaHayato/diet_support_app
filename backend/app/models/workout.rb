require 'bigdecimal'

class Workout < ApplicationRecord
  has_many :workout_tags, dependent: :destroy
  has_many :tags        , through: :workout_tags

  has_many :user_workout_likes, dependent: :destroy
  has_many :users             , through: :user_workout_likes

  has_many :workout_records, dependent: :nullify
  has_many :record_users   , through: :workout_records, source: :user

  validates :name, presence: true
  validates :mets, presence: true

  # [{id, name, 1時間あたりの消費カロリー, 必要な運動量}, {...} }形式の配列を返す
  def self.workouts_data(weight:, kcal_intake:)
    all_workouts = order(mets: :desc).includes(:tags)

    all_workouts.map do |workout|
      workout.make_workout_data(weight, kcal_intake)
    end
  end

  def make_workout_data(weight, kcal_intake)
    {
      id:,
      name:,
      burned_kcal_per_min: burned_kcal_per_min(weight),
      burned_kcal_per_sec: burned_kcal_per_sec(weight),
      required_exercise_time: required_exercise_time(weight:, kcal_intake:),
      tag_list: tags.pluck(:name)
    }
  end

  # [消費kcal/hour] = mets x 体重kg x 1.05 (厚生労働省)
  def burned_kcal(weight)
    result = BigDecimal(mets.to_s) * BigDecimal(weight.to_s) * BigDecimal('1.05')
    result.to_f
  end

  # tagを付与する
  def set_tag(tag)
    tags << tag unless tags.include?(tag)
  end

  # 摂取カロリーを消費するには最低何分の運動が必要？（整数）
  def required_exercise_time(weight:, kcal_intake:)
    return 0 if weight == 0
    
    result = kcal_intake / BigDecimal(burned_kcal_per_min(weight).to_s)
    result.ceil
  end

  # 1分で消費するkcal
  def burned_kcal_per_min(weight)
    result = BigDecimal(burned_kcal(weight).to_s) / 60
    result.to_f.round(5)
  end

  # 1秒で消費するkcal
  def burned_kcal_per_sec(weight)
    result = BigDecimal(burned_kcal(weight).to_s) / 3600
    result.to_f.round(5)
  end
end
