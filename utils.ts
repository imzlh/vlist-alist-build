export function run(command: string, env?: Record<string, string>){
    console.log(`\n>>> ${command}`);
    try{
        new Deno.Command('sh', {
            env,
            args: ['-c', command],
            stdout: 'inherit',
            stderr: 'inherit'
        }).outputSync();
    }catch(e){
        console.error(e.message);
    }
}

export function runWithOutput(command: string, env?: Record<string, string>) {
    console.log(`\n>>> ${command}`);
    const p = new Deno.Command('sh', {
        args: ['-c', command],
        env,
        stdout: 'piped',
        stderr: 'piped'
    }).outputSync();
    if (p.code !== 0) {
        console.error(new TextDecoder().decode(p.stderr));
        throw new Error(`Command failed with status code ${p.code}`);
    }
    return (new TextDecoder().decode(p.stdout) + new TextDecoder().decode(p.stderr));
}

export function cd(dir: string){
    if(dir.startsWith('~')){
        const home = Deno.env.get('HOME');
        if(!home) throw new Error('HOME environment variable not set');
        dir = dir.replace('~', home);
    }
    try{
        Deno.chdir(dir);
    }catch(e){
        console.warn('Failed to change directory: ' + e.message);
    }
}

export async function wget(url: string, saveAs: string){
    const fe = await fetch(url),
        file = await Deno.open(saveAs, {createNew: true, read: false, write: true});
    if(!fe.ok) throw new Error(`Failed to fetch ${url}`);
    await fe.body!.pipeTo(file.writable);
}