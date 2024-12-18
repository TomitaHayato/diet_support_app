# frozen_string_literal: true

DeviseTokenAuth.setup do |config|
  # デフォルトでは、認証ヘッダーはリクエストごとに変更されます。
  # クライアントはトークンの変更を追跡する責任があります。
  # 各リクエスト後にAuthorizationヘッダーが変更されないようにするには、falseに設定します。
  config.change_headers_on_each_request = false

  # デフォルトでは、ユーザーは2週間後に再認証が必要になります。
  # この設定は、トークンが発行された後の有効期間を決定します。
  # config.token_lifespan = 2.weeks

  # テスト環境ではtoken_costを4に制限することで、テストスイートのパフォーマンスが大幅に向上します。
  # 使用可能な値は4から31の範囲内です。他の環境では10を超えない値を使用することが推奨されます。
  config.token_cost = Rails.env.test? ? 4 : 10

  # ユーザーごとの同時デバイス数の上限を設定します。デフォルトは10です。
  # この制限を超えると、最も古いトークンが削除されます。
  # config.max_number_of_devices = 10

  # APIに対して同時に複数のリクエストを行う必要がある場合があります。
  # この場合、バッチ内の各リクエストは同じ認証トークンを共有する必要があります。
  # この設定は、同じ認証トークンを使用できるリクエストの間隔を決定します。
  # config.batch_request_buffer_throttle = 5.seconds

  # このルートはすべてのoauth2リダイレクトコールバックのプレフィックスになります。
  # 例えば、デフォルトの"/omniauth"を使用すると、GitHubのoauth2プロバイダーは
  # 認証成功後に"/omniauth/github/callback"にリダイレクトします。
  # config.omniauth_prefix = "/omniauth"

  # デフォルトでは、パスワード更新時に現在のパスワードを送信する必要はありません。
  # current_passwordパラメータを確認するように強制するには、コメントを外してください。
  # パスワードが更新される場合のみ確認する場合は、:passwordに設定します。
  # config.check_current_password_before_update = :attributes

  # デフォルトでは、単一のomniauthにコールバックを使用します。
  # これは、email、provider、uidといったフィールドに依存します。
  # config.default_callbacks = true

  # ヘッダー名を変更可能にします。
  config.headers_names = {
    :'authorization' => 'Authorization',
    :'access-token' => 'access-token',
    :'client' => 'client',
    :'expiry' => 'expiry',
    :'uid' => 'uid',
    :'token-type' => 'token-type'
  }

  # カスタムuidカラムを使用可能にします。
  # config.other_uid = "foo"

  # デフォルトでは、Bearerトークン認証のみが標準で実装されています。
  # ただし、古いDevise認証と統合したい場合は、このフラグを有効にすることができます。
  # 注意: この機能は非常に実験的です！
  # config.enable_standard_devise_support = false

  # デフォルトでは、devise confirmableモジュールを含めた場合でも確認メールは送信されません。
  # devise confirmableモジュールを使用してメールを送信したい場合は、trueに設定してください。
  # (互換性のための設定です)
  # config.send_confirmation_email = true
end
