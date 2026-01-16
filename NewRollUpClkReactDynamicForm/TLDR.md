# TLDR

## Requirments

```shell
$ node -v
v22.14.0
```

## open Vscode at

- `/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm`

## Enable debugger in Consumer app and package

```shell
$ cd NewRollUpClkReactDynamicForm
```

launch debuger with F5 to debug consumer app at same time

package `clk-react-dynamic-form-consumer-app` debug, doesn't work with symbolic links, to do that we must move the directory ex

```shell
$ ls -la 
# symbolic link, that doesn't work with symbolic link
lrwxrwxrwx 1 c3 c3   31 Nov 11  2024 clk-react-dynamic-form -> /home/c3/clk-react-dynamic-form

$ mv clk-react-dynamic-form clk-react-dynamic-form-symlink
# move symbolic link to clk-react-dynamic-form-symlink, to bring clk-react-dynamic-form to project path
$ mv /home/c3/clk-react-dynamic-form .

# confirm
$ ls -la 
drwxrwxr-x 7 c3 c3 4096 Nov 11  2024 clk-react-dynamic-form
# this now is a broken symbolic link
lrwxrwxrwx 1 c3 c3   31 Nov 11  2024 clk-react-dynamic-form-symlink -> /home/c3/clk-react-dynamic-form
```

we must revert this in the end with

```shell
$ mv clk-react-dynamic-form /home/c3/
$ mv clk-react-dynamic-form-symlink clk-react-dynamic-form
```

## Consumer

```shell
$ cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app
$ pnpm dev:cleanup
```

## Package

edit code in `clk-react-dynamic-form`, this is a symbolic link to `/home/c3/clk-react-dynamic-form`, where clk package git project lives
after in package changes run:

```shell
$ pnpm build:publish:push
```

and wait for consumer app reload to assume changes