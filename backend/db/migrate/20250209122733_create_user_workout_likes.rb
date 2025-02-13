class CreateUserWorkoutLikes < ActiveRecord::Migration[7.2]
  def change
    create_table :user_workout_likes do |t|
      t.references :user   , foreign_key: true, null: false
      t.references :workout, foreign_key: true, null: false

      t.timestamps
    end
    add_index :user_workout_likes, [:user_id, :workout_id], unique: true
  end
end
