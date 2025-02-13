class WorkoutTag < ApplicationRecord
  belongs_to :tag
  belongs_to :workout

  validates :tag_id, uniqueness: { scope: :workout_id }
end
