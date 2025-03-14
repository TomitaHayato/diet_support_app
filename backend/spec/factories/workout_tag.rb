FactoryBot.define do
  factory :workout_tag do
    association :tag
    association :workout
  end
end
