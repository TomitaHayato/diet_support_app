require 'rails_helper'

RSpec.describe UserWorkoutLike, type: :model do
  describe 'association' do
    it { should belong_to(:user) }

    it { should belong_to(:workout) }
  end

  describe 'validation' do
    describe 'presence: true' do
      it { should validate_presence_of(:user_id) }

      it { should validate_presence_of(:workout_id) }
    end

    describe 'uniqueness' do
      it 'user_idはworkout_idに対して一意である必要がある' do
        # 同じ外部IDの組み合わせを持つレコードを作成
        user_workout_like  = create(:user_workout_like)
        user_workout_like2 = build(:user_workout_like, user: user_workout_like.user, workout: user_workout_like.workout)
        # validationエラーを誘発
        user_workout_like2.valid?

        expect(user_workout_like).to be_valid
        expect(user_workout_like2).to be_invalid

        expect(user_workout_like2.errors[:user_id]).to include  "has already been taken"
      end
    end
  end
end
