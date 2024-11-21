# TLDR

## Consumer

```shell
$ cd clk-react-dynamic-form-consumer-app
$ pnpm dev:cleanup
```

launch debuger with F5 to debug consumer app at same time
package doesn't work with symbolic links, to do that we mus move the directory ex

```shell
$ mv clk-react-dynamic-form clk-react-dynamic-form-symlink
$ mv /home/c3/clk-react-dynamic-form .
```

we must revert this in the end with

```shell
$ mv clk-react-dynamic-form /home/c3/
$ mv clk-react-dynamic-form-symlink clk-react-dynamic-form
```

## Package

edit code in `clk-react-dynamic-form`, this is a symbolic link to `/home/c3/clk-react-dynamic-form`, where clk package git project lives
after in package changes run:

```shell
$ pnpm build:publish:push
```

and wait for consumer app reload to assume changes