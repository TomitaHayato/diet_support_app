FactoryBot.define do
  factory :workout_record do
    association :user
    association :workout
  end
end
