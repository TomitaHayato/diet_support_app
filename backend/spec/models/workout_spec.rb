require 'rails_helper'
require 'bigdecimal'

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
      it { should validate_presence_of(:name) }
  
      it { should validate_presence_of(:mets) }
    end
  end

  describe 'インスタンスメソッド' do
    describe 'burned_kcal(weight)' do
      it 'mets x 体重kg x 1.05 を返す' do
        weight = 100
        workout = create(:workout)
        expected_result = (BigDecimal(weight.to_s) * BigDecimal(workout.mets.to_s) * BigDecimal('1.05')).to_f
        expect(workout.burned_kcal(weight)).to eq expected_result
      end
    end

    describe 'set_tag(tag)' do
      let(:tag)     { create(:tag) }
      let(:workout) { create(:workout) }

      context '引数に渡したtagが既にworkout.tagsに含まれる' do
        it 'workout.tagsにtagを追加しない' do
          workout.tags << tag
          expect{ workout.set_tag(tag) }.not_to change { workout.tags.count }
        end
      end

      context '引数に渡したtagがworkout.tagsに含まれていない' do
        it 'workout.tagsにtagを追加する' do
          expect{ workout.set_tag(tag) }.to change { workout.tags.count }.by(1)
        end
      end
    end

    describe 'burned_kcal_per_min(weight)' do
      it '1分あたりに消費できるカロリーを返す' do
        weight  = 100
        workout = create(:workout)

        expected_result = (BigDecimal(workout.burned_kcal(weight).to_s) / 60).to_f.round(5)
        expect(workout.burned_kcal_per_min(weight)).to eq expected_result
      end
    end

    describe 'burned_kcal_per_sec(weight)' do
      it '1秒あたりに消費できるカロリーを返す' do
        weight  = 100
        workout = create(:workout)

        expected_result = (BigDecimal(workout.burned_kcal(weight).to_s) / 3600).to_f.round(5)
        expect(workout.burned_kcal_per_sec(weight)).to eq expected_result
      end
    end

    describe 'required_exercise_time(weight:, kcal_intake:)' do
      let(:workout) { create(:workout) }

      context 'weight == 0' do
        it '0を返す' do
          weight = 0
          kcal_intake = 100
          expect(workout.required_exercise_time(weight:, kcal_intake:)).to eq 0
        end
      end

      context 'weight != 0' do
        it 'kcal_intakeを1分で消費するkcalで割った値を返す' do
          weight = 50
          kcal_intake = 100

          expected_result = (kcal_intake / BigDecimal(workout.burned_kcal_per_min(weight).to_s)).ceil
          expect(workout.required_exercise_time(weight:, kcal_intake:)).to eq expected_result
        end
      end
    end
  end
end
