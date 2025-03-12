FactoryBot.define do
  factory :user_workout_like do
    association :user
    association :workout

    # null: falseの値がない
    trait :no_valid do
      user:    {nil}
      workout: {nil}
    end
  end
end

# belongs_to :user
#   belongs_to :workout
