FactoryBot.define do
  factory :tag do
    sequence(:name) {|n| "tag#{n}"}
    
    trait :no_valid do
      name { nil }
    end

    trait :with_workout do
      after(:create) do |tag|
        create_list(:workout_tag, 3, tag:)
      end
    end
  end
end

# has_many :workout_tags, dependent: :destroy
# has_many :workouts   , through: :workout_tags