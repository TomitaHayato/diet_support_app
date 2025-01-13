class Tag < ApplicationRecord
  has_many   :workout_tags, dependent: :destroy

  validates :name, presence: true
end
