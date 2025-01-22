# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# { name: "", mets:  },

# Workoutのデータ作成
workouts = [
  { name: "散歩"                      , mets: 3.5  },
  { name: "サイクリング(20km/h程度)"  , mets: 8.0  },
  { name: "ラジオ体操第一"            , mets: 4.0  },
  { name: "ラジオ体操第二"            , mets: 4.5  },
  { name: "軽い筋トレ（腕立てや腹筋）", mets: 3.8  },
  { name: "水泳"                      , mets: 5.3  },
  { name: "ランニング"                , mets: 9.0  },
  { name: "ジョギング"                , mets: 7.0  },
  { name: "スクワット"                , mets: 5.0  },
  { name: "ヨガ"                      , mets: 2.5  },
  { name: "バドミントン"              , mets: 5.5  },
  { name: "ピラティス"                , mets: 3.0  },
  { name: "野球/ソフトボール"         , mets: 5.0  },
  { name: "階段を登る（速く）"    , mets: 8.8  },
  { name: "階段を上り下り（ゆっくり）"    , mets: 3.75 },
  { name: "スポーツ/ダンスゲーム"     , mets: 3.8  },
  { name: "犬の散歩"                  , mets: 3.0  },
  { name: "電動自転車に乗る"          , mets: 3.0  }
]

workouts.each do |workout|
  WorkOut.find_or_create_by!(name: workout[:name]) do |new_workout|
    new_workout.mets = workout[:mets]
  end
end

# Tagのデータ作成
# { name: "" },
tags = [
  { name: "イージー"   },
  { name: "ハード"     },
  { name: "家でできる" },
  { name: 'アウトドア' },
  { name: "ひとりで"   },
  { name: "だれかと"   },
  { name: "家事"       }
]

tags.each do |tag|
  Tag.find_or_create_by!(name: tag[:name])
end

# WorkoutにTagを設定
workout_tags = {
  "散歩"                       => ["イージー", "アウトドア", "ひとりで"],
  "サイクリング(20km/h程度)"   => ["アウトドア", "ひとりで"],
  "ラジオ体操第一"             => ["イージー", "家でできる", "ひとりで"],
  "ラジオ体操第二"             => ["イージー", "家でできる", "ひとりで"],
  "軽い筋トレ（腕立てや腹筋）" => ["イージー", "家でできる", "ひとりで"],
  "水泳"                       => ["ハード", "アウトドア", "ひとりで"],
  "ランニング"                 => ["アウトドア", "ひとりで"],
  "ジョギング"                 => ["イージー", "アウトドア", "ひとりで"],
  "スクワット"                 => ["イージー", "家でできる", "ひとりで"],
  "ヨガ"                       => ["イージー", "家でできる", "ひとりで"],
  "バドミントン"               => ["ハード", "だれかと", "アウトドア"],
  "ピラティス"                 => ["ひとりで", "家でできる"],
  "野球/ソフトボール"          => ["ハード", "アウトドア", "だれかと"],
  "階段を登る（速く）"         => ["ハード", "アウトドア", "ひとりで"],
  "階段を上り下り（ゆっくり）" => ["アウトドア", "ひとりで"],
  "スポーツ/ダンスゲーム"      => ["家でできる"],
  "犬の散歩"                   => ["アウトドア", "ひとりで"],
  "電動自転車に乗る"           => ["イージー", "アウトドア", "ひとりで"]
}

workout_hash = WorkOut.all.index_by(&:name)
tag_hash     = Tag.all.index_by(&:name)

WorkOut.transaction do
  workout_tags.each do |workout_name, tag_arr|
    workout = workout_hash[workout_name]
    next if workout.nil?

    tag_arr.each do |tag_name|
      tag = tag_hash[tag_name]
      next if tag.nil?

      workout.tags << tag unless workout.tags.include?(tag)
    end
  end
end
