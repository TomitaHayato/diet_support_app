require 'rails_helper'

RSpec.describe Workout, type: :model do
  describe 'association' do
    describe 'Workout:Tag = M:N' do
      it { should have_many(:workout_tags) }

      it { should have_many(:tags) }

      it 'workoutが削除 => workout_tagも削除(dependent: :destroy)' do
        workout = create(:workout)
        create(:workout_tag, workout:)
        expect { workout.destroy! }.to change { WorkoutTag.count }.by(-1)
      end
    end

    describe 'Workout:User = M:N, join: user_workout_like' do
      it { should have_many(:user_workout_likes) }

      it { should have_many(:users) }

      it 'workoutが削除 => user_workout_likesも削除(dependent::destroy)' do
        workout = create(:workout)
        create(:user_workout_like, workout:)
        expect { workout.destroy! }.to change { UserWorkoutLike.count }.by(-1)
      end
    end

    describe 'Workout:User = M:N, join: workout_record' do
      it { should have_many(:workout_records) }

      it { should have_many(:record_users) }

      it 'workoutが削除 => workout_recordsのworkout_idがnullになる(dependent: :nullify)' do
        workout = create(:workout)
        create(:workout_record, workout:)
        expect { workout.destroy! }.to change { WorkoutRecord.last.workout_id }.from(workout.id).to(nil)
      end
    end
  end

  describe 'validation' do
    describe 'presence: true' do
      let(:workout) { build(:workout, :no_valid) }

      before do
        workout.valid?
      end

      it 'name' do
        expect(workout).to be_invalid
        expect(workout.errors[:name]).to include "can't be blank"
      end

      it 'mets' do
        expect(workout.errors[:mets]).to include "can't be blank"
      end
    end
  end

  describe 'インスタンスメソッド' do
  end
end
