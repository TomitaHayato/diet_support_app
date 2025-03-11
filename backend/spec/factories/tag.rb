FactoryBot.define do
  factory :tag do
    sequence(:name) {|n| "tag#{n}"}
  end
end

# has_many :workout_tags, dependent: :destroy
# has_many :workouts   , through: :workout_tags