// sass-embedded 的原生 Dart 二进制要求 macOS 14+，在 macOS 12 上启动即崩
// （VM initialization failed → Tried writing to closed dispatcher）。它是 vite/vitest
// 的可选 peer，被自动装入并被 Vite 优先选用，而 overrides 改不动 peer 后缀。
// 这里在解析期把 sass-embedded 从各包的 peerDependencies 里剥掉，pnpm 便不再安装/链接它，
// Vite 解析不到就自动退回纯 JS 的 sass（已作为 mce devDep 提供），在 Node 内编译 scss。
function readPackage(pkg) {
  if (pkg.peerDependencies && pkg.peerDependencies['sass-embedded']) {
    delete pkg.peerDependencies['sass-embedded']
    if (pkg.peerDependenciesMeta) {
      delete pkg.peerDependenciesMeta['sass-embedded']
    }
  }
  return pkg
}

module.exports = { hooks: { readPackage } }
