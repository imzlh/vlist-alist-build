export function run(command: string, env?: Record<string, string>){
    try{
        const cmd = new Deno.Command('sh', {
            env,
            args: ['-c', command]
        }).outputSync();
        return new TextDecoder().decode(cmd.stdout) + new TextDecoder().decode(cmd.stderr);
    }catch(e){
        console.error(e.message);
    }
}

export async function wget(url: string, saveAs: string){
    const fe = await fetch(url),
        file = await Deno.open(saveAs, {createNew: true, read: false, write: true});
    if(!fe.ok) throw new Error(`Failed to fetch ${url}`);
    await fe.body!.pipeTo(file.writable);
}