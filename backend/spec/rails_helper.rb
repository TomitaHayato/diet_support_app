# このファイルは、'rails generate rspec:install' を実行したときに spec/ にコピーされます
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
# ※本番環境でテストが実行されるのを防ぐため、Rails 環境が production になっている場合は強制終了します
abort("The Rails environment is running in production mode!") if Rails.env.production?
# 以下の行のコメントアウトを外すと、.rspec ファイルに '--require rails_helper' と記載されている場合、
# マイグレーションがまだ実行されていなくても rails generate がクラッシュしなくなります
# return unless Rails.env.test?
require 'rspec/rails'
# ここから下に追加の require を記述してください。Rails はここまで読み込まれた後にロードされます！

# spec/support/ 以下およびそのサブディレクトリにある、カスタムマッチャーやマクロなどのサポート用 Ruby ファイルを読み込みます。
# デフォルトでは、'spec/**/*_spec.rb' にマッチするファイルはスペックとして実行されるため、
# spec/support 内で _spec.rb という名前になっているファイルは、読み込みと実行の両方が行われ、テストが重複して実行される可能性があります。
# そのため、spec/support のファイル名は _spec.rb で終わらないようにすることを推奨します。
# このパターンは、CLI オプション --pattern や ~/.rspec, .rspec, `.rspec-local` で変更可能です。
#
# 以下の行は利便性のために提供されています。support ディレクトリ内のすべてのファイルを自動で読み込むため、
# 起動時間が長くなる可能性があります。必要なサポートファイルだけを個別に require する方法もあります。
# Rails.root.glob('spec/support/**/*.rb').sort_by(&:to_s).each { |f| require f }

# 保留中のマイグレーションがないか確認し、テスト実行前に適用します。
# ActiveRecord を使用していない場合は、以下の行を削除してもかまいません。
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end

RSpec.configure do |config|
  # ActiveRecord または ActiveRecord のフィクスチャを使用している場合は、以下の行を残します。
  config.fixture_paths = [
    Rails.root.join('spec/fixtures')
  ]

  # ActiveRecord を使用しない、または各例をトランザクション内で実行したくない場合は、
  # 以下の行を削除するか、true の部分を false に変更してください。
  config.use_transactional_fixtures = true

  # ActiveRecord のサポート自体を無効にしたい場合は、以下の行のコメントを外して設定してください。
  # config.use_active_record = false

  # RSpec Rails は、ファイルの配置場所に応じて自動的に適切なテストの振る舞いをミックスインします。
  # 例えば、spec/controllers 配下のスペックでは、get や post などのメソッドが利用可能になります。
  #
  # この自動的な振る舞いを無効にしたい場合は、以下の行を削除し、各スペックで明示的に type を指定してください。
  #
  # 例:
  #     RSpec.describe UsersController, type: :controller do
  #       # ...
  #     end
  #
  # 利用可能なタイプの詳細は以下などで確認できます:
  # https://rspec.info/features/7-0/rspec-rails
  config.infer_spec_type_from_file_location!

  # バックトレースから Rails の gem の行をフィルタリングして表示を見やすくします。
  config.filter_rails_from_backtrace!
  # 任意の gem もバックトレースから除外したい場合は、以下のように記述します:
  # config.filter_gems_from_backtrace("gem name")
end
