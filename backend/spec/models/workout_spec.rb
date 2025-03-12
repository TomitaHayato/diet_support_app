require 'rails_helper'

RSpec.describe Workout, type: :model do
  describe 'association' do
    describe 'Workout:Tag = M:N'
      it 'has_many :workout_tags, dependent: :destroy' do
      end

      it 'has_many :tags, through: :workout_tags' do
      end
    end

    describe 'Workout:User = M:N, join: user_workout_like' do
      it 'has_many :user_workout_likes, dependent: :destroy' do
      end

      it 'has_many :users, through: :user_workout_likes' do
      end
    end

    describe 'Workout:User = M:N, join: workout_record' do
      it 'has_many :workout_records, dependent: :nullify' do
      end

      it 'has_many :record_users   , through: :workout_records, source: :user' do
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
