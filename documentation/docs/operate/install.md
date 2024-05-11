!!! tip

    We recommend using the pre-built releases and verifying the provided checksums for security.


## Build from source

> Before getting started, ensure you have [Go](https://go.dev/) installed on your system (version >= 1.15 and <= 1.19).
> Compatibility is being worked on for other versions and will be available in the near future.

> To install Go, run the following command in your CLI (we are using 1.18 in this example): `sudo apt-get install golang-1.18`.
> Or, use a package manager like [<ins>Snapcraft</ins>](https://snapcraft.io/go) for Linux, [<ins>Homebrew</ins>](https://formulae.brew.sh/formula/go) for Mac, and [<ins>Chocolatey</ins>](https://community.chocolatey.org/packages/golang) for Windows.

Use the following commands to clone the Polygon Edge repository and build from source:

  ```bash
  git clone https://github.com/winter-soren/polygon-edge.git
  cd polygon-edge/
  go build -o polygon-edge .
  ```
