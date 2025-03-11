FactoryBot.define do
  factory :workout_record do
    association :user
    association :workout

    # 先週のデータ = weekly_data(now)に含まれないはず
    trait :last_week_record do
      created_at { 1.weeks.ago }
    end

    # 先月のデータ = monthly_data(now)に含まれないはず
    trait :last_month_record do
      created_at { 1.months.ago }
    end

    # 昨年のデータ = yearly_data(now)に含まれないはず
    trait :last_year_record do
      created_at { 1.years.ago }
    end
  end
end
