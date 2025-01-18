class WorkoutTag < ApplicationRecord
  belongs_to :tag
  belongs_to :work_out

  validates :tag_id, uniqueness: { scope: :work_out_id }
end
