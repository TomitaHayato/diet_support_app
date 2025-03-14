require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'association' do
    it { should have_many(:workout_tags) }

    it { should have_many(:workouts) }
  end

  describe 'validation' do
    describe 'presence: true' do
      it { should validate_presence_of(:name) }
    end
  end
end
