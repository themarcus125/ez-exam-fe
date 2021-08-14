# yarn install && yarn run build
cd /var/www/html/fe-qlqtpm-20/
# rm -rf public
source ~/.bash_profile
sudo chown -R ec2-user yarn.lock && yarn install && yarn run build