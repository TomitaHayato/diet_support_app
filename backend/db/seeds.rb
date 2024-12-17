# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

WorkOut.create!([
  { name: "散歩", mets: 3.5 },
  { name: "サイクリング(20km/h程度)", mets: 8.0 },
  { name: "ラジオ体操第一", mets: 4.0 },
  { name: "ラジオ体操第二", mets: 4.5 },
  { name: "軽い筋トレ（腕立てや腹筋）", mets: 3.8 },
  { name: "水泳", mets: 5.3 },
  { name: "ランニング", mets: 9.0 },
  { name: "ジョギング", mets: 7.0 },
  { name: "スクワット", mets: 5.0 },
  { name: "ヨガ", mets: 2.5 },
  { name: "バドミントン", mets: 5.5 },
  { name: "ピラティス", mets: 3.0 },
  { name: "野球/ソフトボール", mets: 5.0 },
  { name: "階段を登る（ダッシュ）", mets: 8.8 },
  { name: "階段を上り下り（歩く）", mets: 3.75 },
  { name: "スポーツ/ダンスゲーム", mets: 3.8 }
])