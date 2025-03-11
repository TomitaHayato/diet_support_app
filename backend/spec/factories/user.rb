FactoryBot.define do
  factory :user do
    name  {"test_name"}
    sequence(:email) {|n| "#{n}@ex.com"}
    password {'password'}

    trait :no_valid do
      name     { nil }
      email    { nil }
      password { nil }
    end

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

    trait :with_all_term_records_and_liked_workouts do
      transient { count { 3 } }

      after(:create) do |user, evaluator|
        # お気に入りデータを作成
        liked_workout = create(:workout, name: 'liked')
        create_list(:user_workout_like, evaluator.count, user: user, workout: liked_workout)

        workout = user.workout.first
        # 期間ごとのrecordデータ
        create(:workout_record                    , user:, workout:)
        create(:workout_record, :last_week_record , user:, workout:)
        create(:workout_record, :last_month_record, user:, workout:)
        create(:workout_record, :last_year_record , user:, workout:)
      end
    end
  end
end
