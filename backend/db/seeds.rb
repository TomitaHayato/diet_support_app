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
  # 「運動系」
  # 低強度アクティビティ
  { name: 'ストレッチング', mets: 2.3 },
  { name: '全身を使ったテレビゲーム（バランス運動、ヨガ）', mets: 2.3 },
  { name: 'ヨガ', mets: 2.5 },
  { name: 'ビリヤード', mets: 2.5 },
  { name: '座って行うラジオ体操', mets: 2.8 },
  # 中強度アクティビティ
  { name: 'ボウリング', mets: 3.0 },
  { name: 'バレーボール', mets: 3.0 },
  { name: '社交ダンス（ワルツ、サンバ、タンゴ）', mets: 3.0 },
  { name: 'ピラティス', mets: 3.0 },
  { name: '太極拳', mets: 3.0 },
  { name: '自転車エルゴメーター(30～50ワット)', mets: 3.5 },
  { name: '自体重を使った軽い筋力トレーニング（軽・中等度）', mets: 3.5 },
  { name: '体操（家で、軽・中等度）', mets: 3.5 },
  { name: 'ゴルフ（手引きカートを使って）', mets: 3.5 },
  { name: 'カヌー', mets: 3.5 },
  { name: '全身を使ったテレビゲーム（スポーツ・ダンス）', mets: 3.8 },
  { name: '卓球', mets: 4.0 },
  { name: 'パワーヨガ', mets: 4.0 },
  { name: 'ラジオ体操第１', mets: 4.0 },
  { name: 'やや速歩（平地、やや速めに=93m/分）', mets: 4.3 },
  { name: 'ゴルフ（クラブを担いで運ぶ）', mets: 4.3 },
  { name: 'テニス（ダブルス）＊', mets: 4.5 },
  { name: '水中歩行（中等度）', mets: 4.5 },
  { name: 'ラジオ体操第２', mets: 4.5 },
  { name: '水泳（ゆっくりとした背泳）', mets: 4.8 },
  { name: 'かなり速歩（平地、速く=107m/分）', mets: 5.0 },
  { name: '野球', mets: 5.0 },
  { name: 'ソフトボール', mets: 5.0 },
  { name: 'サーフィン', mets: 5.0 },
  { name: 'バレエ（モダン、ジャズ）', mets: 5.0 },
  { name: '水泳（ゆっくりとした平泳ぎ）', mets: 5.3 },
  { name: 'スキー', mets: 5.3 },
  { name: 'アクアビクス', mets: 5.3 },
  { name: 'バドミントン', mets: 5.5 },
  # 高強度アクティビティ
  { name: 'ゆっくりとしたジョギング', mets: 6.0 },
  { name: 'ウェイトトレーニング（高強度、パワーリフティング、ボディビル）', mets: 6.0 },
  { name: 'バスケットボール', mets: 6.0 },
  { name: '水泳（のんびり泳ぐ）', mets: 6.0 },
  { name: '山を登る(軽装)', mets: 6.5 },
  { name: '自転車エルゴメーター（90～100ワット）', mets: 6.8 },
  { name: 'ジョギング', mets: 7.0 },
  { name: 'サッカー', mets: 7.0 },
  { name: 'スキー', mets: 7.0 },
  { name: 'スケート', mets: 7.0 },
  { name: 'ハンドボール', mets: 7.0 },
  { name: 'エアロビクス', mets: 7.3 },
  { name: 'テニス（シングルス）', mets: 7.3 },
  { name: '山を登る（約4.5～9.0kg の荷物を持って）', mets: 7.3 },
  { name: 'サイクリング（約20km/時）', mets: 8.0 },
  { name: 'ランニング（134m/分）', mets: 8.3 },
  { name: '水泳（クロール、ふつうの速さ、46m/分未満）', mets: 8.3 },
  { name: 'ラグビー', mets: 8.3 },
  # 超高強度
  { name: 'ランニング（139m/分）', mets: 9.0 },
  { name: 'ランニング（161m/分）', mets: 9.8 },
  { name: '水泳（クロール、速い、69m/分）', mets: 10.0 },
  { name: '武道・武術（柔道、柔術、空手、キックボクシング、テコンドー）', mets: 10.3 },
  { name: 'ランニング（188m/分）', mets: 11.0 },
  { name: '自転車エルゴメーター（161～200ワット）', mets: 11.0 },

  # 「生活運動系」
  # 低強度アクティビティ
  { name: '立位（会話、電話、読書)', mets: 1.8 },
  { name: '皿洗い', mets: 1.8 },
  { name: 'ゆっくりした歩行（非常に遅い）', mets: 2.0 },
  { name: '料理や食材の準備', mets: 2.0 },
  { name: '洗濯', mets: 2.0 },
  { name: '子どもを抱えながら立つ', mets: 2.0 },
  { name: '洗車・ワックスがけ', mets: 2.0 },
  { name: '子どもと遊ぶ（座位、軽度）', mets: 2.2 },
  { name: 'ガーデニング（コンテナを使用）', mets: 2.3 },
  { name: '動物の世話', mets: 2.3 },
  { name: 'ピアノの演奏', mets: 2.3 },
  { name: '植物への水やり', mets: 2.5 },
  { name: '子どもの世話', mets: 2.5 },
  { name: '仕立て作業', mets: 2.5 },
  { name: 'ゆっくりした歩行（遅い）', mets: 2.8 },
  { name: '子ども・動物と遊ぶ（立位、軽度）', mets: 2.8 },
  # // 中強度アクティビティ
  { name: '普通歩行（67m/分、犬を連れて）', mets: 3.0 },
  { name: '電動アシスト付き自転車', mets: 3.0 },
  { name: '家財道具の片付け', mets: 3.0 },
  { name: '子どもの世話（立位）', mets: 3.0 },
  { name: '台所の手伝い', mets: 3.0 },
  { name: '大工仕事', mets: 3.0 },
  { name: '梱包', mets: 3.0 },
  { name: 'ギター演奏（立位）', mets: 3.0 },
  { name: 'カーペット掃き', mets: 3.3 },
  { name: 'フロア掃き', mets: 3.3 },
  { name: '掃除機', mets: 3.3 },
  { name: 'スポーツ観戦（動きあり）', mets: 3.3 },
  { name: '歩行（75～85m/分）', mets: 3.5 },
  { name: '楽に自転車に乗る', mets: 3.5 },
  { name: '階段を下りる', mets: 3.5 },
  { name: '軽い荷物運び', mets: 3.5 },
  { name: '車の荷物の積み下ろし', mets: 3.5 },
  { name: '荷づくり', mets: 3.5 },
  { name: 'モップがけ', mets: 3.5 },
  { name: '床磨き', mets: 3.5 },
  { name: '風呂掃除', mets: 3.5 },
  { name: '庭の草むしり', mets: 3.5 },
  { name: '子どもと遊ぶ（歩く/走る、中強度）', mets: 3.5 },
  { name: '車椅子を押す', mets: 3.5 },
  { name: '釣り（全般）', mets: 3.5 },
  { name: 'スクーター/オートバイの運転', mets: 3.5 },
  { name: '自転車に乗る（16km/時未満）', mets: 4.0 },
  { name: '階段を上る（ゆっくり）', mets: 4.0 },
  { name: '動物と遊ぶ（中強度）', mets: 4.0 },
  { name: '屋根の雪下ろし', mets: 4.0 },
  { name: 'やや速歩（93m/分）', mets: 4.3 },
  { name: '苗木の植栽', mets: 4.3 },
  { name: '農作業（家畜に餌を与える）', mets: 4.3 },
  { name: '耕作', mets: 4.5 },
  { name: '家の修繕', mets: 4.5 },
  { name: 'かなり速歩（107m/分）', mets: 5.0 },
  { name: '動物と遊ぶ（活発に）', mets: 5.0 },
  { name: 'シャベルで土や泥をすくう', mets: 5.5 },
  { name: '子どもと遊ぶ（活発に）', mets: 5.8 },
  { name: '家具・家財道具の運搬', mets: 5.8 },
  # // 高強度アクティビティ
  { name: 'スコップで雪かきをする', mets: 6.0 },
  { name: '農作業（干し草をまとめる）', mets: 7.8 },
  { name: '重い荷物の運搬', mets: 8.0 },
  { name: '荷物を上の階へ運ぶ', mets: 8.3 },
  { name: '階段を上る（速く）', mets: 8.8 }
]

# Tagのデータ作成
tags = [
  # 運動強度
  { name: "低強度"       },
  { name: "中強度"       },
  { name: "高強度"       },
  { name: "非常に高強度" },
  # 場所
  { name: "家でできる"   },
  { name: "アウトドア"   },
  # 人数
  { name: "ひとりで"     },
  { name: "だれかと"     },
  # 種類
  { name: "生活動作"     },
  { name: "運動"     }
]

Workout.transaction do
  workouts.each do |workout|
    Workout.find_or_create_by!(name: workout[:name]) do |new_workout|
      new_workout.mets = workout[:mets]
    end
  end

  tags.each do |tag|
    Tag.find_or_create_by!(name: tag[:name])
  end
end

# Tagをworkoutに設定
# 強度
tags_strength = [Tag.find_by(name: '低強度'), Tag.find_by(name: '中強度'), Tag.find_by(name: '高強度'), Tag.find_by(name: '非常に高強度')]
# 運動の種類
kind_of_work  = '運動'
# place
indoors = [
  "全身を使ったテレビゲーム（バランス運動、ヨガ）",
  "ヨガ",
  "座って行うラジオ体操",
  "ピラティス",
  "太極拳",
  "自転車エルゴメーター(30～50ワット)",
  "自体重を使った軽い筋力トレーニング（軽・中等度）",
  "体操（家で、軽・中等度）",
  "全身を使ったテレビゲーム（スポーツ・ダンス）",
  "パワーヨガ",
  "ラジオ体操第１",
  "ラジオ体操第２",
  "ウェイトトレーニング（高強度、パワーリフティング、ボディビル）",
  "自転車エルゴメーター（90～100ワット）",
  "自転車エルゴメーター（161～200ワット）",
  "皿洗い",
  "料理や食材の準備",
  "洗濯",
  "ピアノの演奏",
  "ギター演奏（立位）",
  "掃除機",
  "モップがけ",
  "風呂掃除",
  "立位（会話、電話、読書)",
  "子どもを抱えながら立つ",
  "子どもと遊ぶ（座位、軽度）",
  "動物の世話",
  "植物への水やり",
  "子どもの世話",
  "仕立て作業",
  "子ども・動物と遊ぶ（立位、軽度）",
  "家財道具の片付け",
  "子どもの世話（立位）",
  "台所の手伝い",
  "梱包",
  "カーペット掃き",
  "フロア掃き",
  "スポーツ観戦（動きあり）",
  "荷づくり",
  "床磨き",
  "子どもと遊ぶ（歩く/走る、中強度）",
  "ゆっくりした歩行（非常に遅い）",
  "ゆっくりした歩行（遅い）",
  "荷物を上の階へ運ぶ"
]
tag_place  = [Tag.find_by(name: '家でできる'), Tag.find_by(name: 'アウトドア')]
# 人数
workouts_with_others = [
  "ゴルフ（手引きカートを使って）",
  "ゴルフ（クラブを担いで運ぶ）",
  "ビリヤード",
  "バレーボール",
  "社交ダンス（ワルツ、サンバ、タンゴ）",
  "卓球",
  "テニス（ダブルス）＊",
  "野球",
  "ソフトボール",
  "バドミントン",
  "バスケットボール",
  "サッカー",
  "ハンドボール",
  "テニス（シングルス）",
  "ラグビー",
  "武道・武術（柔道、柔術、空手、キックボクシング、テコンドー）",
  "子どもを抱えながら立つ",
  "子どもと遊ぶ（座位、軽度）",
  "子どもの世話",
  "子ども・動物と遊ぶ（立位、軽度）",
  "子どもの世話（立位）",
  "子どもと遊ぶ（歩く/走る、中強度）",
  "車椅子を押す",
  "動物の世話",
]
tag_people = [Tag.find_by(name: 'ひとりで'), Tag.find_by(name: 'だれかと')]

# タグを付与
Tag.transaction do
  workouts = Workout.all
  workouts.each do |w|
    # 強度のタグを付与
    strength_tag =  if    w.mets < 3
                      tags_strength[0]
                    elsif w.mets < 6
                      tags_strength[1]
                    elsif w.mets < 9
                      tags_strength[2]
                    else
                      tags_strength[3]
                    end
    w.set_tag(strength_tag)
    # 種類のタグ
    type_tag = Tag.find_by(name: kind_of_work)
    w.set_tag(type_tag)
    # 場所のタグ
    place_tag = indoors.include?(w.name) ? tag_place[0] : tag_place[1]
    w.set_tag(place_tag)
    # 人数
    people_tag = workouts_with_others.include?(w.name) ? tag_people[1] : tag_people[0]
    w.set_tag(people_tag)

    kind_of_work = '生活動作' if w.name == "自転車エルゴメーター（161～200ワット）"
  end
end