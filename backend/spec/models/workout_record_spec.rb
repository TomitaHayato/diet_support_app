require 'rails_helper'

RSpec.describe WorkoutRecord, type: :model do
  describe 'association' do
    it { should belong_to(:user) }

    it { should belong_to(:workout) }
  end

  describe 'validation' do
    describe 'presence: true' do
      it { should validate_presence_of(:dow) }
  
      it { should validate_presence_of(:month) }

      it { should validate_presence_of(:date) }
    end
  end
end
