require 'bigdecimal'

class WorkOut < ApplicationRecord
  validates :name, presence: true
  validates :mets, presence: true

  # [[name, 必要な運動量, 1時間あたりの消費カロリー], [...] ]形式の配列を返す
  # 運動からランダムに10件選択して返す
  def self.workouts_data(weight:, kcal_intake:)
    data_list = map do |workout|
      [
        workout.name,
        workout.burned_kcal(weight),
        workout.require_exercise_time(weight: weight, kcal_intake: kcal_intake)
      ]
    end

    data_list
  end

  private
    
  # 摂取カロリーを消費するには最低何分の運動が必要？
  def required_exercise_time(weight:, kcal_intake:)
    (kcal_intake / burned_kcal_per_min(weight).to_f).ceil
  end

  # 運動１分あたりの消費カロリー
  def burned_kcal_per_min(weight)
    burned_kcal(weight) / 60
  end

  # 消費カロリー = mets x 体重kg x 時間h (厚生労働省)
  # 運動1時間あたりの消費カロリー
  def burned_kcal(weight)
    mets * weight
  end
end
