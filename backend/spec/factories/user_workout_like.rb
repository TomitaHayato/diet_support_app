FactoryBot.define do
  factory :user_workout_like do
    association :user
    association :workout
  end
end

# belongs_to :user
#   belongs_to :workout
