class CreateWorkoutRecords < ActiveRecord::Migration[7.2]
  def change
    create_table :workout_records do |t|
      t.references :user, null: false, foreign_key: true
      # 取り組んだ曜日・年月日
      t.string  :dow  , null: false
      t.integer :month, null: false
      t.integer :date , null: false
      # データ
      t.integer :workout_time     , default: 0
      t.integer :burned_calories  , default: 0
      t.integer :unburned_calories, default: 0
      t.integer :intaked_calories,  default: 0

      t.timestamps
    end
  end
end
