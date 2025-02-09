class Workout < ApplicationRecord
  has_many :workout_tags, dependent: :destroy
  has_many :tags        , through: :workout_tags

  has_many :user_workout_likes, dependent: :destroy
  has_many :users             , through: :user_workout_likes

  validates :name, presence: true
  validates :mets, presence: true

  scope :random, -> {order("RAND()")}

  # [{id, name, 1時間あたりの消費カロリー, 必要な運動量}, {...} }形式の配列を返す
  # 運動からランダムに10件選択して返す
  def self.workouts_data(weight:, kcal_intake:)
    all_workouts = order(mets: :desc).includes(:tags)

    data_list = all_workouts.map do |workout|
      {
        id:                     workout.id,
        name:                   workout.name,
        burned_kcal:            workout.burned_kcal(weight),
        required_exercise_time: workout.required_exercise_time(weight: weight, kcal_intake: kcal_intake),
        tag_list:               workout.tags.pluck(:name)
      }
    end

    data_list
  end

  # 消費kcal/hour = mets x 体重kg x 1.05 (厚生労働省)
  # 運動1時間あたりの消費カロリー
  def burned_kcal(weight)
    (mets * weight * 105 / 100).round()
  end

  # 摂取カロリーを消費するには最低何分の運動が必要？
  def required_exercise_time(weight:, kcal_intake:)
    (burned_kcal_per_min(weight) == 0) ? 0 : (kcal_intake / burned_kcal_per_min(weight)).ceil
  end

  # 運動１分あたりの消費カロリー
  def burned_kcal_per_min(weight)
    burned_kcal(weight) / 60
  end

  # tagを付与する
  def set_tag(tag)
    tags << tag unless tags.include?(tag)
  end
end
