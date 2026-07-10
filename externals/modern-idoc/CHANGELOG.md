## [0.12.3](https://github.com/qq15725/modern-idoc/compare/v0.12.2...v0.12.3) (2026-06-28)


* refactor(fill)!: rename pipelines to imagePipelines ([7728102](https://github.com/qq15725/modern-idoc/commit/7728102a628664bb23772b56901847311140a370))


### BREAKING CHANGES

* ImageFill.pipelines is now imagePipelines.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
## [0.12.2](https://github.com/qq15725/modern-idoc/compare/v0.12.1...v0.12.2) (2026-06-28)


* feat(fill)!: add image processing pipelines ([9f8363b](https://github.com/qq15725/modern-idoc/commit/9f8363bf748b7111716c0d4512bdfba226b63423))


### BREAKING CHANGES

* drop `foreground.effects`; image styling now goes
through `pipelines`. The concrete effect pipeline lives downstream.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
## [0.12.1](https://github.com/qq15725/modern-idoc/compare/v0.12.0...v0.12.1) (2026-06-23)


### Bug Fixes

* **reactivable:** make setProperty idempotent and treat undefined as unset ([1a02a7e](https://github.com/qq15725/modern-idoc/commit/1a02a7e9c46847232bfc8b23be3a77983724b4fa))
# [0.12.0](https://github.com/qq15725/modern-idoc/compare/v0.11.9...v0.12.0) (2026-06-21)


### Features

* add comment thread spec on element.comments ([956968e](https://github.com/qq15725/modern-idoc/commit/956968ea1ae57563950e42dfb0bdb3417fcb4bda))
## [0.11.9](https://github.com/qq15725/modern-idoc/compare/v0.11.8...v0.11.9) (2026-06-05)


### Features

* unify image/text effects on Effect and add CSS-aligned Effect.filter ([2714fed](https://github.com/qq15725/modern-idoc/commit/2714fed218d9756c54df3ba4e40b516089570dd3))
## [0.11.8](https://github.com/qq15725/modern-idoc/compare/v0.11.7...v0.11.8) (2026-05-24)


### Features

* chart structure ([1d26a3c](https://github.com/qq15725/modern-idoc/commit/1d26a3cd5490147a5b06071b25e49b38c0b8ced1))
* extend ListStyleType to align with CSS list-style-type ([564313d](https://github.com/qq15725/modern-idoc/commit/564313d0ae09cadbdf399e0509eb38c744845747))
## [0.11.7](https://github.com/qq15725/modern-idoc/compare/v0.11.6...v0.11.7) (2026-05-24)


### Features

* table structure ([03754f2](https://github.com/qq15725/modern-idoc/commit/03754f204cf2dcd2c35a28ac8aeacae13135f44b))
## [0.11.6](https://github.com/qq15725/modern-idoc/compare/v0.11.5...v0.11.6) (2026-05-23)


### Bug Fixes

* defensive numeric normalization for style fields ([8666427](https://github.com/qq15725/modern-idoc/commit/8666427aeba59e325718fcba1b86cefdf328af43))
## [0.11.5](https://github.com/qq15725/modern-idoc/compare/v0.11.4...v0.11.5) (2026-05-20)


### Bug Fixes

* doc.ts shape type error and drop zh comments ([0634ca9](https://github.com/qq15725/modern-idoc/commit/0634ca9d898a54b8d1023c5375c75e46586f630d))


### Features

* connection mode and text deformation ([5f06c84](https://github.com/qq15725/modern-idoc/commit/5f06c847c9cdcc6ed6ef6fa60e2514c10aea6d9c))
## [0.11.4](https://github.com/qq15725/modern-idoc/compare/v0.11.3...v0.11.4) (2026-05-09)


### Features

* connection ([58b17e6](https://github.com/qq15725/modern-idoc/commit/58b17e6835f05010910d69e4d8c13d890c43443e))
## [0.11.3](https://github.com/qq15725/modern-idoc/compare/v0.11.2...v0.11.3) (2026-05-08)


### Bug Fixes

* transformStyle ([5dd30ee](https://github.com/qq15725/modern-idoc/commit/5dd30ee0babee2a59487b205b2cae7ca65ec1f04))
## [0.11.2](https://github.com/qq15725/modern-idoc/compare/v0.11.1...v0.11.2) (2026-05-06)


### Bug Fixes

* NormalizedText ([3104f98](https://github.com/qq15725/modern-idoc/commit/3104f982d137f9088de1ebb6dfe16a103903e0b4))
## [0.11.1](https://github.com/qq15725/modern-idoc/compare/v0.11.0...v0.11.1) (2026-05-06)


### Bug Fixes

* export effect ([1151069](https://github.com/qq15725/modern-idoc/commit/1151069ce280a91a8ec2c05c8bc5ee4b8faa5df5))
# [0.11.0](https://github.com/qq15725/modern-idoc/compare/v0.11.0-beta.2...v0.11.0) (2026-05-06)
# [0.11.0-beta.2](https://github.com/qq15725/modern-idoc/compare/v0.11.0-beta.1...v0.11.0-beta.2) (2026-05-06)


### Bug Fixes

* NormalizedText ([3707619](https://github.com/qq15725/modern-idoc/commit/370761929c4904acd8509fed4ac78eb65dea4475))
# [0.11.0-beta.1](https://github.com/qq15725/modern-idoc/compare/v0.10.21...v0.11.0-beta.1) (2026-05-06)


### Bug Fixes

* normalizeEffect ([64be984](https://github.com/qq15725/modern-idoc/commit/64be984950c3d1b9a5f5532dc97273dca8f1a423))


### Features

* effect ([6880e33](https://github.com/qq15725/modern-idoc/commit/6880e334cc66dbd4643870447a90342bd6f333af))
## [0.10.21](https://github.com/qq15725/modern-idoc/compare/v0.10.20...v0.10.21) (2026-02-03)


### Bug Fixes

* setPropertyAccessor ([da18c6a](https://github.com/qq15725/modern-idoc/commit/da18c6a9c6a955c73e66d093f25e1d295f08ba80))



## [0.10.20](https://github.com/qq15725/modern-idoc/compare/v0.10.19...v0.10.20) (2026-02-03)


### Features

* offsetGetProperties ([38c6293](https://github.com/qq15725/modern-idoc/commit/38c6293e25f19949b12d738a9cda30a1514dc4c1))



## [0.10.19](https://github.com/qq15725/modern-idoc/compare/v0.10.18...v0.10.19) (2026-02-03)


### Bug Fixes

* setPropertyAccessor ([bd2e7d4](https://github.com/qq15725/modern-idoc/commit/bd2e7d4be31d3cf8c9d51e86c680842979f79d51))



## [0.10.18](https://github.com/qq15725/modern-idoc/compare/v0.10.17...v0.10.18) (2026-01-28)



## [0.10.17](https://github.com/qq15725/modern-idoc/compare/v0.10.16...v0.10.17) (2026-01-28)


### Bug Fixes

* bug ([2b91057](https://github.com/qq15725/modern-idoc/commit/2b91057e494bda2d0a8f7d452a221650870405c0))



## [0.10.16](https://github.com/qq15725/modern-idoc/compare/v0.10.15...v0.10.16) (2026-01-28)



## [0.10.15](https://github.com/qq15725/modern-idoc/compare/v0.10.14...v0.10.15) (2026-01-28)



## [0.10.14](https://github.com/qq15725/modern-idoc/compare/v0.10.13...v0.10.14) (2026-01-27)


### Bug Fixes

* bug ([2503523](https://github.com/qq15725/modern-idoc/commit/2503523f29d3c410c4bfdf9e81ca0c3b679d2145))



## [0.10.13](https://github.com/qq15725/modern-idoc/compare/v0.10.12...v0.10.13) (2026-01-27)


### Bug Fixes

* bug ([3d176b1](https://github.com/qq15725/modern-idoc/commit/3d176b1e74fae0de75c8491312f9d6dd225d3d46))



## [0.10.12](https://github.com/qq15725/modern-idoc/compare/v0.10.11...v0.10.12) (2026-01-27)



## [0.10.11](https://github.com/qq15725/modern-idoc/compare/v0.10.10...v0.10.11) (2026-01-27)



## [0.10.10](https://github.com/qq15725/modern-idoc/compare/v0.10.9...v0.10.10) (2026-01-20)


### Bug Fixes

* isImageFill ([3a49112](https://github.com/qq15725/modern-idoc/commit/3a49112db61d0518b6d86e9a425cd0394f94dc17))



## [0.10.9](https://github.com/qq15725/modern-idoc/compare/v0.10.8...v0.10.9) (2026-01-09)


### Bug Fixes

* fill ([9290ccb](https://github.com/qq15725/modern-idoc/commit/9290ccb169af9e33588c77ca7308edccf6fd30e3))



## [0.10.8](https://github.com/qq15725/modern-idoc/compare/v0.10.7...v0.10.8) (2025-12-25)


### Features

* change textStrokeColor default value ([4e5859d](https://github.com/qq15725/modern-idoc/commit/4e5859d26d65bea29cf362e30bf0e0067673ce60))



## [0.10.7](https://github.com/qq15725/modern-idoc/compare/v0.10.6...v0.10.7) (2025-12-16)


### Features

* Display ([a7d1610](https://github.com/qq15725/modern-idoc/commit/a7d16106866a42cfcbd89cc4344e84953a54f100))



## [0.10.6](https://github.com/qq15725/modern-idoc/compare/v0.10.5...v0.10.6) (2025-12-02)


### Bug Fixes

* property ([31907b3](https://github.com/qq15725/modern-idoc/commit/31907b3e8d35a7fff2a9cf30baaeeef05da3b62a))



## [0.10.5](https://github.com/qq15725/modern-idoc/compare/v0.10.4...v0.10.5) (2025-10-29)


### Bug Fixes

* isNone ([20caaff](https://github.com/qq15725/modern-idoc/commit/20caaff13ad69f4d2a4d275c9427a11047554095))



## [0.10.4](https://github.com/qq15725/modern-idoc/compare/v0.10.3...v0.10.4) (2025-10-24)


### Bug Fixes

* fallback ([9942a39](https://github.com/qq15725/modern-idoc/commit/9942a39d7449a7afc5664d474c20f1a9abbe6721))



## [0.10.3](https://github.com/qq15725/modern-idoc/compare/v0.10.2...v0.10.3) (2025-10-24)


### Bug Fixes

* onUpdateProperty ([126e168](https://github.com/qq15725/modern-idoc/commit/126e168d97745bdb6d8c75381833c7de63682993))



## [0.10.2](https://github.com/qq15725/modern-idoc/compare/v0.10.1...v0.10.2) (2025-10-24)


### Bug Fixes

* onUpdateProperty ([14a183d](https://github.com/qq15725/modern-idoc/commit/14a183dbb637864e9ecd172e4fe24f91d13209bf))



## [0.10.1](https://github.com/qq15725/modern-idoc/compare/v0.10.0...v0.10.1) (2025-10-09)


### Features

* up deps ([eb54a72](https://github.com/qq15725/modern-idoc/commit/eb54a729389ab531cee7e262babf33bede59f3d3))



# [0.10.0](https://github.com/qq15725/modern-idoc/compare/v0.9.11...v0.10.0) (2025-10-09)


### Features

* observable events type ([cdab597](https://github.com/qq15725/modern-idoc/commit/cdab5976a479c1e30f184b30e51afae4c8edb1cd))



## [0.9.11](https://github.com/qq15725/modern-idoc/compare/v0.9.10...v0.9.11) (2025-09-18)


### Bug Fixes

* propertyOffsetDefaultValue ([835bb15](https://github.com/qq15725/modern-idoc/commit/835bb1569f4a04dc40e7f3f089a90b36ae32cefd))



## [0.9.10](https://github.com/qq15725/modern-idoc/compare/v0.9.9...v0.9.10) (2025-09-18)


### Bug Fixes

* propertyOffsetGet ([49fd13d](https://github.com/qq15725/modern-idoc/commit/49fd13d1132e00545620e4e46fc5625363e94cdb))



## [0.9.9](https://github.com/qq15725/modern-idoc/compare/v0.9.8...v0.9.9) (2025-09-18)


### Bug Fixes

* Reactivable ([b6bac3a](https://github.com/qq15725/modern-idoc/commit/b6bac3afe0fa0e180b6ebd8b8d5da1ec8a2c8aed))



## [0.9.8](https://github.com/qq15725/modern-idoc/compare/v0.9.7...v0.9.8) (2025-09-18)


### Bug Fixes

* setPropertyAccessor ([78dbb96](https://github.com/qq15725/modern-idoc/commit/78dbb96adb9ca718d553fdc6be213c5df3705f36))



## [0.9.7](https://github.com/qq15725/modern-idoc/compare/v0.9.6...v0.9.7) (2025-09-18)


### Bug Fixes

* setPropertyAccessor ([892c48c](https://github.com/qq15725/modern-idoc/commit/892c48c54ebc16f8a40488e76aa40ff5cb917b56))



## [0.9.6](https://github.com/qq15725/modern-idoc/compare/v0.9.5...v0.9.6) (2025-09-18)


### Bug Fixes

* setPropertyAccessor ([3cc2af0](https://github.com/qq15725/modern-idoc/commit/3cc2af026cc8167f2305a3911a4c3404c2e22c3d))



## [0.9.5](https://github.com/qq15725/modern-idoc/compare/v0.9.4...v0.9.5) (2025-09-17)


### Bug Fixes

* setPropertyAccessor ([6bc7520](https://github.com/qq15725/modern-idoc/commit/6bc7520fdd848e7162b1a6b5cf12fd8bfbc6c8d5))



## [0.9.4](https://github.com/qq15725/modern-idoc/compare/v0.9.3...v0.9.4) (2025-09-17)


### Bug Fixes

* onUpdateProperty ([15e46cd](https://github.com/qq15725/modern-idoc/commit/15e46cd62c5f5c40b02da3e7355d556af3f6313c))



## [0.9.3](https://github.com/qq15725/modern-idoc/compare/v0.9.2...v0.9.3) (2025-09-17)


### Bug Fixes

* onUpdateProperty ([e6f5b85](https://github.com/qq15725/modern-idoc/commit/e6f5b85d159b852df3ba5b2a1b75b340cb45762c))
* onUpdateProperty ([1af2d78](https://github.com/qq15725/modern-idoc/commit/1af2d7831d75d41bad645071dae01d7d865b451b))



## [0.9.2](https://github.com/qq15725/modern-idoc/compare/v0.9.1...v0.9.2) (2025-09-17)


### Features

* update Reactivable ([bfa5f44](https://github.com/qq15725/modern-idoc/commit/bfa5f44d7586dd32a75c25545af9abc48632817a))



## [0.9.1](https://github.com/qq15725/modern-idoc/compare/v0.9.0...v0.9.1) (2025-09-17)



# [0.9.0](https://github.com/qq15725/modern-idoc/compare/v0.8.10...v0.9.0) (2025-09-16)


### Features

* add Reactivable ([e886139](https://github.com/qq15725/modern-idoc/commit/e8861399b61aba06712cc9bf24780f840a50b6fa))



## [0.8.10](https://github.com/qq15725/modern-idoc/compare/v0.8.9...v0.8.10) (2025-09-16)


### Features

* add Observable ([009c958](https://github.com/qq15725/modern-idoc/commit/009c958490a0c641cdec20990970e15a02a18cd4))



## [0.8.9](https://github.com/qq15725/modern-idoc/compare/v0.8.8...v0.8.9) (2025-08-19)


### Bug Fixes

* normalizeTextContent('') ([53c96ca](https://github.com/qq15725/modern-idoc/commit/53c96cae0423f82c62f7a525652ca60fb60b3197))



## [0.8.8](https://github.com/qq15725/modern-idoc/compare/v0.8.7...v0.8.8) (2025-08-18)


### Bug Fixes

* flatDocumentToDocument ([0bda227](https://github.com/qq15725/modern-idoc/commit/0bda2272bdfcabc8a4dbdb985efa52b3868f083f))



## [0.8.7](https://github.com/qq15725/modern-idoc/compare/v0.8.6...v0.8.7) (2025-07-30)


### Features

* add lineCap and lineJoin to outline ([7fdfc33](https://github.com/qq15725/modern-idoc/commit/7fdfc33cdee05e38e2a71b524a1022ad58c0ad32))



## [0.8.6](https://github.com/qq15725/modern-idoc/compare/v0.8.5...v0.8.6) (2025-07-11)


### Bug Fixes

* defineProperty ([7716548](https://github.com/qq15725/modern-idoc/commit/77165485faae2c1d44236fc8af2c44444c079e9c))



## [0.8.5](https://github.com/qq15725/modern-idoc/compare/v0.8.4...v0.8.5) (2025-07-10)


### Features

* flatDocumentToDocument ([d2d6ec2](https://github.com/qq15725/modern-idoc/commit/d2d6ec2fa4cf64ea0888f66430cdc4785b3b0596))
* text enabled ([e77492d](https://github.com/qq15725/modern-idoc/commit/e77492de6e0d4b1fb351c7fcc1ce2a6e4e009560))
* text fill outline ([e52b83b](https://github.com/qq15725/modern-idoc/commit/e52b83b1046488c737f28fb916e4ccbf138f5a7d))



## [0.8.4](https://github.com/qq15725/modern-idoc/compare/v0.8.3...v0.8.4) (2025-07-08)



## [0.8.3](https://github.com/qq15725/modern-idoc/compare/v0.8.2...v0.8.3) (2025-07-08)



## [0.8.2](https://github.com/qq15725/modern-idoc/compare/v0.8.1...v0.8.2) (2025-07-05)


### Bug Fixes

* defineProperty ([e47da08](https://github.com/qq15725/modern-idoc/commit/e47da08c51023999f4c4aee914bdd975da96a5ed))



## [0.8.1](https://github.com/qq15725/modern-idoc/compare/v0.8.0...v0.8.1) (2025-07-04)



# [0.8.0](https://github.com/qq15725/modern-idoc/compare/v0.7.8...v0.8.0) (2025-07-04)


### Features

* add FlatDocument ([88c2a35](https://github.com/qq15725/modern-idoc/commit/88c2a3592488feb4bb42ea66015f165ed5fbda3c))



## [0.7.8](https://github.com/qq15725/modern-idoc/compare/v0.7.7...v0.7.8) (2025-07-03)


### Bug Fixes

* defineProperty ([ef8369b](https://github.com/qq15725/modern-idoc/commit/ef8369b9407eecead7f6d197d0926dfc17b3feee))



## [0.7.7](https://github.com/qq15725/modern-idoc/compare/v0.7.6...v0.7.7) (2025-07-03)


### Bug Fixes

* defineProperty ([3ebefa0](https://github.com/qq15725/modern-idoc/commit/3ebefa040a329ddd21edf4716a53c62e1f6e100b))



## [0.7.6](https://github.com/qq15725/modern-idoc/compare/v0.7.5...v0.7.6) (2025-07-02)


### Bug Fixes

* defineProperty ([7ca0d43](https://github.com/qq15725/modern-idoc/commit/7ca0d43d56a51cb7f96d128270520a669d48c867))



## [0.7.5](https://github.com/qq15725/modern-idoc/compare/v0.7.4...v0.7.5) (2025-07-02)


### Bug Fixes

* defineProperty ([b88e0f7](https://github.com/qq15725/modern-idoc/commit/b88e0f77746e260bdcb1d73eec8fc4a8324ed80f))



## [0.7.4](https://github.com/qq15725/modern-idoc/compare/v0.7.3...v0.7.4) (2025-07-02)


### Bug Fixes

* defineProperty ([204c84f](https://github.com/qq15725/modern-idoc/commit/204c84ff328f793afaf27d004215d358e70cc51f))



## [0.7.3](https://github.com/qq15725/modern-idoc/compare/v0.7.2...v0.7.3) (2025-07-02)


### Features

* idGenerator ([82a9ecb](https://github.com/qq15725/modern-idoc/commit/82a9ecbed8f373943b4b41aee6919c41511ee37e))



## [0.7.2](https://github.com/qq15725/modern-idoc/compare/v0.7.1...v0.7.2) (2025-07-02)


### Bug Fixes

* property ([354a22f](https://github.com/qq15725/modern-idoc/commit/354a22f9acf89808fcbabb8113e8e1706ac2c3bd))



## [0.7.1](https://github.com/qq15725/modern-idoc/compare/v0.7.0...v0.7.1) (2025-07-01)


### Bug Fixes

* property ([6b1b6ef](https://github.com/qq15725/modern-idoc/commit/6b1b6ef929f7d2e2e2dbdfc043746694fb8ca1b0))



# [0.7.0](https://github.com/qq15725/modern-idoc/compare/v0.6.20...v0.7.0) (2025-07-01)


### Features

* support accessor decorator ([e36a22a](https://github.com/qq15725/modern-idoc/commit/e36a22acc022a3753bb31d31e2512cf4f8802c2f))



## [0.6.20](https://github.com/qq15725/modern-idoc/compare/v0.6.19...v0.6.20) (2025-06-30)


### Features

* protectedProperty ([c2f398a](https://github.com/qq15725/modern-idoc/commit/c2f398a58e9325fd0f285dfef37c05a821407cd6))



## [0.6.19](https://github.com/qq15725/modern-idoc/compare/v0.6.18...v0.6.19) (2025-06-30)


### Bug Fixes

* defineProperty ([643b3a2](https://github.com/qq15725/modern-idoc/commit/643b3a216ade5854d778d6526a0dcacc2bcb63d6))



## [0.6.18](https://github.com/qq15725/modern-idoc/compare/v0.6.17...v0.6.18) (2025-06-30)


### Bug Fixes

* defineProperty ([556995a](https://github.com/qq15725/modern-idoc/commit/556995a56f268c0ff3d9932ce30d20faf9ca8bad))



## [0.6.17](https://github.com/qq15725/modern-idoc/compare/v0.6.16...v0.6.17) (2025-06-30)


### Features

* add offsetGet、offsetSet to Definable ([0467d83](https://github.com/qq15725/modern-idoc/commit/0467d8317f5c5ce7090a2ab6d97bc8e199c0dd56))



## [0.6.16](https://github.com/qq15725/modern-idoc/compare/v0.6.15...v0.6.16) (2025-06-12)


### Bug Fixes

* normalizeTextContent ([4b0067a](https://github.com/qq15725/modern-idoc/commit/4b0067a27f6f8b113ca0dcb89efbcb474fd18bcd))



## [0.6.15](https://github.com/qq15725/modern-idoc/compare/v0.6.14...v0.6.15) (2025-06-12)


### Features

* decorator property alias support get nested value ([5a8949e](https://github.com/qq15725/modern-idoc/commit/5a8949e13b8ae204a3f8de7faae369116b5fdeb0))



## [0.6.14](https://github.com/qq15725/modern-idoc/compare/v0.6.13...v0.6.14) (2025-06-11)


### Features

* decorator ([338746a](https://github.com/qq15725/modern-idoc/commit/338746a89dd0806d90edd755ae65686daa957ac7))



## [0.6.13](https://github.com/qq15725/modern-idoc/compare/v0.6.12...v0.6.13) (2025-06-10)


### Bug Fixes

* normalizeTextContent ([2f47476](https://github.com/qq15725/modern-idoc/commit/2f4747665b73e5353e534a21fcc8f379c9d2f519))



## [0.6.12](https://github.com/qq15725/modern-idoc/compare/v0.6.11...v0.6.12) (2025-06-10)


### Bug Fixes

* normalizeTextContent ([17ea70f](https://github.com/qq15725/modern-idoc/commit/17ea70f1e59f07c8db94472ad8cb9175c42fcb68))


### Features

* updep ([8b6fbf6](https://github.com/qq15725/modern-idoc/commit/8b6fbf66a8851dfd3e480a6065715d36d819b2a1))



## [0.6.11](https://github.com/qq15725/modern-idoc/compare/v0.6.10...v0.6.11) (2025-06-10)


### Bug Fixes

* normalizeTextContent ([2fefd5f](https://github.com/qq15725/modern-idoc/commit/2fefd5f73c1472e95a3cc39a32e17e216955f5ef))



## [0.6.10](https://github.com/qq15725/modern-idoc/compare/v0.6.9...v0.6.10) (2025-06-10)


### Bug Fixes

* NormalizedTextContent type ([1e27102](https://github.com/qq15725/modern-idoc/commit/1e271026a622f04047295e42ac57c000df4f1d0c))



## [0.6.9](https://github.com/qq15725/modern-idoc/compare/v0.6.8...v0.6.9) (2025-05-23)


### Bug Fixes

* normalizeFill ([f989197](https://github.com/qq15725/modern-idoc/commit/f989197a0ea9975690b900a8a27da74db4b8498b))



## [0.6.8](https://github.com/qq15725/modern-idoc/compare/v0.6.7...v0.6.8) (2025-05-23)


### Bug Fixes

* normalizeGradientFill ([ec71b9f](https://github.com/qq15725/modern-idoc/commit/ec71b9f46ae7cf831486b4d9dbc40fa890158b70))



## [0.6.7](https://github.com/qq15725/modern-idoc/compare/v0.6.6...v0.6.7) (2025-05-23)


### Bug Fixes

* NormalizedOutline ([4fbafa6](https://github.com/qq15725/modern-idoc/commit/4fbafa6f1f94c9d65d087167320d6e05a68d6f91))



## [0.6.6](https://github.com/qq15725/modern-idoc/compare/v0.6.5...v0.6.6) (2025-05-23)


### Features

* support svg prop in NormalizedShape ([3111ce9](https://github.com/qq15725/modern-idoc/commit/3111ce9e9cae06a9b6948441338035091cdbb487))



## [0.6.5](https://github.com/qq15725/modern-idoc/compare/v0.6.4...v0.6.5) (2025-05-23)


### Bug Fixes

* style none type ([1027d58](https://github.com/qq15725/modern-idoc/commit/1027d58784123af4e919d80b93fdbad134a10312))



## [0.6.4](https://github.com/qq15725/modern-idoc/compare/v0.6.3...v0.6.4) (2025-05-22)


### Features

* style add fill and outline type ([041feab](https://github.com/qq15725/modern-idoc/commit/041feabbe221b63a5141e8ad4c12c21b226cd037))



## [0.6.3](https://github.com/qq15725/modern-idoc/compare/v0.6.2...v0.6.3) (2025-05-22)


### Bug Fixes

* gradient type ([6b61c56](https://github.com/qq15725/modern-idoc/commit/6b61c56c9a0363404ac3ae9edb1cc73d6755facb))



## [0.6.2](https://github.com/qq15725/modern-idoc/compare/v0.6.1...v0.6.2) (2025-05-22)


### Bug Fixes

* parseColorStopNodeList ([e570f1a](https://github.com/qq15725/modern-idoc/commit/e570f1a7588809508ddace867bb10a394df45640))



## [0.6.1](https://github.com/qq15725/modern-idoc/compare/v0.6.0...v0.6.1) (2025-05-22)


### Bug Fixes

* normalizeGradientFill ([83025ec](https://github.com/qq15725/modern-idoc/commit/83025ec79f97549888e404f14fd1c4cfad907d5d))


### Features

* rename geometry to shape ([0554ae2](https://github.com/qq15725/modern-idoc/commit/0554ae236df2a40237f076bd8ce3a18f9ff62d5d))
* rename SolidFill to ColorFill, add PresetFill, rename withGeometry to fillWithShape, add normalizeGradientFill ([ba995a5](https://github.com/qq15725/modern-idoc/commit/ba995a5d12d0c52582e5e09fc688c2080a60df37))
* type name semantic adjust ([8d74456](https://github.com/qq15725/modern-idoc/commit/8d744566b6e3bcc0b51193d6ea049bddbafc3b72))
* type name semantic adjust ([f38da4d](https://github.com/qq15725/modern-idoc/commit/f38da4d64a1f3edd579f8ee1315dca68666f5afd))



# [0.6.0](https://github.com/qq15725/modern-idoc/compare/v0.5.6...v0.6.0) (2025-05-21)


### Features

* gradient-parser ([fa0007d](https://github.com/qq15725/modern-idoc/commit/fa0007d650b0ea56f3fd126489a27586669ba1f5))
* normalizeGradient ([f76c9ae](https://github.com/qq15725/modern-idoc/commit/f76c9aecc0a6f41e851afdfab81d3ff167cb1bb7))
* normalizeGradient ([d5f8493](https://github.com/qq15725/modern-idoc/commit/d5f8493ddfb1433d42327ecd18e487737cdd33f9))



## [0.5.6](https://github.com/qq15725/modern-idoc/compare/v0.5.5...v0.5.6) (2025-05-21)


### Features

* normalize color to hex8 ([f9415b6](https://github.com/qq15725/modern-idoc/commit/f9415b6d52d9a54eff3ae27475d91ab9f5306fcd))



## [0.5.5](https://github.com/qq15725/modern-idoc/compare/v0.5.4...v0.5.5) (2025-05-20)


### Features

* normalizeColor fixed to rgba string ([5c355c4](https://github.com/qq15725/modern-idoc/commit/5c355c49153d07ae389e5396b1894241d1c87435))



## [0.5.4](https://github.com/qq15725/modern-idoc/compare/v0.5.3...v0.5.4) (2025-05-10)


### Bug Fixes

* normalizeColor ([3f5eecc](https://github.com/qq15725/modern-idoc/commit/3f5eecc2c11e06cf7099b2a2eedf8541f7d75e94))



## [0.5.3](https://github.com/qq15725/modern-idoc/compare/v0.5.2...v0.5.3) (2025-05-06)


### Features

* backgroundColormap ([749f540](https://github.com/qq15725/modern-idoc/commit/749f540d2814716bac147b51a7c7e96e480d8c3f))



## [0.5.2](https://github.com/qq15725/modern-idoc/compare/v0.5.1...v0.5.2) (2025-04-25)


### Features

* add BackgroundSize ([bbd1c4c](https://github.com/qq15725/modern-idoc/commit/bbd1c4c25000237c354cf50f309ad04ed69c5549))



## [0.5.1](https://github.com/qq15725/modern-idoc/compare/v0.5.0...v0.5.1) (2025-04-23)


### Features

* style ([93285cb](https://github.com/qq15725/modern-idoc/commit/93285cb585fa22cc76a56d744bb4e2872ded316d))



# [0.5.0](https://github.com/qq15725/modern-idoc/compare/v0.4.5...v0.5.0) (2025-04-23)


### Features

* color ([bc00dcc](https://github.com/qq15725/modern-idoc/commit/bc00dccbca2c99981aa25ab14ab5591c387ad9fd))
* color ([5a87407](https://github.com/qq15725/modern-idoc/commit/5a874070f5718f3de32d20d56edfa49133186d46))



## [0.4.5](https://github.com/qq15725/modern-idoc/compare/v0.4.4...v0.4.5) (2025-04-18)


### Features

* add Outline LineEnd define ([9ab52b7](https://github.com/qq15725/modern-idoc/commit/9ab52b754b54b55de243ba16d18947c7d416d922))
* add withGeometry prop to background and foreground ([bc1ca65](https://github.com/qq15725/modern-idoc/commit/bc1ca65fdbff63846b55dca4ce714f6210c33fb3))



## [0.4.4](https://github.com/qq15725/modern-idoc/compare/v0.4.3...v0.4.4) (2025-04-16)


### Features

* shadow ([368f9c7](https://github.com/qq15725/modern-idoc/commit/368f9c7ca6d9e3f62128525bc5da1b8c4d55975c))



## [0.4.3](https://github.com/qq15725/modern-idoc/compare/v0.4.2...v0.4.3) (2025-04-12)


### Bug Fixes

* text-align justify ([fc53c86](https://github.com/qq15725/modern-idoc/commit/fc53c860649ccb1a7541b04cee3f4a56893baa34))



## [0.4.2](https://github.com/qq15725/modern-idoc/compare/v0.4.1...v0.4.2) (2025-04-11)


### Bug Fixes

* EffectDeclaration ([f969655](https://github.com/qq15725/modern-idoc/commit/f969655b1e5aa31eb68961a0b0951b969b3d5f0f))



## [0.4.1](https://github.com/qq15725/modern-idoc/compare/v0.4.0...v0.4.1) (2025-04-11)


### Features

* add effect prop to element ([1da185a](https://github.com/qq15725/modern-idoc/commit/1da185a23c8cf88526fbe00a86bb48d1968359b2))



# [0.4.0](https://github.com/qq15725/modern-idoc/compare/v0.3.5...v0.4.0) (2025-04-10)


### Features

* remove IDOC prefix ([50cd65c](https://github.com/qq15725/modern-idoc/commit/50cd65c96b3bebcc315b378ff98e6f795637990b))



## [0.3.5](https://github.com/qq15725/modern-idoc/compare/v0.3.4...v0.3.5) (2025-04-07)


### Features

* foreground ([2f78271](https://github.com/qq15725/modern-idoc/commit/2f78271ec6596f74a59c44ed9e804826d7154e6d))



## [0.3.4](https://github.com/qq15725/modern-idoc/compare/v0.3.3...v0.3.4) (2025-04-04)


### Bug Fixes

* export background type ([2c0db8a](https://github.com/qq15725/modern-idoc/commit/2c0db8ae0155ba25a92532827ce948d139222271))



## [0.3.3](https://github.com/qq15725/modern-idoc/compare/v0.3.2...v0.3.3) (2025-04-03)


### Features

* ColorValue ([6092c3a](https://github.com/qq15725/modern-idoc/commit/6092c3a19b0783675be566003175b78b7a175ad3))



## [0.3.2](https://github.com/qq15725/modern-idoc/compare/v0.3.1...v0.3.2) (2025-04-03)


### Features

* update ([5215f14](https://github.com/qq15725/modern-idoc/commit/5215f14c6ecb9341de54c2bfa73d8dd7ade96b3f))



## [0.3.1](https://github.com/qq15725/modern-idoc/compare/v0.3.0...v0.3.1) (2025-04-03)


### Bug Fixes

* SingleBackgroundDeclaration ([71cb72b](https://github.com/qq15725/modern-idoc/commit/71cb72b7e2f10dde86c215c8acd5be40948eb40b))



# [0.3.0](https://github.com/qq15725/modern-idoc/compare/v0.2.13...v0.3.0) (2025-04-03)


### Features

* rename image to background ([8d526f1](https://github.com/qq15725/modern-idoc/commit/8d526f1243e954e5caaa3b56871c82ba8ed432de))
* update idoc ([0f35552](https://github.com/qq15725/modern-idoc/commit/0f355528a373681e80be999f7debb84f5b7129bb))



## [0.2.13](https://github.com/qq15725/modern-idoc/compare/v0.2.12...v0.2.13) (2025-03-21)


### Features

* add ImageFillStretch type ([94cd4e7](https://github.com/qq15725/modern-idoc/commit/94cd4e79c33766c951a467b9ac88e205fa8986a1))



## [0.2.12](https://github.com/qq15725/modern-idoc/compare/v0.2.11...v0.2.12) (2025-03-11)


### Features

* add maskImage ([04fee8f](https://github.com/qq15725/modern-idoc/commit/04fee8ffd74935e7dfb6e40054a2cb2b6d9d42cc))



## [0.2.11](https://github.com/qq15725/modern-idoc/compare/v0.2.10...v0.2.11) (2025-03-11)


### Bug Fixes

* default layout style ([818c8ae](https://github.com/qq15725/modern-idoc/commit/818c8aeb2c67b4977682c25d68ed1015b1ad2dcc))


### Features

* types ([ce639d3](https://github.com/qq15725/modern-idoc/commit/ce639d35c5f16fdbf685a1bf51c4b6e4c7cdbf22))



## [0.2.10](https://github.com/qq15725/modern-idoc/compare/v0.2.9...v0.2.10) (2025-03-11)


### Bug Fixes

* ShadowStyle ([886fd5b](https://github.com/qq15725/modern-idoc/commit/886fd5b0c23bd97062ea004aeea76e5060632742))



## [0.2.9](https://github.com/qq15725/modern-idoc/compare/v0.2.8...v0.2.9) (2025-03-11)


### Features

* ShadowStyle ([76d1902](https://github.com/qq15725/modern-idoc/commit/76d190230618e1c6f69debacf514b0c952a98b8a))



## [0.2.8](https://github.com/qq15725/modern-idoc/compare/v0.2.7...v0.2.8) (2025-02-27)


### Features

* style types ([ec8bcb4](https://github.com/qq15725/modern-idoc/commit/ec8bcb4fa4373609f0b546e5835726e63ac66427))



## [0.2.7](https://github.com/qq15725/modern-idoc/compare/v0.2.6...v0.2.7) (2025-02-27)


### Bug Fixes

* src ([ddebf97](https://github.com/qq15725/modern-idoc/commit/ddebf976dc8ea50e2db861f17601280369cb7bdc))



## [0.2.6](https://github.com/qq15725/modern-idoc/compare/v0.2.5...v0.2.6) (2025-02-27)


### Features

* image srcRect ([226ebe4](https://github.com/qq15725/modern-idoc/commit/226ebe429f8fceedb2e9a9289ee138428af9a4e5))



## [0.2.5](https://github.com/qq15725/modern-idoc/compare/v0.2.4...v0.2.5) (2025-02-21)


### Features

* IDOCDocumentDeclaration ([433d231](https://github.com/qq15725/modern-idoc/commit/433d231d6446366c4ca49ff90f0a71740c75b2a4))



## [0.2.4](https://github.com/qq15725/modern-idoc/compare/v0.2.3...v0.2.4) (2025-02-21)


### Features

* audio ([551d815](https://github.com/qq15725/modern-idoc/commit/551d815803aaf1ef5a5d5a6856c0ec62bf134b46))



## [0.2.3](https://github.com/qq15725/modern-idoc/compare/v0.2.2...v0.2.3) (2025-02-21)


### Features

* def ([24d11fc](https://github.com/qq15725/modern-idoc/commit/24d11fc2b43d846f521536b85bf1157c548c2b9b))
* def ([318a17a](https://github.com/qq15725/modern-idoc/commit/318a17a85353753894ef3687c8ecdf3e3ad7d679))
* def ([bbe6300](https://github.com/qq15725/modern-idoc/commit/bbe63009231b7fc1fb3e76ca88eadf61eb46ceef))
* def ([61c3a2d](https://github.com/qq15725/modern-idoc/commit/61c3a2da8f4049b015c2a010bf0eae5d47870e9e))
* def ([fe01d63](https://github.com/qq15725/modern-idoc/commit/fe01d6309e6af8ddaa1793466abfd982252cfe2e))
* def ([729537c](https://github.com/qq15725/modern-idoc/commit/729537c194dcd4539c0d30889bcc1cb9f3d4f05a))



## [0.2.2](https://github.com/qq15725/modern-idoc/compare/v0.2.1...v0.2.2) (2025-02-21)


### Features

* update fill def ([a6c5d4e](https://github.com/qq15725/modern-idoc/commit/a6c5d4e00feba6f0989465688e7a3a52211bde6c))



## [0.2.1](https://github.com/qq15725/modern-idoc/compare/v0.2.0...v0.2.1) (2025-02-21)


### Features

* update fill ([9865dad](https://github.com/qq15725/modern-idoc/commit/9865dad136bc803a20a0efdb9e559d9da61ef0e0))



# [0.2.0](https://github.com/qq15725/modern-idoc/compare/v0.1.5...v0.2.0) (2025-02-20)


### Features

* update types ([a6f7a10](https://github.com/qq15725/modern-idoc/commit/a6f7a10242ebd748b0c7f18fc59a7a50be888e80))
* update types ([b049992](https://github.com/qq15725/modern-idoc/commit/b049992c367d5c81768f0dace0247bbf0df62117))



## [0.1.5](https://github.com/qq15725/modern-idoc/compare/v0.1.4...v0.1.5) (2025-01-03)


### Bug Fixes

* getDefaultTransformStyle ([89b0b22](https://github.com/qq15725/modern-idoc/commit/89b0b22750d711e0983a48b72f0a0404225b21af))
* split text style ([d219a56](https://github.com/qq15725/modern-idoc/commit/d219a566c8ab1a10f668605203403fe33d42b81b))



## [0.1.4](https://github.com/qq15725/modern-idoc/compare/v0.1.3...v0.1.4) (2025-01-02)


### Bug Fixes

* TextDecoration ([920a56c](https://github.com/qq15725/modern-idoc/commit/920a56c551683656995c6935ec2dd9718c1fa472))



## [0.1.3](https://github.com/qq15725/modern-idoc/compare/v0.1.2...v0.1.3) (2024-12-30)



## [0.1.2](https://github.com/qq15725/modern-idoc/compare/v0.1.1...v0.1.2) (2024-12-27)


### Features

* update IDOC ([f059ce2](https://github.com/qq15725/modern-idoc/commit/f059ce27a7c5bb6e36ffb8c3774eb55f2f5f5d09))



## [0.1.1](https://github.com/qq15725/modern-idoc/compare/v0.1.0...v0.1.1) (2024-12-27)


### Features

* update IDOC ([6db34d3](https://github.com/qq15725/modern-idoc/commit/6db34d3c6c79d24bb373e479c91d23fbe2c824ab))



# [0.1.0](https://github.com/qq15725/modern-idoc/compare/v0.0.3...v0.1.0) (2024-12-27)


### Features

* update IDOC ([99f582d](https://github.com/qq15725/modern-idoc/commit/99f582d9a9a566ec70a916abb11b2fc03ba1bf68))
* update IDOC ([a661194](https://github.com/qq15725/modern-idoc/commit/a661194063937c4aeb48effeb7145811713799cf))



## [0.0.3](https://github.com/qq15725/modern-idoc/compare/v0.0.2...v0.0.3) (2024-12-25)


### Features

* IDOC ([0dc8732](https://github.com/qq15725/modern-idoc/commit/0dc8732482fd019787d207a573b670807816c34d))



## [0.0.2](https://github.com/qq15725/modern-idoc/compare/v0.0.1...v0.0.2) (2024-12-25)


### Bug Fixes

* iDoc ([4ef6bcc](https://github.com/qq15725/modern-idoc/commit/4ef6bcce6ce27b7451cac0bd1bc2c677acced1eb))


### Features

* add `getDefaultTextStyle` and `getDefaultElementStyle` util methods ([cb50348](https://github.com/qq15725/modern-idoc/commit/cb50348bd10ae3b64dfd278e1c5a067288f45ebf))
* add `IElementType` enum ([2e3064c](https://github.com/qq15725/modern-idoc/commit/2e3064c81b5487fa5f08d0deff54442a0d358d6d))



## 0.0.1 (2024-12-24)


### Features

* background ([a8a42ed](https://github.com/qq15725/modern-idoc/commit/a8a42ed0a3f691db7027aa355d2616de74725f1d))
* background prop ([1953cf7](https://github.com/qq15725/modern-idoc/commit/1953cf7d848bc9dfe9d08b335fdb19c2c70f096f))
* export default ([31a087d](https://github.com/qq15725/modern-idoc/commit/31a087db97c2cf21ee83ee04f89a14a23883758f))
* init ([7c98125](https://github.com/qq15725/modern-idoc/commit/7c98125d5b1ddc2f0f93c7c68dd045226b0683d6))



