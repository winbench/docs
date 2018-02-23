pushd %~dp0..
start "Bench Docs Gulp" gulp watch
cd rig
start "Local Preview" "http://localhost:1313/"
start "Hugo Dev Server" hugo -D server --disableFastRender
popd