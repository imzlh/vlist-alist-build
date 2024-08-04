import CC from './cc.ts';
import GOEnv from './goenv.ts';
import { cd, run, runWithOutput, wget } from './utils.ts';

run('mkdir -p ~/dist/');
run('mkdir -p ~/root/');
run('mkdir -p ~/toolchain/');

// 获取前端文件包
cd('~');
await wget('https://github.com/imzlh/alist-ui-vlist/releases/download/master/vlist5_latest.tgz', 'vlist.tgz');
run(`tar -xf vlist.tgz`);

// 克隆alist仓库
run(`git clone https://github.com/alist-org/alist.git`);
run(`mv dist/ alist/public/`);

for(const arch in CC){
    const cc = (CC as Record<string, string>)[arch],
        env = (GOEnv as Record<string, Record<string, string>>)[arch];

    // 清空home目录
    run('rm -rf ~/root/*');

    // 安装依赖
    cd('~/toolchain/');

    // 获取编辑工具包
    run(`rm -rf *`)
    await wget(cc, arch + '.tgz');
    run(`tar -xf ${arch}.tgz`);
    run(`cp -r *-cross/* ./`);
    run(`cp -r *-native/* ./`);
    run(`rm ${arch}.tgz`);

    // 复制
    cd('~/root/');
    run(`cp -r ~/alist/* .`);

    // 开始编译
    const addition = `X 'github.com/alist-org/alist/v3/internal/conf.BuiltAt=${new Date().toISOString()}'
-X 'github.com/alist-org/alist/v3/internal/conf.GoVersion=${
    parseFloat(runWithOutput('go version').split('go version ')[1] || '0.1')
}'
-X 'github.com/alist-org/alist/v3/internal/conf.GitAuthor=${runWithOutput("git show -s --format='format:%aN <%ae>' HEAD")}'
-X 'github.com/alist-org/alist/v3/internal/conf.GitCommit=${runWithOutput('git log --pretty=format:"%h" -1')}'
-X 'github.com/alist-org/alist/v3/internal/conf.Version=${runWithOutput("git describe --long --tags --dirty --always")}' 
-X 'github.com/alist-org/alist/v3/internal/conf.WebVersion=5.6'`;
    run(`go build --ldflags="-s -w ${addition}" -o alist`, env);
    run(`mv alist ~/dist/alist-${arch}`);
    run(`rm -rf alist`);
}