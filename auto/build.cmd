pushd %~dp0..
call gulp
cd rig
call hugo -d ../public
popd