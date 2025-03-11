FactoryBot.define do
  factory :user do
    transient do
      count { 3 }
    end

    name  {"test_name"}
    sequence(:email) {|n| "#{n}@ex.com"}
    password {'password'}

    trait :no_valid do
      name     { nil }
      email    { nil }
      password { nil }
    end

    trait :with_records do
      after(:create) do |user, evaluator|
        workouts = create_list(:workout, evaluator.count, name: 'recorded')
        workouts.each do |workout|
          create(:workout_record, user:, workout:)
        end
      end
    end

    trait :with_liked_workouts do
      after(:create) do |user, evaluator|
        workouts = create_list(:workout, evaluator.count, name: 'liked')
        workouts.each do |workout|
          create(:user_workout_like, user:, workout:)
        end
      end
    end

    trait :with_all_term_records_and_liked_workouts do
      after(:create) do |user, evaluator|
        # お気に入りデータを作成
        workouts = create_list(:workout, evaluator.count, name: 'liked')
        workouts.each do |workout|
          create(:user_workout_like, user:, workout:)
        end

        workout = user.workouts.first
        # 期間ごとのrecordデータ
        create(:workout_record                    , user:, workout:)
        create(:workout_record, :last_week_record , user:, workout:)
        create(:workout_record, :last_month_record, user:, workout:)
        create(:workout_record, :last_year_record , user:, workout:)
      end
    end
  end
end
