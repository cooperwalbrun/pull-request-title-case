# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

Nothing currently!

## v0.1.5 - 2023-04-26

### Added

* There are now `clean`, `build:<browser>`, and `build:<browser>:watch` commands in `package.json`
  to facilitate the fixes pertaining to `chrome:dev` and `firefox:dev` as well as the new Firefox
  support (by [@cooperwalbrun](https://github.com/cooperwalbrun))

### Changed

* The unnecessary `host_permissions` configuration in the `manifest.json` has been removed
  (by [@cooperwalbrun](https://github.com/cooperwalbrun))

### Fixed

* The `chrome:dev` and `firefox:dev` NPM commands will no longer induce `no such file or directory`
  errors related to the `manifest.json` (by [@cooperwalbrun](https://github.com/cooperwalbrun))

## v0.1.4 - 2023-04-25

### Added

* Added more entries to the special case lists for common terminology (by
  [@cooperwalbrun](https://github.com/cooperwalbrun))

### Fixed

* The word "via" is now properly title-cased (by [@cooperwalbrun](https://github.com/cooperwalbrun))

## v0.1.3 - 2022-11-29

### Fixed

* The word "on" is now properly title-cased (by [@cooperwalbrun](https://github.com/cooperwalbrun))

## v0.1.2 - 2022-11-15

### Added

* Added more entries to the special case lists for common terminology (by
  [@cooperwalbrun](https://github.com/cooperwalbrun))

## v0.1.1 - 2022-11-02

### Added

* Added more entries to the special case lists for common terminology (by
  [@cooperwalbrun](https://github.com/cooperwalbrun))

### Fixed

* Possessives are now handled more accurately with respect to special cases (by
  [@cooperwalbrun](https://github.com/cooperwalbrun))

## v0.1.0 - 2022-11-01

### Added

* Created the project (by [@cooperwalbrun](https://github.com/cooperwalbrun))
* Implemented an initial approach for title-casing pull requests (by
  [@cooperwalbrun](https://github.com/cooperwalbrun))
* Implemented a minimalistic popup (by [@cooperwalbrun](https://github.com/cooperwalbrun))
