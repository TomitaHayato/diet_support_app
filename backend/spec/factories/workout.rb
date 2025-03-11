FactoryBot.define do
  factory :workout do
    name { "野球" }
    mets { "8.8" }

    # 生成と同時にworkout.tagsを3つ作成
    trait :with_tags do
      transient do
        workout_count { 3 }
      end

      after(:create) do |workout, evaluator|
        tag = FactoryBot.create(:tag)
        create_list(:workout_tag, evaluator.workout_count, workout: workout, tag: tag)
      end
    end
  end
end
