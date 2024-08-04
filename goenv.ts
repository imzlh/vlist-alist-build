export default {
    'armv8': {
        'GOOS': 'linux',
        'GOARCH': 'arm64',
        'GOARM': '8',
        'CC': 'aarch64-linux-musl-gcc'
    },
    'armv7l': {
        'GOOS': 'linux',
        'GOARCH': 'arm',
        'GOARM': '7',
        'CC': 'armv7l-linux-musleabihf-gcc'
    },
    'armv5': {
        'GOOS': 'linux',
        'GOARCH': 'arm',
        'GOARM': '5',
        'CC': 'arm-linux-musleabi-gcc'
    },
    'x86_64': {
        'GOOS': 'linux',
        'GOARCH': 'amd64',
        'CC': 'x86_64-linux-musl-gcc'
    },
    'windows': {
        'GOOS': 'windows',
        'GOARCH': 'amd64',
        'CC': 'x86_64-w64-mingw32-gcc'
    },
    'armeb': {
        'GOOS': 'linux',
        'GOARCH': 'arm',
        'GOARM': '5',
        'CC': 'aarch64-linux-musl-gcc'
    }
};