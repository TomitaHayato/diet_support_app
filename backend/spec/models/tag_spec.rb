require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'association' do
    it { should have_many(:workout_tags) }

    it { should have_many(:workouts) }
    # describe 'workout, workout_tagsとの関連' do
    #   let!(:tag) { create(:tag, :with_workout) }

    #   it 'tag.workout_tags' do
    #     expect(tag.workout_tags.length).to eq 3
    #   end

    #   it 'tag.workouts' do
    #     expect(tag.workouts.length).to eq 3
    #   end
    # end
  end

  describe 'validation' do
    describe 'presence: true' do
      it { should validate_presence_of(:name) }
    end
    # it 'nameカラムが必須' do
    #   tag = build(:tag, :no_valid)
    #   expect(tag).to be_invalid
    # end
  end
end
