class UserWorkoutLike < ApplicationRecord
  belongs_to :user
  belongs_to :workout

  validates :user_id    , uniqueness: { scope: :workout_id }
  validates :user_id    , presence: true
  validates :work_out_id, presence: true 
end
