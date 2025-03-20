require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'association' do
    it { should have_many(:workout_records) }
    it { should have_many(:recorded_workouts) }
    it { should have_many(:user_workout_likes) }
    it { should have_many(:workouts) }
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
          expected_result = user.workout_records.today_data
          expected_result2 = {
            total_time: 0,
            total_burned_calories:   0,
            total_intaked_calories:  0
          }
          expect(expected_result).to eq expected_result2
          expect(result.total_time).to              eq(expected_result.total_time)
          expect(result.total_burned_calories).to   eq(expected_result.total_burned_calories)
          expect(result.total_intaked_calories).to  eq(expected_result.total_intaked_calories)
        end
      end

      context '今日のRecordがない場合' do
        it 'ダミーHashが返される' do
          user2 = create(:user)
          result = user2.get_today_record
          expected_result = {
            total_time: 0,
            total_burned_calories:   0,
            total_intaked_calories:  0
          }
          expect(result).to eq(expected_result)
        end
      end
    end

    describe 'get_complete_weekly_records(target_time)' do
      it '曜日ごとの週間record配列が返される' do
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
