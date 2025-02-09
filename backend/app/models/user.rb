# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :workout_records   , dependent: :destroy
  has_many :user_workout_likes, dependent: :destroy
  has_many :workouts          , through: :user_workout_likes

  validates :weight, presence: true
end
