+++
date = "2019-03-29"
description = "The different types of apps in Bench"
title = "App Types"
weight = 7
+++

[`Typ`]: /ref/app-properties/#Typ
[`Url`]: /ref/app-properties/#Url
[`ResourceName`]: /ref/app-properties/#ResourceName

There are currently the following types of apps:

* Typ [`group`](#group): app groups, with only a list of dependencies
* Typ [`meta`](#meta): apps with a fully customized setup process
* Typ [`default`](#default): Windows executables from a downloaded file, archive, or setup
* Typ [`node-package`](#node-package): Node.js packages, installable with NPM
* Typ [`python-package`](#python-package): Python packages for Python 2 and 3 from PyPI, installable with PIP
* Typ [`python2-package`](#python-package): Python packages for Python 2 from PyPI, installable with PIP
* Typ [`python3-package`](#python-package): Python packages for Python 3 from PyPI, installable with PIP
* Typ [`python-wheel`](#python-wheel): Python wheels for Python 2 and 3 from a downloaded `.whl` file, installable with PIP
* Typ [`python2-wheel`](#python-wheel): Python wheels for Python 2 from a downloaded `.whl` file, installable with PIP
* Typ [`python3-wheel`](#python-wheel): Python wheels for Python 3 from a downloaded `.whl` file, installable with PIP
* Typ [`ruby-package`](#ruby-package): Ruby packages, installable with Gem
* Typ [`nuget-package`](#nuget-package): NuGet packages, installable with NuGet

## Group App {#group}
An app is a _Group App_ if its [`Typ`][] is set to `group`.

Technically a _Group App_ behaves the same like a [Meta App](#meta),
but is is supposed to be used as a collection of dependencies only.
That way, if the _Group App_ is activated, all of its dependencies
are implicitly activated too.
They are a way to make the activation process of apps
more comfortable or flexible.

## Meta App {#meta}
An app is a _Meta App_ if its [`Typ`][] is set to `meta`.

A _Meta App_ is an app without an actual program.
It can be used to fully customize the download and setup process
of an app with custom scripts.

## Default Windows App {#default}
An app is a _Default Windows App_ if its [`Typ`][] property
is set to `default` or not set at all.

A _Default Windows App_ is the definition for some kind of script or binary
executable for the Windows operating system.
In contrast to other apps, a _Default Windows App_ has a program resource,
which can be downloaded as a file.
The resource can be an executable on its own, or an archive of some kind,
even a setup or installer EXE.

A _Default Windows App_ is extracted, and installed simply by copying
its files into its target directory.
Optionally some custom scripts can be executed during the setup process,
to perform some additional configuration for the app.

## Node.js Package {#node-package}
An app is a _Node.js Package_ if its [`Typ`][] property is set to `node-package`.

A _Node.js Package_ is downloaded and installed by _npm_ the Node.js package manager.

To determine, if a _Node.js Package_ is already installed, the existence of its package folder in
`node_modules` in the Node.js directory is checked.

## Python Package {#python-package}
An app is a _Python Package_ if its [`Typ`][] property is set to
`python-package`, `python2-package`, or `python3-package`.

A _Python Package_ is downloaded and installed via _PIP_ the Python package manager.
_Python Packages_ can be defined for Python 2 and Python 3 separately, or for both.

A package of typ `python2-package` automatically depends on Python 2 and is installed
only with the PIP of Python 2.
A package of typ `python3-package` automatically depends on Python 3 and is installed
only with the PIP of Python 3.
However, a package of typ `python-package` has slightly more complicated semantics.

* If neither Python 2 nor Python 3 is activated explicitly,
  the package automatically depends on Python 3
  but is installed with the PIP of all explictly or implictly activated Python versions.
* If only one of both Python versions is activated explicitly,
  the package automatically depends on the explicitly activated version
  but is installed with the PIP of all explictly or implictly activated Python versions.
* If both Python versions are activated explicitly,
  the package automatically depends on Python 3
  but is installed with the PIP of both Python versions.

This means, a `python-package` implictly activates Python 3 if no Python version
is explicitly activated, and it is installed in all activated Python versions.

To determine, if a _Python Package_ is already installed, the existence of its package folder in
`lib\site-packages` in the Python directory is checked.

## Python Wheel {#python-wheel}
An app is a _Python Wheel_ if its [`Typ`][] property is set to
`python-wheel`, `python2-wheel`, or `python3-wheel`.

A _Python Wheel_ is downloaded from the [`Url`][] and cached under the [`ResourceName`][].
The downloaded `.whl` file is then installed via _PIP_ the Python package manager.
_Python Wheels_ can be defined for Python 2 and Python 3 seperatly, or for both.
The dependency and activation semantics are identical with [Python Packages](#python-package).

To determine, if a _Python Wheel_ is already installed, the existence of its package folder in
`lib\site-packages` in the Python directory is checked.

## Ruby Package {#ruby-package}
An app is a _Ruby Package_ if its [`Typ`][] property is set to `ruby-package`.

A _Ruby Package_ is actually a _gem_ and is downloaded and installed by the Ruby package
manager, also called _gem_.

To determine, if a _Ruby gem_ is already installed, the existence of its package folder in
`lib\ruby\gems\<ruby-version>\gems` in the Ruby directory is checked.

## NuGet Package {#nuget-package}
An app is a _NuGet Package_ if its [`Typ`][] property is set to `nuget-package`.

A _NuGet Package_ is one package from <https://www.nuget.org/packages> and all of its dependencies.
The package and its dependencies are installed inside of the apps target directory
`lib\<AppDir>` side-by-side.
The individual package folders in the app target directory `lib\<AppDir>\<PackageName>`
are created without a version number, to simplify building paths.

To determine, if a _NuGet Package_ is already installed,
the existence of the `*.nupkg` file of the main package
`lib\<AppDir>\<PackageName>\<PackageName>.nupkg` is checked.
