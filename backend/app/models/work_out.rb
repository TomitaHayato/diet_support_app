class WorkOut < ApplicationRecord
  validates :name, presence: true
  validates :mets, presence: true

  scope :random, -> {order("RAND()")}

  # [{id, name, 1時間あたりの消費カロリー, 必要な運動量}, {...} }形式の配列を返す
  # 運動からランダムに10件選択して返す
  def self.workouts_data(weight:, kcal_intake:)
    data_list = all.map do |workout|
      {
        id:                     workout.id,
        name:                   workout.name,
        burned_kcal:            workout.burned_kcal(weight),
        required_exercise_time: workout.required_exercise_time(weight: weight, kcal_intake: kcal_intake)
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
    (kcal_intake / burned_kcal_per_min(weight)).ceil
  end

  # 運動１分あたりの消費カロリー
  def burned_kcal_per_min(weight)
    burned_kcal(weight) / 60
  end
end
