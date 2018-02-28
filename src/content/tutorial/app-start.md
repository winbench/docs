+++
date = "2018-02-28"
description = "Execute an app in the Bench environment"
title = "Starting an App"
weight = 6
+++

[Launcher]: /guide/launcher
[Launcher Drag-and-Drop]: /guide/launcher/#drag-and-drop
[Shell]: /guide/shell
[Launcher Directory]: /ref/file-structure/#launcher-dir
[Bench Dashboard]: /ref/dashboard
[Bench CLI]: /ref/bench-cli
[Apps]: https://apps.winbench.org/
[Git]: https://apps.winbench.org/#Bench.Git

There are two different kinds of [apps][]:
Apps with a graphical user interface, which have a [launcher][],
and command line tools, which are registered on the `PATH` to be run in a [shell][].
Some apps have a graphical user interface and come with a [launcher][]
but are available as a command line tool too.
<!-- more -->

## Launcher for Apps with Graphical UI
Apps with a graphical user interface come with a [launcher][].
The launcher for an app appears as an icon in the [Bench Dashboard][].
To start the app a double click on the icon is enough.
Additionally, launchers appear as shortcuts in the [launcher directory][].

## Passing Arguments to Launchers
A lot of programs accept the path to a file or a directory as a command line argument.
For an editor this typically means the file is opened when the program starts.
When dragging a file or a directory from the desktop or the explorer
onto a launcher, both the shortcuts and the dashboard icons, the path of the file
or directory is passed as a command line argument to the starting program.
This is a comfortable way for opening a file in a Bench app.

## Executing Command Line Tools
Command line tools usually have no launcher, because they require additional
command line arguments to be useful.
Therefore, they are typically run from a shell.
To run a command line tool inside the Bench environment, open a [Bench shell][shell]
and type the name of the apps executable.

E.g. to run [Git][] in a Bench environment
open the Bench Dashboard, click on the shell button of your choice
(PowerShell, CMD, or Bash) and type `git --version` on the shell.

If the Bench environment is configured to integrate into the Windows user profile,
by setting the configuration property [`RegisterInUserProfile`](/ref/config/#RegisterInUserProfile)
to `true`, the command line tools in Bench can be run from every regular shell.
Because Bench then puts its apps on the environment varibale `PATH`
of the user profile.

## Running App via Bench CLI
To run a Bench app from a script which is not necessarily started in the
Bench environment, the [Bench CLI][] can be utilized.
Use the command [`bench app exec`](/ref/bench.cli/#cmd_bench-app-execute)
to start the main executable of a Bench app.
The Bench CLI takes care of providing the correct environment variables
to the starting program.

To print the version of [Git][] in a Bench environment in `C:\bench`
you can use the following command:

```cmd
C:\bench\auto\bin\bench.exe app exec Bench.Git --version
```

All additional arguments after the apps ID are passed as command line arguments
to the apps main executable.

## See Also

Tech Guides

* [Launcher][]
* [Shells][shell]

Reference Docs

* [File Structure](/ref/file-structure)
* [Bench Dashboard](/ref/dashboard)
