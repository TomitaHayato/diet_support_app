FactoryBot.define do
  factory :workout_record do
    association :user
    association :workout

    # 先週のデータ = weekly_data(now)に含まれないはず
    trait :last_week_data do
      created_at { Time.now. }
    end

    # 先月のデータ = monthly_data(now)に含まれないはず
    trait :last_month_data do
    end

    # 昨年のデータ = yearly_data(now)に含まれないはず
    trait :last_month_data do
    end
  end
end
