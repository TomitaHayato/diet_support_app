require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'association' do
    describe 'workout_records, workoutsとの関連' do
      let(:user) { create(:user, :with_records) }

      it 'user.workout_records' do
        expect(user.workout_records.length).to eq 3
      end

      it 'user.recorded_workouts' do
        expect(user.recorded_workouts.length).to eq 3
      end
    end

    describe 'user_workout_likes, workoutsとの関連' do
      let(:user) { create(:user, :with_liked_workouts) }

      it 'user.user_workout_likes' do
        expect(user.user_workout_likes.length).to eq 3
      end

      it 'user.workouts' do
        expect(user.workouts.length).to eq 3
      end
    end
  end

  describe 'インスタンスメソッド' do
    let(:now)  { Time.now }
    let(:user) { create(:user, :with_all_term_records_and_liked_workouts) }

    describe 'get_profile' do
      it '必要なユーザー情報だけが返される' do
        result = user.get_profile()
        expect(result).to eq({
          id: user.id,
          name: user.name,
          weight: user.weight,
          email: user.email
        })
      end
    end

    describe 'get_today_record' do
      context '今日のRecordがある場合' do
        it '今日のrecordだけを返す' do
          result = user.get_today_record
          expected_result = 
            user.workout_records
              .where(created_at: now.all_day)
              .select("
                SUM(workout_time) as total_time,
                SUM(burned_calories) as total_burned_calories,
                SUM(unburned_calories) as total_unburned_calories,
                SUM(intaked_calories) as total_intaked_calories
              ")
              .first
          expect(result).to eq(expected_result)
        end
      end

      context '今日のRecordがない場合' do
        it 'ダミーHashが返される' do
          user2 = create(:user)
          result = user2.get_today_record
          expected_result = {
            total_time: 0,
            total_burned_calories:   0,
            total_unburned_calories: 0,
            total_intaked_calories:  0
          }
          expect(result).to eq(expected_result)
        end
      end
    end

    describe 'get_complete_weekly_records(target_time)' do
      it '曜日ごとの週間record配列が返される。' do
        result = user.get_complete_weekly_records(now)
        expect(result.length).to eq 7
      end
    end

    describe 'get_complete_monthly_records(target_time)' do
      it '日毎の月間record配列が返される。' do
        result = user.get_complete_monthly_records(now)
        expect(result.length).to eq now.end_of_month.day
      end
    end

    describe 'get_complete_yearly_records(target_time)' do
      it '月毎の年間record配列が返される。' do
        result = user.get_complete_yearly_records(now)
        expect(result.length).to eq 12
      end
    end
  end
end
