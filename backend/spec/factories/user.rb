FactoryBot.define do
  factory :user do
    name  {"test_name"}
    sequence(:email) {|n| "#{n}@ex.com"}
    password {'password'}

    trait :with_records do
      transient { count { 3 } }

      after(:create) do |user, evaluator|
        workout = create(:workout, name: 'recorded')
        create_list(:workout_record, evaluator.count, user:user, workout: workout)
      end
    end

    trait :with_liked_workouts do
      transient { count { 3 } }

      after(:create) do |user, evaluator|
        workout = create(:workout, name: 'liked')
        create_list(:user_workout_like, evaluator.count, user: user, workout: workout)
      end
    end

    trait :with_records_and_liked_workouts do
      transient { count { 3 } }

      after(:create) do |user, evaluator|
        recorded_workout = create(:workout, name: 'recorded')
        create_list(:workout_record, evaluator.count, user: user, workout: recorded_workout)

        liked_workout = create(:workout, name: 'liked')
        create_list(:user_workout_like, evaluator.count, user: user, workout: liked_workout)
      end
    end
  end
end
