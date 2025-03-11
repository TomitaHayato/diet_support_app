# このファイルは、`rails generate rspec:install` コマンドによって自動生成されたものです。
# 通常、全てのスペック（テスト）は `spec` ディレクトリ内に配置されます。
# RSpecはこのディレクトリを自動的に読み込むパスに追加します。
#
# 生成された `.rspec` ファイルには `--require spec_helper` が含まれているため、
# 各スペックファイルで個別に require しなくても、このファイルが自動的に読み込まれます。
#
# なお、このファイルはすべてのテスト実行時に毎回読み込まれるため、なるべく軽量に保つことが推奨されます。
# 重い依存関係をここで読み込むと、テスト全体の起動時間が長くなってしまいます。
# 必要に応じて、追加の依存関係や設定を行う場合は、別のヘルパーファイルを作成し、
# そのヘルパーを個別のスペックファイルで require するようにしてください。
#
# 詳しくは以下を参照してください:
# https://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration

RSpec.configure do |config|
  # === rspec-expectations の設定 ===
  # ここでは、RSpec の期待値（expectation）ライブラリの設定を行います。
  # 他のアサーションライブラリ（例: wrong や stdlib/minitest のアサーション）を使いたい場合は、ここで設定を変更できます。
  config.expect_with :rspec do |expectations|
    # このオプションは RSpec 4 からデフォルトで true になります。
    # カスタムマッチャーに chain メソッドを使用して定義したヘルパーがある場合、
    # その説明文やエラーメッセージに chain を用いた詳細な情報を含めるようにします。
    # 例えば:
    #     be_bigger_than(2).and_smaller_than(4).description
    #   は "be bigger than 2 and smaller than 4" と説明されます。
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  # === rspec-mocks の設定 ===
  # ここでは、RSpec のモック（テストダブル）ライブラリの設定を行います。
  # 他のモックライブラリ（例: bogus や mocha）を使用する場合は、ここで設定を変更してください。
  config.mock_with :rspec do |mocks|
    # 存在しないメソッドをモックやスタブしようとするとエラーになるように設定します。
    # これは、意図しないメソッドのモックを防ぐための推奨設定です。
    mocks.verify_partial_doubles = true
  end

  # === 共有コンテキストのメタデータ設定 ===
  # この設定により、共有コンテキストのメタデータがホストグループや個々の例に継承されます。
  # RSpec 4 ではデフォルトが :apply_to_host_groups になっています（RSpec 3 との互換性のため存在）。
  config.shared_context_metadata_behavior = :apply_to_host_groups

  # 以下の設定は、RSpec の初期設定として推奨されるものです。
  # 必要に応じて、自由にカスタマイズしてください。
=begin
  # === :focus を使ったテストの絞り込み ===
  # :focus メタデータが付けられた例やグループだけを実行できます。
  # 何も :focus が付けられていない場合は、すべてのテストが実行されます。
  # また、`it`、`describe`、`context` のエイリアスとして `fit`、`fdescribe`、`fcontext`
  # が利用できます。
  config.filter_run_when_matching :focus

  # === 失敗したテストの情報の保持 ===
  # テスト間で状態を保持し、`--only-failures` や `--next-failure` といったオプションで
  # 直前の失敗テストを再実行するために使用します。
  # このファイルはバージョン管理システムで無視することを推奨します。
  config.example_status_persistence_file_path = "spec/examples.txt"

  # === Monkey Patching を無効にする設定 ===
  # 推奨される方法として、RSpec の非 Monkey Patched な文法のみを使用できるようにします。
  # 詳細は以下を参照してください:
  # https://rspec.info/features/3-12/rspec-core/configuration/zero-monkey-patching-mode/
  config.disable_monkey_patching!

  # === 個別スペック実行時の詳細な出力設定 ===
  # 多くのユーザーは全体のテストスイートまたは個別のスペックファイルを実行しますが、
  # 個別ファイル実行時に詳細な出力が得られるよう、ドキュメント形式のフォーマッタを設定します。
  # ただし、すでに CLI などでフォーマッタが設定されている場合は、その設定が優先されます。
  if config.files_to_run.one?
    config.default_formatter = "doc"
  end

  # === テスト実行時間の遅い例の表示設定 ===
  # テスト実行後、最も実行時間が長かった10個の例やグループを表示し、
  # 実行速度に影響を与えているテストを特定しやすくします。
  config.profile_examples = 10

  # === テスト実行の順序ランダム化設定 ===
  # テストの実行順序をランダムにすることで、テスト間の依存関係の有無を確認できます。
  # 順序依存の問題が発生した場合は、出力される seed 値を使って再現できます。
  #     --seed 1234
  config.order = :random

  # === ランダム化シードの設定 ===
  # グローバルなランダム化を、このプロセス内で `--seed` CLI オプションを使って設定します。
  # これにより、同じ seed 値を使えばランダム性に起因するテストの失敗を再現可能です。
  Kernel.srand config.seed
=end
end
