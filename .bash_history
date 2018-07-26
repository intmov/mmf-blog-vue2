yum -y update
cd /usr/local/src
wget http://cdn.npm.taobao.org/dist/node/v8.9.3/node-v8.9.3-linux-x64.tar.xz
tar -xf node-v8.9.3-linux-x64.tar.xz 
cd node-v8.9.3-linux-x64
vim /etc/profile
source /etc/profile
node -v
npm -g install express forever
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.2.tgz
tar -xf mongodb-linux-x86_64-3.6.2.tgz 
mv mongodb-linux-x86_64-3.6.2 mongodb
mkdir /var/mongodb
mkdir /var/mongodb/data
mkdir /var/mongodb/logs
vim /etc/rc.d/rc.local 
ll /etc/rc.d/rc.local 
chmod +x /etc/rc.d/rc.local 
source /etc/rc.d/rc.local 
yum install git
git clone https://github.com/intmov/mmf-blog-api-v2
cd mmf-blog-api-v2/

wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
yum install yarn
yarn
npm run dev
npm run server &

git clone https://github.com/intmov/mmf-blog-vue2
cd mmf-blog-vue2/
yarn 
vim config/index.js 
cd mmf-blog-api-v2/
rm -f admin.lock 


git pull
git stash
git config -global user.email "intmov@qq.com"
git config --global user.email "intmov@qq.com"
git config --global user.name "intmov"
