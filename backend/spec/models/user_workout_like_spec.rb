require 'rails_helper'

RSpec.describe UserWorkoutLike, type: :model do
  describe 'association' do
    let(:user)    { create(:user) }
    let(:workout) { create(:workout) }
    let(:like)    { create(:user_workout_like, user:, workout:) }

    it 'user_workout_like.userが存在' do
      expect(like.user).to eq user
    end

    it 'user_workout_like.workoutが存在' do
      expect(like.workout).to eq workout
    end
  end

  describe 'validation' do
    describe 'presence: true' do
      before do
        @user_workout_like = build(:user_workout_like, :no_valid)
        @user_workout_like.valid?
      end

      it 'user_id' do
        expect(@user_workout_like).to be_invalid
        expect(@user_workout_like.errors[:user_id]).to include "can't be blank"
      end

      it 'workout_id' do
        expect(@user_workout_like.errors[:workout_id]).to include "can't be blank"
      end
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
