FactoryBot.define do
  factory :workout do
    name { "野球" }
    mets { "1.5" }

    trait :no_valid do
      name {nil}
      mets {nil}
    end

    # 生成と同時にworkout.tagsを3つ作成
    trait :with_tags do
      transient do
        workout_count { 3 }
      end

      after(:create) do |workout, evaluator|
        create_list(:workout_tag, evaluator.workout_count, workout:)
      end
    end
  end
end
