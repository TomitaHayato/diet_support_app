FactoryBot.define do
  factory :workout_record do
    association :user
    association :workout

    dow { ["日", "月", "火", "水", "木", "金", "土"][Time.current.wday] }
    month { Time.current.strftime("%m") }
    date  { Time.current.strftime("%d") }

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
