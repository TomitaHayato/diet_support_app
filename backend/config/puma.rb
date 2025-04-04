# この設定ファイルはPumaによって評価されます。ここで呼び出されるトップレベルのメソッドは
# Pumaの設定DSL（ドメイン固有言語）の一部です。
# DSLで提供されるメソッドの詳細については、https://puma.io/puma/Puma/DSL.html を参照してください。

# Pumaは設定可能なプロセス数（ワーカー）を起動し、各プロセスは内部のスレッドプールから
# スレッドを使用してリクエストを処理します。
#
# 各ワーカーに対する理想的なスレッド数は、アプリケーションがIO操作を待つ時間と、
# スループット（1秒あたりの処理量）を遅延（応答時間）よりもどれだけ優先したいかによって異なります。
#
# 一般的な目安として、スレッド数を増やすことで、各プロセスが処理できるトラフィック量（スループット）が増加します。
# ただし、CRubyのグローバルVMロック（GVL）の影響で、スレッド数を増やす効果には限界があり、
# アプリケーションの応答時間（遅延）が悪化する可能性があります。
#
# デフォルトでは、スループットと遅延の妥協点として、平均的なRailsアプリケーションに適した
# スレッド数が3に設定されています。
#
# 接続プールやリソースプールを使用するライブラリは、スレッド数と同じ数以上の接続を提供するように
# 設定する必要があります。これには、Active Recordの`database.yml`内の`pool`パラメータも含まれます。
threads_count = ENV.fetch("RAILS_MAX_THREADS", 3)
threads threads_count, threads_count

# Pumaがリクエストを受信するポートを指定します。デフォルトは3000です。
# port ENV.fetch("PORT", 3000)
bind "unix:///home/ec2-user/var/www/diet_support_app/backend/tmp/sockets/puma.sock"

# `bin/rails restart`コマンドでPumaを再起動できるようにします。
plugin :tmp_restart

# PIDファイルを指定します。デフォルトでは開発環境で`tmp/pids/server.pid`が使用されます。
# 他の環境では、必要に応じてPIDファイルを設定してください。
pidfile ENV["PIDFILE"] if ENV["PIDFILE"]
